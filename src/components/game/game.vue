<!--
 - 游戏
 -
 - author: Storm
 - date: 2017/05/27

 - <s-label type="android">安卓</s-label>
 - <s-label type="ios">ios</s-label>
 - <s-label type="jailbreak">苹果越狱</s-label>
 -->

<template>
  <li class="s-game" @click="handleClick">
    <div class="s-game-icon">
      <qiniu-img :src="game.gameIcon" width="100" height="100"></qiniu-img>
    </div>
    <div class="s-game-info">
      <h3 class="s-game-title"><span class="text-middle">{{game.gameName}}</span>
        <s-label v-for="(item, index) in game.platformIds"
                 :key="index"
                 size="md"
                 :type="item | platformType('type')">{{item | platformType('name')}}
        </s-label>
      </h3>
      <div class="s-game-class">
        <s-label type="outline"
                 size="lg"
                 v-for="(item, index) in game.goodsClassIds"
                 :key="index">{{item | goodsClass('name')}}
        </s-label>
      </div>
    </div>
  </li>
</template>

<script>
  import goodsClass from '../../filters/goodsClass';
  import platformType from '../../filters/platformType';
  export default {
    name: 'game',
    filters: {
      goodsClass,
      platformType
    },
    props: {
      game: Object
    },
    data () {
      return {}
    },
    methods: {
      handleClick () {
        this.$emit('click');
      }
    }
  }
</script>

<style lang="scss">
  .s-game {
    display: flex;
    padding: .24rem;
    border-bottom: 1px solid #E5E5E5;
    align-content: center;

    &-title {
      line-height: 1;
    }

    &-icon {
      margin-right: .15rem;
      font-size: 0;

      img {
        border-radius: .24rem;
        width: 1rem;
        height: 1rem;
      }

    }
    &-info {
      align-self: center;
    }

    &-class {
      margin-top:  .1rem;
    }
  }
</style>
