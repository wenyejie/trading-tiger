<!--
 - Title
 -
 - author: Storm
 - date: 2017/04/25
 -->

<template>
  <li class="s-gameGrid-item">
    <router-link class="s-gameGrid-link" :to="link">
      <img class="s-gameGrid-icon" :src="game.gameIcon">
      <p class="s-gameGrid-name">{{game.gameName}}</p>
    </router-link>
  </li>
</template>

<script>
  export default {
    name: 'gameGridItem',
    props: {
      game: Object,
      link: [String, Object]
    },
    data () {
      return {}
    },
    methods: {}
  }
</script>
