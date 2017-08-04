<!--
 - TabsPanel
 -
 - author: Storm
 - date: 2017/04/10
 -->

<template>
  <transition name="s-tabs-panel">
    <div v-show="visible" class="s-tabs-panel" :class="classes">
      <template v-if="removeDom"><slot v-if="visible"></slot></template>
      <template v-else><slot></slot></template>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'TabsPanel',
    props: {
      label: {
        required: true,
        type: String
      },
      name: {
        type: String
      }
    },
    data () {
      return {
        visible: false,

        // 隐藏时是否移除dom
        removeDom: false,
      }
    },
    methods: {},
    computed: {
      classes () {
        this.visible = this.$parent.activeUid === this._uid;
        return this.visible ? 'on' : '';
      }
    },
    mounted () {
      this.$parent.pushPanel({
        label: this.label,
        _uid: this._uid,
        name: this.name
      });
      this.removeDom = this.$parent.removeDom;
    }
  }
</script>
