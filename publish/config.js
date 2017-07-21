/**
 * 配置
 *
 * 警告: 更新配置之后, 请自行更新index.html script引入的版本号或时间戳, 避免出错
 * 以后在进行优化
 * author: Storm
 * date: 2017/05/12
 */

const CONFIG = {

  // 根请求地址
  BASE_PATH: 'server.jiaoyihu.com',

  // IM请求地址
  IM_ADDRESS: 'im.jiaoyihu.com',

  // 应用名称
  APP_NAME: '交易虎_手机游戏交易平台_手游交易_帐号交易_游戏币交易_装备交易_道具交易_jiaoyihu',

  // 卖家发布商品成功次数, 防骗提醒上限
  SELLER_PUBLISH_GOODS_SUCCESS_TIMES: 1,

  // 企业QQ咨询地址
  QIYE_QQ_SRC: '//wp.qiye.qq.com/qidian/2852151167/9ad8a067db7e6eee3b2f9ab129f78313',

  // 默认支付方式
  // 1:支付宝, 2: 微信
  DEFAULT_PAYMENT_METHOD: 1,

  // 是否禁用微信支付
  DISABLED_WECHAT_PAYMENT: true,

  // 是否禁用支付宝支付
  DISABLED_ALIPAY_PAYMENT: false,

  // 图片上传到七牛之后的展示地址
  IMAGE_SHOW_ADDRESS: 'img.jiaoyihu.com',

  // 判断是否支持webp, 自动根据浏览器判断
  // null, 自动根据浏览器判断, false, 不支持, true一定支持
  IS_SUPPORT_WEBP: null

};


if (process.env.VUE_ENV === 'client') {

  // 判断是否支持webp
  if (CONFIG.IS_SUPPORT_WEBP === null) {
    const canvas = document.createElement('canvas');
    CONFIG.IS_SUPPORT_WEBP = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    canvas.remove();
  }

  // 七牛图片上传地址
  CONFIG.IMAGE_UPLOAD_ADDRESS = location.protocol === 'http:' ? 'upload.qiniu.com' : 'upload.qbox.me';

  // 开发环境
  if (location.host.indexOf('dm.com') >= 0) {

    // 文斐
    CONFIG.BASE_PATH = 'wfadmin.dm.com:8081';

    // 陈福敢
    // CONFIG.BASE_PATH = 'cfg.dm.com:8081';

    // 雷永平
    // CONFIG.BASE_PATH = 'sdh.dm.com:8081';
    // CONFIG. BASE_PATH = '192.168.18.153:8081';

    // dev
    // CONFIG.BASE_PATH = 'server.sdh-dev.com';

    CONFIG.IM_ADDRESS = '192.168.51.112:8581';
  }

  // 测试环境
  if (location.host.indexOf('sdh-test.com') >= 0) {
    CONFIG.IM_ADDRESS = 'im.sdh-test.com';
    CONFIG.BASE_PATH = 'server.sdh-test.com';
  }

  // 预发
  if (location.host.indexOf('www-pre.jiaoyihu.com') >= 0) {
    CONFIG.IM_ADDRESS = 'im.jiaoyihu.com';
    CONFIG.BASE_PATH = 'server-pre.jiaoyihu.com';
  }

  // IM 地址根据http, https 自适应使用ws或wss
  CONFIG.IM_ADDRESS = location.protocol.replace('http', 'ws') + '//' + CONFIG.IM_ADDRESS;

  window.CONFIG = CONFIG;
}

export default CONFIG;

