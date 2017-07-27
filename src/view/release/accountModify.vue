<!--
 - 修改寄售账号信息
 -
 - author: Storm
 - date: 2017/04/24
 -->

<template>

  <s-app>
    <s-header>修改寄售账号信息</s-header>

    <s-main>

      <form novalidate>

        <s-cell-intro icon="warning"><span class="c-primary">谨防受骗：请勿向任何人泄露您的账号密码！</span></s-cell-intro>

        <s-form-make v-for="(item, index) in goodsModifyConfig.sellerTempAttrs"
                     v-model="releaseInfo.sellerTempAttrs[index]"
                     :key="item.attrId"
                     :options="item"></s-form-make>

        <s-form-make v-for="(item, index) in goodsModifyConfig.sellerAttrs"
                     v-model="releaseInfo.sellerAttrs[index]"
                     :key="item.attrId"
                     :options="item"></s-form-make>

        <s-cell-intro>【寄售交易】由交易虎发货客服代替您给买家发货（7x24小时服务），快速完成交易。</s-cell-intro>

        <s-sedimentation>
          <s-checkbox
            style="margin-left: .22rem;"
            v-model="agreement"
            class="c-9 fz-22"
            size="sm">已阅读并同意
            <router-link to="/guide/purchaseService"
                         class="c-primary">&lt;交易虎手机网游服务平台服务协议&gt;</router-link>
          </s-checkbox>

          <s-button @click="release" type="primary" block class="mt-30">提交</s-button>
        </s-sedimentation>

      </form>

    </s-main>
  </s-app>

</template>

<script>
  import FormMake from '@/components/formMake';
  import Sedimentation from '@/components/sedimentation';

  export default {
    name: 'accountInfo',
    components: {
      sFormMake: FormMake,
      sSedimentation: Sedimentation
    },
    props: {},
    data () {
      return {
        releaseInfo: {},

        // 获取表单token
        getFormTokening: null,

        // 发布中
        releasing: null,

        goodsModifyConfig: {},

        // 平台服务协议
        agreement: true,
      }
    },
    methods: {

      // 数据校验
      validator () {
        const attrs = this.releaseInfo.sellerTempAttrs.concat(this.releaseInfo.sellerAttrs);

        for (let key in attrs) {
          if (attrs[key].$msg) {
            this.$Message.warning(attrs[key].$msg);
            return false;
          }
        }

        if (!this.agreement) {
          this.$Message.warning('请阅读并同意平台服务协议！');
          return false;
        }

        return true;
      },

      // 获取表单token
      getFormToken () {

        if (this.getFormTokening) return true;
        this.getFormTokening = true;

          this
            .$http
            .post('/h5/token/getFormSubmitToken')
            .then(response => {
              if (response.data.code !== '000') return false;
              this.releaseInfo.formToken = response.data.data.formToken;
              this.releaseInfo.formId = response.data.data.formId;
            })
            .finally(() => this.getFormTokening = false);
      },

      /**
       * 修改商品
       */
      release () {

        if (!this.validator()) return false;

        // 删除多余的图片数据
        delete this.releaseInfo.pics;

        if (this.releasing) return false;
        this.releasing = true;

        this
          .$http
          .post('/h5/seller/publish/updateGoodsInfo', this.releaseInfo)
          .then(response => {
            if (response.data.code !== '000') return false;
            this.$Message.success('商品修改成功！');
            this.$router.replace({
              path: 'goodsClass',
              query: {
                status: 3,
                from: 'modify'
              }
            })
          })
          .finally(() => this.releasing = false);
      }
    },
    created () {
      this.releaseInfo = local.get('goodsModifyValue');
      this.goodsModifyConfig = local.get('goodsModifyConfig');
      if (!this.releaseInfo || !this.goodsModifyConfig) {
        this.$Message.warning('获取商品描述错误, 请重新填写商品描述!');
        return false;
      }
      this.getFormToken();
    }
  }
</script>
