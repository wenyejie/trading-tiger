const fs = require('fs');
const path = require('path');
const LRU = require('lru-cache');
const express = require('express');
const favicon = require('serve-favicon');
const compression = require('compression');
const resolve = file => path.resolve(__dirname, file);
const { createBundleRenderer } = require('vue-server-renderer');

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const isProd = process.env.NODE_ENV === 'production';
const useMicroCache = process.env.MICRO_CACHE !== 'false';
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;

const app = express();

const template = fs.readFileSync(resolve('./src/index.html'), 'utf-8');

function createRenderer (bundle, options) {
  options.clientManifest.async = [];
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    template,
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),
    // recommended for performance
    runInNewContext: false,

    shouldPreload: (file, type) => {
      if (type === 'script') return false;
    }
  }))
}

let renderer;
let readyPromise;
if (isProd) {
  // In production: create server renderer using built server bundle.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const bundle = require('./dist/vue-ssr-server-bundle.json');
  // The client manifests are optional, but it allows the renderer
  // to automatically infer preload/prefetch links and directly add <script>
  // tags for any async chunks used during render, avoiding waterfall requests.
  const clientManifest = require('./dist/vue-ssr-client-manifest.json');
  renderer = createRenderer(bundle, {
    clientManifest
  })
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  readyPromise = require('./build/setup-dev-server')(app, (bundle, options) => {
    renderer = createRenderer(bundle, options)
  })
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
});


app.use(compression({ threshold: 0 }));
app.use(favicon('./favicon.ico'));
app.use('/dist', serve('./dist', true));
app.use('/public', serve('./public', true));
app.use('/', serve('./', true));
app.use('/manifest.json', serve('./manifest.json', true));
app.use('/service-worker.js', serve('./dist/service-worker.js'));
// app.use(path.posix.join('/', 'publish'), express.static('./publish'));

// 1-second microcache.
// https://www.nginx.com/blog/benefits-of-microcaching-nginx/
const microCache = LRU({
  max: 100,
  maxAge: 1000
});

// since this app has no user-specific content, every page is micro-cacheable.
// if your app involves user-specific content, you need to implement custom
// logic to determine whether a request is cacheable based on its url and
// headers.
const isCacheable = req => useMicroCache;

function render (req, res) {
  const s = Date.now();


  res.setHeader("Content-Type", "text/html");
  res.setHeader("Server", serverInfo);

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if(err.code === 404) {
      res.redirect('/404');
      // res.status(404).end('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      // res.status(500).end('500 | Internal Server Error');
      res.redirect('/500');
      console.error(`error during render : ${req.url}`);
      console.error(err.stack)
    }
  };

  const cacheable = isCacheable(req);
  if (cacheable) {
    const hit = microCache.get(req.url);
    if (hit) {
      if (!isProd) {
        console.log(`cache hit!`)
      }
      return res.end(hit)
    }
  }

  const context = {
    title: '交易虎_手机游戏交易平台_手游交易_帐号交易_游戏币交易_装备交易_道具交易_jiaoyihu', // default title
    keywords: '交易虎手机游戏交易平台,手游交易,账号交易,游戏币交易,装备道具交易,交易虎_jiaoyihu', // default keywords
    description: '交易虎是交易最快的手游交易平台-提供免费、快速的手机游戏帐号交易、游戏币交易、装备道具交易，为用户提供最快、最安全、服务最完善的手机游戏交易平台_www.jiaoyihu.com', // default description
    url: req.url
  };

  if (req.headers['user-agent'].toLocaleLowerCase().indexOf('mobile') >= 0) {
    context.canonical = `<link rel="canonical" href="http://www.jiaoyihu.com${req.url}"/>`;
  } else {
    context.canonical = `<link rel="alternate" media="only screen and(max-width: 640px)" href="https://www.jiaoyihu.com${req.url}" />`;
  }


  renderer.renderToString(context, (err, html) => {

    if (err) {
      return handleError(err)
    }
    res.end(html);
    if (cacheable) {
      microCache.set(req.url, html)
    }
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
}

app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
});

const port = process.env.PORT || (isProd ? 80 : 80);
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
});
