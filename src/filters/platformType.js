/**
 * 平台类型
 *
 * author: Storm
 * date: 2017/05/27
 */

const data = [
  {
    id: 1,
    name: '安卓',
    type: 'android'
  },
  {
    id: 2,
    name: '苹果',
    type: 'ios'
  },
  {
    id: 3,
    name: '苹果越狱',
    type: 'jailbreak'
  },
  {
    id: 4,
    name: '互通',
    type: 'general'
  }
];

export default (id, key = 'name') => {
  if (!Number.isInteger(id)) return '';
  const result = data.find(item => item.id === id);
  if (key === undefined) return result;
  return result ? result[key] : '';
}
