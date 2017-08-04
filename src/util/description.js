/**
 * description
 *
 * author: Storm
 * date: 2017/08/03
 */


function getDescription (vm) {
  const { description } = vm.$options
  if (description) {
    return typeof description === 'function'
      ? description.call(vm)
      : description
  }
}

const serverDescriptionMixin = {
  created () {
    const description = getDescription(this);
    if (description) {
      this.$ssrContext.description = `${description}`
    }
  }
}

const clientDescriptionMixin = {
  mounted () {
    const description = getDescription(this)
    if (description) {
      document.description = `${description}`
    }
  }
}

export default process.env.VUE_ENV === 'server'
  ? serverDescriptionMixin
  : clientDescriptionMixin
