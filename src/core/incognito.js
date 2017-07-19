/**
 * 判断用户是否处于无痕模式下
 *
 * author: Storm
 * date: 2017/06/06
 */

export default () => {

  try {
    // 测试用的key
    const testKey = 'incognitoTestKey1234567890', storage = window.localStorage;
    storage.setItem(testKey, 'incognitoTestValue1234567890');
    storage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}
