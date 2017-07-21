<!--
 - Tabs
 -
 - author: Storm
 - date: 2017/04/10
 -->

<template>
  <div class="s-tabs" :class="classes">
    <div class="s-tabs-nav">
      <ul>
        <li
          v-for="nav in navList"
          :class="nav._uid === activeUid ? 'on' : ''"
          @click="toggleTab(nav)"
          class="s-tabs-nav-item">{{nav.label}}
        </li>
      </ul>
    </div>
    <div class="s-tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Tabs',
    props: {
      value: {
        type: [Number, String],
        default: 0
      },
      direction: {
        type: String,
        default: 'horizontal',
        validator (val) {
          return ['horizontal', 'vertical'].includes(val);
        }
      },
      name: {
        type: String,
        default: 'tab'
      },

      // 隐藏时是否移除dom
      removeDom: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {

        // tab nav list
        navList: [],

        // 当前选中uid
        activeUid: 0,

        // URL中带入的tab参数, 用来默认选中哪个tabPanel
        tabQuery: ''
      }
    },
    computed: {
      classes () {
        return {
          [`s-tabs-${this.direction}`]: !!this.direction
        }
      }
    },
    methods: {

      /**
       * 切换tab panel
       * @param item 导航实例
       */
      toggleTab (item) {
        if (this.activeUid === item._uid) return false;
        this.activeUid = item._uid;
        this.$emit('input', item.name);
        this.$emit('on-change', item.name);
      },

      /**
       * 新增一个tab panel, 该方法由子组建tabPanel调用
       * @param obj panel 参数, label, tab导航名称, name, 导航英文名称, _uid, panel uid
       */
      pushPanel (obj) {
        this.navList.push(obj);
      },
    },
    watch: {
      value (val) {
        //this.activeUid = val;
        const result = this.navList.find(item => item.name === val);
        if (!result) return false;

        this.activeUid = result._uid;
      },
      navList (list) {

        // 存放被选中的panel的uid
        let nav = null;

        list.forEach((item, index) => {

          // 如果传入值为string类型并且等于panel name 则默认选中
          if (typeof this.value === 'string' && this.value === item.name) nav = item;

          // 如果传入值为number类型并且等于panel index 则默认选中
          else if (typeof this.value === 'number' && this.value === index) nav = item;

          // 如果值跟链接中获取的参数一致, 则默认选中该tab
          else if (this.tabQuery !== undefined && this.tabQuery === item.name) nav = item;

        });

        // 如果没有默认选中操作, 则赋予tab一个默认值
        if (!nav) nav = list[0];


        // 执行切换方法
        this.toggleTab(nav);

      }
    },
    mounted () {
      this.tabQuery = this.$route.query[this.name];
    }
  }
</script>

<style lang="scss">
  .s-tabs {

    display: flex;
    background-color: #fff;

    &-nav {

      font-size: .24rem;

      &-item {
        text-align: center;
        cursor: pointer;
        color: #999;
        position: relative;
        transition: all .3s ease-in-out;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        padding: 0 .1rem;

        &.on {
          color: #fd802c;
        }

      }

    }

    &-horizontal {

      flex-direction: column;

      .s-tabs-nav {
        ul {
          display: flex;
        }

        &-item {
          flex: 1;
          line-height: .78rem;
          border-bottom: .02rem solid transparent;

          &.on {
            border-bottom-color: #fd802c;
          }

          & + .s-tabs-nav-item:before {
            content: '';
            width: 1px;
            height: .24rem;
            top: 50%;
            margin-top: -.12rem;
            background-color: #e5e5e5;
            position: absolute;
            left: -.005rem;
          }
        }
      }

      .s-tabs-panel {
        padding: .3rem;
      }
    }

    &-vertical {

      .s-tabs-nav {

        align-self: stretch;
        background-color: #f7f7f7;

        &-item {
          width: 1.6rem;
          height: .88rem;
          line-height: .88rem;

          &.on {
            background-color: #fff;
          }

        }
      }

      .s-tabs-content {
        align-self: stretch;
        flex: 1;
      }

      .s-tabs-panel {
        padding: .2rem;
      }

    }

  }
</style>
