<template>
  <div id="app">
    <Headers />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script> 
import Headers from './components/Headers.vue'


export default {
  name: 'App',
  components: { 
    Headers
  }
}
</script>

<style>
* {
        margin:0px;
        padding:0;
        list-style: none;
        text-decoration:none;
    
    }
#app {
  font-family:  Roboto, "Helvetica Neue", Helvetica, Arial, 文泉驛正黑, "WenQuanYi Zen Hei", "Hiragino Sans GB", "儷黑 Pro", "LiHei Pro", "Heiti TC", 微軟正黑體, "Microsoft JhengHei UI", "Microsoft JhengHei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    
}
</style>
