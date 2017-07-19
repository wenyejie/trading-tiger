/**
 * 表单验证
 *
 * author: Storm
 * date: 2017/05/08
 */

import validate from './validator';

export default (form, opts = {}) => {
  if (!form) return false;

  for (let i = 0; i < form.length; i++) {

    // 判断元素是否存在name值
    if (!form[i].name) continue;

    // 判断表单元素是否为隐藏元素
    if (form[i].type === 'hidden') continue;

    // 校验数据是否正确
    const result = validate(form[i]);

    // 进行提示
    if (result) {

      return {
        $invalid: true,
        $valid: false,
        message: result
      };
    }
  }

  return {$invalid: false, $valid: true};
}
