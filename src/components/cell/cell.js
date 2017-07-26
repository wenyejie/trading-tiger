/**
 * Cell
 *
 * author: Storm
 * date: 2017/04/17
 */

export default {
  name: 'Cell',
  render (h) {
    let self = this;
    let array = [];

    if (!!this.$slots.before) {
      array.push(
        h(
          'div',
          {
            attrs: {
              'class': 's-cell-before'
            }
          },
          this.$slots.before
        )
      );
    }

    array.push(
      h(
        'div',
        {
          attrs: {
            'class': 's-cell-left'
          }
        },
        this.$slots.default
      )
    );

    if (!!this.$slots.right) {
      array.push(
        h(
          'div',
          {
            attrs: {
              'class': 's-cell-right'
            },

          },
          this.$slots.right
        )
      );
    }

    return h(
      this.tag,
      {
        'class': ['s-cell', this.classes],
        'style': this.styles,
        props: {
          'to': this.to,
          'replace': this.replace
        },
        on: {
          click ($event) {
            self.$emit('click', $event);
          }
        }
      },
      array
    );
  },
  props: {

    //
    label: String,

    // 标签名称, 默认div
    tag: {
      type: String,
      default: 'div'
    },

    // 跳转页面
    to: {
      type: String,
      default: ''
    },

    // 大小
    size: {
      type: String,
      validator (val) {
        return ['lg', 'md', 'sm', 'auto'].includes(val)
      }
    },
    // 替换页面
    replace: Boolean,

    // 左右padding
    padding: [Number, String],
  },
  data () {
    return {}
  },
  computed: {
    classes () {
      return {
        [`s-cell-${this.size}`]: !!this.size,
      };
    },
    styles () {
      let styles = {};
      styles.paddingLeft = this.padding + (/^\d+$/.test(this.gutter) ? 'px' : '');
      styles.paddingRight = styles.paddingLeft;
      return styles;
    }
  }
}
