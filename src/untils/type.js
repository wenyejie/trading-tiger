/**
 * type
 * 判断数据的类型
 * string, number, json, array
 *
 * author: Storm
 * date: 2017/05/05
 */

export default data => {
  if (typeof data === 'string') return 'string';
  if (typeof data === 'number') return 'number';
  if (Array.isArray(data)) return 'array';


}
