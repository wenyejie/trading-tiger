<!--
 - author: Storm
 - date: 2017/03/28
 -->

<template>
  <div class="s-checkbox-group" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'CheckboxGroup',
    props: {
      value: {
        type: Array,
        default: []
      },
      size: String,
      type: {},
      vertical: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        array: this.value
      }
    },
    methods: {
      add (val) {
        this.array.push(val);
      },
      delete (val) {
        this.array.splice(this.array.indexOf(val), 1);
      },
      update () {
        const length = this.$children.length;
        this.array.forEach(item => {
          for (let i = 0; i < length; i++) {
            if (item === this.$children[i].label) {
              this.$children[i].checked = true;
              break;
            }
            if (i + 1 === length) {
              this.$children[i].checked = false;
            }
          }
        });
        this.emit();
      },
      emit () {
        this.$emit('input', this.array);
        this.$emit('change', this.array);
      }
    },
    computed: {
      classes () {
        return {
          [`s-checkbox-group-${this.size}`]: !!this.size,
          [`s-checkbox-group-${this.type}`]: !!this.type,
          [`s-checkbox-group-vertical`]: this.vertical
        }
      }
    },
    mounted () {
      this.update();

    },
    watch: {
      value (val) {
        this.array = val;
        this.update();
      }
    }
  }
</script>
