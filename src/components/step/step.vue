<!--
 - Step
 -
 - author: Storm
 - date: 2017/04/18
 -->

<template>
  <li class="s-step" :class="'s-step-' + statusCls">
    <div class="s-step-desc" v-if="hasDesc"><slot></slot></div>
    <div class="s-step-label">{{label}}</div>
  </li>
</template>

<script>
  export default {
    name: 'Step',
    props: {
      label: String,
      status: String
    },
    data () {
      return {
        statusCls: '',
        hasDesc: true
      }
    },
    methods: {
      init () {

        const activeIndex = this.$parent.activeIndex;
        const status = this.$parent.status;
        if (activeIndex === undefined) {
          this.statusCls = this.status;
        } else {
          this.setStatus(activeIndex, status);
        }

      },

      setStatus (activeIndex, status) {
        const _uid = this._uid;
        let currentIndex = 0;
        for (let index in this.$parent.$children) {
          if (_uid === this.$parent.$children[index]._uid) {
            currentIndex = parseInt(index);
            break;
          }
        }

        if (activeIndex > currentIndex) {
          this.statusCls = 'success';
        } else if (activeIndex < currentIndex) {
          this.statusCls = 'default';
        } else {
          this.statusCls = status;
        }
      }
    },
    mounted () {
      this.init();
      this.hasDesc = !!this.$slots.default && !!this.$slots.default[0].text;
    }
  }
</script>

<style lang="scss">
  .s-step {

    line-height: 1.1;
    border-left: 1px solid #e5e5e5;
    padding-left: .3rem;
    color: #666;
    padding-bottom: .36rem;
    position: relative;

    &:before {
      position: absolute;
      content: '';
      border-radius: 50%;
    }

    &:before {
      left: 0;
      top: 0;
      width: .22rem;
      height: .22rem;
      border: 1px solid transparent;
      margin-left: -.11rem;
      background-color: #e5e5e5;
      box-shadow: inset 0 0 0 .02rem #fff;
    }

    &-success {
      border-left-color: #6fcc67;
      color: #5acd69;

      &:before {
        border-color: #6fcc67;
        background-color: #6fcc67;
      }

      .s-step-desc {
        color: #5acd69;
      }

    }

    &-process {
      &:before {
        border-color: #ff9616;
        background-color: #ff9616;
      }
    }

    &-error {

      color: #F85959;

      .s-step-desc {
        color: #F85959;
      }

      &:before {
        border-color: #f85959;
        background-color: #f85959;
      }
    }

    &-desc,
    &-title {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &-desc {
      font-size: .24rem;
      line-height: .26rem;
      color: #999;
    }

    &-label {
      font-size: .26rem;
      line-height: .28rem;
    }

    &-desc + &-label {
      margin-top: .06rem;
    }

  }
  .s-steps-list > .s-step:last-child {
    padding-bottom: 0;
    border-left: none;
  }
</style>
