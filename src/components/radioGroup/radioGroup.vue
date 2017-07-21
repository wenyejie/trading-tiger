<!--
 - author: Storm
 - date: 2017/03/28
 -->

<template>
  <div class="s-radio-group" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'RadioGroup',
    props: {
      value: {},
      size: String,
      type: {},
      vertical: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        val: this.value,
        oldVal: null
      }
    },
    methods: {
      update () {
        const value = this.value;

        // 遍历所有子元素，给予选中/不选中
        this.$children.forEach(child => {
          child.checked = child.label === value;
        });
      },
      change (value) {
        if (this.oldVal === value) return false;
        this.val = value;
        this.oldVal = this.val;
        this.update();
        this.$emit('input', value);
        this.$emit('change', value);
      }
    },
    computed: {
      classes () {
        return {
          [`s-radio-group-${this.size}`]: !!this.size,
          [`s-radio-group-${this.type}`]: !!this.type,
          [`s-radio-group-vertical`]: this.vertical
        }
      }
    },
    mounted () {
      this.update();
      this.change(this.value);

    },
    watch: {
      value (val, oldVal) {
        if (val !== oldVal) {
          this.update();
          this.change(val);
        }
      }
    }
  }
</script>
