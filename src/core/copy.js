/**
 * 复制文本到剪切板
 *
 * author: Storm
 * date: 2017/05/03
 */

export default text => {
  const input = document.createElement('input');
  input.type = 'text';
  input.style.position = 'fixed';
  input.style.left = '-99999em';
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand("Copy");
  document.body.removeChild(input);
}
