<!--
 - 添加新凭证
 -
 - author: Storm
 - date: 2017/06/22
 -->

<template>
  <s-app>

    <s-header>添加新凭证</s-header>

    <s-main>

      <s-cell>上传凭证</s-cell>
      <s-upload v-model="apply.picUrls" multiple></s-upload>

      <s-cell style="border-top: 1px solid #e5e5e5">申请说明</s-cell>
      <textarea v-model.trim="apply.explain"
                class="textarea"
                name="explain"
                maxlength="200"
                placeholder="请输入说明内容"></textarea>

      <s-suspension transparent>
        <s-button type="primary" block @click="handleAdd">提交</s-button>
      </s-suspension>

    </s-main>

  </s-app>
</template>

<script>
  export default {
    name: 'credentials',
    props: {},
    data () {
      return {
        apply: {
          picUrls: [],
          explain: ''
        }
      }
    },
    methods: {

      /**
       * 添加新凭证
       */
      handleAdd () {

      }
    }
  }
</script>

<style lang="scss">
</style>
