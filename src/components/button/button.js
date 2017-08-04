/**
 * button 组件
 *
 * author: Storm
 * date: 2017/03/28
 **/

export default {
  name: 'button',
  render (h) {
    let $this = this;
    let child = [];

    const tag = this.native !== 'link' ? 'button' : 'a';

    let attrs = {
      type: this.native,
      disabled: this.disabled,
      readonly: this.readonly
    };

    if (tag === 'a') {
      attrs.href = this.href;
      attrs.target = this.target;

      if (this.native === 'link') delete attrs.type;
      if (this.download) attrs.download = 'download';

    }


    if (this.icon) {
      child.push(h(
        's-icon',
        {
          props: {
            type: this.icon
          }
        }
      ));
    }

    child.push(
      h(
        'span',
        this.$slots.default
      )
    );

    return h(
      tag,
      {
        'class': this.classes,
        attrs,
        on: {
          click ($event) {
            $this.$emit('click', $event);
          }
        }
      },
      child
    );
  },
  props: {
    native: {
      type: String,
      default: 'button',
      validator (val) {
        return ['button', 'submit', 'reset', 'link'].includes(val);
      }
    },
    type: {
      type: String,
      default: 'default',
      validator (val) {
        return ['default', 'primary', 'link'].includes(val);
      }
    },
    size: {
      type: String,
      validator (val) {
        return ['lg', 'sm', 'xs'].includes(val);
      }
    },
    shape: {
      type: String,
      validator (val) {
        return ['angle'].includes(val);
      }
    },
    target: {
      type: String,
      default: '_blank'
    },
    disabled: Boolean,
    readonly: Boolean,
    download: Boolean,
    href: String,
    block: Boolean,
    outline: Boolean,
    icon: String,
    shadow: Boolean
  },
  data () {
    return {}
  },
  methods: {
    handleClick (event) {
      this.$emit('click', event);
    }
  },
  computed: {
    classes () {
      return [
        's-button',
        {
          [`s-button-${this.type}`]: !!this.type,
          [`s-button-${this.size}`]: !!this.size,
          [`s-button-${this.shape}`]: !!this.shape,
          [`s-button-block`]: !!this.block,
          [`s-button-outline`]: !!this.outline,
          [`s-button-shadow`]: !!this.shadow,
        }
      ]
    }
  }
}
