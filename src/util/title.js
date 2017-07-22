function getTitle (vm) {
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title
  }
}

const serverTitleMixin = {
  created () {
    const title = getTitle(this)
    if (title) {
      this.$ssrContext.title = `交易虎_手机游戏交易平台_手游交易_帐号交易_游戏币交易_装备交易_道具交易_jiaoyihu | ${title}`
    }
  }
}

const clientTitleMixin = {
  mounted () {
    const title = getTitle(this)
    if (title) {
      document.title = `交易虎_手机游戏交易平台_手游交易_帐号交易_游戏币交易_装备交易_道具交易_jiaoyihu | ${title}`
    }
  }
}

export default process.env.VUE_ENV === 'server'
  ? serverTitleMixin
  : clientTitleMixin
