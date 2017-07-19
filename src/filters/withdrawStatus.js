/**
 * 提现状态
 *
 * author: Storm
 * date: 2017/05/09
 */

const list = [
  {
    id: 1,
    name: '申请提现',
    symbol: '',
    cls: ''
  },
  {
    id: 2,
    name: '提现成功',
    symbol: '-',
    cls: 'c-success'
  },
  {
    id: 3,
    name: '提现失败',
    symbol: '+',
    cls: 'c-error'
  }
];

export default (id, type) => {
  if (id === undefined || id === null) return '';
  const result = list.find(item => item.id === id);
  if (type === null) return result;
  if (type === undefined) return result.name;
  return result[type];
}
