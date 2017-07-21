<!--
 - Input
 -
 - author: Storm
 - date: 2017/04/10
 -->

<template>
  <div class="s-input" :class="classes">
    <div class="s-input-left" v-if="left">
      <slot name="left"></slot>
    </div>
    <input
      class="s-input-box"
      :disabled="disabled"
      :placeholder="placeholder"
      :minlength="minlength"
      :maxlength="maxlength"
      :name="name"
      :value="val"
      :type="type"
      :required="required"
      :title="title"
      :min="min"
      :max="max"
      @keyup.enter="handleEnter"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @input="handleInput"
    >
    <div class="s-input-right" v-if="right || close">
      <slot name="right"><span v-if="hasClose" @click="handleClose" class="s-input-close"></span></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Input',
    props: {
      value: {
        type: [Number, String]
      },
      type: {
        type: String,
        default: 'text'
      },
      block: {
        type: Boolean
      },
      disabled: {
        type: Boolean
      },
      placeholder: {
        type: String
      },
      minlength: {
        type: [Boolean, String]
      },
      maxlength: {
        type: [Boolean, String]
      },
      name: {
        type: String
      },
      close: {
        type: Boolean,
        default: true
      },
      required: Boolean,
      title: String,
      min: [Boolean, String],
      max: [Boolean, String],
    },
    data () {
      return {
        val: this.value,
        left: false,
        right: false,
        hasClose: false
      }
    },
    computed: {
      classes () {
        return {
          [`s-input-block`]: !!this.block
        };
      }
    },
    watch: {
      value (val) {
        this.val = val;
        this.hasClose = val.trim() !== '';
      }
    },
    methods: {
      handleClose () {
        this.val = '';
        this.hasClose = false;
        this.$emit('input', this.val);
      },
      handleEnter ($event) {
        this.$emit('on-enter', $event);
      },
      handleFocus ($event) {
        this.$emit('on-focus', $event);
      },
      handleBlur ($event) {
        this.$emit('on-blur', $event);
      },
      handleChange ($event) {
        this.$emit('on-change', $event);
      },
      handleInput ($event) {
        let value = $event.target.value;
        if (value.trim() !== '') this.hasClose = true;
        this.val = value;
        this.$emit('input', value);
        this.$emit('on-input', $event);
      }
    },
    mounted () {
      this.left = !!this.$slots.left;
      this.right = !!this.$slots.right;
      this.hasClose = this.value !== undefined && (this.value + '') !== '';
    }
  }
</script>

<style lang="scss">
  .s-input {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    line-height: 1;

    &-block {
      display: block;
      width: 100%;
    }
    &-box {
      width: 100%;
      border: none;
      border-bottom: 1px solid #e5e5e5;
      padding: .26rem .16rem;
      font-size: .26rem;
    }
    &-right {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    &-close {
      position: absolute;
      cursor: pointer;
      width: .3rem;
      height: .3rem;
      background: url(../../assets/icon-delete.png) no-repeat center;
      background-size: 100%;
      right: .16rem;
      top: 50%;
      margin-top: -.15rem;
      color: #e0dfde;
    }
  }
</style>
