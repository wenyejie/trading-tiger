<!--
 - 交易证明
 -
 - author: Storm
 - date: 2017/04/27
 -->

<template>

  <s-app>

    <s-header>交易证明</s-header>

    <s-main bgc="white">

      <h2 class="evidence-title">交易虎交易证明</h2>

      <s-panel title="订单信息">

        <table class="tableData tableData-light mt-20">
          <tr>
            <th>商品名称：</th>
            <td>【37级】双五星 一目连鸟老头镰鼬</td>
          </tr>
          <tr>
            <th>所属游戏：</th>
            <td>阴阳师</td>
          </tr>
          <tr>
            <th>客户端：</th>
            <td>官方客户端</td>
          </tr>
          <tr>
            <th>所属区服：</th>
            <td>网易·永生之谜</td>
          </tr>
          <tr>
            <th>游戏账号：</th>
            <td>b956989vs@163.com</td>
          </tr>
          <tr>
            <th>角色名称：</th>
            <td>迷乱 们</td>
          </tr>
          <tr>
            <th>商品链接：</th>
            <td><a href="">http://m.jiaoyimao.com/goods/1482839646379570.html</a></td>
          </tr>
          <tr>
            <th>订单号：</th>
            <td>1483358182800351</td>
          </tr>
          <tr>
            <th>交易金额：</th>
            <td>¥100.0</td>
          </tr>
          <tr>
            <th>完成时间：</th>
            <td>2017-01-02 21:05:43</td>
          </tr>
        </table>

      </s-panel>

      <s-panel title="买家信息">

        <table class="tableData tableData-light mt-20">
          <tr>
            <th>联系QQ：</th>
            <td>343597697</td>
          </tr>
          <tr>
            <th>联系手机：</th>
            <td>15715715001</td>
          </tr>
        </table>

      </s-panel>

      <footer class="evidence-footer">
        <img src="../../../assets/seal.png">
        <p>证明编号:JYM1483358182800351</p>
        <p>2017年04月08日15:27:32</p>
      </footer>

    </s-main>

  </s-app>

</template>

<script>
  export default {
    name: 'evidence',
    props: {},
    data () {
      return {}
    },
    methods: {}
  }
</script>
<style lang="scss">
  @import "./evidence.scss";
</style>
