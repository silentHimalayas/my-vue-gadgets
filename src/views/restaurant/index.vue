<template>
  <div class="restaurant-container">
    <div class="mudule-name">restaurant  demo</div>
    <canvas id="turntable" width="500" height="500">当前浏览器暂不支持canvas</canvas>
  </div>
</template>
<script>
import { clearInterval } from 'timers';
/**
 * 绘制圆盘：半径，
 */

class Turntable {
  constructor (dom, cb) {
    this.dom = dom;
    this.cb = cb;
    this.context = null;
    this.list = ['red','#efefef','blue','#1565ef','green','yellow','pink'];
    this.radius = 100; // 转盘半径
    this.rotia = 0.95; // 旋转递减的速率
    this.startRadianRange = 2 * Math.PI; // 起始弧度差（旋转时的弧度差）
    this.minRadianRange = 0.01 // 最小的旋转弧度差
    this.baseRate = 0.98;
    this.Rate = this.baseRate + Math.random() / 100;
    this._init();
  }
  _init () {
    if (this.dom.getContext) {
      this.context = this.dom.getContext('2d');
      this._paintBoard(0);
    }
  }
  start () {
    this._rotateWheel(0, this.startRadianRange);
  }
  _paintBoard (a) {
    const rangeRadian = (Math.PI / 180) * (360 / this.list.length);
    let startRadian = a;
    this.list.forEach((item, index) => {
      this._paintRadian(item, this.radius, startRadian, startRadian + rangeRadian);
      startRadian += rangeRadian;
    })
    this._paintRadian('#fff', this.radius / 2, 0, 2 * Math.PI, false);
    this._paintRadianStroke('#efefef', this.radius, 0, 2 * Math.PI)
  }
  // 绘制fill的圆弧
  _paintRadian (color, radius, start, end, anticlockwise = false) {
    this.context.beginPath();
    this.context.moveTo(200,200);
    this.context.fillStyle = color;
    this.context.arc(200, 200, radius, start, end, anticlockwise);
    this.context.fill();
    this.context.closePath()
  }
  // 绘制stroke的圆弧
  _paintRadianStroke (color, radius, start, end, anticlockwise = false) {
    this.context.beginPath();
    this.context.moveTo(300,200);
    this.context.strokeStyle = color;
    this.context.arc(200, 200, radius, start, end, anticlockwise);
    this.context.stroke();
    this.context.closePath()
  }
  
  // 开始旋转
  _rotateWheel (currentRadian, currentRangeRadian) {
    if (currentRangeRadian > this.minRadianRange) {
      this._paintBoard(currentRadian);
      window.requestAnimationFrame(this._rotateWheel.bind(this, currentRadian += currentRangeRadian, currentRangeRadian * this.Rate));
    } else {
      this._openAward(currentRadian);
    }
  }

  // 开奖
  _openAward (currentRadian) {
    let piece = 2 * Math.PI / this.list.length;
    let index = this.list.length - Math.ceil(currentRadian % (2 * Math.PI) / piece);
    this.cb && this.cb(this.list[index]);
  }

  // 销毁示例
  
}


// import Turntable from '@/utils/turntable';
export default {
  name: 'restaurant',
  components: {
  },
  data () {
    return {
      turntableClass: null
    }
  },
  mounted () {
    this.turntableClass = new Turntable(document.getElementById('turntable'), (item) => {
      console.log(item, '>>>>>itam')
    });
    // this.turntableClass.init();
    console.log(this.turntableClass, document.getElementById('turntable'), '>>>>>turntableClass');
  },
  methods: {}
}
</script>

<style lang='less'>
.restaurant-container {

}
</style>
