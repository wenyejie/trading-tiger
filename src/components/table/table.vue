<!--
 - author: Storm
 - date: 2017/03/29
 -->

<template>
  <div class="s-table">
    <table>
      <thead>
        <tr>
          <th v-for="item in options" :title="item.title">{{item.label}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data">
          <td v-for="(opt, key) in options">{{item[key]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'Table',
    props: {
      options: {
        type: Object,
      },
      data: {
        type: Array,
        required: true
      }
    },
    data () {
      return {}
    },
    methods: {},
    mounted () {
    }
  }
</script>

<style lang="scss">
  .s-table {
    max-width: 100%;
    background-color: #fff;
    /*border: 1px solid #dfe6ec;*/
    font-size: 14px;
    overflow: auto;

    table {
      min-width: 100%;
    }

    th {
      background-color: #eef1f6;
      text-align: left;
      white-space: nowrap;
    }

    th,
    td {
      padding: 10px 15px;
      border: 1px solid #dfe6ec;
      min-width: 120px;
    }

    &-content {

    }
  }
</style>
