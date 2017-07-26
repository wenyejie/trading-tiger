<!--
 - 图片上传组件
 -
 - author: Storm
 - date: 2017/04/20
 -->

<template>
  <div class="s-upload-wrap">
    <ul class="s-upload" :style="styles">
      <li class="s-upload-item"
          v-for="(item, index) in imagesList"
          :key="index"
          :class="{'s-upload-loading': !item.url}">
        <a href="javascript:;" class="s-upload-close" @click="remove(index)">
          <s-icon type="roundclosefill"></s-icon>
        </a>
        <qiniu-img class="s-upload-img"
                   v-show="item.url"
                   :src="item.url"
                   :quality="thumbQuality"
                   :width="thumbWidth"
                   :height="thumbHeight"></qiniu-img>
      </li>
      <li class="s-upload-item s-upload-button">
        <input class="s-upload-input"
               type="file"
               id="s-upload-input"
               @change="chosenImg($event)"
               :disabled="lengthImage >= 10"
               :multiple="multiple"
               :accept="accept">
      </li>
    </ul>
  </div>
</template>

<script>

  import CONFIG from '../../../publish/config';

  // token有效开始时间，toekn
  let startTime, token;

  export default {
    name: 'upload',
    props: {
      value: {
        type: Array,
        default () {
          return [];
        }
      },
      accept: {
        type: String,
        default: 'image/jpg,image/jpeg,image/png'
      },
      width: {
        type: Number,
        default: 640
      },
      height: {
        type: Number,
        default: 300
      },

      // 是否有最大值, 配合size: auto使用
      max: {
        type: Boolean,
        default: true
      },

      // 是否需要最小宽度/高度限制
      isMin: Boolean,

      // 最小宽度
      minWidth: Number,

      // 最小高度
      minHeight: Number,

      // 最大宽度
      maxWidth: {
        type: Number,
        default: 1280
      },

      // 最大高度
      maxHeight: {
        type: Number,
        default: 1280
      },

      // 是否多选
      multiple: {
        type: Boolean,
        default: true
      },

      // 上传图片个数
      lengthLimit: {
        type: Number,
        default: 10
      },
      quality: {
        type: Number,
        default: 0.7
      },
      format: {
        type: String,
        default: ''
      },

      fillStyle: {
        type: String,
        default: '#ffffff'
      },

      /**
       * 大小尺寸
       * @param contain 包含, 完整
       * @param cover 覆盖, 不完整
       */
      size: {
        type: String,
        default: 'auto',
        validator (val) {
          return ['contain', 'cover', 'auto'].includes(val);
        }
      },

      // token有效时间，单位豪秒
      expiry: {
        type: Number,
        default: 3000 * 1000
      },

      // 缩略图宽度
      thumbWidth: {
        type: Number,
        default: 120
      },

      // 缩略图高度
      thumbHeight: {
        type: Number,
        default: 120
      },

      // 缩略图质量
      thumbQuality: {
        type: Number,
        default: 70
      },

      // 域名
      domain: {
        type: String,
        default: CONFIG.IMAGE_SHOW_ADDRESS
      }
    },
    data () {
      return {
        imagesList: [],
        styles: {},
        modelValue: this.value,

        // 现有图片个数
        lengthImage: 0
      }
    },
    watch: {
      value (val, oldVal) {
        if (val === this.modelValue || val === oldVal) return false;
        this.modelValue = val;
        this.render();
      },
      modelValue (val) {

        // this.list.find(item => item[name] === value)[key];

      }
    },
    mounted() {
      this.render();
    },
    methods: {

      /**
       * 移除当前图片
       * @param index 图片列表的下标
       */
      remove (index) {
        this.imagesList.splice(index, 1);
        this.modelValue.splice(index, 1);
        this.lengthImage--;
        this.$emit('input', this.modelValue);
      },

      /**
       * 根据model值重新渲染上传列表
       */
      render () {
        if (!this.modelValue) return false;

        this.modelValue.forEach(url => this.imagesList.push({url}));

        this.lengthImage = this.modelValue.length;
      },

      /**
       * 获取图片信息
       * @param img 图片
       * @param width 需要宽度
       * @param height 裁剪的高度
       * @return {Object} sWidth，sHeight：图片宽高，x，y剪切起点
       */
      getImageInfo (img, width, height) {

        // 剪切图片的长度，宽度，x坐标，y坐标
        let sWidth, sHeight, sX, sY, dX, dY, dWidth, dHeight;

        if (this.size === 'contain') { // 完整居中展示

          // 图片原始比例
          const naturalProportion = img.naturalWidth / img.naturalHeight;

          // 截取图片的比例
          const proportion = width / height;

          sWidth = img.naturalWidth;
          sHeight = img.naturalHeight;
          sX = 0;
          sY = 0;

          if (naturalProportion >= proportion) {
            dWidth = width;
            dHeight = width / naturalProportion;
            dX = 0;
            dY = (height - dHeight) / 2;
          } else {
            dHeight = height;
            dWidth = height * naturalProportion;
            dY = 0;
            dX = (width - dWidth) / 2;
          }

        } else if (this.size === 'cover') {

          // 剪切图片长宽比例
          const proportion = width / height;

          // 获取剪切图片的长度宽度
          if (proportion < img.naturalWidth / img.naturalHeight) {
            sHeight = img.naturalHeight;
            sWidth = sHeight * proportion;
          } else {
            sWidth = img.naturalWidth;
            sHeight = sWidth / proportion;
          }

          // /2 居中裁剪
          sX = (img.naturalWidth - sWidth) / 2;
          sY = (img.naturalHeight - sHeight) / 2;
          dX = 0;
          dY = 0;
          dWidth = width;
          dHeight = height;

        } else if (this.size === 'auto' && this.max) {

          // 图片原始比例
          const naturalProportion = img.naturalWidth / img.naturalHeight;
          if (naturalProportion >= 1) {
            dWidth = img.naturalWidth > this.maxWidth ? this.maxWidth : img.naturalWidth;
            dHeight = dWidth / naturalProportion;
          } else {
            dHeight = img.naturalHeight > this.maxHeight ? this.maxHeight : img.naturalHeight;
            dWidth = dHeight * naturalProportion;
          }
          dX = 0;
          dY = 0;
          sX = 0;
          sY = 0;
          sWidth = img.naturalWidth;
          sHeight = img.naturalHeight;

        } else if (this.size === 'auto') { // 图片多大就多大
          sWidth = img.naturalWidth;
          sHeight = img.naturalHeight;
          sX = 0;
          sY = 0;
          dX = 0;
          dY = 0;
          dWidth = img.naturalWidth;
          dHeight = img.naturalHeight;
        }
        return {sWidth, sHeight, sX, sY, dX, dY, dWidth, dHeight};
      },

      /**
       * 获取图片的base64信息
       * @param file 图片文件
       * @return {Promise} 返回base64位编码的文件
       */
      getBase64 (file) {
        return new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result)
        });
      },

      /**
       * 获取图片信息
       * @param base64 图片base64编码文件
       * @param width 图片宽度
       * @param height 图片高度
       * @param format 图片格式
       * @param quality 图片质量
       * @return {Promise} 返回base64位编码的文件
       */
      getDataURL (base64, width, height, format, quality) {
        return new Promise((resolve, reject) => {

          // 生成图片，并初始化
          const images = document.createElement('img');

          // 解决canvas渲染跨域图片失败的办法
          // ps: safari中会报错
          //images.crossOrigin = 'anonymous';

          images.src = base64;

          // 生成画布，并初始化
          const canvas = document.createElement('canvas');

          images.onload = () => {

            // 图片宽度限制
            if (this.isMin && images.naturalWidth < this.minWidth) reject(`宽度不能小于${this.minWidth}`);

            // 图片高度限制
            if (this.isMin && images.naturalHeight < this.minHeight) reject(`高度不能小于${this.minWidth}`);

            // 调试时使用
            /*this.$el.appendChild(images);
             this.$el.appendChild(canvas);*/

            // 获取图片的剪切信息
            const shear = this.getImageInfo(images, width, height);

            canvas.width = this.size !== 'auto' ? width : images.naturalWidth;
            canvas.height = this.size !== 'auto' ? height : images.naturalHeight;

            if (this.size === 'auto' && this.max) {
              canvas.width = shear.dWidth;
              canvas.height = shear.dHeight;
            }

            // 生成画布工作区
            let context = canvas.getContext('2d');

            // 设置画布底色为透明
            context.fillStyle = this.fillStyle;
            context.fillRect(0, 0, canvas.width, canvas.height);

            // 把图片画到画布上，压缩，剪切等操作
            context.drawImage(
              images,
              shear.sX,
              shear.sY,
              shear.sWidth,
              shear.sHeight,
              shear.dX,
              shear.dY,
              shear.dWidth,
              shear.dHeight
            );

            // 调试时使用
            /*const img = document.createElement('img');
             img.src = canvas.toDataURL(format, quality);
             this.$el.appendChild(img);*/

            // 生成dataRUL并返回
            resolve(canvas.toDataURL(format, quality));

          }

        })
      },

      // 根据file获取图片
      getImg (file) {

        // 列表中已经存在相同名称的图片所以退出
        if (this.imagesList.find(item => item.name === file.name)) {
          this.$Message.warning(file.name + '已经存在不能重复上传!');
          return false;
        }

        if (this.imagesList.length >= this.lengthLimit || this.lengthImage >= this.lengthLimit) {
          this.$Message.warning('最多可以上传' + this.lengthLimit + '张图片');
          return false;
        }

        this.lengthImage++;

        this
          .getBase64(file)
          .then(base64 => {

            this
              .getDataURL(base64, this.width, this.height, this.format, this.quality)
              .then(upload => {

                const obj = {
                  upload,
                  url: '',
                  name: file.name
                };

                // 增加到图片列表中
                this.imagesList.push(obj);

                // 执行上传方法
                this.upload(obj);

                // 重置列表宽度
                //this.styles.width = (this.imagesList.length + 1) * this.itemWidth / 100 + 'rem';

              }, errMessage => this.$Message.error(`图片 "${file.name}" ${errMessage}`));

          });

      },

      /**
       * 选中图片
       * @param $event 图片事件
       * @return {Boolean} 退出
       */
      chosenImg ($event) {

        for (let index = 0; index < $event.target.files.length; index++) {
          this.getImg($event.target.files[index]);
        }

      },

      // 获取七牛token
      getQiniuToken () {
        return new Promise((resolve) => {
          if (token && startTime && (new Date() - startTime) <= this.expiry) resolve();
          this
            .$http
            .post('/h5/qiniu/getUploadToken')
            .then(response => {
              if (response.body.code !== '000') return false;
              startTime = new Date();
              token = response.body.data.uploadToken;
              resolve();
            })
        });
      },

      upload (obj) {
        this
          .getQiniuToken()
          .then(() => {

            const upload = obj.upload.replace(/data:image\/.+;base64,/, '');

            const url = CONFIG.IMAGE_UPLOAD_ADDRESS;

            this
              .$http
              .post(`//${url}/putb64/-1/`, upload, {
                headers: {
                  'Content-Type': 'application/octet-stream',
                  'Authorization': 'UpToken ' + token
                },
                offPrefix: true,
                offCredentials: true
              })
              .then(response => {
                if (response && response.body.key) {
                  obj.url = `//${this.domain}/${response.body.key}`;
                  this.reportLog(obj.url);
                  this.modelValue.push(obj.url);
                  this.$emit('input', this.modelValue);
                }
              })

          });
      },

      /**
       * 图片上传日志上传
       */
      reportLog (picUrl) {
        this.$http.post('/h5/qiniu/uploadImg', {picUrl})
      }
    }
  }
</script>

<style lang="scss">
  .s-upload {

    min-width: 100%;
    margin-left: -.2rem;
    margin-right: -.2rem;

    &:before,
    &:after {
      content: ' ';
      display: table;
    }

    &:after {
      clear: both;
    }

    &-wrap {
      overflow: hidden;
      position: relative;
      padding: .1rem .4rem;
      background-color: #fff;
      border-top: 1px solid #e5e5e5;
    }

    &-item {
      float: left;
      background: #f8f8f8;
      border-radius: .04rem;
      width: 1.2rem;
      height: 1.2rem;
      margin: .1rem .15rem;
      position: relative;

    }

    &-close {
      position: absolute;
      line-height: 1;
      left: -.1rem;
      top: -.1rem;
      width: .32rem;
      height: .32rem;
      color: #fd802c;
      font-size: .3rem;
      padding: 1px;
      background-color: #fff;
      border-radius: 50%;
    }

    &-img {
      width: 100%;
      height: 100%;
      display: block;
    }

    &-button {
      position: relative;

      &:after,
      &:before {
        position: absolute;
        content: '';
        background: #ccc;
        border-radius: .02rem;
        left: 50%;
        top: 50%;
      }

      &:before {
        width: .5rem;
        height: .04rem;
        margin-left: -.25rem;
        margin-top: -.02rem;
      }

      &:after {
        width: .04rem;
        height: .5rem;
        margin-left: -.02rem;
        margin-top: -.25rem;
      }

    }

    &-input {
      position: absolute;
      z-index: 1;
      opacity: 0;
      height: 100%;
      width: 100%;
    }

  }
</style>
