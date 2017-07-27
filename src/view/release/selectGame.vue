<!--
 - 选择游戏
 -
 - author: Storm
 - date: 2017/04/17
 -->

<template>

  <s-app>
    <s-header>选择游戏</s-header>

    <s-main bgc="white">

      <s-search placeholder="请输入游戏名称"
                v-model="searchKey"
                class="searchGame"
                @on-button-click="handleSearch"
                text="搜索"></s-search>

      <ul class="search-game">
        <s-game v-for="item in games"
                :key="item.gameId"
                @click="selectHotGame(item)"
                :game="item"></s-game>
      </ul>

      <s-nothing status="search" v-if="!games.length && searching !== null"></s-nothing>

      <div class="content-lg" v-if="searching === null">

        <section class="searchGame-history section" v-if="histories.length">
          <h3 class="section-title">最近搜索</h3>
          <s-cell padding="0"
                  v-for="item in histories"
                  :key="item.gameId"
                  @click="choseGame(item)">
            <s-icon type="timefill"></s-icon>
            <span>{{item.gameName}}</span>
            <a @click.stop="removeHistory(item.gameId)"
               href="javascript:;"
               slot="right"
               v-if="!searchKey"><s-icon type="close"></s-icon></a>
          </s-cell>
        </section>

        <section class="section">

          <h3 class="section-title">热门游戏</h3>

          <s-game-grid>
            <s-game-grid-item
              :key="item.gameId"
              v-for="item in hotGames"
              :link="`/release/selectClass?gameId=${item.gameId}&gameName=${item.gameName}`"
              :game="item"></s-game-grid-item>
          </s-game-grid>

          <!--<ul class="game game-grid">
            <li class="game-item" v-for="item in hotGames" @click="selectHotGame(item)">
              <img class="game-icon" src="http://img.la/100x100?s=demo">
              <p class="game-name">{{item.gameName}}</p>
            </li>
          </ul>-->

        </section>

      </div>

    </s-main>
  </s-app>

</template>

<script>
  import Search from '@/components/search';
  import {gameGrid, gameGridItem} from '@/components/gameGrid';
  import game from '@/components/game';
  import history from '@/untils/gameSearchHistory';
  import hotGames from '@/data/hotGames';

  let searchTimer = null;

  let oldSearch = '';

  export default {
    name: 'SelectGame',
    components: {
      sSearch: Search,
      sGameGrid: gameGrid,
      sGameGridItem: gameGridItem,
      sGame: game
    },
    props: {},
    data () {
      return {

        // 搜索游戏列表
        games: [],

        // 热门游戏
        hotGames: hotGames,

        // 搜索关键字
        searchKey: '',

        // 搜索中...
        searching: null,

        // 搜索历史
        histories: []
      }
    },
    watch: {
      searchKey () {

        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
          this.searchGame();
        }, 1000);

      }
    },
    methods: {

      // 搜索事件
      handleSearch () {
        this.searchGame();
      },

      /**
       * 移除历史
       * @param gameId 游戏ID
       */
      removeHistory (gameId) {
        history.remove(gameId);
        this.getHistory();
      },

      /**
       * 获取存储的搜索历史
       */
      getHistory () {
        this.histories = history.get();
      },

      /**
       * 选择游戏
       * @param item 选的的数据
       */
      choseGame (item) {

        // 保存该条数据
        history.set(item);

        this.selectHotGame(item);
      },

      /**
       * 执行游戏搜索方法
       * @returns {boolean}
       */
      searchGame () {
        if (oldSearch === this.searchKey) return false;
        //if (this.searching) return false;
        //this.searching = true;
        this
          .$http
          .post('/h5/game/searchGame', {gameName: this.searchKey})
          .then(response => {
            if (response.data.code !== '000') return false;
            this.games = response.data.data.list;
          })
          .finally(() => this.searching = false);
      },

      /**
       * 选择热门游戏
       * @param item
       */
      selectHotGame (item) {
        history.set(item);
        this.$router.push({
          name: 'selectClassRelease',
          query: {gameId: item.gameId, gameName: item.gameName}
        });
      }
    },
    created () {
      this.getHistory();
    },
    mounted () {
      const search = document.querySelector('[type="search"]');
      search && search.focus();
    }
  }
</script>

<style lang="scss">
  .section {

    &-title {
      line-height: .64rem;
      color: #ccc;
    }

    & + & {
      margin-top: .32rem;
    }
  }
</style>
