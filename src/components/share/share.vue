<!--
 - 分享
 -
 - author: Storm
 - date: 2017/07/12
 -->

<template>
  <s-popup v-model="visible" class="s-share" position="fixed" @input="onInput">
    <s-cell class="s-share-description">分享到其他平台提高浏览量,更快速的卖出商品</s-cell>
    <s-grid class="s-share-grid" :col="4">
      <li v-for="item in shares" class="s-share-item" @click="onShare(item)">
        <figure>
          <img :src="item.icon">
          <figcaption>{{item.name}}</figcaption>
        </figure>
      </li>
      <li class="s-share-item" @click="copyLink">
        <figure>
          <img src="../../assets/share-fzlj.png">
          <figcaption>复制链接</figcaption>
        </figure>
      </li>
    </s-grid>
    <s-cell class="s-share-cancel" @click="onCancel">取消</s-cell>
  </s-popup>
</template>

<script>
  import NativeShare from 'nativeshare';
  import copy from '../../core/copy';

  // 原生浏览器分享实例化
  const nativeShare = new NativeShare();

  // 分享列表
  const shares = [
    {
      id: 1,
      name: '微信好友',
      param: 'wechatFriend',
      icon: require('../../assets/share-wxhy.png')
    },
    {
      id: 2,
      name: '朋友圈',
      param: 'wechatTimeline',
      icon: require('../../assets/share-pyq.png')
    },
    {
      id: 3,
      name: 'QQ好友',
      param: 'qqFriend',
      icon: require('../../assets/share-qqhy.png')
    },
    {
      id: 4,
      name: 'QQ空间',
      param: 'qZone',
      icon: require('../../assets/share-qqkj.png')
    },
    {
      id: 5,
      name: '微博',
      param: 'weibo',
      icon: require('../../assets/share-weibo.png')
    },
    {
      id: 6,
      name: '百度贴吧',
      param: 'default',
      icon: require('../../assets/share-bdtb.png')
    }
  ];
  export default {
    name: 'share',
    props: {
      value: Boolean,
      icon: {
        type: String,
        default: location.origin + '/static/icon-114x114.png'
      },
      link: {
        type: String,
        default: location.href
      }
    },
    data () {
      return {
        shares,
        visible: this.value
      }
    },
    watch: {
      value (val, oldVal) {
        if (val === oldVal) return false;
        this.visible = val;
      }
    },
    methods: {

      /**
       * 复制链接
       */
      copyLink () {
        if (this.$browser.isMobile) {
          this.$Dialog.alert('长按复制', {
            mini: true,
            title: location.href
          });
          return false;
        }
        copy(this.order.orderNo);
        this.$Message.success('复制成功！');
      },

      /**
       * 分享事件
       * @param item 分享调用方
       */
      onShare (item) {
        nativeShare.setShareData({
          icon: this.icon,
          link: this.link,
          title: document.title,
          desc: document.querySelector('[name="description"]').content,
          success () {
            this.$Message.success('分享成功!');
          },
          fail () {
            this.$Message.error('分享失败!')
          }
        });


        try {
          nativeShare.call(item.param);
        } catch (e) {
          this.shareAll();
          //this.$Message.error('分享失败或暂不支持该方法!');
        }
      },

      shareAll () {
        try {
          nativeShare.call('default');
        } catch (e) {
          this.$Message.error('分享失败或暂不支持该方法!');
        }
      },

      /**
       * popup弹出框事件监听
       */
      onInput ($event) {
        this.$emit('input', $event);
      },

      /**
       * 取消
       */
      onCancel () {
        this.$emit('input', false);
      },

      /**
       * 组件初始化
       */
      init () {

      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style lang="scss">
  .s-share {
    text-align: center;

    &-description {
      background-color: #f5f5f5;
      color: #999;
    }

    &-grid {
      font-size: .22rem;
      line-height: 1;
      color: #999;
      padding: .25rem .13rem .35rem;

      figure {
        padding: .16rem 0;
      }

      img {
        width: .8rem;
        height: .8rem;
      }

      figcaption {
        margin-top: .14rem;
      }

    }

    &-item {
      cursor: pointer;
      border-radius: .1rem;
      margin: .09rem 0;

      &:hover,
      &:focus {
        background-color: #e5e5e5;
      }
    }

    &-cancel {
      border-top: 1px solid #e5e5e5;
    }
  }
</style>
