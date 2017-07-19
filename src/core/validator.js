/**
 * 表单验证
 *
 * 验证失败返回提示信息，验证成功不返回任何东西即，返回undefined
 *
 * author: Storm
 * date: 2017/04/25
 */

const regexp = {
  tel: /^1[\d]{10}$/,
  email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  number: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
  letter: /^\w+$/
};

export default (obj) => {
  if (typeof obj.value === 'string') {
    obj.value = obj.value.trim();
  }

  if (obj.required && (obj.value === '' || obj.value === null || obj.value === undefined)) return obj.title + '不能为空';

  // 如果非必填, 并且值为空, 退出检验
  if (!obj.required && (obj.value === '' || obj.value === null || obj.value === undefined)) return false;

  //if (obj.pattern && !new RegExp(obj.pattern).test(obj.value)) return obj.title + '格式错误';

  switch (obj.type) {
    case 'tel':
      if (obj.value.length < 11 ) return obj.title + '必须为11位';
      if (!regexp.tel.test(obj.value)) return obj.title + '格式错误';
      break;
    case 'email':
      if (!regexp.email.test(obj.value)) return obj.title + '格式错误';
      break;
    case 'number':
      if (!regexp.number.test(obj.value)) return obj.title + '只能输入数字';
      if (parseFloat(obj.value) < parseFloat(obj.min)) return obj.title + '不能小于' + obj.min;
      if (parseFloat(obj.value) > parseFloat(obj.max)) return obj.title + '不能大于' + obj.max;
      break;
    case 'letter':
      if (!regexp.letter.test(obj.value)) return obj.title + '只能输入英文字母';
      break;
    default:
      break;
  }

}
