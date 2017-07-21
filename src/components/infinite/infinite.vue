<!--
 - 上拉刷新, 下拉加载
 -
 - author: Storm
 - date: 2017/05/20
 -->

<template>
  <div class="s-infinite" v-show="loading">
    <s-icon size="48" type="loading"></s-icon>
    <!--<div v-if="completed" class="s-infinite-completed">- 没有更多了 -</div>-->
  </div>
</template>

<script>

  // 向上滚动加载更多前页面高度
  let oldOffsetHeight = null;

  // 是否需要滚动加载
  let isScrollLoading = true;

  export default {
    name: 'infinite',
    props: {
      element: {
        default: () => {

        }
      },
      offset: {
        type: Number,
        default: 100
      },
      loading: {
        type: Boolean,
        default: false
      },
      completed: {
        type: Boolean,
        default: false
      },
      direction: {
        default: 'bottom',
        type: String,
        validator (val) {
          return ['bottom', 'top', 'left', 'right'].includes(val);
        }
      }
    },
    data () {
      return {
        $element: this.element
      }
    },
    watch: {
      completed (val) {
        val ? this.onRemove() : this.onAdd();
      },

      /**
       * 监听loading状态, 更改滚动条, 向上滚动高度
       */
      loading (val, oldVal) {

        if (val === false && oldVal === true) {
          isScrollLoading = false;
          setTimeout(() => isScrollLoading = true, 100);
        }

        if (this.direction !== 'top') return false;

        if (val) {
          oldOffsetHeight = document.body.offsetHeight;
          return false;
        }

        const newOffsetHeight = document.body.offsetHeight;

        // 新的页面高度大于旧的页面高度, 即加载数据
        if (newOffsetHeight > oldOffsetHeight) {
          setTimeout(() => window.scrollTo(0, newOffsetHeight - oldOffsetHeight), 50);
        }
      }
    },
    watched: {
      element (val) {
        this.queryElement();

      }
    },
    methods: {

      queryElement () {
        if (!this.element) return false;
        this.$element = typeof this.element === 'string' ? document.querySelector(this.element) : this.element;
        this.$element && this.onAdd();
      },

      /**
       * 移除滚动监听
       */
      onRemove () {
        this.$element && this.$element.removeEventListener('scroll', this.onScroll);
      },

      onAdd () {
        this.$element && this.$element.addEventListener('scroll', this.onScroll);
      },

      onScroll () {
        if ((this.loading || this.completed) || !isScrollLoading) return false;
        this.onInfinite();
      },

      /**
       * event up 加载数据
       * @return {boolean}
       */
      onInfinite () {
        const scrollTop = this.$element.scrollTop || document.body.scrollTop;
        const offsetHeight = this.$element.offsetHeight || window.innerHeight;
        const scrollHeight = this.$element.scrollHeight || document.body.offsetHeight;

        switch (this.direction) {
          case 'bottom':
            if (scrollTop + offsetHeight < scrollHeight - this.offset) return false;
            break;
          case 'top':
            if (scrollTop > this.offset) return false;
            break;
          case 'right':
            break;
          case 'left':
            break;
          default:
            break;
        }
        this.$emit('infinite');
      }
    },
    mounted () {
      this.queryElement();
    },
    beforeDestroy () {
      this.onRemove();
    }
  }
</script>

<style lang="scss">
  .s-infinite {
    text-align: center;
    color: #aaa;
    padding: .24rem 0;

    &-completed {
      font-size: .18rem;
    }
  }
</style>
