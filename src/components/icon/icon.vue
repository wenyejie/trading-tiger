<!--
 - author: Storm
 - date: 2017/03/28
 -->

<template>
  <i :class="classes" :style="styles"></i>
</template>

<script>
  const prefix = 's-icon';

  export default {
    name: 'Icon',
    props: {
      type: String,
      size: [Number, String],
      color: String
    },
    computed: {
      classes () {
        return `${prefix} ${prefix}-${this.type}`;
      },
      styles () {
        let css = {};
        if (this.size) {
          css['font-size'] = `.${this.size}rem`;
        }

        if (this.color) {
          css.color = this.color;
        }
        return css;
      }
    }
  }
</script>

<style lang="scss">
  @font-face {
    font-family: "s-iconfont";

    src: url('//at.alicdn.com/t/font_te59jjduyhc9pb9.eot');
    src: url('//at.alicdn.com/t/font_te59jjduyhc9pb9.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_te59jjduyhc9pb9.woff') format('woff'),
    url('//at.alicdn.com/t/font_te59jjduyhc9pb9.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_te59jjduyhc9pb9.svg#iconfont') format('svg');
  }
  .s-icon {

    font-family: "s-iconfont" !important;
    line-height: 1;
    font-size: inherit;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &-appreciate:before {
      content: "\e644";
    }
    &-check:before {
      content: "\e645";
    }
    &-close:before {
      content: "\e646";
    }
    &-edit:before {
      content: "\e649";
    }
    &-favorfill:before {
      content: "\e64b";
    }
    &-favor:before {
      content: "\e64c";
    }
    &-roundcheckfill:before {
      content: "\e656";
    }
    &-roundcheck:before {
      content: "\e657";
    }
    &-roundclosefill:before {
      content: "\e658";
    }
    &-roundclose:before {
      content: "\e659";
    }
    &-search:before {
      content: "\e65c";
    }
    &-timefill:before {
      content: "\e65e";
    }
    &-time:before {
      content: "\e65f";
    }
    &-unfold:before {
      content: "\e661";
    }
    &-commentfill:before {
      content: "\e666";
    }
    &-comment:before {
      content: "\e667";
    }
    &-likefill:before {
      content: "\e668";
    }
    &-like:before {
      content: "\e669";
    }
    &-back:before {
      content: "\e679";
    }
    &-more:before {
      content: "\e684";
    }
    &-right:before {
      content: "\e6a3";
    }
    &-moreandroid:before {
      content: "\e6a5";
    }
    &-deletefill:before {
      content: "\e6a6";
    }
    &-delete:before {
      content: "\e6b4";
    }
    &-fold:before {
      content: "\e6de";
    }
    &-appreciatefill:before {
      content: "\e6e3";
    }
    &-infofill:before {
      content: "\e6e4";
    }
    &-info:before {
      content: "\e6e5";
    }
    &-female:before {
      content: "\e71a";
    }
    &-male:before {
      content: "\e71c";
    }
    &-add1:before {
      content: "\e767";
    }
    &-move:before {
      content: "\e768";
    }
    &-triangledownfill:before {
      content: "\e79b";
    }
    &-triangleupfill:before {
      content: "\e79c";
    }

    &-warnfill:before,
    &-warn:before {
      transform: rotate(180deg);
      line-height: 0.875;
    }

    &-warnfill:before {
      content: "\e6e4";

    }
    &-warn:before {
      content: "\e6e5";
    }

    &-link:before {
      content: "\e62c";
    }

    &-loading,
    &-notification,
    &-warning,
    &-share,
    &-scan {
      width: 1em;
      height: 1em;
      display: inline-block;
      vertical-align: -.175em;
      background-size: 100%;
    }

    &-share {
      background-image: url(../../assets/icon-share.png);
    }

    &-notification {
      background-image: url(../../assets/notification.png);
    }

    &-warning {
      background-image: url(../../assets/warning.png);
    }

    &-scan {
      background-image: url(../../assets/icon-scan.png);
    }

    &-loading {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=);
      animation: s-loop 1s steps(12, end) infinite;
    }

    &-success:before {
      content: '\e656';
      color: #6fd769;
    }

    &-error:before {
      content: '\e658';
      color: #ee5a5a;
    }

  }
  @keyframes s-loop {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
