/**
 * 支付方式 - 数据
 *
 * author: Storm
 * date: 2017/06/01
 */

let paymentList = [];

if (process.env.VUE_ENV === 'client') {

  !CONFIG.DISABLED_WECHAT_PAYMENT && paymentList.push({
    id: 2,
    name: '微信支付',
    className: 'wechat',
    icon: require('../assets/wechat-on.png'),
    offIcon: require('../assets/wechat-off.png'),
  });

  !CONFIG.DISABLED_ALIPAY_PAYMENT && paymentList.push({
    id: 1,
    name: '支付宝支付',
    className: 'alipay',
    icon: require('../assets/alipay-on.png'),
    offIcon: require('../assets/alipay-off.png')
  });
}

export default paymentList;
