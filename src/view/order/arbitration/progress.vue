<!--
 - 仲裁进度
 -
 - author: Storm
 - date: 2017/06/22
 -->

<template>
  <s-app>

    <s-header>仲裁进度</s-header>

    <s-main :loading="loading !== false">

      <ul class="message arbitPro-message">

        <!-- disputeResult 1,成功; 2,失败, 3买家取消 -->

        <!-- 买家申请仲裁 -->
        <li class="message-item message-other">
          <div class="message-time" v-if="!progress.ctime">{{(progress.ctime * 1000) | date}}</div>
          <div class="message-content">
            <div class="message-body">
              <div class="message-text">
                <div><span class="c-9">买家操作：</span>申请仲裁</div>
                <div><span class="c-9">收货状态：</span>{{progress.isReceive === 1 ? '已收到货' : '未收到货'}}</div>
                <div><span class="c-9">仲裁原因：</span>{{progress.disputeReason}}</div>
                <div><span class="c-9">申请说明：</span>{{progress.disputeExtInfos[0].disputeExplain}}</div>
                <s-row class="mt-30" gutter=".1rem" wrap>
                  <s-col v-for="(item, index) in progress.disputeExtPicInfos" :key="item.disputeExtPicId">
                    <qiniu-img class="arbitPro-img"
                               :src="item.picUrl"
                               width="120"
                               @click="onGallery(index)"
                               height="120"></qiniu-img>
                  </s-col>
                </s-row>
              </div>
            </div>
          </div>
        </li>
        <!-- /买家申请仲裁 -->

        <!-- 仲裁交易成功 -->
        <li class="message-item message-self" v-if="progress.disputeResult === 1">
          <div class="message-time" v-if="!progress.utime">{{(progress.utime * 1000) | date}}</div>
          <div class="message-content">
            <div class="message-body">
              <div class="message-text">
                <div><span>仲裁客服：</span>仲裁交易成功</div>
                <div><span>申请说明：</span>{{progress.judgedReason}}</div>
              </div>
            </div>
          </div>
        </li>
        <!-- /仲裁交易成功 -->

        <!-- 仲裁交易失败 -->
        <li class="message-item message-self" v-if="progress.disputeResult === 2">
          <div class="message-time">{{(progress.utime * 1000) | date}}</div>
          <div class="message-content">
            <div class="message-body">
              <div class="message-text">
                <div><span>仲裁客服：</span>仲裁交易失败</div>
                <div><span>申请说明：</span>{{progress.judgedReason}}</div>
              </div>
            </div>
          </div>
        </li>
        <!-- /仲裁交易失败 -->

        <!-- 买家取消仲裁 -->
        <li class="message-item message-self" v-if="progress.disputeResult === 3">
          <div class="message-time">{{(progress.utime * 1000) | date}}</div>
          <div class="message-content">
            <div class="message-body">
              <div class="message-text">
                <div><span>仲裁客服：</span>买家取消仲裁</div>
                <div><span>申请说明：</span>{{progress.judgedReason}}</div>
              </div>
            </div>
          </div>
        </li>
        <!-- /买家取消仲裁 -->


      </ul>

      <s-suspension shadow class="arbitPro-footer" v-if="!progress.disputeResult">
        <s-button type="default" size="sm" v-if="!isSeller" @click="handleCancel">取消仲裁</s-button>
        <s-button type="default" size="sm" outline @click="addCredentials">添加新凭证</s-button>
      </s-suspension>

    </s-main>

  </s-app>
</template>

<script>
  export default {
    name: 'progress',
    props: {},
    data () {
      return {

        // 是否为卖家
        isSeller: null,

        // 订单ID
        orderId: null,

        // 取消仲裁中...
        canceling: null,

        // loading
        loading: null,

        // 仲裁进度
        progress: {
          ctime: null,
          disputeExtInfos: [
            {
              disputeExplain: ''
            }
          ],
          disputeExtPicInfos: []
        }
      }
    },
    methods: {

      /**
       * 点击进入画廊
       * @param index 图片下标
       */
      onGallery (index) {
        let picUrls = [];

        this.progress.disputeExtPicInfos.forEach(item => {
          if (item.picUrl) picUrls = picUrls.concat(item.picUrl);
        });

        this.$router.push({
          path: '/gallery',
          query: {
            picUrls: picUrls.join(),
            index
          }
        })
      },

      /**
       * 取消仲裁
       */
      handleCancel () {
        this.$Dialog
          .confirm('确定要取消仲裁')
          .then(() => {

            if (this.canceling) return false;
            this.canceling = true;

            this.$http
              .post('/h5/buyer/dispute/buyerCancelDispute', {
                orderId: this.orderId
              })
              .then(response => {
                if (response.body.code !== '000') return false;
                this.$Message.success('取消仲裁成功!');
                this.$router.go(-1);
              })
              .finally(() => {
                this.canceling = false;
              })
          })
      },

      /**
       * 获取仲裁进度消息
       */
      getProgress () {
        this.loading = true;
        this.$http
          .post('/h5/buyer/dispute/disputeProcess', {
            orderId: this.orderId
          })
          .then(response => {
            if (response.body.code !== '000') return false;
            if (response.body.data.orderDisputeInfo === null) {
              this.$Message.warning('拉取历史记录错误!');
              return false;
            }
            this.progress = response.body.data.orderDisputeInfo;
          })
          .finally(() => {
            this.loading = false;
          })
      },

      /**
       * 添加新凭证
       */
      addCredentials () {
        this.$Message.info('Comming soon...');
      },

      // 页面初始化
      init () {

        this.isSeller = this.$route.query.role === 'seller';
        this.orderId = parseInt(this.$route.query.orderId);
        if (Number.isNaN(this.orderId)) {
          this.$Message.error('订单ID错误!');
          return false;
        }

        // 获取进度列表
        this.getProgress();
      }

    },
    mounted () {
      this.init();
    }
  }
</script>

<style lang="scss">
  @import "../../../view/order/service.scss";
  .arbitPro-img {
    width: 1.2rem;
    height: 1.2rem;
  }
  .arbitPro-footer {
    text-align: right;
  }
</style>
