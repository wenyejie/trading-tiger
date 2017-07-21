<!--
 - author: Storm
 - date: 2017/04/01
 -->

<template>
  <input
    :checked="checked"
    :disabled="disabled"
    :name="name"
    @change="handleChange"
    @click="handleClick"
    type="checkbox"
    class="s-switch"
  >
</template>

<script>
  export default {
    name: 'Switch',
    props: {
      value: {
        type: Boolean
      },
      trueValue: {
        default: true
      },
      falseValue: {
        default: false
      },
      disabled: {
        type: Boolean
      },
      name: {
        type: String
      },
      checked: {
        type: Boolean
      }
    },
    data () {
      return {
        isChecked: this.checked,
        val: this.value
      }
    },
    methods: {
      handleChange ($event) {
        this.$emit('change', this.isChecked ? this.trueValue : this.falseValue, $event);
      },
      handleClick ($event) {
        this.isChecked = $event.target.checked;
        this.$emit('input', $event.target.checked ? this.trueValue : this.falseValue);
      }
    },
    mounted() {
      this.$emit('input', this.isChecked ? this.trueValue : this.falseValue);
    },
    watch: {
      value () {
        this.isChecked = this.value === this.trueValue;
      }
    }
  }
</script>

<style lang="scss">
  .s-switch {
    position: relative;
    height: 32px;
    width: 52px;
    border: 1px solid #dfdfdf;
    outline: 0;
    border-radius: 16px;
    box-sizing: border-box;
    background-color: #dfdfdf;
    -webkit-transition: background-color 0.1s, border 0.1s;
    transition: background-color 0.1s, border 0.1s;

    &:before {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      width: 50px;
      height: 30px;
      border-radius: 15px;
      background-color: #fdfdfd;
      transition: transform .35s cubic-bezier(0.45, 1, 0.4, 1);
    }
    &:after {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      width: 30px;
      height: 30px;
      border-radius: 15px;
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
      transition: transform .35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
    }

    &:disabled {
      opacity: .5;
    }

    &:checked {

      border-color: #04be02;
      background-color: #04be02;

      &:before {
        transform: scale(0);
      }
      &:after {
        transform: translateX(20px);
      }

    }
  }
</style>
