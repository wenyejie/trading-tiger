<!--
 - attr
 -
 - author: Storm
 - date: 2017/04/23
 -->

<template>
  <s-cell class="s-attr" @click="handleClick">
    <span class="s-attr-label">{{label}}</span>
    <span class="s-attr-control"><slot></slot></span>
    <template slot="right" v-if="link">
      <span class="s-attr-icon"></span>
    </template>
  </s-cell>
</template>

<script>
  export default {
    name: 'name',
    props: {
      label: String,
      link: Boolean
    },
    data () {
      return {}
    },
    methods: {
      handleClick ($event) {
        this.$emit('click', $event);
      }
    }
  }
</script>
