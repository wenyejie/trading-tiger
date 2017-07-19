/**
 * 商品分类
 *
 * author: Storm
 * date: 2017/04/24
 */

// 商品类型
const goodsClasses = [
  {
    id: 1,
    className: 'primary',
    name: '账号'
  },
  {
    id: 2,
    className: 'info',
    name: '道具'
  },
  {
    id: 3,
    className: 'warning',
    name: '游戏币'
  }
];

export default (id, key = 'name') => {
  if (!Number.isInteger(id)) return '';
  const result = goodsClasses.find(item => item.id === id);
  if (key === undefined) return result;
  return result ? result[key] : '';
}
