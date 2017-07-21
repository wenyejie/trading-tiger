<!--
 - 查看历史记录
 -
 - author: Storm
 - date: 2017/05/05
 -->

<template>
  <s-app>

    <s-header>查看历史记录</s-header>

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
                              :disabled="true"
                              v-if="subitem.attrName === 'button' && subitem.attrValue !== null"
                              @click="messageSystemHandel(subitem)">{{subitem.attrValue}}
                    </s-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>

        <li class="message-item message-other" v-if="!messages.length && loading === false">
          <div class="message-content">
            <div class="message-body">
              <div class="message-text">暂无历史记录</div>
            </div>
          </div>
        </li>

      </ul>

    </s-main>

  </s-app>
</template>

<script>
  import './service.scss';

  // 角色的类型
  let selfType = '';

  // 滚动计时器
  let msgBottomTimer = 0;

  export default {
    name: 'service',
    props: {},
    data () {
      return {

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

        // 订单ID
        orderId: null
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
            if (response.body.code !== '000') return false;
            debugger;
            const historyList = response.body.data.list;
            historyList.reverse();
            let result = [];
            historyList.forEach(item => {
              item.ctime = Number(item.ctime);
              result.push(Object.assign({}, this.convertMessage(item, result), {history: true}));
            });
            if (historyList.length < pageSize) this.completed = true;
            this.messages = result.concat(this.messages);
            this.pageSize = response.body.data.pageSize;
            this.currentPage = response.body.data.currentPage;

            // 只有为第一页时才滚动到底部
            if (currentPage === 0) this.messageBottom();
          })
          .finally(() => this.loading = false);
      },
    },
    mounted () {
      const query = this.$route.query;

      // 获取进入聊天着的类型
      selfType = query.object;

      // 获取链接中所带的订单ID
      this.orderId = Number(query.orderId);

      // 如果订单ID为空则退出IM, 返回上一页
      if (!this.orderId) {
        this.$Message.error('订单ID为空, 退出IM');
        this.$router.go(-1);
        return false;
      }

      // 获取聊天历史
      this.getIMHistory();
    }
  }
</script>
