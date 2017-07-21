<!--
 - sinner
 -
 - author: Storm
 - date: 2017/04/27
 -->

<template>
  <div class="s-spinner">
    <a href="javascript:;" @click="handleMinus" class="s-spinner-minus"></a>
    <input type="number"
           class="s-spinner-input"
           :readonly="readonly"
           v-model.number="counter"
           @change="handleChange"
           ref="number">
    <a href="javascript:;" @click="handleAdd" class="s-spinner-add"></a>
  </div>
</template>

<script>

  export default {
    name: 'spinner',
    props: {
      value: [Number, String],
      min: {
        type: [Number, String],
        default: 1
      },
      max: {
        type: [Number, String]
      },
      step: {
        type: [Number, String],
        default: 1
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        counter: this.value
      }
    },
    computed: {
      minVal () {
        let val = parseFloat(this.min);

        if (Number.isNaN(val)) return -Infinity;
        return val;
      },

      maxVal () {
        let val = parseFloat(this.max);

        if (Number.isNaN(val)) return Infinity;
        return val;
      },

      stepVal () {
        let val = parseFloat(this.step);

        if (Number.isNaN(val)) return 1;
        return val;
      }
    },
    methods: {
      handleChange () {
        if (this.counter < this.minVal) this.counter = this.minVal;
        if (this.counter > this.maxVal) this.counter = this.maxVal;
        this.$emit('input', this.counter);
      },
      handleMinus () {
        if (this.counter - this.stepVal < this.minVal) return false;
        this.counter -= this.stepVal;
        this.$emit('input', this.counter);
      },

      handleAdd () {
        if (this.counter + this.stepVal > this.maxVal) return false;
        this.counter += this.stepVal;
        this.$emit('input', this.counter);
      }
    }
  }
</script>

<style lang="scss">
  .s-spinner {
    display: flex;

    &-input {
      width: .8rem;
      border: none;
      text-align: center;
      color: #666;
      font-size: .24rem;
      height: .36rem;
    }

    &-minus,
    &-add {
      border-radius: .02rem;
      border: 1px solid #E7E7E7;
      position: relative;
      width: .3rem;
      height: .36rem;
    }

    &-minus:before,
    &-add:before,
    &-add:after {
      content: '';
      background-color: #999;
      position: absolute;
      left: 50%;
      top: 50%;
    }

    &-minus:before,
    &-add:before {
      width: .16rem;
      height: .02rem;
      margin-left: -.08rem;
      margin-top: -.01rem;
    }

    &-add:after {
      width: .02rem;
      height: .16rem;
      margin-top: -.08rem;
      margin-left: -.01rem;
    }

  }
</style>
