<!--
 - 申请仲裁
 -
 - author: Storm
 - date: 2017/06/20
 -->

<template>
  <s-app>

    <s-header>申请仲裁</s-header>

    <s-main>

      <form novalidate ref="apply">

        <s-cell>
          <span>是否收到货</span>
          <s-radio-group v-model="apply.isReceive" slot="right">
            <s-radio required name="isReceive" :label="1">是</s-radio>
            <s-radio required name="isReceive" :label="2">否</s-radio>
          </s-radio-group>
        </s-cell>

        <s-form-select label="申请原因"
                       placeholder="请选择"
                       name="name"
                       padding-left="md"
                       val="name"
                       v-model="apply.reason"
                       :options="reasons"></s-form-select>

        <s-cell>上传凭证</s-cell>
        <s-upload v-model="apply.picUrls"
                  size="auto"
                  max
                  multiple></s-upload>

        <s-cell style="border-top: 1px solid #e5e5e5">申请说明</s-cell>
        <textarea v-model.trim="apply.explain"
                  class="textarea"
                  name="explain"
                  maxlength="200"
                  placeholder="请输入说明内容"></textarea>

        <s-cell-intro class="c-error">提示：仲裁原因卖家可查看，请勿提交账号或密码。</s-cell-intro>

        <footer class="content mt-30">

          <s-button type="primary" block :disabled="applying" @click="handleApply">提交</s-button>

        </footer>

      </form>

      <s-nothing status="data" v-if="isError" explain="订单ID错误"></s-nothing>

    </s-main>

  </s-app>
</template>

<script>
  import validator from '../../../core/validator';

  export default {
    name: 'apply',
    data () {
      return {

        // 申请中...
        applying: null,

        // 是否错误
        isError: null,

        // 仲裁申请表单
        apply: {

          // 订单ID
          orderId: null,

          // 图片
          picUrls: [],

          // 是否收到货 1-是，2-否
          isReceive: null,

          // 原因
          reason: null,

          // 申请说明
          explain: ''

        },

        // 申请原因数据
        reasons: [
          {
            id: 1,
            name: '未收到账号密码'
          },
          {
            id: 2,
            name: '账号密码错误'
          },
          {
            id: 3,
            name: '未完全换绑'
          },
          {
            id: 4,
            name: '客服提供信息不完整'
          },
          {
            id: 5,
            name: '账号被找回'
          },
          {
            id: 6,
            name: '账号被封禁'
          },
          {
            id: 7,
            name: '其他'
          }
        ]
      }
    },
    computed: {
      validator () {
        return {
          isReceive: !!this.apply.isReceive,
          reason: !!this.apply.reason,
          explain: !!this.apply.explain
        }
      }
    },
    methods: {

      /**
       * 申请仲裁
       * @return {boolean}
       */
      handleApply () {

        if (!this.validator.isReceive) {
          this.$Message.warning('请选择是否收到货');
          return false;
        }

        if (!this.validator.reason) {
          this.$Message.warning('请选择申请原因');
          return false;
        }

        if (!this.validator.explain) {
          this.$Message.warning('请填写申请说明');
          return false;
        }

        if (this.applying) return false;
        this.applying = true;

        this.$http
          .post('/h5/buyer/dispute/buyerDisputeOrder', this.apply, {loading: true})
          .then(response => {
            if (response.body.code !== '000') return false;

            // 存储在本地, 避免重复提交
            sessionStorage.setItem('lastArbitrationApplyOrderId', this.apply.orderId);
            this.$Message.success('申请仲裁成功!');
            this.$router.go(-1);
          })
          .finally(() => this.applying = false)
      },

      /**
       * 页面初始化
       */
      init () {
        this.apply.orderId = parseInt(this.$route.query.orderId);

        if (!this.apply.orderId) this.isError = true;
      }
    },
    watch: {
      '$route': 'init'
    },
    mounted () {
      this.init();
    }
  }
</script>

<style lang="scss">


</style>
