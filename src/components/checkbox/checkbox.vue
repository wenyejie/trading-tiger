<!--
 - author: Storm
 - date: 2017/03/28
 -->

<template>
  <label class="s-checkbox" :class="classes">
    <input
      class="s-checkbox-input"
      type="checkbox"
      :name="name"
      :disabled="disabled"
      :checked="checked"
      @change="change"
    >
    <span class="s-checkbox-inner"></span>
    <span class="s-checkbox-text"><slot>{{label}}</slot></span>
  </label>
</template>

<script>
  export default {
    name: 'Checkbox',
    props: {
      value: {},
      type: {
        type: String
      },
      size: {},
      label: {
        type: [String, Number]
      },
      name: String,
      disabled: Boolean
    },

    data () {
      return {
        isGroup: false,
        checked: !!this.value
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
        if (this.isGroup) {
          this.$parent[checked ? 'add' : 'delete'](this.label);
        }

      }
    },
    mounted () {

      // one of radio group?
      if (this.$parent.$options.name === 'CheckboxGroup') {
        this.isGroup = true;
        if (this.$parent.value === this.label) this.checked = true;
      }

    },
    computed: {
      classes () {
        return {
          's-checkbox-disabled': !!this.disabled,
          [`s-checkbox-${this.type}`]: !!this.type
        }
      }
    },
    watch: {
      value (val) {
        this.checked = val;
      }
    }
  }
</script>

<style lang="scss">
  .s-checkbox {
    position: relative;
    cursor: pointer;
    display: inline-flex;
    align-items: center;

    & + & {
      margin-left: 1em;
    }

    &-input {
      position: absolute;
      z-index: -1;
      opacity: 0;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }

    &-inner,
    &-inner:before {
      width: .32rem;
      height: .32rem;
      border-radius: 50%;
      transition: all .3s ease-in-out;
    }

    &-inner {
      background-color: #fff;
      border: 1px solid #999;
      position: relative;
      margin-right: .1rem;

      &:before {
        content: '';
        opacity: 0;
        left: -1px;
        top: -1px;
        border-radius: 50%;
        position: absolute;
        background: #fd802c url(../../assets/check.png) no-repeat center;
        background-size: .18rem .14rem;
      }
    }

    &-input:checked + &-inner {
      border-color: transparent;

      &:before {

        opacity: 1;
      }
    }

    &-text {
      flex: 1;
    }

  }
</style>
