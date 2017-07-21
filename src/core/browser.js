/**
 * 浏览器信息统计
 *
 * author: Storm
 * date: 2017/06/19
 */

let browser = {};

if (typeof window !== 'undefined') {
  const win = window;

  const ua = win.navigator.userAgent.toLowerCase();

  browser = {

    ua,

    isMobile: ua.includes('mobile'),

    isChrome: ua.includes('chrome'),

    isFirefox: ua.includes('firefox'),

    isSafari: ua.includes('version') && ua.includes('safari'),

    isWechat: ua.includes('micromessenger'),

    isMac: ua.includes('mac os x'),

    isLinux: ua.includes('linux'),

    isWindows: ua.includes('windows'),

    isAndroid: ua.includes('android'),

    isIphone: ua.includes('iphone'),

    isIpad: ua.includes('ipad'),

    isIpod: ua.includes('ipod'),

    // 客户端宽度
    cWidth: win.outerWidth,

    // 客户端高度
    cHeight: win.outerHeight,

    width: win.innerWidth,

    height: win.innerHeight

  };

  browser.isPc = !browser.isMobile;
}

export default browser;
