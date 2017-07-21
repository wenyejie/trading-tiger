<!--
 - 个人中心
 -
 - author: Storm
 - date: 2017/04/26
 -->

<template>

  <s-app class="personal">
    <s-header title="个人中心" type="transparent" absolute>
      <template slot="right">
        <router-link to="/" class="personal-icon personal-home"></router-link>
        <a class="personal-icon personal-news" href="javascript:;">
          <s-badge top=".2rem" left=".46rem" v-if="user.unReadCount">{{user.unReadCount}}</s-badge>
        </a>
        <a @click="handleLogout" class="personal-icon personal-exit" href="javascript:;"></a>
      </template>
    </s-header>

    <s-main>

      <s-row class="personal-header" justify="between">
        <s-col class="personal-header-l">
          <!--<router-link to="/user/login">登录／注册</router-link>-->
          <a @click="handleModify" class="personal-name" href="javascript:;">{{user.nickName}}</a>
          <p class="personal-phone">{{user.mobile}}</p>
        </s-col>
        <!--<s-col><img src="../../assets/defaultPortrait.png"></s-col>-->
        <s-col>
          <a class="personal-img"
             href="javascript:;"
             :style="{'background-image': user.avatarUrl}"></a>
        </s-col>
      </s-row>

      <s-panel title="买家管理" class="personal-panel" padding="0">
        <s-grid class="personal-grid">
          <li>
            <router-link to="/order/buyer/unpaid">
              <img src="../../assets/icon-unpaid.png">
              <p>未支付</p>
              <s-badge v-if="user.waitPayOrderCount">{{user.waitPayOrderCount}}</s-badge>
            </router-link>
          </li>
          <li>
            <router-link to="/order/buyer/trading">
              <img src="../../assets/icon-unshipped.png">
              <p>待发货</p>
              <s-badge v-if="user.waitDeliverOrderCount">{{user.waitDeliverOrderCount}}</s-badge>
            </router-link>
          </li>
          <li>
            <router-link to="/order/buyer">
              <img src="../../assets/icon-order.png">
              <p>全部订单</p>
            </router-link>
          </li>
        </s-grid>
      </s-panel>

      <s-panel title="卖家管理" class="personal-panel mt-20" padding="0">
        <template slot="tool">
          <s-button type="default" size="sm" outline @click="handleRelease">发布商品</s-button>
        </template>
        <s-grid class="personal-grid">
          <li>
            <router-link to="/order/seller/trading">
              <img src="../../assets/icon-transaction.png">
              <p>交易中</p>
              <s-badge v-if="user.tradeIngOrderCount">{{user.tradeIngOrderCount}}</s-badge>
            </router-link>
          </li>
          <li>
            <router-link to="/order/seller/receive">
              <img src="../../assets/icon-shipped.png">
              <p>已发货</p>
              <s-badge v-if="user.onSoldOrderCount">{{user.onSoldOrderCount}}</s-badge>
            </router-link>
          </li>
          <li>
            <router-link to="/order/seller">
              <img src="../../assets/icon-order-seller.png">
              <p>全部订单</p>
            </router-link>
          </li>
          <li>
            <router-link to="/release/goodsClass?status=1">
              <img src="../../assets/icon-audit.png">
              <p>审核中</p>
              <s-badge v-if="user.auditGoodCount">{{user.auditGoodCount}}</s-badge>
            </router-link>
          </li>
          <li>
            <router-link to="/release/goodsClass?status=2">
              <img src="../../assets/icon-onshelf.png">
              <p>已上架</p>
              <s-badge v-if="user.onSoldGoodCount">{{user.onSoldGoodCount}}</s-badge>
            </router-link>
          </li>
          <li>
            <router-link to="/release">
              <img src="../../assets/icon-goods.png">
              <p>全部商品</p>
            </router-link>
          </li>
        </s-grid>
      </s-panel>


      <s-panel title="资金账户" class="personal-panel mt-20" padding="0">
        <template slot="tool">
          <s-button type="default" size="sm" @click="handleWithdraw" outline>提现</s-button>
        </template>
        <s-link to="/personal/balances" size="lg">
          <p class="personal-desc">账户余额(元)</p>
          <p class="personal-price on">{{user.accountBalance}}</p>
          <span slot="right" class="personal-explain">余额明细</span>
        </s-link>
        <s-link to="/personal/withdrawList" size="lg">
          <p class="personal-desc">冻结余额(元)</p>
          <p class="personal-price off">{{user.freezeBalance}}</p>
          <span slot="right" class="personal-explain">提现明细</span>
        </s-link>
        <s-link :to="'/personal/withdraw' + (user.alipayAccount ? 'Modify' : 'Set')" size="lg">
          <p class="personal-account">{{user.alipayAccount || '暂无收款账号'}}</p>
          <!--<p class="personal-account-real" v-if="!user.realNameAuth">未实名认证将无法收款，请先认证</p>-->
          <span slot="right" class="personal-explain">{{user.alipayAccount ? '修改' : '设置'}}收款账户</span>
        </s-link>
      </s-panel>

      <s-footer></s-footer>

    </s-main>
  </s-app>

</template>

<script>
  import badge from '../../components/badge';

  export default {
    name: 'personal',
    components: {
      sBadge: badge
    },
    props: {},
    data () {
      return {

        // 加载中
        loading: null,

        // 登出ing
        logouting: null,

        // 昵称修改中
        modifying: null,

        // 用户ID
        uid: null,

        // 用户数据
        user: {
          accountBalance: 0,
          freezeBalance: 0,
          mobile: '',
          nickName: ''
        }
      }
    },
    methods: {

      // 提现
      handleWithdraw () {
        if (!this.user.alipayAccount) {
          // this.$Message.warning('您当前尚未设置提现账号, 请先设置!');
          this.$router.push({
            path: '/personal/withdrawSet'
          });
          return false;
        }
        this.$router.push({path: '/personal/withdraw'});
      },

      // 修改用户昵称
      handleModify () {
        this
          .$Dialog
          .prompt('请输入昵称！', {
            input: {
              maxlength: 20,
              required: true,
              pattern: /[^a-zA-Z0-9\u4E00-\u9FA5]/g
            }
          })
          .then(nickName => {

            if (this.modifying) return false;
            this.modifying = true;
            this
              .$http
              .post('/h5/user/updateNickName', {
                uid: this.uid,
                nickName
              })
              .then(response => {
                if (response.body.code !== '000') return false;
                this.user.nickName = nickName;
                this.$Message.success('昵称修改成功!');
              })
              .finally(() => this.modifying = false);

          })
      },

      /**
       * 获取用户发布次数
       */
      getPublicationTimes () {
        return new Promise(resolve => {
          this
            .$http
            .post('/h5/seller/publish/sellerPublishGoodsSuccessTimes', {}, {
              loading: true
            })
            .then(response => {
              if (response.body.code !== '000') return false;
              resolve(response.body.data.count);
            })
        })
      },

      /**
       * 我要卖
       */
      handleRelease () {
        if (this.$cookie.has('token')) {

          this.getPublicationTimes()
            .then(times => {

              // 如果发布次数小于一定次数, 则进入防骗提醒
              if (times === null || times < CONFIG.SELLER_PUBLISH_GOODS_SUCCESS_TIMES) {
                this.$router.push({
                  path: '/release/reminder',
                  query: {
                    redirectUrl: '/release/selectGame'
                  }
                });
                return false;
              }

              // 否则进入选择游戏页面
              this.$router.push({path: '/release/selectGame'});
            });
          return false;
        }

        this.$router.push({
          path: '/user/login',
          query: {
            redirectUrl: '/personal'
          }
        });
      },

      // 退出登录
      handleLogout () {

        this
          .$Dialog
          .confirm('确认退出当前账号?', {
            title: '交易虎',
          })
          .then(() => {


            if (this.logouting) return false;
            this.logouting = true;
            this
              .$http
              .post('/h5/user/logout', {uid: this.uid})
              .then(response => {
                if (response.body.code !== '000') return false;

                // 登出成功！ 跳转值首页
                this.$router.push({path: '/'});

                this.$Message.success('退出成功！');
              })
              .finally(() => this.logouting = false);
          }, () => {
          });
      },

      /**
       * 获取账号信息
       * @return {boolean}
       */
      getAccountInfo () {
        if (this.loading) return false;
        this.loading = true;
        this
          .$http
          .get('/h5/user/account', {loading: true})
          .then(response => {
            if (response.body.code !== '000') return false;
            this.user = response.body.data;
          })
          .finally(() => this.loading = false);
      }
    },
    mounted () {
      this.getAccountInfo();
      this.uid = parseInt(this.$cookie.get('uid'));
    }
  }
</script>

<style lang="scss">
  .personal {
    background-image: linear-gradient(to left, #fd8a12 0%, #fda812 100%);
    background-image: url(../../assets/personal-header-bgi.png);
    background-repeat: no-repeat;
    background-size: 100% auto;
    line-height: 1;
    font-size: .24rem;

    &-panel {
      .s-panel-header {
        font-weight: normal;
        padding-bottom: .3rem;
        border-bottom: 1px solid #e5e5e5;
      }

      .s-cell-left {
        display: block;
      }
    }

    &-img {
      width: 1rem;
      height: 1rem;
      background: url(../../assets/defaultPortrait-0.png) no-repeat center;
      border-radius: 50%;
      border: none;
      background-size: 100%;
      display: block;
    }

    &-desc {
      font-size: .24rem;
      color: #ccc;
    }

    &-price {
      font-size: .46rem;

      &.on {
        color: #ff9616;
      }

      &.off {
        color: #999;
      }

    }

    &-explain {
      color: #999;
    }

    &-account {
      color: #ff9616;
      font-size: .26rem;

      &-real {
        color: #ff9616;
        font-size: .2rem;
      }
    }

    &-grid {

      .s-badge {
        top: .34rem;
        left: 1.13rem;
      }

      a {
        padding: .28rem 0 .38rem;
        display: block;
        color: #999;
        transition: all .3s ease-in-out;
        position: relative;

        &:hover,
        &:focus {
          background-color: #e5e5e5;
        }

      }

      img {
        width: .6rem;
        height: .6rem;
      }
    }

    &-icon {
      background-size: .4rem .4rem;
      background-position: center;
      background-repeat: no-repeat;
      height: 100%;
      width: .4rem;
      box-sizing: content-box;
      position: relative;

      & + & {
        margin-left: .17rem;
      }

    }

    &-news {
      background-image: url(../../assets/icon-letter.png);
    }

    &-home {
      background-image: url(../../assets/icon-house.png);
    }

    &-exit {
      background-image: url(../../assets/icon-exit.png);
    }

    &-header {
      height: 1.92rem;
      padding: .2rem .5rem .72rem .69rem;

      a {
        color: #fff;
        font-size: .36rem;
      }

      &-l {
        padding-top: .2rem;
        overflow: hidden;
        padding-right: .24rem;
        max-width: 4rem;
      }

    }

    &-name {
      font-weight: bold;
      display: inline-block;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;
      padding-right: .5rem;

      &:after {
        position: absolute;
        right: 0;
        margin-top: .06rem;
        content: '';
        margin-left: .2rem;
        width: .24rem;
        height: .24rem;
        background: url(../../assets/icon-edit.png) center no-repeat;
        background-size: 100%;
      }

    }

    &-phone {
      margin-top: .2rem;
      color: #fff;
      background: url(../../assets/icon-phone.png) left center no-repeat;
      background-size: .14rem .2rem;
      padding-left: .24rem;
    }

  }

</style>
