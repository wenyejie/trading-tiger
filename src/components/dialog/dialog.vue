<!--
 - author: Storm
 - date: 2017/03/29
 -->

<template>
  <transition name="s-dialog">
    <section
      class="s-dialog"
      :class="classes"
      v-show="visible">
      <div class="s-dialog-mark"></div>
      <div class="s-dialog-content" :style="contentStyles">
        <a v-if="showClose" class="s-dialog-close s-icon s-icon-close"></a>
        <header v-if="title" class="s-dialog-header">
          <h4>
            <slot name="header">{{title}}</slot>
          </h4>
        </header>
        <div class="s-dialog-body" :style="bodyStyles">
          <input v-if="name === 'prompt'"
                 type="text"
                 :required="input.required"
                 :maxlength="input.maxlength"
                 v-model.trim="promptInput"
                 class="s-dialog-input">
          <slot>
            <div v-html="body"></div>
          </slot>
        </div>
        <footer v-if="showFooter" class="s-dialog-footer">
          <slot name="footer">
            <button v-if="showOk" @click="ok" type="primary" class="s-dialog-ok">{{okText}}</button>
            <button v-if="showCancel" @click="cancel" class="s-dialog-cancel">{{cancelText}}</button>
          </slot>
        </footer>
      </div>
    </section>
  </transition>
</template>

<script>
  export default {
    name: 'Dialog',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      name: String,
      title: {
        type: String,
        default: ''
      },
      showCancel: {
        type: Boolean,
        default: true
      },
      showOk: {
        type: Boolean,
        default: true
      },
      showFooter: {
        type: Boolean,
        default: true
      },
      showBackground: {
        type: Boolean,
        default: true
      },
      backgroundColor: {
        type: String,
        default: ''
      },
      backgroundClose: {
        type: Boolean,
        default: false
      },
      showClose: {
        type: Boolean,
        default: false
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      okText: {
        type: String,
        default: '确定'
      },
      duration: {
        type: Number,
        default: 0
      },

      // 输入框规则
      input: {
        type: Object,
        default () {
          return {
            required: null,
            maxlength: null,
            pattern: null
          }
        }
      },
      body: {
        type: String
      },
      size: {
        type: String,
        default: '',
        validator (val) {
          return ['lg', 'sm', 'auto', ''].includes(val);
        }
      },
      mini: Boolean,
      width: {
        type: [Number, String]
      },
      color: String
    },
    data () {
      return {
        visible: this.value,
        promptInput: ''
      }
    },
    methods: {

      /**
       * 输入框规则验证
       * 假如弹出框类型为prompt
       */
      validator () {
        if (this.name !== 'prompt') return true;

        // 必填但是, 没有输入任何规则
        if (this.promptInput === '' && this.input.required) {
          this.$Message.warning('输入框不能为空!');
          return false;
        }

        /*if (!this.input.pattern.test(this.promptInput)) {
         this.$Message.warning('输入格式错误!');
         return false;
         }*/

        if (this.input.maxlength)

          return true;
      },

      ok () {
        if (!this.validator()) return false;
        this.$emit('ok', this.promptInput);
        this.remove();
      },
      cancel () {
        this.$emit('cancel');
        this.remove();
      },
      remove () {
        document.body.classList.remove('s-dialog-overflow');
        this.visible = false;
        this.$emit('input', false);
      },
      countdown () {
        clearTimeout(this.timer);
        this.timer = setTimeout(this.remove, this.duration);
      }
    },
    computed: {
      classes () {
        return {
          [`s-dialog-${this.size}`]: !!this.size,
          [`s-dialog-${this.name}`]: !!this.name,
          [`s-dialog-mini`]: !!this.mini
        }
      },
      contentStyles () {
        return {
          width: this.width + (/^\d+$/.test(this.width) ? 'px' : '')
        };
      },
      bodyStyles () {
        let styles = {};

        if (this.color) styles.color = this.color;

        return styles;
      }
    },
    watch: {
      value (val) {
        this.visible = val;
      },

      promptInput (val) {
        if (!this.input.pattern) return false;
        this.promptInput = val.replace(this.input.pattern, '');
      }
    },
    mounted () {
      document.body.classList.add('s-dialog-overflow');
      if (this.duration > 0) {
        this.countdown();
      } else {
        clearTimeout(this.timer);
      }
    }
  }
</script>

<style lang="scss">
  .s-dialog,
  .s-dialog-mark {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .s-dialog {
    position: fixed;
    z-index: 2048;
    font-size: .28rem;
    transition: all .3s ease;
    word-break: break-all;

    &-mark {
      position: absolute;
      background-color: rgba(0, 0, 0, .5);
    }

    &-overflow {
      overflow: hidden;
    }
    &-footer {
      display: flex;
      border-top: 1px solid #d8d8d8;
    }
    &-cancel,
    &-ok {
      flex: 1;
      padding: .21rem 0;
      border: none;
      background-color: transparent;
      color: #5e97f6;
    }
    &-ok + &-cancel {
      border-left: 1px solid #d8d8d8;

    }
    &-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      width: 5.4rem;
      background-color: #fff;
      border-radius: .1rem;
    }

    &-header {
      padding: .3rem 0 .1rem;
      font-weight: bold;
      font-size: .3rem;
      line-height: 1;
      text-align: center;

      h4 {
        padding: 0 .24rem;
      }
    }

    &-header + &-body {
      padding-top: 0;
    }

    &-body {
      padding: .5rem;
      text-align: center;
    }

    &-mini {
      .s-dialog-header {
        font-size: .28rem;
        padding-top: .33rem;
        font-weight: normal;
      }

      .s-dialog-body {
        font-size: .24rem;
        color: #999;
        padding-bottom: .34rem;
      }
    }

    &-enter,
    &-leave-active {
      opacity: 0;
      transform: scale(1.1);
    }

    &-prompt {
      .s-dialog-header {
        padding-bottom: .33rem;
      }
    }

    &-input {
      border: 1px solid #999;
      font-size: .24rem;
      line-height: 1;
      color: #333;
      padding: .05rem .1rem;
      width: 100%;
    }

  }
</style>
