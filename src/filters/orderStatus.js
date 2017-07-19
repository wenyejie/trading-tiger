/**
 * 订单状态
 *
 * author: Storm
 * date: 2017/05/03
 */
export default input => {
  switch (input) {
    case 1:
      return '待支付';
    case 2:
      return '待发货';
    case 3:
      return '待确认收货';
    case 4:
      return '仲裁中';
    case 5:
      return '交易成功';
    case 6:
      return '交易失败';
    case 99:
      return '删除';
    default:
      return '';
  }
}
