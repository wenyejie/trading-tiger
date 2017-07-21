<!--
 - 表单生成
 -
 - author: Storm
 - date: 2017/04/19
 -->

<template>
  <div class="s-form-make">

    <template v-if="formData.attrRule[0].inputType === 1">
      <s-form-control :label="formData.attrName"
                      :required="required(formData.attrRule[0])">

        <input v-if="type(formData.attrRule[0]) === 'password'"
               type="text"
               :maxlength="length(formData.attrRule[0])"
               v-model.trim="modelValue.attrValue"
               @input="inputChange(formData)"
               :placeholder="`请输入${formData.attrName}`">

        <input v-if="type(formData.attrRule[0]) === 'number'"
               v-show="formData.attrRule[0].attrValueType !== 15"
               type="number"
               :maxlength="length(formData.attrRule[0])"
               :min="min(formData.attrRule[0])"
               v-model.trim.number="modelValue.attrValue"
               @input="inputChange(formData)"
               :placeholder="`请输入${formData.attrName}`">

        <input v-if="type(formData.attrRule[0]) === 'number'"
               v-show="formData.attrRule[0].attrValueType === 15"
               type="text"
               ref="currency"
               v-model="currencyValue"
               :maxlength="length(formData.attrRule[0])"
               :min="min(formData.attrRule[0])"
               @input="currencyChange($event)"
               :placeholder="`请输入${formData.attrName}`">

        <input v-if="type(formData.attrRule[0]) === 'tel'"
               type="tel"
               maxlength="11"
               minlength="11"
               v-model.trim.number="modelValue.attrValue"
               @input="inputChange(formData)"
               :placeholder="`请输入${formData.attrName}`">

        <input v-if="type(formData.attrRule[0]) === 'email'"
               type="email"
               :maxlength="length(formData.attrRule[0])"
               v-model.trim="modelValue.attrValue"
               @input="inputChange(formData)"
               :placeholder="`请输入${formData.attrName}`">

        <input v-if="type(formData.attrRule[0]) === 'text'"
               type="text"
               :maxlength="length(formData.attrRule[0])"
               v-model.trim="modelValue.attrValue"
               @input="inputChange(formData)"
               :placeholder="`请输入${formData.attrName}`">
      </s-form-control>
      <s-cell-intro v-if="hasIntro && formData.attrRule[0].showDesc"
                    v-html="formData.attrRule[0].showDesc"></s-cell-intro>
    </template>

    <template v-if="formData.attrRule[0].inputType === 2">
      <s-form-select :label="formData.attrName"
                     placeholder="请选择"
                     name="ruleDefaultValue"
                     val="ruleId"
                     :options="formData.attrRule"
                     v-model="modelValue.ruleId"
                     @on-change="selectChange(formData, $event)"
                     :required="required(formData.attrRule[0])"></s-form-select>
      <s-cell-intro v-if="hasIntro && formData.attrRule[0].showDesc"
                    v-html="formData.attrRule[0].showDesc"></s-cell-intro>
    </template>

    <template v-if="formData.attrRule[0].inputType === 3">

      <s-form-select :label="formData.attrName"
                     placeholder="请选择"
                     name="ruleDefaultValue"
                     val="ruleId"
                     v-model="modelValue.ruleId"
                     @on-change="hybrideSelect($event)"
                     :options="formData.attrRule"
                     :required="required(formData.attrRule[0])"></s-form-select>

      <template v-for="item in formData.attrRule">
        <s-form-control :label="item.ruleDefaultValue"
                        :key="item.ruleId"
                        v-if="item.ruleId === modelValue.ruleId"
                        :required="required(item)">

          <input v-if="type(item) === 'password'"
                 type="text"
                 :maxlength="length(item)"
                 v-model.trim="modelValue.attrValue"
                 @input="hybridChange(item)"
                 :placeholder="`请输入${formData.attrName}`">

          <input v-if="type(item) === 'number'"
                 v-show="item.attrValueType !== 15"
                 type="number"
                 :maxlength="length(item)"
                 :min="min(item)"
                 v-model.trim.number="modelValue.attrValue"
                 @input="hybridChange(item)"
                 :placeholder="`请输入${formData.attrName}`">

          <input v-if="type(item) === 'number'"
                 v-show="item.attrValueType === 15"
                 type="text"
                 v-model="currencyHybridValue"
                 :maxlength="length(item)"
                 :min="min(item)"
                 @input="currencyHybridChange(item, $event)"
                 :placeholder="`请输入${formData.attrName}`">

          <input v-if="type(item) === 'tel'"
                 type="tel"
                 maxlength="11"
                 minlength="11"
                 v-model.trim.number="modelValue.attrValue"
                 @input="hybridChange(item)"
                 :placeholder="`请输入${formData.attrName}`">

          <input v-if="type(item) === 'email'"
                 type="email"
                 :maxlength="length(item)"
                 v-model.trim="modelValue.attrValue"
                 @input="hybridChange(item)"
                 :placeholder="`请输入${formData.attrName}`">

          <input v-if="type(item) === 'text'"
                 type="text"
                 :maxlength="length(item)"
                 v-model.trim="modelValue.attrValue"
                 @input="hybridChange(item)"
                 :placeholder="`请输入${formData.attrName}`">
        </s-form-control>
        <s-cell-intro v-if="hasIntro && item.showDesc && item.selected" v-html="item.showDesc"></s-cell-intro>
      </template>

    </template>
  </div>
</template>

<script>
  import FormControl from '../../components/formControl';
  import FormSelect from '../../components/formSelect';
  import validator from '../../core/validator';

  // 选择后在输入的规则
  let selectDefaultInput;

  export default {
    name: 'FormMake',
    components: {
      sFormControl: FormControl,
      sFormSelect: FormSelect
    },
    props: {
      options: Object,
      prefix: {
        type: String
      },
      value: {
        type: Object,
        default () {
          return {};
        }
      },
      hasIntro: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        model: null,
        selectModel: null,
        modelValue: this.value,
        formData: this.options,

        // 游戏币的值
        currencyValue: null,

        // 混合游戏币的值
        currencyHybridValue: null
      }
    },
    watch: {
      value (val) {
        this.modelValue = val;
      },
      options (val) {
        this.formData = val;
      }
    },
    methods: {

      /**
       * 渲染游戏币
       */
      renderCurrency (value) {

        let num = (value || 0).toString(), result = '';
        while (num.length > 4) {
          result = ',' + num.slice(-4) + result;
          num = num.slice(0, num.length - 4);
        }
        if (num) {
          result = num + result;
        }
        return result;
      },

      /**
       * 游戏币混合变更
       * @param item 规则
       * @param $event 事件
       */
      currencyHybridChange (item, $event) {
        this.modelValue.attrValue = parseInt($event.target.value.replace(/,|\s/g, ''));
        $event.target.value = this.renderCurrency(this.modelValue.attrValue);
        this.hybridChange(item);
      },

      // 混合选择框
      hybridChange (item) {
        selectDefaultInput = item;

        // value 值校验
        this.modelValue.attrValue = this.validValue(this.modelValue.attrValue, item);

        this.validator();
        this.$emit('input', this.modelValue);
      },

      hybrideSelect ($event) {
        this.modelValue.ruleId = $event;
        selectDefaultInput = this.formData.attrRule.find(item => item.ruleId === this.modelValue.ruleId);
        this.modelValue.attrValue = '';
        this.validator();
        this.$emit('input', this.modelValue);
        this.$emit('on-change', this.modelValue);
      },

      // 选择框
      selectChange (formData, ruleId) {
        let value = formData.attrRule.find(item => item.ruleId === ruleId);
        this.modelValue.attrValue = value.ruleDefaultValue;
        this.validator();
        this.$emit('input', this.modelValue);
        this.$emit('on-change', this.modelValue);
      },

      // 输入框验证
      validator () {
        let obj = {
          title: this.formData.attrName,
          value: this.modelValue.attrValue === null || this.modelValue.attrValue === undefined ? '' : this.modelValue.attrValue
        };

        let opts = this.formData.attrRule[0].inputType === 3 ? (selectDefaultInput || this.formData.attrRule[0]) : this.formData.attrRule[0];

        if (opts.inputType === 3 && selectDefaultInput) obj.title = opts.ruleDefaultValue;

        if (opts.inputType === 3 && !selectDefaultInput && this.modelValue.attrValue) {
          return false;
        }

        obj.required = opts.isRequired === 1;

        obj.type = this.type(opts);

        switch (this.type(opts)) {
          case 'number':
            obj.min = opts.inputLimitRule === 2 ? 0 : undefined;
            break;
          default:
            break;
        }

        // 如果输入规则为3 则type等于'letter'
        if (opts.inputLimitRule === 3) obj.type = 'letter';

        // 结果正确时不返回$msg,错误时返回string类型
        const result = validator(obj);
        if (result) this.modelValue.$msg = result;
        else delete this.modelValue.$msg

      },

      /**
       * 游戏币发生变化
       */
      currencyChange ($event) {
        this.modelValue.attrValue = parseInt($event.target.value.replace(/,|\s/g, ''));
        $event.target.value = this.renderCurrency(this.modelValue.attrValue);
        this.currencyValue = $event.target.value;
        this.inputChange(this.formData);
      },

      /**
       * 输入值控制
       * @param value 值
       * @param rule 规则
       */
      validValue (value, rule) {

        // 限制长度
        if (rule.inputLimitLen !== 0) value = (value + '').slice(0, rule.inputLimitLen);

        // 限制数字/手机输入
        if (rule.inputLimitRule === 2 || rule.inputLimitRule === 4) value = (value + '').replace(/[^0-9]+/g, '');

        // 限制字母输入
        if (rule.inputLimitRule === 3) value = value.replace(/[^A-Za-z]+/g, '');

        return value;
      },

      // 输入框
      inputChange (formData) {
        this.modelValue.ruleId = formData.attrRule[0].ruleId;

        // value 值校验
        this.modelValue.attrValue = this.validValue(this.modelValue.attrValue, formData.attrRule[0]);

        this.validator();
        this.$emit('input', this.modelValue);
        this.$emit('on-change', this.modelValue);

      },

      // 最小数组
      min (item) {
        return item.inputLimitRule === 2 ? 0 : undefined;
      },

      // 验证是否必填
      required (item) {
        return item.isRequired === 1;
      },

      // 长度
      length (item) {
        const length = item.inputLimitLen;
        return length > 0 ? length : 50;
      },


      type (item) {
        if (item.isPwd === 1) return 'password';


        /*输入规则 - inputLimitRule
         case 1: return '不限制';
         case 2: return '数字';
         case 3: return '字母';
         case 4: return '手机号';
         case 5: return '邮箱';*/
        switch (item.inputLimitRule) {
          case 2:
            return 'number';
          case 4:
            return 'tel';
          case 5:
            return 'email';
          default:
            return 'text'
        }

      }
    },
    mounted () {

      // 如果只有单个值, 则直接在前台直接输入框中显示
      if (this.formData.attrRule.length === 1 && this.formData.attrRule[0].inputType === 2) {
        this.modelValue.ruleId = this.formData.attrRule[0].ruleId;
        this.selectChange(this.formData, this.modelValue.ruleId);
      }

      // 选择后在输入默认值, 如果只有一个选项, 则默认选中
      if (this.formData.attrRule[0].inputType === 3 && this.formData.attrRule.length === 1) {
        this.modelValue.ruleId = this.formData.attrRule[0].ruleId;
        this.hybrideSelect(this.modelValue.ruleId);
      }

      // 如果是金币值, 并且时直接输入, 则要特殊处理
      if (this.formData.attrRule[0].inputType === 1 && this.formData.attrRule[0].attrValueType === 15 && this.formData.attrValue) {
        this.currencyChange({target: {value: this.formData.attrValue}});
      }

      this.modelValue.attrSeq = this.formData.attrSeq;

      this.validator();
      this.$emit('input', this.modelValue);
    }
  }
</script>
