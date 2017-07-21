<!--
 - 表单下拉控件
 -
 - author: Storm
 - date: 2017/04/18
 -->

<template>
  <div class="s-form-select">

    <div class="s-cell" :class="classes" @click="handleClick">
      <div class="s-cell-left" v-html="label"></div>
      <div class="s-cell-right">
        <span class="s-placeholder" v-if="!subLabel">{{placeholder}}</span>
        <span class="s-value" v-if="subLabel">{{subLabel}}</span>
        <s-icon type="fold" :class="{'s-form-select-fold': !fold}"></s-icon>
      </div>
    </div>

    <transition name="s-form-select">
      <ul class="s-form-select-list" v-show="fold" :style="listStyles">
        <li class="s-form-select-item"
            v-for="item in opts"
            :class="{'selected': item.selected}"
            @click="selectItem(item)">{{item[name]}}
        </li>
      </ul>
    </transition>

  </div>
</template>

<script>
  export default {
    name: 'formSelect',
    props: {
      value: {
        type: [Number, String]
      },
      label: [Number, String],
      placeholder: String,
      required: Boolean,
      disabled: Boolean,
      readonly: Boolean,
      state: Boolean,
      options: {
        type: [Object, Array],
        default () {
          return [];
        }
      },
      name: String,
      val: String,
      paddingLeft: {
        type: String,
        validator (val) {
          return ['md'].includes(val);
        }
      }
    },
    data () {
      return {
        fold: this.state,
        subLabel: null,
        selected: null,
        opts: this.options
      }
    },
    computed: {
      classes () {
        return [
          this.paddingLeft ? this.paddingLeft : '',
          {
            [`s-form-required`]: !!this.required,
            [`s-form-disabled`]: !!this.disabled,
            [`s-form-readonly`]: !!this.readonly,
          }
        ]
      },
      listStyles () {
        let sty = {};
        const length = this.options.length >= 5 ? 5 : this.options.length;
        sty.height = (56 * length + 29) / 100 + 'rem';
        return sty;
      }
    },
    watch: {
      value (val, oldVal) {
        if (val === oldVal) return false;
        this.listen();
      },
      state () {
        this.fold = this.state;
      },
      options () {
        this.opts = this.options;
      }
    },
    mounted () {
      this.value && this.listen();
    },
    methods: {
      listen () {
        if (!this.options) return false;
        for (let item of this.options) {
          if (this.value === (this.val ? item[this.val] : item)) {
            this.subLabel = item[this.name];
            this.selected = item;
            item.selected = true;
            return false;
          }
        }
      },
      handleClick () {
        this.fold = !this.fold;
      },
      selectItem (item) {

        // 如果当前项已经被选中则退出
        if (item.selected) return false;

        // 设置为选中
        item.selected = true;

        // 移除旧的选中值
        if (this.selected) this.selected.selected = false;

        // 保存选中的值
        this.selected = item;

        // 获取到当前选中的值
        let val = this.val ? item[this.val] : item;

        // 改变v-model的值
        this.$emit('input', val);

        // change方法
        this.$emit('on-change', val);

        // 修改右侧文字
        this.subLabel = item[this.name];

        // 修改箭头方向
        this.fold = false;
      }
    }
  }
</script>

<style lang="scss">
  .s-form-select {
    position: relative;
    overflow: hidden;

    &-fold {
      transform: rotate(180deg) !important;
    }

    .s-icon {
      display: inline-block;
      transition: all .3s ease;
      transform: rotate(0deg);
    }

    .s-cell {
      cursor: pointer;
      position: relative;
      z-index: 1;
      padding-left: .46rem;

      &.md {
        padding-left: .24rem;
      }

    }

    &-list {
      background-color: #fdfdfd;
      color: #666;
      border-top: 1px solid #e5e5e5;
      padding: .14rem 0;
      transition: height .3s ease-in-out, padding .3s ease-in-out;
      overflow: hidden;
      max-height: 3.1rem;
      height: auto;
      overflow-y: auto;
    }

    &-item {
      padding: .14rem .83rem;
      line-height: 1;
      cursor: pointer;
      transition: background-color .3s ease;

      &:hover,
      &:focus {
        background: #eee;
      }

      &.selected {
        position: relative;

        &:before {

          content: '';
          position: absolute;
          right: .24rem;
          background: url('../../assets/selected.png');
          background-size: 100%;
          width: .23rem;
          height: .17rem;
        }
      }

    }

    .s-form-input,
    & input {
      width: 4.36rem;
      display: block;
      border: none;
      background-color: transparent;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      text-align: right;
    }

    &-enter,
    &-leave-active {
      padding: 0;
      height: 0 !important;
    }

    + & {
      border-top: 1px solid #e5e5e5;
    }
  }
</style>
