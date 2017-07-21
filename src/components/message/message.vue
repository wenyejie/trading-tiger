<!--
 - author: Storm
 - date: 2017/04/29
 -->

<template>
  <transition name="s-message">
    <section
      class="s-message"
      :class="classes"
      v-show="visible">
      <div v-if="showMark" class="s-message-mark"></div>
      <div class="s-message-content">
        <div v-if="type" class="s-message-icon" :class="iconClasses">
          <s-icon :type="icon"></s-icon>
        </div>
        <slot>
          <div v-html="body"></div>
        </slot>
      </div>
    </section>
  </transition>
</template>

<script>
  export default {
    name: 'Message',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      showMark: {
        type: Boolean,
        default: false
      },
      duration: {
        type: Number,
        default: 2400
      },
      body: {
        type: String
      },
      type: {
        type: String
      },
      icon: {
        type: String
      }
    },
    data () {
      return {
        visible: this.value
      }
    },
    computed: {
      classes () {
        return {
          [`s-message-${this.type}`]: !!this.type,
          [`s-message-hasIcon`]: !!this.type
        };
      },
      iconClasses () {
        return {
          [`s-message-icon-${this.type}`]: !!this.type
        }
      }
    },
    methods: {
      ok () {
        this.remove();
      },
      remove () {
        document.body.classList.remove('s-message-overflow');
        this.visible = false;
        this.$emit('ok');
        this.$emit('input', false);
      },
      countdown () {
        clearTimeout(this.timer);
        this.timer = setTimeout(this.ok, this.duration);
      }
    },
    watch: {
      value (val) {
        this.visible = val;
      }
    },
    mounted () {
      if (this.duration > 0) {
        this.countdown();
      } else {
        clearTimeout(this.timer);
      }
    }
  }
</script>

<style lang="scss">
  .s-message {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    transition: all .3s ease;
    z-index: 3001;

    &-content {
      z-index: 1;
      min-width: 2.48rem;
      max-width: 3.5rem;
      width: auto;
      background: rgba(38, 39, 40, 0.86);
      border-radius: .08rem;
      font-size: .24rem;
      line-height: 1.1666666666666667;
      color: #fdfdfd;
      padding: .28rem;
      text-align: center;
    }

    &-hasIcon {

      &-content {
        padding: .36rem .28rem;
      }

    }

    &-icon {

      font-size: .3rem;
      line-height: 1;
      margin-bottom: .08rem;

      &-success {
        color: #35c47e;
      }

      &-warning {
        color: #ffa045;
      }

      &-error {
        color: #ff5845;
      }

      &-loading {
      }

    }

    &-enter,
    &-leave-active {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
</style>
