<!--
 - nothing
 -
 - author: Storm
 - date: 2017/04/22
 -->

<template>
  <figure class="s-nothing">
    <img class="s-nothing-img" :src="icon" alt="nothing">
    <figcaption class="s-nothing-title">{{title}}</figcaption>
    <p class="s-nothing-subtitle" v-if="subtitle">{{subtitle}}</p>
    <slot v-if="button">
      <s-button class="s-nothing-btn"
                type="primary"
                shadow
                @click="handleClick">{{button}}
      </s-button>
    </slot>
  </figure>
</template>

<script>

  // 是否需要计算最小高度
  let isComputedMinHeight = true;

  // nothings list
  const nothings = {
    goods: {
      title: '没有找到对应的商品',
      icon: require('../../assets/no-goods.png')
    },
    search: {
      title: '没有找到对应的游戏',
      icon: require('../../assets/no-search.png')
    },
    network: {
      title: '网络出问题啦',
      subtitle: '程序猿在开小差，点击刷新重试',
      button: '刷新',
      icon: require('../../assets/no-network.png')
    },
    order: {
      title: '您暂时还没有相关订单',
      subtitle: '可以去看看哪些想买的',
      button: '去购买',
      icon: require('../../assets/no-order.png')
    },
    404: {
      title: '页面不存在或者已删除',
      icon: require('../../assets/no-404.png')
    },
    500: {
      title: '服务器或网络错误, 请稍候重试!',
      icon: require('../../assets/no-network.png')
    },
    data: {
      title: '暂无数据',
      icon: require('../../assets/no-data.png')
    },
    connection: {
      title: '哎呀，连不上对话啦！',
      subtitle: '程序猿在泡妞，请尝试重连',
      button: '尝试重连'
    }
  };

  export default {
    name: 'nothing',
    props: {
      status: {
        type: String,
        validator (val) {
          return val in nothings;
        }
      },
      explain: String
    },
    data () {
      return {

        // 标题
        title: '',

        // 副标题
        subtitle: '',

        // 按钮
        button: '',

        // 图标
        icon: null,
      }
    },
    methods: {
      handleClick () {
        switch (this.status) {
          case 'network':
            this.$router.go(-1);
            return false;
          case 'order':
            this.$router.push({
              path: '/'
            });
            return false;
          default:
            break;
        }
        this.$emit('click');
      },

      /**
       * 计算最小高度
       * 用来兼容android 4.3- 不支持vh, vw
       */
      minHeight () {
        this.$el.style.minHeight = window.innerHeight + 'px';
      },

      /**
       * 组件初始化
       */
      init () {
        let minHeight = window.getComputedStyle(this.$el)['minHeight'];
        minHeight = parseInt(minHeight);
        if (minHeight) isComputedMinHeight = false;

        isComputedMinHeight && this.minHeight();
        isComputedMinHeight && window.addEventListener('resize', this.minHeight);
      }
    },
    mounted () {
      this.init();
    },
    beforeDestroy () {

      // 当窗口大小改变时, 重新变更最小高度
      isComputedMinHeight && window.removeEventListener('resize', this.minHeight);
    },
    mounted () {
      this.title = nothings[this.status].title;
      this.subtitle = nothings[this.status].subtitle;
      this.button = nothings[this.status].button;
      this.icon = nothings[this.status].icon;
      if (this.explain) this.title = this.explain;
    }
  }
</script>

<style lang="scss">
  .s-nothing {
    text-align: center;
    background-color: #fff;
    padding-top: 2.28rem;

    position: absolute;
    z-index: 10;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    top: 0;

    @media all and (orientation: landscape) and (max-width: 768px) {

      min-height: 100vw;

    }

    &-img {
      width: 3.9rem;
      height: 3.9rem;
      display: block;
      margin-right: auto;
      margin-left: auto;
    }

    &-title {
      font-size: .26rem;
      line-height: 1;
    }

    &-subtitle {
      color: #999;
      font-size: .22rem;
      line-height: 1;
      margin-top: .14rem;
    }

    &-btn {
      margin-top: .6rem;
      width: 2.86rem;
    }

  }

</style>
