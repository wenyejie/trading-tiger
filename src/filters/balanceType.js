/**
 * 余额收支类型
 *
 * author: Storm
 * date: 2017/05/10
 */

const list = [
  {
    id: 0,
    name: '支出'
  },
  {
    id: 1,
    name: '收入'
  }
];

export default id => {
  if (id === undefined) return '';
  if (id === null) return list;
  const result = list.find(item => item.id === id);
  if (result === undefined) return '';
  return result.name;
}
