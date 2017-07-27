<!--
 - 发货客服
 -
 - author: Storm
 - date: 2017/05/05
 -->

<template>
  <s-app>

    <s-header :previous="previous">发货客服</s-header>

    <s-main>

      <s-infinite :loading="loading"
                  :completed="completed"
                  direction="top"
                  @infinite="onInfinite"></s-infinite>

      <ul class="message">

        <li class="message-item" v-for="item in messages" :key="item.id" :class="`message-${item.type}`">
          <div class="message-time" v-if="item.isTime">{{item.time | date}}</div>
          <div class="message-content">
            <div class="message-body">
              <div v-if="item.pic">
                <a class="message-img" v-for="(subitem, index) in item.pic" :key="index">
                  <qiniu-img @load="imImageLoad(item.history)"
                             @click="onGallery(subitem)"
                             :src="subitem"
                             width="260"
                             mode="0"
                             height="130"></qiniu-img>
                </a>
              </div>
              <div v-if="item.message || item.htmlAttrs" class="message-text">

                <div v-if="item.message" v-html="item.message"></div>

                <div v-if="item.htmlAttrs" class="text-right mt-15">
                  <div v-for="subitem in item.htmlAttrs">
                    <s-button type="default"
                              outline
                              size="sm"
                              :disabled="subitem.loading === false"
                              v-if="subitem.attrName === 'button' && subitem.attrValue !== null"
                              @click="messageSystemHandel(subitem)">{{subitem.attrValue}}
                    </s-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>

      </ul>

      <footer class="message-send">
        <form @submit.prevent="handleSend">
          <input type="text" v-model.trim="message" placeholder="输入新消息">
          <button type="submit">发送</button>
        </form>
      </footer>

    </s-main>

  </s-app>
</template>

<script>
  import Message from '../../untils/message';

  // IM实例
  let iMessage;

  // 记录旧的消息ID判断消息是否重复, 如果是, 则退出渲染程序
  let oldMessageId = '';

  // 自己的类型
  let selfType = '';

  // 消息滚动到底部的时间标记
  let msgBottomTimer = null;

  // im 错误提示
  let imMsg = null;

  // IM心跳计时器
  let imHeartbeatTimer = null;

  export default {
    name: 'service',
    props: {},
    data () {
      return {

        // 消息
        message: '',

        // 加载完成
        completed: null,

        // 获取消息记录
        loading: null,

        // 消息列表
        messages: [],

        // 当前页
        currentPage: null,

        // 页码
        pageSize: null,

        // uid
        uid: this.$cookie.get('uid'),

        // 订单ID
        orderId: null,

        // 返回上一页
        previous: ''
      }
    },
    methods: {

      /**
       * 点击进入画廊
       * @param imgSrc 图片地址
       */
      onGallery (imgSrc) {
        let picUrls = [];
        let index = 0;
        let counter = 0;

        this.messages.forEach(item => {
          if (item.pic) picUrls = picUrls.concat(item.pic);
          item.pic && item.pic.forEach(subitem => {
            if (subitem === imgSrc) index = counter;
            counter++;
          })
        });

        this.$router.push({
          path: '/gallery',
          query: {
            picUrls: picUrls.join(),
            index
          }
        })
      },

      // 消息发送事件
      handleSend () {
        if (!this.message) return false;
        iMessage.context.publishText(this.message);
        this.message = '';
      },

      /**
       * IM系统消息处理
       */
      messageSystemHandel (item) {
        if (item.loading) return false;
        item.loading = true;
        this
          .$http
          .post(item.action, {
            imConfId: Number(item.id),
            orderId: this.orderId
          })
          .then(response => {
            if (response.data.code !== '000') return false;
            // this.$Message.success('处理完成!');
            //this.message = response.data.data.userAskResponse;
            //this.handleSend();
          })
          .finally(() => item.loading = false);
      },

      // 监听到消息事件
      handleMessage (message) {
        if (message === '') return false;
//        message = message.replace(//)
        try {
          message = JSON.parse(message);
        } catch (e) {
          // 当字符串JSON化出错时, 退出方法, 因为不是标准格式的数据
          return false;
        }

        if (!message.ctime) message.ctime = parseInt(Date.now() / 1000);

        if (message.id === oldMessageId && message.id) return false;
        oldMessageId = message.id;
        const msg = this.convertMessage(message, this.messages);
        if (typeof msg === 'object') this.messages.push(msg);
        else return false;
        this.messageBottom();
      },

      // 转换数据
      convertMessage (message, msgList) {
        if ((message.ctime + '').length < 13) message.ctime = message.ctime * 1000;
        let obj = {
          type: message.sendRoleType === selfType ? 'self' : 'other',
          time: message.ctime,
          isTime: true
        };

        let msg = message;
        switch (Number(msg.event)) {
          case 1:
            obj.message = msg.event_context.content;
            break;
          case 2:
            let content = '';
            obj.pic = msg.event_context.pic;
            if (obj.message) obj.message = content + msg.event_context.content;
            break;
          case 5:
            message.event_context.subClassConf.forEach(item => {
              obj.message = item.content;
              obj.htmlAttrs = item.htmlAttrs;
            });
            break;
          default:
            return false;
            break;
        }

        if (msgList.length >= 1) {
          const last = msgList[msgList.length - 1];
          obj.isTime = obj.time - last.time > 60000;
        }
        return obj;
      },

      /**
       * IM中图片加载完成
       */
      imImageLoad (isHistory) {
        if (!isHistory) document.body.scrollTop = document.body.scrollHeight;
      },

      // IM 滚动到底部
      messageBottom () {
        //setTimeout(() => document.body.scrollTop = document.body.scrollHeight, 5);

        const length = document.querySelectorAll('.message-item').length;

        let timerCounter = 0;

        clearInterval(msgBottomTimer);

        msgBottomTimer = setInterval(() => {
          timerCounter++;
          if (timerCounter >= 10) return false;
          if (length >= document.querySelectorAll('.message-item').length) return false;
          clearInterval(msgBottomTimer);
          document.body.scrollTop = document.body.scrollHeight;
        }, 250);
      },

      /**
       * 上拉加载更多
       */
      onInfinite () {
        this.getIMHistory(this.currentPage + 1);
      },

      /**
       * 获取消息历史记录
       * @param currentPage
       * @param pageSize
       */
      getIMHistory (currentPage = 0, pageSize = 20) {
        if (this.loading) return false;
        this.loading = true;
        this
          .$http
          .post('/h5/im/getUserRecord', {
            orderId: this.orderId,
            roleType: selfType,
            currentPage,
            pageSize
          })
          .then(response => {
            if (response.data.code !== '000') return false;
            const historyList = response.data.data.list;
            historyList.reverse();
            let result = [];
            historyList.forEach(item => {
              item.ctime = Number(item.ctime);
              result.push(Object.assign({}, this.convertMessage(item, result), {history: true}));
            });
            if (historyList.length < pageSize) this.completed = true;
            this.messages = result.concat(this.messages);
            this.pageSize = response.data.data.pageSize;
            this.currentPage = response.data.data.currentPage;

            // 只有为第一页时才滚动到底部
            if (currentPage === 0) this.messageBottom();
          })
          .finally(() => this.loading = false);
      },

      /**
       * im 初始化
       * @param orderId 订单IID
       */
      imInit (orderId) {

        iMessage = new Message(CONFIG.IM_ADDRESS + '?token=' + this.$cookie.get('token') + '&authtype=1');

        // 设置默认选项
        iMessage.setOptions({
          sendRoleType: selfType,
          sender: this.uid,
          orderId: orderId,
          channel: `order_${selfType}_${orderId}`,
          sessionGroup: `order_${selfType}_${orderId}`
        });

        // 监听
        iMessage.on_message = (context) => {
          const message = context.getBody();
          this.handleMessage(message);
          this.imHeartbeat();
        };

        // 失去IM连接
        iMessage.lostConnection = () => {
          //this.$Message.error('失去IM连接, 请刷新重试!');
        };

        iMessage.on_error = (event, a) => {
          if (imMsg) return false;
          this.imRemove();
          imMsg = this.$Message.error('IM错误或登录失效, 请重试或者重新登录');

          setTimeout(() => {
            this.$router.push({
              path: '/user/login',
              query: Object.assign(this.$route.query, {
                redirectUrl: this.$route.path
              })
            });
          }, 3000);

        };

        iMessage.offline = () => {
          //this.$Message.warning('你已经失去网络, 请检查!');
        };

        // 订阅频道
        iMessage.on_open = context => {
          context.subscribe(`order_${selfType}_${orderId}`, 'chat', null, '');
        };

        // 自动心跳
        this.imHeartbeat();
      },

      /**
       * 移除IM
       */
      imRemove () {
        // 离开页面时, 关闭IM
        iMessage.remove();

        iMessage.on_error = () => {
          this.$router.push({
            path: '/user/login',
            query: Object.assign(this.$route.query, {
              redirectUrl: this.$route.path
            })
          });
        };
      },

      /**
       * im 心跳
       * 即, 间隔一定的时间之后会再次
       */
      imHeartbeat () {
        clearInterval(imHeartbeatTimer);
        imHeartbeatTimer = setInterval(() => {
          iMessage.conn.send('SDH/1.0 ping\r\n\r\nhello');
        }, 60000);

      },

      /**
       * 页面初始化
       */
      init () {
        const query = this.$route.query;

        // 获取链接中所带的订单ID
        this.orderId = Number(query.orderId);

        // 如果订单ID为空则退出IM, 返回上一页
        if (!this.orderId) {
          this.$Message.error('订单ID为空, 退出IM');
          this.$router.go(-1);
          return false;
        }

        // 获取进入聊天着的类型
        selfType = query.object;

        // 如果不是买家, 或者卖家则退出IM, 返回上一页
        if (selfType !== 'buyer' && selfType !== 'seller') {
          this.$Message.error('聊天对象获取错误, 退出IM');
          this.$router.go(-1);
          return false;
        }

        // 如果IM来自购买成功页, 返回链接修改为个人中心
        const from = this.$route.query.from;

        // 如果页面来自支付成功页面, 则返回键跳转回个人中心
        // 等待三秒之后才拉取历史记录, 避免拉取不到配置IM
        if (from === 'paymentSuccess') {
          this.previous = '/personal/';

          const loading = this.$Message.loading('正在连线客服，请稍等....');

          setTimeout(() => {

            // 获取聊天历史
            this.getIMHistory();

            loading.remove();
          }, 3000)

        } else {

          // 获取聊天历史
          this.getIMHistory();
        }

        // IM初始化
        this.imInit(this.orderId);
      }
    },
    created () {
      this.init();
    },
    beforeDestroy () {

      this.imRemove();
    }
  }
</script>
<style lang="scss">
  @import "service.scss";
</style>
