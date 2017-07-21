<!--
 - 倒计时
 -
 - author: Storm
 - date: 2017/04/27
 -->

<template>
  <span v-html="html"></span>
</template>

<script>
  import zeroize from '../../filters/zeroize';
  export default {
    name: 'countdown',
    props: {
      value: {
        type: Number,
        default: 59,
        validator (val) {
          return val >= 0;
        }
      },
      template: String
    },
    data () {
      return {
        counter: this.value,
        hour: 0,
        min: 0,
        second: 0,
        day: 0,
        html: ''
      }
    },
    methods: {
      init () {
        const second = 1;
        const min = 60 * second;
        const hour = 60 * min;
        const day = 24 * hour;

        this.day = Math.floor(this.counter / day);

        this.hour = Math.floor(this.counter % day / hour);

        this.min = Math.floor(this.counter % hour / min);

        this.second = Math.floor(this.counter % min / second);

        this.render();
      },

      render () {
        let html = this.template;
        html = html.replace('dd', zeroize(this.day));
        html = html.replace('hh', zeroize(this.hour));
        html = html.replace('mm', zeroize(this.min));
        html = html.replace('ss', zeroize(this.second));
        this.html = html;
        this.countdown();
      },
      countdown () {
        setTimeout(() => {
          if (this.second > 1) {
            this.second--;
            this.render();
            return false;
          }
          if (this.min > 1) {
            this.min--;
            this.second = 59;
            this.render();
            return false;
          }
          if (this.hour > 1) {
            this.hour--;
            this.min = 59;
            this.render();
            return false;
          }
          if (this.day > 1) {
            this.day--;
            this.hour = 23;
            this.render();
            return false;
          }
          this.$emit('on-done');
        }, 1000);
      }
    },
    mounted () {
      this.init()
    }
  }
</script>
