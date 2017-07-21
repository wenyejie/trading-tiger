<!--
 - Panel
 -
 - author: Storm
 - date: 2017/04/19
 -->

<template>
  <section class="s-panel" :style="styles">
    <header class="s-panel-header" v-if="title">
      <slot name="header">
        <h4>
          <s-icon v-if="icon" :type="icon"></s-icon>
          {{title}}
        </h4>
      </slot>
      <div v-if="hasTool" class="s-panel-tool">
        <slot name="tool"></slot>
      </div>
    </header>
    <div class="s-panel-body" :style="bodyStyles">
      <slot></slot>
    </div>
    <footer class="s-panel-footer" v-if="hasFooter">
      <slot name="footer"></slot>
    </footer>
  </section>
</template>

<script>
  export default {
    name: 'Panel',
    props: {
      title: String,
      icon: String,
      bottom: [Number, String],
      padding: [Number, String]
    },
    data () {
      return {
        hasFooter: null,
        hasTool: null
      }
    },
    computed: {
      styles () {
        let styles = {};
        if (this.bottom) styles.paddingBottom = this.bottom + (/^\d+$/.test(this.bottom) ? 'px' : '');
        return styles;
      },
      bodyStyles () {
        let result = {};
        if (this.padding) result.padding = this.padding + (/^\d+$/.test(this.padding) ? 'px' : '');
        return result;
      }
    },
    methods: {},
    mounted () {
      this.hasFooter = !!this.$slots.footer;
      this.hasTool = !!this.$slots.tool;
    }
  }
</script>

<style lang="scss">
  .s-panel {
    background-color: #fff;
    font-size: .24rem;

    &-article {

      .s-panel-body {
        line-height: .32rem;
        padding-top: 0;
        color: #666;
      }

    }

    &-lg {
      padding: .4rem .3rem;
    }

    &-none {
      padding: 0;
    }

    &-header {
      font-size: .26rem;
      line-height: 1;
      color: #333;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      padding: .3rem .24rem;

      .s-icon {
        margin-right: .1rem;
      }

    }

    &-body {
      padding: .3rem .24rem;

      .tableData:first-child tr:first-child th,
      .tableData:first-child tr:first-child td {
        padding-top: 0;
      }

      .tableData:last-child tr:last-child th,
      .tableData:last-child tr:last-child td {
        padding-bottom: 0;
      }

    }

    &-tool {
      margin-top: -.1rem;
      margin-bottom: -.1rem;
    }

    &-footer {
      padding-top: .24rem;
    }
  }
</style>
