<!--
 - Title
 -
 - author: Storm
 - date: 2017/04/22
 -->

<template>

  <s-app>

    <s-header :sellParams="sellParams">{{goods.gameName}}</s-header>

    <s-main>

      <!-- 筛选 -->
      <ul class="goods-search">
        <li class="goods-search-item"
            @click="phoneChose"
            :class="{'selected': phoneVisible, 'on': query.platformId}"><span>{{phoneText}}</span></li>
        <li class="goods-search-item"
            @click="categoryChose"
            :class="{'selected': categoryVisible, 'on': query.goodsClassId || query.subClassId}">
          <span>{{categoryText}}</span></li>
        <li class="goods-search-item"
            @click="serverChose"
            :class="{'selected': serverVisible, 'on': query.serverId !== -1 || query.domainId}">
          <span>{{serverText}}</span></li>
        <li class="goods-search-item"
            @click="sortChose"
            :class="{'selected': sortVisible, 'on': query.sortRule !== 1}"><span>{{sortText}}</span></li>
      </ul>
      <!-- /筛选 -->

      <!-- 商品列表 -->
      <section class="s-goodsList-wrap">
        <s-goods-list v-for="item in goods.list"
                      :key="item.goodsId"
                      :goods="item"></s-goods-list>
      </section>
      <!-- /商品列表 -->

      <!-- 选择机型 -->
      <s-popup class="goods-popup phone-popup" v-model="phoneVisible" direction="top">
        <s-cell v-for="item in phones"
                :key="item.platformId"
                v-if="item.platformId !== 4"
                @click="phoneSelect(item)">{{item.platformName}}
        </s-cell>
      </s-popup>
      <!-- /选择机型 -->

      <!-- 商品类别 -->
      <s-popup class="goods-popup category-popup" v-model="categoryVisible" direction="top">
        <s-tabs direction="vertical" v-model="categoryModel">
          <s-tabs-panel label="全部" name="all">
            <ul class="category-popup-list">
              <li class="category-popup-item"
                  @click="categorySelect()"
                  :class="{'on': query.subClassId === undefined && query.goodsClassId === undefined}">
                <a href="javascript:;">全部</a>
              </li>
              <li class="category-popup-item"
                  v-for="item in categoriesAllItem"
                  @click="categorySelect(undefined, item)"
                  :class="{'on': item.subClassId === query.subClassId}"
                  :key="item.subClassId"><a href="javascript:;">{{item.subClassName}}</a></li>
            </ul>
          </s-tabs-panel>
          <s-tabs-panel v-for="item in categories"
                        :key="item.classId"
                        v-if="item.subClassList.length"
                        :name="item.classId + ''"
                        :label="item.className">
            <ul class="category-popup-list">
              <li class="category-popup-item"
                  @click="categorySelect(item)"
                  :class="{'on': query.subClassId === undefined && query.goodsClassId === item.classId}">
                <a href="javascript:;">全部</a>
              </li>
              <li class="category-popup-item"
                  v-for="subItem in item.subClassList"
                  @click="categorySelect(item, subItem)"
                  :class="{'on': subItem.subClassId === query.subClassId && query.goodsClassId === item.classId}"
                  :key="subItem.subClassId"><a href="javascript:;">{{subItem.subClassName}}</a></li>
            </ul>
          </s-tabs-panel>
        </s-tabs>
      </s-popup>
      <!-- /商品类别 -->

      <!-- 服务器 -->
      <s-popup class="goods-popup server-popup" removeDom v-model="serverVisible" direction="top">
        <s-tabs direction="vertical" removeDom v-model="serverModel">
          <s-tabs-panel label="全部" name="all">

            <s-search placeholder="服务器名称/数字" text="搜索" v-model="searchKey"></s-search>

            <s-cell :class="{'on': query.serverId === -1 && query.domainId === undefined}"
                    @click="serverSelect(undefined, undefined)">全部
            </s-cell>

            <s-cell v-for="item in serverAll.list"
                    :key="item.serverId"
                    :class="{'on': query.serverId === item.serverId}"
                    @click="serverSelect(undefined, item)">{{item.serverName}}
            </s-cell>

          </s-tabs-panel>

          <!-- item.domainId !== -1 即: 不会没有服务区 -->
          <s-tabs-panel v-for="item in servers"
                        :key="item.domainId"
                        v-if="item.serverList.length && item.domainId !== -1"
                        :name="item.domainId + ''"
                        :label="item.domainName">

            <s-cell :class="{'on': query.serverId === -1 && query.domainId === item.domainId}"
                    @click="serverSelect(item, undefined)">全部
            </s-cell>

            <s-cell v-for="subItem in item.serverList"
                    :key="subItem.serverId"
                    :class="{'on': query.domainId === item.domainId && query.serverId === subItem.serverId}"
                    @click="serverSelect(item, subItem)">{{subItem.serverName}}
            </s-cell>

          </s-tabs-panel>
        </s-tabs>
      </s-popup>
      <!-- /服务器 -->

      <!-- 筛选排序 -->
      <s-popup class="goods-popup sort-popup" v-model="sortVisible" direction="top">
        <s-cell>价格范围
          <input class="sort-popup-number"
                 min="0"
                 :max="query.maxPrice"
                 v-model.number="query.minPrice"
                 type="number">至
          <input class="sort-popup-number"
                 :min="query.minPrice"
                 v-model.number="query.maxPrice"
                 type="number">元
        </s-cell>
        <s-cell>排序方式</s-cell>

        <!--
        PUBLISH_TIME_DESC(1, "按发布时间排序"),
        PRICE_ASC(2, "按价格从低到高排序"),
        PRICE_DESC(3, "按价格从高到低排序"),
        SINGLE_PRICE_ASC(4, "按单价从低到高排序"),
        -->
        <div class="s-radio-list">
          <label class="s-radio-item">
            <input class="s-radio-check" type="radio" name="sortRule" :value="1" v-model="query.sortRule">
            <span class="s-radio-title">默认</span>
            <span class="s-radio-desc">按发布时间排序</span>
          </label>
          <label class="s-radio-item">
            <input class="s-radio-check" type="radio" name="sortRule" :value="2" v-model="query.sortRule">
            <span class="s-radio-title">价格↑</span>
            <span class="s-radio-desc">按价格从低到高排序</span>
          </label>
          <label class="s-radio-item">
            <input class="s-radio-check" type="radio" name="sortRule" :value="3" v-model="query.sortRule">
            <span class="s-radio-title">价格↓</span>
            <span class="s-radio-desc">按价格从高到低排序</span>
          </label>
          <label class="s-radio-item">
            <input class="s-radio-check" type="radio" name="sortRule" :value="4" v-model="query.sortRule">
            <span class="s-radio-title">单价↑</span>
            <span class="s-radio-desc">按单价从低到高排序</span>
          </label>
        </div>

        <div class="sort-popup-tool">
          <s-button size="sm" type="default" @click="clearSort">清空</s-button>
          <s-button size="sm" outline @click="sortConfirm">确定</s-button>
        </div>

      </s-popup>
      <!-- /筛选排序 -->

      <s-nothing status="goods" v-if="!goods.list.length"></s-nothing>

      <s-infinite :loading="loading"
                  :completed="completed"
                  @infinite="onInfinite"></s-infinite>

      <s-infinite :loading="serverAll.loading"
                  v-if="serverModel === 'all'"
                  :completed="serverAll.completed"
                  element=".server-popup .s-popup-content"
                  @infinite="serverAllInfinite"></s-infinite>

    </s-main>


  </s-app>

</template>

<script>
  import GoodsList from '../../components/goodsList';

  // 是否来自详情页
  let isFromDetail = false;

  export default {
    name: 'goodsList',
    components: {
      sGoodsList: GoodsList
    },
    title () {
      return this.goods.gameName ? `${this.goods.gameName}账号交易平台_${this.goods.gameName}游戏币装备道具交易平台_交易虎` : '找不到游戏';
    },
    keywords () {
      return `${this.goods.gameName}账号交易,${this.goods.gameName}游戏币交易,${this.goods.gameName}装备道具交易,交易虎${this.goods.gameName}交易平台`;
    },
    description () {
      return `交易虎是交易最快的${this.goods.gameName}账号交易平台,提供各种${this.goods.gameName}帐号、游戏币、装备道具价格等信息,欢迎选择${this.goods.gameName}频道`;
    },
    data () {
      return {

        phoneVisible: null,
        phoneModel: null,
        phoneText: '选择机型',
        phoneLoading: null,
        phones: [],

        categoryVisible: null,
        categoryModel: null,
        categoryText: '商品类别',
        categoryLoading: null,
        categories: [],
        categoriesAllItem: [],

        serverVisible: null,
        serverModel: null,
        serverText: '服务器',
        serverLoading: null,
        servers: [],
        serverAllItem: [],
        serverTabs: null,

        // 所有服务器数据
        serverAll: {
          loading: null,
          completed: null,
          currentPage: 0,
          pageSize: 20,
          list: []
        },

        sortVisible: null,
        sortModel: null,

        // 加载中
        loading: null,

        // 加载是否完成
        completed: null,

        // 当前页
        currentPage: 0,

        // 页码
        pageSize: 20,

        // 我要卖参数
        sellParams: {},

        query: {
          domainId: undefined,
          gameId: null,
          goodsClassId: undefined,
          platformId: undefined,
          sortRule: 1,
          serverId: -1,
          subClassId: undefined,
          maxPrice: undefined,
          minPrice: undefined
        },

//        goods: [],

        searchKey: ''
      }
    },
    asyncData ({store, route}) {
      return store.dispatch('getGoodsList', route.query);
    },
    methods: {

      /**
       * 清空筛选条件
       */
      clearSort () {
        this.query.minPrice = undefined;
        this.query.maxPrice = undefined;
        this.query.sortRule = 1;
        this.sortVisible = false;
      },

      /**
       * 确定筛选条件
       */
      sortConfirm () {
        this.urlParams();
        this.getGoods();
        this.sortVisible = false;
      },

      onInfinite () {
        this.getGoods(this.currentPage + 1);
      },

      /**
       * 根据筛选条件获取商品列表
       * @param currentPage 页码
       * @param pageSize 每页条数
       */
      getGoods (currentPage = 0, pageSize = 20) {
        if (this.loading) return false;
        this.loading = true;

        const param = Object.assign({}, this.query, {currentPage, pageSize});

        // 若请求为第一页请求, 则重置请求完成的参数
        if (param.currentPage === 0) this.completed = false;

        this.$http
          .post('/h5/goods/gameGoodsFilter', param)
          .then(response => {

            if (response.data.code !== '000') return false;

            if (response.data.data.currentPage !== 0) this.goods = this.goods.concat(response.data.data.list);
            else this.goods = response.data.data.list;

            this.currentPage = response.data.data.currentPage;
            this.pageSize = response.data.data.pageSize;
            this.completed = response.data.data.list.length < pageSize;

            // ******************************************
            // 当商品数据下载下来之后, 才加载其余的数据, 避免体验差

            this.gameName = response.data.data.gameName || '找不到该游戏';

            // 其它过滤条件信息
            if (!this.phones.length) this.getGoodsFilter();


          })
          .finally(() => this.loading = false);
      },

      /**
       * 获取表单过滤条件
       */
      getGoodsFilter () {

        // 设置我要卖的条件信息
        this.sellParams = {
          gameId: this.query.gameId,
          gameName: this.goods.gameName
        };

        // 获取服务器
        this.getServer();

        // 获取商品类型
        this.getCategory();

        // 获取手机类型
        this.getPhone();
      },

      /**
       * 把参数记录到URL中
       */
      urlParams () {
        this.$router.replace({
          path: this.$route.path,
          query: Object.assign({}, this.$route.query, this.query)
        })
      },

      /**
       * 手机选择
       * @param item 平台实例
       */
      phoneSelect (item) {
        if (item.platformId === this.query.platformId) return false;
        this.query.platformId = item.platformId;
        this.phoneText = item.platformName;
        this.phoneVisible = false;

        this.urlParams();
        this.getGoods();
      },

      /**
       * 获取手机平台列表
       * @returns {boolean}
       */
      getPhone () {
        if (this.phoneLoading) return false;
        this.phoneLoading = true;
        this
          .$http
          .post('/h5/goods/findGamePlatform', {})
          .then(response => {
            if (response.data.code !== '000') return false;
            this.phones = response.data.data.list;

            // 如果机型ID已经存在, 但是没有机型名称则遍历数据, 导出机型名称
            if (this.query.platformId && this.phoneText === '选择机型') {
              const result = this.phones.find(item => item.platformId === this.query.platformId);

              this.phoneText = result.platformName;
            }
          })
          .finally(() => this.phoneLoading = false);
      },

      /**
       * 查询商品分类
       * @param item 分类实例
       * @param subItem 子分类实例
       */
      categorySelect (item, subItem) {
        if (item !== undefined) this.categoryText = item.className;

        if (subItem !== undefined) this.categoryText = subItem.subClassName;

        if (item === undefined && subItem === undefined) this.categoryText = '商品类别';

        this.query.goodsClassId = item ? item.classId : undefined;
        this.query.subClassId = subItem ? subItem.subClassId : undefined;
        this.categoryVisible = false;

        this.urlParams();
        this.getGoods();
      },

      /**
       * 获取商品类别
       * @returns {boolean}
       */
      getCategory () {
        if (this.categoryLoading) return false;
        this.categoryLoading = true;
        this
          .$http
          .post('/h5/goods/findClassAndGoodsSubClass', {
            gameId: this.query.gameId
          })
          .then(response => {
            if (response.data.code !== '000') return false;
            this.categories = response.data.data.list;
            // this.categoriesAllItem = this.categories[0].subClassList
            this.getCategoriesAllItem(this.categories);
          })
          .finally(() => this.categoryLoading = false);
      },

      /**
       * 获取所有子分类
       * @param obj 分类集合
       */
      getCategoriesAllItem (obj) {
        this.categoriesAllItem = [];
        obj.forEach(item => {

          // 当不存在类型ID, 并且分类ID存在, 则筛选条件中商品类别中显示分类名称
          if (!this.query.subClassId && this.query.goodsClassId === item.classId) this.categoryText = item.className;

          // 如果商品分类ID等于当前商品分类ID, 则默认选中该商品分类
          if (this.query.goodsClassId === item.classId) this.categoryModel = item.classId + '';

          item.subClassList.forEach(subItem => {

            // 如果存在类型ID, 则筛选条件中商品类别中显示类型名称
            if (subItem.subClassId === this.query.subClassId) this.categoryText = subItem.subClassName;
            this.categoriesAllItem.push(subItem);
          });
        });
      },

      /**
       * 获取所有服务器
       * @param obj 区集合
       */
      getServerAllItem (obj) {
        this.serverAllItem = [];
        obj.forEach(item => {

          // 如果服务器ID为空, 并且服务区ID等于当前服务区, 筛选条件文本设置为当前服务区名称
          if (this.query.serverId === -1 && item.domainId === this.query.domainId) this.serverText = item.domainName;

          // 如果服务区ID等于当前服务区ID, 则默认选中当前服务区
          if (item.domainId === this.query.domainId) this.serverModel = item.domainId + '';

          item.serverList.forEach(subItem => {

            // 如果当前服务器ID等于筛选条件服务器ID, 则筛选条件文本设置问当前服务器名称
            if (subItem.serverId === this.query.serverId) this.serverText = subItem.serverName;
            this.serverAllItem.push(subItem)
          });
        });

        try {
          Object.freeze(this.serverAllItem);
        } catch (e) {
        }

        this.getServerItem();
      },

      /**
       * 选中服务区
       * @param item 服务区实例
       * @param subItem 服务器实例
       */
      serverSelect (item, subItem) {
        this.serverText = subItem ? subItem.serverName : (item ? item.domainName : '服务器');

        this.query.domainId = item ? item.domainId : undefined;
        this.query.serverId = subItem ? subItem.serverId : -1;

        this.serverVisible = false;

        this.urlParams();

        this.getGoods();
      },


      /**
       * 获取服务器类别
       * @returns {boolean}
       */
      getServer () {
        if (this.serverLoading) return false;
        this.serverLoading = true;
        this
          .$http
          .post('/h5/goods/findDomainAndServers', {gameId: this.query.gameId})
          .then(response => {
            if (response.data.code !== '000') return false;
            this.servers = response.data.data.list;
            this.getServerAllItem(this.servers);
          })
          .finally(() => this.serverLoading = false);
      },

      /**
       * 选择手机
       */
      phoneChose () {
        this.categoryVisible = false;
        this.serverVisible = false;
        this.sortVisible = false;
        this.phoneVisible = !this.phoneVisible;
        this.phoneLoading === null && this.getPhone();
      },

      /**
       * 商品类别选择
       */
      categoryChose () {
        this.phoneVisible = false;
        this.serverVisible = false;
        this.sortVisible = false;
        this.categoryVisible = !this.categoryVisible;
        this.categoryLoading === null && this.getCategory();
      },

      /**
       * 服务器列表选择
       */
      serverChose () {
        this.phoneVisible = false;
        this.categoryVisible = false;
        this.sortVisible = false;
        this.serverVisible = !this.serverVisible;
        this.serverLoading === null && this.getServer();
      },

      /**
       * 排序选择
       */
      sortChose () {
        this.phoneVisible = false;
        this.categoryVisible = false;
        this.serverVisible = false;
        this.sortVisible = !this.sortVisible;
      },

      init () {
        const query = this.$route.query;

        // 从URL参数中获取到数据
        ['gameId',
          'goodsClassId',
          'serverId',
          'subClassId',
          'platformId',
          'domainId',
          'sortRule',
          'maxPrice',
          'minPrice'
        ].forEach(key => {
          if (query[key]) this.query[key] = parseInt(query[key]);
        });

        if (!this.query.gameId) {
          this.$Message.error('游戏ID不存在, 请重新选择游戏');
          // this.$router.push({path: '/'});
          return false;
        }
//        isFromDetail ? this.fromDetail() : this.getGoods();
      },

      /**
       * 跳转至详情页保存商品数据
       */
      toDetail () {

        const goodsListLocalStorage = {
          scrollY: window.scrollY
        };

        for (const key in this.$data) goodsListLocalStorage[key] = this.$data[key];

        local.set('goodsListLocalStorage', goodsListLocalStorage);
      },

      /**
       * 来自详情页获取缓存
       */
      fromDetail () {

        const goodsListLocalStorage = local.get('goodsListLocalStorage');

        for (const key in goodsListLocalStorage) if (key !== 'scrollY') this[key] = goodsListLocalStorage[key];
        this.$nextTick(() => {
          window.scrollTo(0, goodsListLocalStorage.scrollY);
          this.loading = false;
        });
      },

      /**
       * 获取服务器分页数据
       * @param currentPage 当前页
       * @param pageSize 页码
       */
      getServerItem (currentPage = 0, pageSize = 20) {

        if (this.serverAll.loading) return false;
        this.serverAll.loading = true;

        const response = this.serverAllItem.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

        this.serverAll.list = this.serverAll.list.concat(response);
        this.serverAll.currentPage = currentPage;
        this.serverAll.completed = response.length < pageSize;

        try {
          Object.freeze(this.serverAll.list);
        } catch (e) {
        }

        this.$nextTick(() => this.serverAll.loading = false);
      },

      /**
       * 服务器分页
       */
      serverAllInfinite () {
        if (this.serverModel !== 'all') return false;
        this.getServerItem(this.serverAll.currentPage + 1);
      }
    },

    computed: {

      goods () {
        return this.$store.state.goods;
      },

      sortText () {
        switch (this.query.sortRule) {
          case 2:
            return '价格↑';
          case 3:
            return '价格↓';
          case 4:
            return '单价↑';
          default:
            return '筛选排序';
        }
      }
    },

    watch: {
      searchKey () {
        const searchKey = this.searchKey.trim();
        if (!searchKey) return false;
        this.serverAll.loading = null;
        this.serverAll.completed = null;
        this.serverAll.currentPage = 0;
        this.serverAll.list = this.serverAllItem.filter(item => item.serverName.indexOf(searchKey) >= 0);

        try {
          Object.freeze(this.serverAll.list);
        } catch (e) {
        }

      },
      'query.minPrice' (val) {
        if (val < 0) this.query.minPrice = 0;
        if (!/^\d*$/g.test(val)) this.query.minPrice = parseInt(val);
      },
      'query.maxPrice' (val) {
        if (val < 0) this.query.maxPrice = 0;
        if (!/^\d*$/g.test(val)) this.query.maxPrice = parseInt(val);
      }
    },

    created () {
      this.init();
    },

    /**
     * 路由执行前
     * @param to 去哪里
     * @param from 来自哪里
     * @param next 执行下一页方法
     */
    beforeRouteEnter (to, from, next) {
      if (from.path === '/goods/detail') isFromDetail = true;
      else isFromDetail = false;
      next();
    },

    /**
     * 路由离开前
     * @param to 去哪里
     * @param from 来自哪里
     * @param next 执行下一页的方法
     */
    beforeRouteLeave (to, from, next) {
      if (to.path === '/goods/detail') this.toDetail();
      next();
    }
  }
</script>

<style lang="scss">
  .goods-search {
    display: flex;
    text-align: center;
    background-color: #fff;
    line-height: .79rem;
    height: .8rem;
    color: #666;
    font-size: .24rem;
    z-index: 12;
    position: relative;
    border-bottom: 1px solid #dfdfdf;

    &-item {
      width: 25%;
      cursor: pointer;
      padding: 0 .1rem 0 .1rem;
      transition: all .3s ease;
      white-space: nowrap;

      span {
        max-width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        vertical-align: middle;
      }

      &:after {
        content: '';
        display: inline-block;
        vertical-align: middle;
        margin-left: .08rem;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: .08rem .05rem 0 .05rem;
        border-color: #e5e5e5 transparent transparent transparent;
        transition: all .3s ease;
      }

      &.on {

        color: #fd802c;

        &:after {
          border-top-color: #fd802c;
        }

      }

      &.selected {

        color: #fd802c;

        &:after {
          border-top-color: #fd802c;
          transform: rotate(180deg);
        }
      }

    }
  }
  .goods-popup {

    &.s-popup {
      z-index: 11 !important;
    }

    .s-popup-content {
      top: 1.68rem !important;
    }

    .s-popup-content {
      max-height: 5.7rem;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
  .category-popup-list {
    overflow: hidden;
    padding: .02rem .24rem;
  }
  .category-popup-item {
    float: left;
    width: 50%;
    padding: .08rem;
    font-size: .24rem;

    &.on {

      a {
        color: #fd802c;
        border-color: #fd802c;

        &:hover,
        &:focus {
          background-color: #fff;
        }
      }

    }

    a {
      display: block;
      border: 1px solid #e5e5e5;
      border-radius: .04rem;
      color: #666;
      text-align: center;
      height: .5rem;
      line-height: .48rem;
      transition: all .3s ease;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;

      &:hover,
      &:focus {
        background-color: #f4f4f4;
      }
    }

  }
  .phone-popup,
  .server-popup {
    .s-cell {
      cursor: pointer;
      transition: all .3s ease;

      &:hover,
      &:focus {
        background-color: #f4f4f4;
      }

    }
  }
  .server-popup {

    .s-search {
      padding: 0 0 .2rem 0;
    }

    .s-cell {
      margin-left: -.2rem;
      margin-right: -.2rem;

      &.on {
        color: #fd802c;
      }

    }
  }
  .sort-popup {

    font-size: .24rem;

    .s-cell {
      line-height: .5rem;
    }

    &-number {
      width: 1.5rem;
      height: .5rem;
      text-align: center;
      line-height: .48rem;
      border: 1px solid #f2f2f2;
      background-color: #fafafa;

      &:first-child {
        margin-left: .32rem;
        margin-right: .12rem;
      }

      &:last-child {
        margin-left: .12rem;
        margin-right: .12rem;
      }

    }

    &-tool {
      text-align: center;
      padding-bottom: .24rem;

      .s-button:first-child {
        margin-right: .13rem;
      }

    }

  }
  .s-radio-list {
    line-height: 1;
    margin-bottom: .48rem;
  }
  .s-radio-item {
    display: flex;
    padding: 0 .24rem;
    position: relative;
    color: #666;

    & + & {
      margin-top: .32rem;
    }
  }
  .s-radio-title {
    width: 1rem;
  }
  .s-radio-title,
  .s-radio-desc,
  .s-radio-check {
    transition: all .3s ease;
  }
  .s-radio-check {
    width: .21rem;
    height: .15rem;
    background: transparent url(../../assets/checked.png) no-repeat center;
    background-size: 100%;
    position: absolute;
    right: .24rem;
    top: .045rem;
    opacity: 0;

    &:checked {
      opacity: 1;

      & ~ * {
        color: #fd802c;
      }

    }
  }
</style>
