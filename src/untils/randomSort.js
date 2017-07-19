/**
 * 数组随机排序
 *
 * author: Storm
 * date: 2017/07/19
 */

export default array => {
  const result = [];
  while (array.length > 0) {
    const index = parseInt(Math.random() * (array.length));
    result.push(array[index]);
    array.splice(index, 1);
  }
  return result;
}
