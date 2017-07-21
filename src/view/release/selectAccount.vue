<!--
 - 选择登录账号类型
 -
 - author: Storm
 - date: 2017/04/18
 -->

<template>
  <s-app>
    <s-header>选择登录账号类型</s-header>

    <s-main>

      <s-cell-intro>请选择登录账号类型：</s-cell-intro>
      <s-link v-for="item in accountTypes"
              @click="clientClick(item)"
              :to="`/release/accountInfo?accountTypeId=${item.gameAccountTypeId}&gameName=${gameName}&hasAccount=true`"
              :key="item.gameAccountTypeId">{{item.gameAccountTypeName}}
      </s-link>

    </s-main>
  </s-app>
</template>

<script>
  export default {
    name: 'SelectAccount',
    props: {},
    data () {
      return {
        accountTypes: [],

        // 游戏名称
        gameName: null
      }
    },
    methods: {

    },

    created () {
      try {
        this.accountTypes = local.get('releaseAccountTypes');
      } catch (e) {
        this.$Dialog.alert('无痕模式下发布商品功能无法使用, 请切换到正常模式!');
      }
      this.gameName = this.$route.query.gameName;
    }
  }
</script>
