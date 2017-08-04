<!--
 - author: Storm
 - date: 2017/03/28
 -->

<template>
  <label class="s-radio" :class="classes">
    <input
      class="s-radio-input"
      type="radio"
      :name="name"
      :disabled="disabled"
      :checked="checked"
      :value="label"
      @change="change"
    ><span class="s-radio-text"><slot>{{label}}</slot></span>
  </label>
</template>

<script>

  export default {
    name: 'Radio',
    props: {
      value: {},
      type: {
        type: String
      },
      block: {
        type: Boolean
      },
      size: {
        type: String,
        validator (val) {
          return ['sm'].includes(val);
        }
      },
      label: {
        type: [String, Number, Boolean],
        default: ''
      },
      name: String,
      disabled: Boolean,
      between: Boolean,
      shadow: Boolean
    },

    data () {
      return {
        isGroup: false,
        checked: !!this.value,
        vertical: this.block
      }
    },
    methods: {
      change (event) {

        // 如果radio被禁用则推出change事件
        if (this.disabled) return false;

        // 更改当前值并向上传递
        const checked = event.target.checked;
        this.checked = checked;
        this.$emit('input', checked);

        // 如果是group则向上传递事件
        if (this.isGroup) this.$parent.change(this.label);

      }
    },
    mounted () {

      // one of radio group?
      if (this.$parent.$options.name === 'RadioGroup') {
        this.isGroup = true;
        if (this.$parent.value === this.label) this.checked = true;
        else this.checked = false;
      }

      if (this.$parent.vertical) this.vertical = true;

    },
    computed: {
      classes () {
        return [
          this.vertical ? 's-radio-block' : 's-radio-inline',
          {
            's-radio-disabled': !!this.disabled,
            [`s-radio-${this.type}`]: !!this.type,
            [`s-radio-${this.size}`]: !!this.size,
            [`s-radio-between`]: !!this.between,
            [`s-radio-shadow`]: !!this.shadow,
          }
        ]
      }
    },
    watch: {
      value (val) {
        console.log(val);
        this.checked = !!val;
      }
    }
  }
</script>
