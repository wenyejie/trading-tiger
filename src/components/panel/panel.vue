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
