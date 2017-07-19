/**
 * date
 * 格式化日期
 *
 * author: Storm
 * date: 2017/04/22
 */

import zeroize from './zeroize';

export default (date, format = 'YYYY-MM-DD hh:mm:ss') => {

  if (date === undefined || date === null || date === '') return '';

  // 把string转成number类型，如果可以？
  if (typeof date === 'string' && /^\d+$/.test(date)) date = parseInt(date);

  // date 为字符串类型如: (2016-06-06 or 2016/06/06)
  if (typeof date === 'string') date = new Date(date);

  // number 类型 如: (1464944439[秒] or 1464945084232[毫秒])
  if (typeof date === 'number') date = new Date(/^\d{10}$/.test(date + '') ? date * 1000 : date);

  // 传入参数错误
  if (date.toString() === 'Invalid Date') {
    console.error('date filter: 传入参数人date有误', arguments);
    return '';
  }

  // 使用正则替换文本
  return format.replace(/"[^"]*"|'[^']*'|\b(?:D{1,2}|d{1,3}|m{1,4}|YY(?:YY)?|([hHMstT])\1?|[lLZ])\b/g, function (str) {
    switch (str) {
      case 'YYYY':
        return date.getFullYear();
      case 'YY':
        return (date.getFullYear() + '').substr(2);
      case 'MM':
        return zeroize(date.getMonth() + 1);
      case 'M':
        return date.getMonth() + 1;
      case 'DD':
        return zeroize(date.getDate());
      case 'D':
        return date.getDate();
      case 'hh':
        return zeroize(date.getHours());
      case 'h':
        return date.getHours();
      case 'mm':
        return zeroize(date.getMinutes());
      case 'm':
        return date.getMinutes();
      case 'ss':
        return zeroize(date.getSeconds());
      case 's':
        return date.getSeconds();
      case 'd':
        return date.getDay();
      case 'dd':
        return '\u5468' + ['\u65E5', '\u4E00', '\u4E8C', '\u4E09', '\u56DB', '\u4E94', '\u516D'][date.getDay()];
      case 'ddd':
        return '\u661F\u671F' + ['\u65E5', '\u4E00', '\u4E8C', '\u4E09', '\u56DB', '\u4E94', '\u516D'][date.getDay()];
      case 'tt':
        return date.getHours() < 12 ? 'am' : 'pm';
      case 'TT':
        return date.getHours() < 12 ? 'AM' : 'PM';
      case 't':
        return date.getHours() < 12 ? '\u4E0A\u5348' : '\u4E0B\u5348';
    }
  });

};
