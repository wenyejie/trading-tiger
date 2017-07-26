<!--
 - 提取账号密码
 -
 - author： Storm
 - date： 2017/04/27
 -->

<template>

  <s-app>

    <s-header>提取账号密码</s-header>

    <s-main :loading="loading !== false">

      <s-panel class="mt-20">

        <table class="tableData tableData-block">
          <colgroup>
            <col style="width: 1.35rem">
            <col>
          </colgroup>
          <tr>
            <th>订单号：</th>
            <td>{{orderInfo.orderId}}</td>
          </tr>
          <tr>
            <th>商品名称：</th>
            <td>{{orderInfo.showTitle}}</td>
          </tr>
          <tr>
            <th>实际支付：</th>
            <td>¥ {{orderInfo.price}}</td>
          </tr>
          <tr>
            <th>所属游戏：</th>
            <td>{{orderInfo.gameName}}</td>
          </tr>
          <tr>
            <th>客户端：</th>
            <td>{{orderInfo.clientName}}</td>
          </tr>
          <tr>
            <th>服务区：</th>
            <td>{{orderInfo.domainName || '无'}}</td>
          </tr>
          <tr>
            <th>服务器：</th>
            <td>{{orderInfo.serverName}}</td>
          </tr>
          <tr>
            <th>商品类型：</th>
            <td>{{orderInfo.subClassName}}</td>
          </tr>
          <tr v-show="gameAccount">
            <th>游戏账号：</th>
            <td>
              <s-row justify="between">
                <s-col :span="17">{{gameAccount}}</s-col>
                <s-col>
                  <s-button style="margin-top: -.03rem;"
                  type="default"
                  outline
                  @click="copyAccount()"
                  size="xs">复制账号</s-button>
                </s-col>
              </s-row>
            </td>
          </tr>
          <tr v-show="gamePassword">
            <th>游戏密码：</th>
            <td>
              <s-row justify="between">
                <s-col :span="17">{{gamePassword}}</s-col>
                <s-col>
                  <s-button style="margin-top: -.03rem"
                  type="default"
                  outline
                  @click="copyPassword()"
                  size="xs">复制密码</s-button>
                </s-col>
              </s-row>
            </td>
          </tr>
          <tr v-for="item in orderInfo.orderAccountInfos"
          :key="item.attrId"
          v-if="item.attrValueType !== 1 && item.attrValueType !== 2">
            <th>{{item.attrName}}：</th>
            <td>{{item.value}}</td>
          </tr>
          <tr>
            <th>补充说明：</th>
            <td>{{orderInfo.additionalRemarks}}</td>
          </tr>
        </table>

      </s-panel>

      <!-- <div class="mt-20 extract-question">

        <table class="tableData tableData-sm tableData-block">
          <tbody>
            <tr>
              <th>密保问题1：</th>
              <td>你的小学老师是谁？</td>
            </tr>
            <tr>
              <th>答案：</th>
              <td>张三</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>密保问题1：</th>
              <td>你的中学老师是谁？</td>
            </tr>
            <tr>
              <th>答案：</th>
              <td>张三</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>密保问题1：</th>
              <td>你的大学老师是谁？</td>
            </tr>
            <tr>
              <th>答案：</th>
              <td>张三</td>
            </tr>
          </tbody>
        </table>

      </div> -->

      <div class="extract-warning">
        <div>

          <ul>
            <li>请您尽快登录游戏核实信息是否正确</li>
            <li>若核对无误，请立即修改密码和密保信息</li>
            <li>不要将此信息泄露给其他人，避免账号被盗</li>
            <li>若有问题，请咨询在线客服或申请仲裁</li>
            <li>若提示账号或密码错误，请点击下方的“下载游戏”按钮，下载正确的客户端再试</li>
          </ul>

          <p>交易虎祝您游戏愉快！</p>

          <a target="_blank" href=""></a>

        </div>
      </div>

      <s-suspension shadow>
        <s-row gutter=".1rem">
          <s-col span="12">
            <s-button native="link"
                      :href="orderInfo.gmDownloadUrl ? orderInfo.gmDownloadUrl : 'javascript:;'"
                      :disabled="!orderInfo.gmDownloadUrl"
                      download
                      type="default"
                      block>下载游戏</s-button>
          </s-col>
          <s-col span="12">
            <s-button native="link"
                      :href="orderInfo.accountUrl ? orderInfo.accountUrl : 'javascript:;'"
                      :disabled="!orderInfo.accountUrl"
                      type="primary"
                      block
                      shadow>修改密码</s-button>
          </s-col>
        </s-row>
      </s-suspension>

    </s-main>

  </s-app>

</template>

<script>

  import copy from '../../../core/copy';
  export default {
    name: 'extract',
    props: {},
    data () {
      return {

        // 页面是否加载完成
        loading: null,

        // 订单ID
        orderId: null,

        // 订单信息
        orderInfo: {},

        // 游戏账号
        gameAccount: null,

        // 游戏密码
        gamePassword: null,
      }
    },
    methods: {

      copyAccount () {

        if (this.$browser.isMobile) {
          this.$Dialog.alert('长按复制', {
            mini: true,
            title: this.gameAccount
          });
          return false;
        }
        copy(this.gameAccount);
        this.$Message.success('游戏账号复制成功!');


      },

      copyPassword () {
        if (this.$browser.isMobile) {
          this.$Dialog.alert('长按复制', {
            mini: true,
            title: this.gamePassword
          });
          return false;
        }
        copy(this.gamePassword);
        this.$Message.success('游戏密码复制成功!');


      },

      /**
       * 获取订单信息
       * @return {[type]} [description]
       */
      getOrderInfo () {
        if (this.loading) return false;
        this.loading = true;
        this
          .$http
          .post('/h5/buyer/pickupAccountPasswd', {
            orderId: this.orderId
          })
          .then(response => {
            if (response.body.code !== '000') return false;
            this.orderInfo = response.body.data.info;

            // 从属性数组中提取账号密码
            this.gameAccount = (this.orderInfo.orderAccountInfos.find(item => item.attrValueType === 1) || {}).value;
            this.gamePassword = (this.orderInfo.orderAccountInfos.find(item => item.attrValueType === 2) || {}).value;
          })
          .finally(() => this.loading = false);
      }

    },
    created () {
      this.orderId = Number(this.$route.query.orderId);
    },
    mounted () {
      this.getOrderInfo();
    }
  }
</script>

<style lang="scss">
  @import "./extract.scss";
</style>