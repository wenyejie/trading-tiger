<!--
 - 修改商品信息
 -
 - author: Storm
 - date: 2017/04/18
 -->

<template>

  <s-app>
    <s-header>修改商品信息</s-header>

    <s-main>

      <form name="goodsInfo" novalidate>
        <s-cell-intro icon="warning">请认真填写您出售的商品信息，让买家快速了解并下单，可大大提高成功交易机会。</s-cell-intro>
        <s-cell>
          <span class="c-primary">*&nbsp;</span>
          <span>上传图片</span>
          <s-radio-group v-model="goods.showType" slot="right">
            <s-radio :label="2" name="showType">有图</s-radio>
            <s-radio :label="1" name="showType">无图</s-radio>
          </s-radio-group>
        </s-cell>

        <s-upload v-model="goods.pics"
                  isMin
                  multiple
                  v-show="goods.showType === 2"></s-upload>

        <s-cell-intro>单张图片不能超过10MB，最多可以上传10张图片</s-cell-intro>

        <!-- 当用户需要输入标题时展示商品标题输入框 -->
        <s-form-control label="商品标题" v-if="goodsModifyConfig.subClass.titleRule !== 1">
          <input type="text"
                 maxlength="30"
                 v-model="goods.title"
                 :maxlength="goodsModifyConfig.subClass.maxTitleLen"
                 placeholder="请输入商品标题">

        </s-form-control>

        <s-form-make v-for="(item, index) in goodsModifyConfig.goodsAttrs"
                     prefix="goods"
                     v-model="goods.goodsAttrs[index]"
                     @on-change="customFormChange($event)"
                     :key="item.attrId"
                     v-if="item.attrRule[0].showType === goods.showType || item.attrRule[0].showType === 3"
                     :options="item"></s-form-make>

        <!-- 库存，价格 -->
        <s-form-control label="商品库存" required v-if="goods.classId !==1">
          <input type="number"
                 :max="titleAttr.store"
                 min="1"
                 v-model.number="goods.storage" placeholder="请输入商品库存">
        </s-form-control>

        <s-form-control label="商品价格" required>
          <input type="number"
                 :max="titleAttr.maxPrice"
                 :min="titleAttr.minPrice"
                 v-model.number="goods.price"
                 placeholder="请输入商品价格">
        </s-form-control>

        <s-form-control label="价格比例" v-if="goodsModifyConfig.subClass.goodsClassId === 3">
          <template>1元={{priceRatio}}{{goodsModifyConfig.subClass.subClassName}}</template>
        </s-form-control>


      </form>

      <s-sedimentation>
        <s-button type="primary" @click="nextStep" block>下一步</s-button>
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

  // 如果属性为游戏币, 并且商品分类为游戏币, 则记住它的属性ID, 用于计算价格比例
  let gameCurrencyAttrId;

  export default {
    name: 'goodsInfo',
    components: {
      sFormMake: FormMake,
      sSedimentation: Sedimentation,
      sFormControl: FormControl,
      sUpload: Upload
    },
    props: {},
    data () {
      return {

        // 标题属性
        titleAttr: {},

        // 价格比例
        priceRatio: '?',

        // 商品类型名称
        goodsSubClassName: null,

        goods: {
          goodsId: 0,
          title: '',
          storage: 0,
          price: 0,
          showType: 1,
          pics: [],
          goodsAttrs: [],
          sellerAttrs: [],
          sellerTempAttrs: [],
          subClass: {}
        },

        goodsModifyConfig: {
          subClass: {}
        },

        // 加载模版信息loading
        getTemplateLoading: null
      }
    },
    methods: {

      /**
       * 自定义表单更改
       * @param attr 属性实例
       */
      customFormChange (attr) {
        if (!attr) return false;
        if (attr.attrId === gameCurrencyAttrId && this.goods.price) {
          let price = (attr.attrValue / this.goods.price);
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

      /**
       * 初始化页面
       */
      init () {
        this.getQuery();
        this.getTemplate();
      },

      /**
       * 数据验证
       * @param attrs 属性集合实例
       */
      validator (attrs) {

        if (this.goods.showType === 2 && this.goods.picUrls.length <= 0) {
          this.$Message.warning('上传图片不能为空！');
          return false;
        }

        let opts = [];

        if (this.goodsModifyConfig.subClass.titleRule !== 1) {
          opts.push({
            title: '商品标题',
            type: 'text',
            value: this.goods.title,
            required: true
          });
        }

        opts.push({
          title: '商品价格',
          type: 'number',
          min: this.titleAttr.minPrice,
          max: this.titleAttr.maxPrice,
          value: this.goods.price,
          required: true
        });

        if (this.goods.classId !==1) {
          opts.push({
            title: '商品库存',
            type: 'number',
            min: 1,
            max: this.titleAttr.store,
            value: this.goods.storage,
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
        const attrs = this.goods.goodsAttrs;
        this.goodsModifyConfig.goodsAttrs.forEach((item, index) => {
          if (item.attrRule[0].showType !== this.goods.showType && item.attrRule[0].showType !== 3) {
            attrs.splice(index, 1);
          }
        });
        this.goods.goodsAttrs = attrs;

        // 当检测到为无图时，则置空picUrls
        if (this.goods.showType !== 2) this.goods.pics = [];
        this.goods.picUrls = this.goods.pics || [];

        if (!this.validator(this.goods.goodsAttrs)) return false;

        local.set('goodsModifyValue', this.goods);

        this.$router.push({path: 'accountModify'});
      },

      /**
       * 数据同步
       */
      dataSync (obj) {
        for (let key in obj) {
          if (!obj.hasOwnProperty(key)) continue;
          /*if (key === 'pics') {
            this.goods[key] = obj[key].join();
            continue;
          }*/
          if (key !== 'sellerAttrs' && key !== 'goodsAttrs' && key !== 'sellerTempAttrs') {
            this.goods[key] = obj[key];
            continue;
          }

          obj[key].forEach((value, index) => {

            // 如果属性为游戏币, 并且商品分类为游戏币, 则记住它的属性ID, 用于计算价格比例
            if (this.goodsModifyConfig.subClass.goodsClassId === 3 && value.attrRule[0].attrValueType === 15) {
              gameCurrencyAttrId = value.attrId;
            }

            this.goods[key][index] = {
              attrId: value.attrId,
              attrName: value.attrName,
              attrType: value.attrType,
              attrValue: value.attrValue,
              ruleId: value.ruleId,
            }

          });
        }
        /*if (this.goods.title === '' || !this.goods.title) {
          delete this.goods.title;
        }*/
      },

      // 获取链接中所带参数
      getQuery () {
        const query = this.$route.query;
        this.goods.goodsId = parseInt(query.goodsId);
      },

      // 获取修改商品所需要的模版信息
      getTemplate () {

        if (Number.isNaN(this.goods.goodsId)) {
          this.$Message.error('不存在该商品！');
          return false;
        }
        if (this.getTemplateLoading) return false;
        this.getTemplateLoading = true;
        this
          .$http
          .post('/h5/goods/queryGoodsInfo', {
            goodsId: this.goods.goodsId
          })
          .then(response => {
            if (response.body.code !== '000') return false;
            this.goodsModifyConfig = response.body.data;
            this.dataSync(this.goodsModifyConfig);
            local.set('goodsModifyConfig', response.body.data);
          })
          .finally(() => this.getTemplateLoading = false);

      }

    },

    watch: {

      $route () {
        this.init();
      },

      watch: {

        /**
         * 如果属性为游戏币, 并且商品分类为游戏币, 用于计算价格比例
         * @return {boolean}
         */
        'goods.price' () {
          // 如果没有检测到subClassID 则退出watch方法
          if (!gameCurrencyAttrId) return false;
          const attr = this.goods.goodsAttrs.find(item => item.attrId === gameCurrencyAttrId);
          this.customFormChange(attr);
        }
      },

    },

    created () {
      this.init();
    }

  }
</script>
