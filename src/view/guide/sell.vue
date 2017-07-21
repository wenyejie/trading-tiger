<!--
 - 出售流程
 -
 - author: Storm
 - date: 2017/06/07
 -->

<template>
  <s-app class="buyProcess">

    <s-header>出售流程</s-header>

    <s-main bgc="white">

      <s-tabs direction="vertical">
        <s-tabs-panel label="账号" name="account">

          <ol class="progress">
            <li class="progress-item progress-triangle">
              <div class="progress-label"><span>发布商品</span></div>
            </li>
            <li class="progress-item progress-triangle">
              <div class="progress-label"><span>买家支付</span></div>
            </li>
            <li class="progress-item progress-triangle">
              <div class="progress-label"><span>进入在线聊天<br/>等待客服处理</span></div>
            </li>
            <li class="progress-item progress-triangle">
              <div class="progress-label"><span>协助客服换绑</span></div>
            </li>
            <li class="progress-item progress-triangle">
              <div class="progress-label"><span>换绑成功<br/>发货成功</span></div>
              <div class="progress-label progress-error"><span>换绑失败<br/>发货失败</span></div>
            </li>
            <li class="progress-item progress-triangle">
              <div class="progress-label"><span>等待买家<br>确认收货</span></div>
            </li>
            <li class="progress-item">
              <div class="progress-label progress-triangle"><span>确认收货<br>交易成功</span></div>
              <div class="progress-label progress-error progress-triangle progress-triangle-error">
                <span>买家<br>申请仲裁</span></div>
            </li>
            <li class="progress-item progress-triangle progress-triangle-error">
              <div class="progress-label progress-success"><span>交易成功<br/>转账卖家</span></div>
              <div class="progress-label progress-error"><span>仲裁客服<br/>介入</span></div>
            </li>
            <li class="progress-item">
              <div class="progress-label progress-triangle"><span>仲裁交易成功</span></div>
              <div class="progress-label progress-error progress-triangle progress-triangle-error">
                <span>仲裁交易失败</span>
              </div>
            </li>
            <li class="progress-item">
              <div class="progress-label progress-success"><span>交易成功<br/>转账卖家</span></div>
              <div class="progress-label progress-error">
                <span>交易失败<br/>原路退款</span>
              </div>
            </li>

          </ol>

        </s-tabs-panel>
        <s-tabs-panel label="游戏币" name="money">

          <ol class="progress">

            <li class="progress-item progress-triangle">
              <div class="progress-label"><span>发布商品</span></div>
            </li>
            <li class="progress-item progress-triangle">
              <div class="progress-label"><span>买家支付</span></div>
            </li>
            <li class="progress-item progress-triangle">
              <div class="progress-label"><span>进入在线聊天<br/>等待客服处理</span></div>
            </li>
            <li class="progress-item progress-triangle">
              <div class="progress-label"><span>按客服要求配<br>合发货</span></div>
            </li>
            <li class="progress-item ">
              <div class="progress-label progress-triangle"><span>发货成功<br>交易成功</span></div>
              <div class="progress-label progress-triangle-error progress-triangle progress-error"><span>意外情况<br>发货失败</span></div>
            </li>
            <li class="progress-item ">
              <div class="progress-label progress-success"><span>转账到卖家<br>账户余额</span></div>
              <div class="progress-label progress-error"><span>交易失败<br>退款买家</span></div>
            </li>

          </ol>

        </s-tabs-panel>
        <s-tabs-panel label="装备道具" name="equipment">

          <ol class="progress">

            <li class="progress-item progress-triangle">
              <div class="progress-label"><span>发布商品</span></div>
            </li>
            <li class="progress-item progress-triangle">
              <div class="progress-label"><span>买家支付</span></div>
            </li>
            <li class="progress-item progress-triangle">
              <div class="progress-label"><span>进入在线聊天<br/>等待客服处理</span></div>
            </li>
            <li class="progress-item progress-triangle">
              <div class="progress-label"><span>按客服要求配<br>合发货</span></div>
            </li>
            <li class="progress-item ">
              <div class="progress-label progress-triangle"><span>发货成功<br>交易成功</span></div>
              <div class="progress-label progress-triangle-error progress-triangle progress-error"><span>意外情况<br>发货失败</span></div>
            </li>
            <li class="progress-item ">
              <div class="progress-label progress-success"><span>转账到卖家<br>账户余额</span></div>
              <div class="progress-label progress-error"><span>交易失败<br>退款买家</span></div>
            </li>

          </ol>

        </s-tabs-panel>
      </s-tabs>

    </s-main>

  </s-app>
</template>

<script>
  import '../../styles/progress.scss';

  export default {
    name: 'buy',
    data () {
      return {}
    },
    methods: {}
  }
</script>
