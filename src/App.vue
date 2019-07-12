<template>
  <div class="app-container">
    <side-bar></side-bar>
    <div class="router-container">
      <router-view ></router-view>
    </div>
  </div>
</template>
<script>

import sideBar from '@/components/layout/sideBar.vue';
export default {
  name: 'app',
  components: {
    sideBar
  }
}
</script>

<style lang='less'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.app-container {
  display: flex;
  .router-container {
    padding: 10px;
    flex: 1;
  }
}
</style>
