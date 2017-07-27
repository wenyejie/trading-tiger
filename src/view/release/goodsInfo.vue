<!--
 - 填写商品描述
 -
 - author: Storm
 - date: 2017/04/18
 -->

<template>

  <s-app>
    <s-header>填写商品描述</s-header>

    <s-main :loading="loading !== false">

      <form name="goodsInfo" novalidate>
        <s-cell-intro icon="warning">请认真填写您出售的商品信息，让买家快速了解并下单，可大大提高成功交易机会。</s-cell-intro>
        <s-cell>
          <span class="c-primary">*&nbsp;</span>
          <span>上传图片</span>
          <s-radio-group v-model="releaseInfo.showType" slot="right">
            <s-radio :label="2" required name="showType">有图</s-radio>
            <s-radio :label="1" required name="showType">无图</s-radio>
          </s-radio-group>
        </s-cell>

        <s-upload v-model="releaseInfo.picUrls"
                  multiple
                  isMin
                  v-show="releaseInfo.showType === 2"></s-upload>

        <s-cell-intro>单张图片不能超过10MB，最多可以上传10张图片</s-cell-intro>

        <!-- 当用户需要输入标题时展示商品标题输入框 -->
        <s-form-control label="商品标题"
                        v-if="titleAttr.goodsSubClassTitleRule !== 1"
                        required>
          <input type="text"
                 name="title"
                 required
                 title=""
                 maxlength="30"
                 v-model.trim="releaseInfo.title"
                 :maxlength="titleAttr.goodsSubClassMaxTitleLen"
                 placeholder="请输入商品标题">

        </s-form-control>

        <s-form-make v-for="(item, index) in formAttrs"
                     v-model="releaseInfo.attrs[index]"
                     @on-change="customFormChange($event)"
                     :key="item.attrId"
                     v-if="item.attrRule.length >= 1 && (item.attrRule[0].showType === releaseInfo.showType || item.attrRule[0].showType === 3)"
                     :options="item"></s-form-make>


        <!-- 库存，价格 -->
        <s-form-control label="商品库存"
                        required
                        v-if="releaseInfo.goodsClassId !==1">
          <input type="number"
                 :max="titleAttr.store"
                 min="1"
                 v-model.number="releaseInfo.storage" placeholder="请输入商品库存">
        </s-form-control>

        <s-form-control label="商品价格" required>
          <input type="number"
                 :max="titleAttr.maxPrice"
                 :min="titleAttr.minPrice"
                 v-model.number="releaseInfo.price"
                 :placeholder="`商品价格不能小于${titleAttr.minPrice}`">
        </s-form-control>

        <s-form-control label="价格比例" v-if="releaseInfo.goodsClassId === 3">
          <template>1元={{priceRatio}}{{goodsSubClassName}}</template>
        </s-form-control>


      </form>

      <s-sedimentation>
        <s-button type="primary" :disabled="getAccountTypeLoading" @click="nextStep" block>下一步</s-button>
      </s-sedimentation>

    </s-main>
  </s-app>


</template>

<script>
  import FormMake from '@/components/formMake';
  import FormControl from '@/components/formControl';
  import Sedimentation from '@/components/sedimentation';
  import Upload from '@/components/upload';
  import validator from '@/core/validator';
//  import quantity from '@/components/quantity';

  // 游戏币属性ID
  let gameCurrencyAttrId;
  export default {
    name: 'goodsInfo',
    components: {
      sFormMake: FormMake,
      sSedimentation: Sedimentation,
      sFormControl: FormControl,
      sUpload: Upload,
//      sQuantity: quantity
    },
    props: {},
    data () {
      return {

        loading: null,

        getAccountTypeLoading: null,

        formAttrs: [],

        goodsSubClassName: null,

        // 价格比例
        priceRatio: '?',

        releaseInfo: {
          clientId: null,
          domainId: null,
          serverId: null,
          goodsClassId: null,
          subClassId: null,
          attrs: [],
          title: '',
          storage: null,
          price: null,
          showType: 1,
          picUrls: []
        },

        // 标题属性
        titleAttr: {
          minPrice: 0
        },

        // 游戏名称
        gameName: null,
      }
    },

    watch: {
      'releaseInfo.price' () {
        // 如果没有检测到subClassID 则退出watch方法
        if (!gameCurrencyAttrId) return false;
        const attr = this.releaseInfo.attrs.find(item => item.attrId === gameCurrencyAttrId);
        this.customFormChange(attr);
      }
    },
    methods: {

      // 自定义表单更改
      customFormChange (attr) {
        if (!attr) return false;
        if (attr.attrId === gameCurrencyAttrId && this.releaseInfo.price) {
          let price = (attr.attrValue / this.releaseInfo.price);
          if (price >= 100000000) {
            price = (price / 100000000).toFixed(2) + '亿';
          } else if (price >= 10000) {
            price = (price / 10000).toFixed(2) + '万';
          } else {
            price = price.toFixed(2);
          }
          this.priceRatio = price;
        }
      },

      // 验证数据
      validator (attrs) {

        if (this.releaseInfo.showType === 2 && this.releaseInfo.picUrls.length <= 0) {
          this.$Message.warning('上传图片不能为空！');
          return false;
        }

        let opts = [];

        if (this.titleAttr.goodsSubClassTitleRule !== 1) {
          opts.push({
            title: '商品标题',
            type: 'text',
            value: this.releaseInfo.title,
            required: true
          });
        }

        opts.push({
          title: '商品价格',
          type: 'number',
          min: this.titleAttr.minPrice,
          max: this.titleAttr.maxPrice,
          value: this.releaseInfo.price,
          required: true
        });

        if (this.releaseInfo.goodsClassId !==1) {
          opts.push({
            title: '商品库存',
            type: 'number',
            min: 1,
            max: this.titleAttr.store,
            value: this.releaseInfo.storage,
            required: true
          });
        }

        for (let value of opts) {
          let $msg = validator(value);
          if ($msg) {
            this.$Message.warning($msg);
            return false;
          }
        }


        for (let key in attrs) {
          if (attrs[key].$msg) {
            this.$Message.warning(attrs[key].$msg);
            return false;
          }
        }

        return true;
      },


      // 下一步
      nextStep () {
        this.formAttrs.forEach((item, index) => {
          if (!item.attrRule.length) {
            this.$Message.warning('后台模版配置错误!');
            this.releaseInfo.attrs.splice(index, 1);
            return false;
          }
          if (item.attrRule[0].showType !== this.releaseInfo.showType && item.attrRule[0].showType !== 3) {
            this.releaseInfo.attrs.splice(index, 1);
          }
        });
        if (!this.validator(this.releaseInfo.attrs)) return false;

        // 当检测到为无图时，则置空picUrls
        if (this.releaseInfo.showType !== 2) this.releaseInfo.picUrls = [];
        local.set('releaseInfo', this.releaseInfo);

        this.getAccountType();
      },

      // 获取账号类型
      getAccountType () {

        if (this.getAccountTypeLoading) return false;
        this.getAccountTypeLoading = true;

        this
          .$http
          .post('/h5/seller/publish/queryAccountTypeInfo', {
            clientId: this.releaseInfo.clientId
          }, {loading: true})
          .then(response => {
            if (response.data.code !== '000') return false;
            this.accountTypes = response.data.data.list;

            if (this.accountTypes.length === 0) {
              this.$Dialog.alert('账号类型数据错误，请联系客服！');
              return false;
            }

            // 当账号类型大于等于2的时候，跳转至账号类型选择页面，
            // 否则直接跳转至账号信息填写页面
            if (this.accountTypes.length > 1) {
              local.set('releaseAccountTypes', this.accountTypes);
              this.$router.push({
                path: 'selectAccount',
                query: {
                  gameName: this.gameName
                }
              });
              return false;
            }
            this.$router.push({
              path: 'accountInfo',
              query: {
                accountTypeId: this.accountTypes[0].gameAccountTypeId,
                gameName: this.gameName
              }
            });
          })
          .finally(() => {
            this.getAccountTypeLoading = false;
          });

      },

      // 获取链接中所带参数
      getQuery () {
        const query = this.$route.query;
        this.releaseInfo.gameId = parseInt(query.gameId);
        this.releaseInfo.goodsClassId = parseInt(query.goodsClassId);
        this.releaseInfo.subClassId = parseInt(query.goodsSubClassId);
        this.releaseInfo.clientId = parseInt(query.clientId);
        this.releaseInfo.domainId = parseInt(query.domainId) || undefined;
        this.releaseInfo.serverId = parseInt(query.serverId);
        this.goodsSubClassName = query.goodsSubClassName;
        this.gameName = query.gameName;
      },

      /**
       * 获取商品信息
       * @returns {boolean}
       */
      getAttrs () {

        if (this.loading) return false;
        this.loading = true;

        this
          .$http
          .post('/h5/seller/publish/queryAttrByType', {
              attrType: 1,
              subClassId: this.releaseInfo.subClassId
            }
          )
          .then(response => {
            if (response.data.code !== '000') return false;
            this.dataSync(response.data.data.list);
          })
          .finally(() => {
            this.loading = false;
          })
        ;

      },

      // 数据同步
      dataSync (list) {
        list.forEach(item => {
          if (this.releaseInfo.goodsClassId === 3 && item.attrRule[0].attrValueType === 15) {
            gameCurrencyAttrId = item.attrId;
          }
          this.releaseInfo.attrs.push({
            attrId: item.attrId,
            attrName: item.attrName,
            attrType: item.attrType,
            attrValue: null,
            ruleId: null,
          });
          this.formAttrs.push({
            attrSeq: item.attrSeq,
            attrRule: item.attrRule,
            attrId: item.attrId,
            attrName: item.attrName,
            attrType: item.attrType
          });
        })

      }

    },

    created () {

      // 获取到在选择商品类型中保存的标题属性信息
      this.titleAttr = local.get('releaseTitleAttr') || {};
      this.getQuery();
      this.getAttrs();
    }

  }
</script>
