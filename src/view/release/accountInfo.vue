<!--
 - 填写寄售账号信息
 -
 - author: Storm
 - date: 2017/04/18
 -->

<template>

  <s-app>
    <s-header>填写寄售账号信息</s-header>

    <s-main :loading="loading !== false">

      <form novalidate>

        <s-cell-intro icon="warning"><span class="c-primary">谨防受骗：请勿向任何人泄露您的账号密码！</span></s-cell-intro>
        <s-form-make v-for="(item, index) in formAttrs"
                     v-model="modelAttrs[index]"
                     :key="item.attrId"
                     :options="item"></s-form-make>

        <s-cell-intro>【寄售交易】由交易虎发货客服代替您给买家发货（7x24小时服务），快速完成交易。</s-cell-intro>

        <s-sedimentation>
          <s-checkbox
            v-model="agreement"
            class="c-9 fz-22"
            size="sm">已阅读并同意
            <router-link to="/guide/purchaseService"
                         class="c-primary">&lt;交易虎手机网游服务平台服务协议&gt;</router-link>
          </s-checkbox>

          <s-button @click="release" :disabled="releasing" type="primary" block class="mt-30">提交</s-button>
        </s-sedimentation>

      </form>

    </s-main>
  </s-app>

</template>

<script>
  import FormMake from '@/components/formMake';
  import Sedimentation from '@/components/sedimentation';
  import validator from '@/core/validator';

  // 商品属性
  let goodsAttr = [];

  export default {
    name: 'accountInfo',
    components: {
      sFormMake: FormMake,
      sSedimentation: Sedimentation
    },
    props: {},
    data () {
      return {
        loading: null,
        agreement: true,

        // 发布中
        releasing: null,

        modelAttrs: [],
        releaseInfo: {},
        formAttrs: [],

        // 游戏名称
        gameName: null,

        // 用户手机
        mobile: null
      }
    },
    methods: {

      validator () {
        const attrs = this.modelAttrs;

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

      // 获取客户端下卖家的模版属性以及配置
      getSellerAttrTemp () {

        return new Promise((resolve, reject) => {
          this.$http
            .post('/h5/seller/publish/querySellerAttrTemp', {
              accountTypeId: this.releaseInfo.gameAccountTypeId,
              goodsClassId: this.releaseInfo.goodsClassId,
              subClassId: this.releaseInfo.subClassId
            })
            .then(response => {
              if (response.body.code !== '000') {
                reject();
                return false;
              }
              response.body.data.list.forEach(item => {
                item.attrType = 2;
              });
              resolve(response.body.data.list);
            }, reject)
            .catch(reject)
        });
      },

      /**
       * 获取卖家账号信息
       * @return {Promise<T>|Promise}
       */
      getAccount () {

        return new Promise((resolve, reject) => {
          this
            .$http
            .post('/h5/seller/publish/queryAttrByType', {
                attrType: 2,
                subClassId: this.releaseInfo.subClassId
              }
            ).then(response => {
            if (response.body.code !== '000') {
              reject();
              return false;
            }
            resolve(response.body.data.list);
          }, reject)
        })

      },

      /**
       * 数据同步
       * @param data 同步数据
       * @return {Array}
       */
      dataSync (data) {
        let result = [];
        data.forEach(item => {
          result.push({
            attrSeq: item.attrSeq,
            attrRule: item.attrRule,
            attrId: item.attrId,
            attrName: item.attrName,
            attrType: item.attrType
          });
        });

        return result;

      },

      // 同步model数据
      modelSync (data, mobile) {
        data.forEach(item => {
          const obj = {
            attrId: item.attrId,
            attrName: item.attrName,
            attrType: item.attrType,
            attrValue: null,
            ruleId: null,
          };
          // 当检测到为联系手机时, 自动赋值
          if (item.attrRule[0].attrValueType === 18) {
            obj.attrValue = mobile;
            obj.ruleId = item.attrRule[0].ruleId;
          }
          this.modelAttrs.push(obj);
        });
      },

      // 获取卖家表单数据
      getFormAttrs () {
        if (this.loading) return false;
        this.loading = true;
        Promise
          .all([this.getSellerAttrTemp(), this.getAccount(), this.getFormToken()])
          .then(([attrTemps, accounts, mobile]) => {
            accounts = this.dataSync(accounts);
            this.formAttrs = attrTemps.concat(accounts);
            this.modelSync(this.formAttrs, mobile);
          })
          .finally(() => this.loading = false);

      },

      // 获取表单token
      getFormToken () {
        /*this
          .$http
          .post('/h5/token/getFormSubmitToken')
          .then(response => {
            if (response.body.code !== '000') return false;
            this.releaseInfo.formToken = response.body.data.formToken;
            this.releaseInfo.formId = response.body.data.formId;
            this.mobile = response.body.data.mobile;
          });*/
        return new Promise((resolve, reject) => {
          this
            .$http
            .post('/h5/token/getFormSubmitToken')
            .then(response => {
              if (response.body.code !== '000') resolve();
              this.releaseInfo.formToken = response.body.data.formToken;
              this.releaseInfo.formId = response.body.data.formId;
              this.mobile = response.body.data.mobile;
              resolve(response.body.data.mobile);
            }, reject);
        });
      },

      /**
       * 发布商品
       */
      release () {

        if (!this.validator(this.modelAttrs)) return false;

        this.releaseInfo.attrs = goodsAttr.concat(this.modelAttrs);

        if (this.releasing) return false;
        this.releasing = true;

        this
          .$http
          .post('/h5/seller/publish/publishGoods', this.releaseInfo)
          .then(response => {

            if (response.body.code !== '000') return false;

            this.$Message.success('商品发布成功！');

            const query = Object.assign({
              gameId: this.releaseInfo.gameId,
              goodsClassId: this.releaseInfo.goodsClassId,
              subClassId: this.releaseInfo.subClassId,
              clientId: this.releaseInfo.clientId,
              domainId: this.releaseInfo.domainId,
              serverId: this.releaseInfo.serverId,
              hasAccount: this.$route.query.hasAccount
            }, this.$route.query, response.body.data);

            this.$router.replace({
              path: 'success',
              query
            });

            local.remove('releaseInfo');

          })
          .finally(() => this.releasing = false);
      }
    },
    created () {
      this.releaseInfo = local.get('releaseInfo');
      if (!this.releaseInfo) {
        this.$Message.warning('获取商品描述错误, 请重新填写商品描述!');
        return false;
      }
      goodsAttr = this.releaseInfo.attrs;
      this.releaseInfo.gameAccountTypeId = parseInt(this.$route.query.accountTypeId);
      this.getFormAttrs();
      this.getFormToken();
    }
  }
</script>
