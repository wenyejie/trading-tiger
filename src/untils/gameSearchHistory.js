/**
 * 游戏搜索历史
 *
 * author: Storm
 * date: 2017/05/03
 */

// 定义本地存储的名称
const LOCAL_NAME = 'gameSearchHistory';

/**
 * 获取搜索数据
 * @returns {Array}
 */
const get = () => {
  return local.get(LOCAL_NAME) || [];
};

/**
 * 保存搜索数据
 * @param obj
 * @returns {boolean}
 */
const set = obj => {

  // 如果数据为空则退出
  if (!obj) return false;

  // 获取到存储在本地的数据
  let history = get();

  // 定义下标
  let index = null;

  // 查找是否存在相同ID的存储数据
  const result = history.find((item, i) => {
    index = i;
    return item.gameId === obj.gameId;
  });

  // 如果以及存在在删除
  if (result) history.splice(index, 1);

  // 在首位中插入数据
  history.unshift(obj);

  // 移除超过五条的数据
  history.splice(5);

  // 存储数据
  local.set(LOCAL_NAME, history);
};

/**
 * 移除存储的本地数据
 * @param gameId 游戏ID
 */
const remove = gameId => {

  // 如果没有传入gameId则退出方法
  if (!gameId) return false;

  // 获取到存储在本地的数据
  const history = get();

  // 过滤数据
  let newHistory = history.filter(item => item.gameId !== gameId);

  // 存储过滤后的数据
  local.set(LOCAL_NAME, newHistory);
};

export default {get, set, remove};
