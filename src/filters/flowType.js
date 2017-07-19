/**
 * 流水类型 - 余额明细
 *
 * author: Storm
 * date: 2017/05/10
 */

const list = [
  {
    id: 1,
    name: '出售成功'
  },
  {
    id: 2,
    name: '提现'
  },
  {
    id: 3,
    name: '余额支付'
  }
];

export default (id) => {
  if (id === undefined) return '';
  if (id === null) return list;
  const result = list.find(item => item.id === id);
  if (result === undefined) return '';
  return result.name;
}
