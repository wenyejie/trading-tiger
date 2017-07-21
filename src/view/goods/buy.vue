<!--
 - buy 下单购买
 -
 - author: Storm
 - date: 2017/04/27
 -->

<template>
  <s-app>
    <s-header>下单购买</s-header>
    <s-main :loading="loading !== false">

      <s-panel class="s-panel-article buy-tips" title="风险提示" icon="warning" v-if="goods.subClassTips">
        <div v-html="goods.subClassTips"></div>

        <p class="mt-20">若您继续支付购买，则视为您愿意接受可能出现的风险，出现以上问题时，交易虎不承担任何法律责任。</p>

        <s-checkbox style="margin-top: .27rem" v-model="subClassTips">接受风险，继续购买</s-checkbox>
      </s-panel>

      <s-panel class="mt-20 buy-panel" title="填写收货信息" padding="0" bottom="0">

        <s-form-make v-for="(item, index) in buyerTemp"
                     v-model="form.buyerAttrs[index]"
                     :key="item.attrId"
                     v-if="item.attrRule.length >= 1"
                     :hasIntro="false"
                     :options="item"></s-form-make>

        <s-cell class="buy-code" v-if="!hasToken">
          <span class="buy-code-button" href="javascript:;" v-if="!isCountdown" @click="showSlideCode">获取验证码</span>
          <span class="c-primary countdown" v-if="isCountdown" href="javascript:;">重发
              <s-countdown template="ss" v-model="countdown" @on-done="countdownDone"></s-countdown>
          </span>
          <template slot="right">
            <input type="text" v-model="form.vcode" placeholder="输入手机验证码">
          </template>
        </s-cell>

      </s-panel>

      <s-panel class="mt-20 c-6 buy-panel" title="支付清单" padding="0" bottom="0">

        <s-cell>商品价格
          <template slot="right">¥ {{goods.price}}</template>
        </s-cell>

        <s-cell>购买数量
          <template slot="right">
            <s-spinner min="1" v-model.number="form.num" :max="goods.storage"></s-spinner>
          </template>
        </s-cell>

        <!--<s-cell>优惠折扣
          <template slot="right">无</template>
        </s-cell>-->

        <s-cell>实际支付<span style="color: #fd802c" slot="right">¥ {{(goods.price * form.num).toFixed(2)}}</span></s-cell>

      </s-panel>

      <s-panel class="mt-20 buy-panel payment-panel" title="选择支付方式">

        <s-radio-group v-model="form.paySel">

          <s-radio between
                   block
                   shadow
                   class="buy-payment"
                   v-for="item in pays"
                   :key="item.id"
                   :label="item.id"
                   name="payment">
            <img class="text-middle payment-icon"
                 :src="form.paySel === item.id ? item.icon : item.offIcon"><span
            class="text-middle payment-name">{{item.name}}</span>
          </s-radio>

        </s-radio-group>

      </s-panel>

      <footer class="payment-footer content">
        <s-button type="primary" block @click="nextStep" :disabled="buying">下一步</s-button>
      </footer>

      <s-slidecode :showSlide="showSlide" v-model="slideData" @sendCode="sendCode"></s-slidecode>

    </s-main>
  </s-app>
</template>

<script>
  import paymentMethod from '../../filters/paymentMethod';
  export default {
    name: 'buy',
    data () {
      return {

        // 商品信息
        goods: {
          price: 0
        },

        // 免责声明
        subClassTips: null,

        // 是否显示滑动验证码
        showSlide: null,

        // 滑动验证码数据
        slideData: {},

        // 是否显示倒计时
        isCountdown: null,

        // 发送验证码中
        sending: null,

        // 倒计时描述
        countdown: 59,

        // 检测用户是否拥有token
        hasToken: null,

        // 买家模版信息
        buyerTemp: [],

        // 正在下单购买
        buying: null,

        // 加载数据
        loading: null,

        // 正在支付中
        paying: false,

        // 买家联系手机下标
        mobileAttrsIndex: null,

        pays: paymentMethod(true),

        // 购买提交数据
        form: {
          buyerAttrs: [],
          formToken: null,
          formId: null,
          goodsId: null,
          num: 1,

          // 支付方式
          paySel: CONFIG.DEFAULT_PAYMENT_METHOD,

          // 验证码
          vcode: null
        },

        // 用户手机
        mobile: null
      }
    },
    methods: {

      // 获取表单token
      getFormToken () {
        this
          .$http
          .post('/h5/token/getFormSubmitToken')
          .then(response => {
            if (response.body.code !== '000') return false;
            this.form.formToken = response.body.data.formToken;
            this.form.formId = response.body.data.formId;

          });
      },

      countdownDone() {
        this.isCountdown = false;
      },

      /**
       * 验证用户输入手机号码是否正确
       */
      validMobile () {

        // 从属性列表中获取到用户联系手机
        const mobile = this.form.buyerAttrs[this.mobileAttrsIndex].attrValue + '';

        if (!mobile) {
          this.$Message.warning('联系手机不能为空!');
          return false;
        }

        if (!/^1\d{10}$/.test(mobile)) {
          this.$Message.warning('联系手机格式错误!');
          return false;
        }
        return mobile;
      },

      // 显示滑动验证码
      showSlideCode () {
        if (!this.validMobile()) return false;
        this.showSlide = true;
      },

      // 发送验证码
      sendCode () {
        this.showSlide = false;

        if (this.sending) return false;
        this.sending = true;

        this.isCountdown = true;

        const mobile = this.validMobile();

        if (!mobile) return false;

        const param = Object.assign({
          code: 1,
          mobile
        }, this.slideData);

        this
          .$http
          .post('/h5/user/sendSmscode', param)
          .then(response => {
            if (response.body.code !== '000') return false;
            this.$Message.success('验证码发送成功！');
          })
          .finally(() => this.sending = false);
      },

      // 验证数据
      validator () {

        if (this.goods.subClassTips && !this.subClassTips) {
          this.$Message.warning('请同意风险提示!');
          return false;
        }

        let index = 0;
        for (; index < this.form.buyerAttrs.length; index++) {
          if (this.form.buyerAttrs[index].$msg) {
            this.$Message.warning(this.form.buyerAttrs[index].$msg);
            return false;
          }

        }

        // 如果未登录, 则检测有没有验证码, 主要用于未登录购买!
        if (!this.form.vcode && !this.hasToken) {
          this.$Message.warning('手机验证码不能为空!');
          return false;
        }

        return true;
      },

      // 下一步
      nextStep () {

        // 校验数据
        if (!this.validator()) return false;
        if (this.buying) return false;
        this.buying = true;
        this
          .$http
          .post('/h5/buyer/buy', this.form)
          .then(response => {
            if (response.body.code !== '000') return false;

            const redirectUrl = response.body.data.redirectUrl;

            // 重定向地址
            if (redirectUrl) location.href = redirectUrl;
            else this.$Message.error('支付错误, 请重试!');

          })
          .finally(() => {
            this.hasToken = this.$cookie.has('token');
            this.buying = false;
          });
      },

      /**
       * 验证用户token是否有效
       */
      verifyUserToken () {
        return new Promise((resolve, reject) => {
          this
            .$http
            .post('/h5/token/verifyUserToken')
            .then(response => {
              if (response.body.code !== '000') {
                reject();
                return false;
              }
              this.mobile = response.body.data.mobile;
              if (!this.mobile) this.hasToken = false;
              resolve(response.body.data.mobile);
            }, reject);
        });
      },

      // 下一步
      init () {
        const query = this.$route.query;

        this.hasToken = this.$cookie.has('token');

        this.form.goodsId = parseInt(query.goodsId);

        // this.getGoodsInfo();

        this.form.buyerAttrs = [];

        this.buyerTemp = [];

        this.getFormToken();

        // 获取初始化信息
        this.getInitData();

        // 验证用户token是否有效
        // this.verifyUserToken();
      },

      // 数据同步
      dataSync (list, mobile) {
        list.forEach((item, index) => {

          const obj = {
            attrId: item.attrId,
            attrName: item.attrName,
            attrType: item.attrType,
            attrValue: null,
            ruleId: null,
          };

          // 当属性attrValueType === 18时, 该属性为联系手机, 记录当前数组下标
          if (item.attrRule[0].attrValueType === 18) {
            this.mobileAttrsIndex = index;
            obj.attrValue = mobile;
            obj.ruleId = item.attrRule[0].ruleId;
          }

          this.form.buyerAttrs.push(obj);

          this.buyerTemp.push({
            attrSeq: item.attrSeq,
            attrRule: item.attrRule,
            attrId: item.attrId,
            attrName: item.attrName,
            attrType: item.attrType
          });
        });

      },

      /**
       * 获取买家属性模版
       */
      getBuyerTemp (subClassId) {

        return new Promise((resolve, reject) => {
          this
            .$http
            .post('/h5/seller/publish/queryAttrByType', {
              attrType: 3,
              subClassId
            })
            .then(response => {
              if (response.body.code !== '000') {
                reject();
                return false;
              }
              // this.dataSync(response.body.data.list);
              resolve(response.body.data.list);
            }, reject)

        });
      },

      /**
       * 获取初始化数据
       */
      getInitData () {
        this.loading = true;
        Promise
          .all([this.getGoodsInfo(), this.verifyUserToken()])
          .then(([buyerTemps, mobile]) => {
            this.dataSync(buyerTemps, mobile);
          })
          .finally(() => this.loading = false)
      },

      /**
       * 根据商品ID获取商品信息
       */
      getGoodsInfo () {

        return new Promise((resolve, reject) => {
          this
            .$http
            .post('/h5/buyer/queryGoodsOrder', {goodsId: this.form.goodsId})
            .then(response => {
              if (response.body.code !== '000') {
                reject();
                return false;
              }
              this.goods = response.body.data;
              this
                .getBuyerTemp(this.goods.subClassId)
                .then(resolve, reject);
            }, reject);
        })
      }
    },
    activated () {
      this.init();
    },
    created () {
      this.init();
    }
  }
</script>

<style lang="scss">
  .buy-tips {

    position: relative;
    padding-bottom: .54rem;

    &:after {
      position: absolute;
      width: 100%;
      bottom: .08rem;
      left: 0;
      content: '';
      height: .06rem;
      display: block;
      background: url(../../assets/buy-tips-bottom.png);
      background-size: 100%;

    }
  }
  .buy-panel {

    .s-panel-header {
      padding-bottom: .31rem;
      border-bottom: 1px solid #e5e5e5;
    }
  }
  .payment-panel {
    padding-bottom: .4rem;
  }
  .buy-payment {
    line-height: 0;
    margin-top: .3rem;

    & + & {
      margin-top: .38rem;
    }

    .s-radio-text {
      margin-left: 0;
    }

    .s-radio-input:checked + .s-radio-text .payment-name {
      color: #666;
    }

  }
  .payment-icon {
    margin-right: .12rem;
    width: .44rem;
    height: .42rem;
  }
  .payment-name {
    line-height: 1;
    color: #ccc;
  }
  .payment-footer {
    padding-top: .4rem;
    padding-bottom: .24rem;
  }
  .buy-code {
    input {
      text-align: right;
      border: none;
      width: 100%;
    }

    &-button {
      color: #5e97f6;
      cursor: pointer;
    }

  }

</style>
