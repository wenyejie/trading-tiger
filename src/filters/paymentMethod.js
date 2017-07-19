/**
 * 支付方式 - 过滤器
 *
 * author: Storm
 * date: 2017/04/28
 */

// 支付方式数据
import paymentMethod from '@/data/paymentMethod';

/**
 * 返回支付方式的某个数据
 *
 * @param id 支付方式ID, 如果id为true|false, 则返回所有支付方式
 * @param key 返回关键字, 如果key为false|true则返回ID下的所有信息
 * @return {string}
 */
export default (id, key = 'name') => {

  // 如果key返回所有
  if (typeof id === 'boolean') return paymentMethod || [];

  // 如果没有ID
  if (!id) return '';

  // 查找ID下的数据
  const pay = paymentMethod.find(item => item.id === id);

  // 如果key为false, 则会烦当前ID下的所有信息
  if (typeof key === 'boolean') return pay || {};

  // 如果查找到相关数据, 则返回
  return pay ? (pay[key] || '') : '';
}
