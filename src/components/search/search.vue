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
