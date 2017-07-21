/**
 * api
 *
 * author: Storm
 * date: 2017/07/20
 */

import {createAPI} from 'create-api';

const logRequests = !!process.env.DEBUG_API;

const api = createAPI({
  version: '/v0',
  config: {
    databaseURL: '//hacker-news.firebaseio.com'
  }
});

// warm the front page cache every 15 min
// make sure to do this only once across all requests
if (api.onServer) {
  warmCache();
}

function fetch (child) {
  logRequests && console.log(`fetching ${child}...`)
  const cache = api.cachedItems
  if (cache && cache.has(child)) {
    logRequests && console.log(`cache hit for ${child}.`)
    return Promise.resolve(cache.get(child))
  } else {
    return new Promise((resolve, reject) => {
      api.child(child).once('value', snapshot => {
        const val = snapshot.val()
        // mark the timestamp when this item is cached
        if (val) val.__lastUpdated = Date.now()
        cache && cache.set(child, val)
        logRequests && console.log(`fetched ${child}.`)
        resolve(val)
      }, reject)
    })
  }
}

function warmCache () {

}