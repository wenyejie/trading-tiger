<!--
 - Search
 -
 - author: Storm
 - date: 2017/04/13
 -->

<template>
  <form class="s-search" @submit.prevent="handleSubmit" :class="classes" @click="handleClick">
    <label class="s-search-label">
      <input type="search"
             class="s-search-input"
             :placeholder="placeholder"
             :name="name"
             v-model="searchKey"
             @input="handleInput"
             :autofocus="autofocus"
             @keyup.enter="handleEnter">
    </label>
    <button class="s-search-btn"
            type="button"
            @click="handleButtonClick">{{text}}
    </button>
  </form>
</template>

<script>
  export default {
    name: 'Search',
    props: {
      value: [String, Number],
      name: String,
      placeholder: String,
      text: {
        type: String,
        default: '取消'
      },
      type: {
        type: String,
        validator (val) {
          return ['primary'].includes(val);
        }
      },
      autofocus: Boolean
    },
    data () {
      return {
        searchKey: this.value
      }
    },
    computed: {
      classes () {
        return {
          [`s-search-${this.type}`]: !!this.type
        }
      }
    },
    watch: {
      searchKey () {
        this.$emit('input', this.searchKey);
      }
    },
    methods: {
      handleInput () {
        this.$emit('on-input', this.searchKey);
      },
      handleSubmit ($event) {
        this.$emit('on-submit', $event);
      },
      handleEnter ($event) {
        this.$emit('enter', $event);
      },
      handleButtonClick ($event) {
        this.$emit('on-button-click', $event);
      },
      handleClick ($event) {
        this.$emit('on-click', $event);
      }
    }
  }
</script>

<style lang="scss">
  .s-search {

    display: flex;
    position: relative;
    z-index: 11;
    padding: .2rem .24rem;
    background-color: #fff;

    &-label {
      position: relative;
      flex: 1;
      display: block;

      &:before {
        content: '';
        background: url(../../assets/icon-search.png) no-repeat center;
        background-size: 100%;
        width: .24rem;
        height: .24rem;
        position: absolute;
        left: .2rem;
        top: 50%;
        margin-top: -.12rem;
      }

    }

    &-input {
      width: 100%;
      border: 1px solid #f67b29;
      height: .6rem;
      padding: 0 .36rem 0 .53rem;
      border-radius: .3rem 0 0 .3rem;
      color: #333;
      font-size: .24rem;
      background-color: #fff;
    }

    &-btn {
      border: none;
      height: .6rem;
      padding: 0 .36rem;
      background-image: linear-gradient(-174deg, #f75d25 1%, #ff9f50 100%);
      border-radius: 0 .3rem .3rem 0;
      color: #fff;
      font-size: .24rem;
    }

    &-primary {
      padding: .14rem .24rem;
      background-image: linear-gradient(to left, #f25200 0%, #ff9616 100%);
      color: #fff;

      .s-search {

        &-btn {
          background: none;
          margin-right: -.24rem;
          padding: 0 .24rem;
          font-size: .26rem;
        }

        &-input {
          border: none;
          border-radius: .3rem;
        }

      }

    }

  }
</style>
