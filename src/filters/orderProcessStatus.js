/**
 * 订单进程状态
 *
 * author: Storm
 * date: 2017/05/03
 */
export default input => {
  switch (input) {
    case 1:
      return '未支付';
    case 2:
      return '待选择发货客服';
    case 3:
      return '待发货';
    case 4:
      return '正在发货中';
    case 5:
      return '待仲裁处理'; // 仲裁中
    case 6:
      return '正在仲裁中'; // 仲裁中
    case 7:
      return '待买家确认收货';
    case 8:
      return '超时自动确认收货';
    case 9:
      return '买家已确认收货';
    case 10:
      return '转账卖家中';
    case 11:
      return '转账卖家完成'; // 正常
    case 12:
      return '仲裁交易成功，转账卖家中'; // 仲裁成功
    case 13:
      return '转账卖家完成，交易结束'; // 仲裁成功
    case 14:
      return '订单交易失败，退款中';
    case 15:
      return '订单交易失败，退款完成';
    case 16:
      return '订单交易失败，退款中';
    case 17:
      return '订单交易失败，退款完成，交易结束';
    case 18:
      return '仲裁交易失败，退款中'; // 仲裁失败
    case 19:
      return '仲裁交易失败，退款完成，交易结束'; // 仲裁失败
    case 20:
      return '买家取消仲裁交易成功'; // 仲裁成功
    case 99:
      return '删除';
    case 100:
      return '支付成功';
    default:
      return '';
  }
}
