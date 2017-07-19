/**
 * vue-resource 拦截器
 *
 * author: Storm
 * date: 2017/05/14
 */

// 存储loading实例
let loading;

// 加载计数器
let loadingCounter = 0;

export default function (request, next) {

  // 自定义提示消息
  let customMsg = request.customMsg;

  // 是否关闭服务器返回的错误提示
  let offMsg = request.offMsg;

  // 禁止跨域前缀
  let offPrefix = request.offPrefix;

  // 关闭cookie, 比如七牛上传就要禁止cookie
  let offCredentials = request.offCredentials;

  // 是否关闭凭证, 从而禁止cookie, 比如七牛上传就要禁止凭证
  if (!offCredentials) request.credentials = true;

  // 当请求地址没有头时, 自动调用
  if (!offPrefix) request.url = location.protocol + '//' + CONFIG.BASE_PATH + request.url;

  // 如果没有说明不需要loading, 则展示loading
  if (request.loading) {
    if (loadingCounter === 0) {
      const loadingText = typeof request.loading === 'string' ? request.loading : '加载中';
      loading = this.$Message.loading(loadingText);
    }

    loadingCounter++;
  }

  next(function (response) {
    // 如果存在loading, 并且所有请求已经完成则, 移除loading
    if (request.loading) {
      loadingCounter--;
      if (loadingCounter <= 0) loading && loading.remove();
    }

    // 请求错误，包括404等
    if (response.status !== 200) {
      let message = '';
      switch (response.status) {
        case 0:
          message = '网络错误, 请稍后重试！';
          break;
        case 404:
          message = '404错误, 请稍后重试！';
          break;
        case 500:
          message = '服务器错误, 请稍后重试！';
          break;
        default:
          message = '未知错误, 请稍后重试！';
          break;
      }
      this.$Message.error(response.statusText || message);
    } else {


      // 请求正确，但因为参数不正确获取服务器错误等因素
      if (response.body && response.body.code) {

        switch (response.body.code) {
          case '000':
            break;
          case '302':
            local.remove('uid', 'token');
            this.$router.push({
              path: '/user/login',
              query: Object.assign(this.$route.query, {
                redirectUrl: this.$route.path
              })
            });
            break;
          default:

            // 用户是否禁用
            !offMsg && this.$Message.warning(customMsg || response.body.message);
            break;
        }
      }

    }

    return response;
  });

}
