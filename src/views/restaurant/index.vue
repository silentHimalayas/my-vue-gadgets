<template>
  <div class="restaurant-container">
    <!-- <div class="mudule-name">restaurant  demo</div> -->
    <div class="mudule-name">{{name ? name : '今天去哪吃？'}}</div>
    <canvas id="turntable" width="1000" height="1000">当前浏览器暂不支持canvas</canvas>
  </div>
</template>
<script>

import { restautantMap } from './map';
import Turntable from '@/utils/turntable';
export default {
  name: 'restaurant',
  components: {
  },
  data () {
    return {
      turntableClass: null,
      name: ''
    }
  },
  mounted () {
    this.turntableClass = new Turntable(document.getElementById('turntable'), restautantMap,  (item) => {
      this.name = item.name
      this.$message({
        message: `${item.name}, 走起`,
        type: 'success'
      });
    });
  },
  methods: {}
}
</script>

<style lang='less'>
.restaurant-container {
  padding-top: 20px;
}
</style>
