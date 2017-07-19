/**
 * 获取一个随机数
 *
 * author: Storm
 * date: 2017/07/19
 */

export default (max, min = 0) => {
  return parseInt(Math.random() * (max - min + 1)) + min;
}
