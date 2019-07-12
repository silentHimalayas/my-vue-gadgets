<template>
  <div class="side-bar-container" v-if="routeMap && Array.isArray(routeMap) && routeMap.length > 0">
    <el-menu class="side-bar" router>
      <template v-for="item in routeMap">
        <el-submenu :key="item.id" v-if="item.otherChildren && Array.isArray(item.otherChildren) && item.otherChildren.length > 0">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item-group >
            <el-menu-item @click="go(item.path)" v-for="(child, childIndex) in item.otherChildren" :key="childIndex">{{child.name}}</el-menu-item>
          </el-menu-item-group>
      </el-submenu>
      <el-menu-item @click="go(item.path)" v-else :key="item.id">{{item.name}}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
  import routeMap from '@/config/routeMenu'
  export default {
    data () {
      return {
        routeMap
      }
    },
    methods: {
      go (path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style lang='less'>
.side-bar-container {
  width: 200px;
  height: 100vh;
  color: #333;
  .side-bar {
    height: 100%;
  }
}
</style>
