/**
 * 审核状态
 *
 * author: Storm
 * date: 2017/05/09
 */

const list = [
  {
    id: 1,
    name: '待审核'
  },
  {
    id: 2,
    name: '审核通过,转账中'
  },
  {
    id: 3,
    name: '审核通过,转账成功'
  },
  {
    id: 4,
    name: '审核通过,转账失败'
  },
  {
    id: 5,
    name: '审核不通过,资金退回'
  }
];

export default (id, type) => {
  if (id === null || id === undefined) return '';
  const result = list.find(item => item.id === id);
  if (type === null) return result;
  if (type === undefined) return result.name;
  return result[type];
}
