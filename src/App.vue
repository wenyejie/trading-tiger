<template>
  <transition name="fade" mode="out-in">
    <router-view class="view"></router-view>
  </transition>
</template>

<style lang="scss">
  /* tag */
  *,
  :after,
  :before {
    box-sizing: border-box;
  }
  * {
    outline: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-overflow-scrolling: touch;
  }
  html {
    font-family: sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  body {
    margin: 0;
  }
  audio,
  canvas,
  progress,
  video {
    display: inline-block;
    vertical-align: baseline;
  }
  audio:not([controls]) {
    display: none;
    height: 0;
  }
  [hidden],
  template {
    display: none;
  }
  p {
    margin: 0;
  }
  a {
    text-decoration: none;
    background-color: transparent;
  }
  a:active,
  a:hover {
    outline: 0;
  }
  abbr[title] {
    border-bottom: 1px dotted;
  }
  b,
  strong {
    font-weight: bold;
  }
  dfn {
    font-style: italic;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: inherit;
    margin: 0;
    font-size: inherit;
  }
  mark {
    background: #ff0;
    color: #000;
  }
  small {
    font-size: 75%;
  }
  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sup {
    top: -0.5em;
  }
  sub {
    bottom: -0.25em;
  }
  img {
    border: 0;
  }
  img,
  video {
    max-width: 100%;
  }
  svg:not(:root) {
    overflow: hidden;
  }
  figure {
    margin: 0;
  }
  hr {
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    height: 0;
  }
  pre {
    overflow: auto;
  }
  code,
  kbd,
  pre,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    color: inherit;
    font: inherit;
    padding: 0;
    margin: 0;
  }
  button {
    overflow: visible;
  }
  button,
  select {
    text-transform: none;
  }
  button,
  input[type="button"],
  input[type="reset"],
  input[type="submit"] {
    cursor: pointer;
  }
  label {
    cursor: pointer;
  }
  [disabled] {
    cursor: not-allowed;
  }
  button::-moz-focus-inner,
  input::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
  input[type="checkbox"],
  input[type="radio"] {
    padding: 0;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    height: auto;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  textarea {
    overflow: auto;
    resize: none;
  }
  optgroup {
    font-weight: bold;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  td,
  th {
    padding: 0;
  }
  th {
    font-weight: normal;
  }
  ul,
  ol {
    margin: 0;
    padding: 0;
  }
  ul,
  ol {
    list-style: none;
  }
  li {
    list-style: inherit;
  }
  /* /tag */

  /* common */
  body {
    font: .24rem/1.5 "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: #333;
    background-color: #f4f4f4;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  a {
    color: #5e97f6;
    transition: color .3s ease-in-out;

  }
  $placeholder: #ccc;

  .s-placeholder {
    color: $placeholder;
  }
  ::-webkit-input-placeholder {
    color: $placeholder;
  }
  :-moz-placeholder {
    color: $placeholder;
  }
  :-ms-input-placeholder {
    color: $placeholder;
  }
  h3 {
    font-size: .28rem;
  }
  .content {
    padding-left: .24rem;
    padding-right: .24rem;

    &-lg {
      padding-left: .3rem;
      padding-right: .3rem;
    }

    &-neg {
      margin-left: -.24rem;
      margin-right: -.24rem;
    }
  }
  /* color */
  .c-3 {
    color: #333;
  }
  .c-6 {
    color: #666;
  }
  .c-9 {
    color: #999;
  }
  .c-b1 {
    color: #b1b1b1;
  }
  .c-c {
    color: #ccc;
  }
  .c-primary {
    color: #fd802c;
  }
  .c-info {
    color: #1ece29;
  }
  .c-error {
    color: #f85959;
  }
  /* /color */

  /* background-color */
  .bgc-white {
    background-color: #fff;
  }
  /* /background-color */

  $required: #fa5a5a;
  .s-form-required {
    &:before {
      content: '*';
      color: $required;
      position: absolute;
      left: .24rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  /* text */

  /* 让文本与inline-block组件对齐 */
  .text-middle {
    vertical-align: middle;
    display: inline-block;
  }
  .text-ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .text-center {
    text-align: center;
  }
  .text-right {
    text-align: right;
  }
  .text-bold {
    font-weight: bold;
  }
  .text-indent {
    text-indent: 2em;
  }
  /* /text */

  /* font-size */
  .fz-22 {
    font-size: .22rem;
  }
  .fz-24 {
    font-size: .24rem;
  }
  .fz-26 {
    font-size: .26rem;
  }
  .fz-28 {
    font-size: .28rem;
  }
  .fz-30 {
    font-size: .3rem;
  }
  /* /font-size */

  /* line-height */
  .lh-0 {
    line-height: 0;
  }
  .lh-1 {
    line-height: 1;
  }
  .lh-1_5 {
    line-height: 1.5;
  }
  /* /line-height */

  /* padding-both */
  .p-both-5 {
    padding-left: .5rem;
    padding-right: .5rem;
  }
  /* /padding-both */

  /* margin-top */
  .mt-15 {
    margin-top: .15rem;
  }
  .mt-20 {
    margin-top: .2rem;
  }
  .mt-25 {
    margin-top: .25rem;
  }
  .mt-30 {
    margin-top: .3rem;
  }
  /* /margin-top */

  /* swiper */
  .s-main .swiper-pagination-bullet-active {
    background-color: #fff;
  }

  .goodsDetail-swiper.swiper-container {
    max-height: 3rem;
  }

  .swiper-container {

    a {
      display: block;
      width: 100%;
    }

    img {
      display: block;
      margin-left: auto;
      margin-right: auto;
      max-width: 100%;
      max-height: 100%;
      width: 100%;
    }

  }
  /* /swiper */

  // table data
  // 利用表格展示数据
  .tableData {
    color: #666;
    font-size: .24rem;
    line-height: 1;

    &-block {
      width: 100%;

      th {
        width: 1.22rem;
      }
    }

    th,
    td {
      padding: .1rem 0;
      word-break: break-all;
      vertical-align: top;

    }

    th {
      color: #b1b1b1;
      text-align: right;
      white-space: nowrap;
    }

    td {
      padding-left: .24rem;
    }

    &-sm {
      th,
      td {
        padding: .06rem 0;
      }
    }

    &-light {
      color: #b1b1b1;
    }

    &-dark {
      color: #333;

      th {
        color: #999;
      }

    }

    &-between {
      width: 100%;

      th {
        width: 1.22rem;
      }

      td {
        text-align: right;
        color: #333;
      }
    }

  }
  /* bg */
  .bg-img,
  .s-card-img {
    width: .24rem;
    height: .24rem;
    display: inline-block;
    vertical-align: middle;
    background: url('assets/image.png') no-repeat center;
    background-size: 100%;
  }
  /* /bg */

  /* card */
  .s-card {

    background-color: #fff;
    margin-top: .2rem;
    font-size: .24rem;

    &-header .s-cell-right {
      max-width: 1.8rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &-left {
      overflow: hidden;
      width: 5.25rem;
    }

    &-title {
      font-size: .26rem;

      &-inner {
        display: inline-block;
        vertical-align: middle;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 4rem;
      }

    }

    &-reason {
      color: #FD802C;
      margin-top: .14rem;
      max-width: 4.96rem;
      word-break: break-all;
    }

    &-time {
      margin-right: .1rem;
      display: inline-block;
      vertical-align: middle;
    }

    &-desc {
      color: #999;
      font-size: .22rem;
      margin-top: .1rem;
    }

    &-confirm {
      color: #999;
    }

  }
  /* /card */

  /* list */
  .list-group {

    line-height: 1;

    li {
      margin-top: .3rem;
    }

    a {
      position: relative;
      display: block;
      padding-left: .18rem;
      color: #333;
      font-size: .26rem;
      font-weight: 300;

      &::before {
        content: '';
        position: absolute;
        width: .06rem;
        height: .06rem;
        border-radius: 50%;
        background-color: #333;
        left: 0;
        top: 50%;
        margin-top: -.03rem;
      }
    }

  }
  /* /list */

  /* textarea */
  .textarea {
    border: none;
    border-top: 1px solid #e5e5e5;
    width: 100%;
    padding: .18rem .24rem;
    min-height: 1.6rem;
  }
  /* /textarea */

  /* /common */

</style>
