<!--
 - author: Storm
 - date: 2017/03/28
 -->

<template>
  <div class="s-breadcrumb">
    <ul class="s-breadcrumb-list">
      <li
        class="s-breadcrumb-item"
        v-for="(item, index) in list"
      >
        <template v-if="list.length > index + 1"><a :href="item.link">{{item.label}}</a></template>
        <template v-else><span>{{item.label}}</span></template>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Breadcrumb',
    props: {
      list: Array
    },
    data () {
      return {}
    },
    methods: {},
    watch: {
      value (val) {
        this.list = val;
      }
    }
  }
</script>

<style lang="scss">
  .s-breadcrumb {
    display: inline-block;
    color: #97a8be;

    &-item {
      display: inline-block;

      & + &:before {
        content: '/';
        padding: 0 8px;
        color: #d7dde4;
      }

      a {
        color: #657180;
      }

    }

  }
</style>
