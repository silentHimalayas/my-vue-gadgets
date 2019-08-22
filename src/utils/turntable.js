/** 
 * 【转盘抽奖】
 * 绘制转盘
 * 转动速度函数
 * 结果揭晓
*/
export default class Turntable {
 constructor (dom, map, cb) {
    this.dom = dom;
    this.cb = cb;
    this.context = null;
    this.list = map;
    this.radius = 200; // 转盘半径
    this.textRadius = 170;
    this.rotia = 0.95; // 旋转递减的速率
    this.startRadianRange = 2 * Math.PI; // 起始弧度差（旋转时的弧度差）
    this.minRadianRange = 0.01 // 最小的旋转弧度差
    this.baseRate = 0.98;
    this.Rate = null;
    this.isStart = false;
    this.clientX = 610;
    this.clientY = 270;
    this.colorMap = ['#fd5757','#f79494', '#ff6766']
    
    this._init();
  }
  _init () {
    if (this.dom.getContext) {
      this.context = this.dom.getContext('2d');
      this._paintBoard(-Math.PI / 2);
      this.bindEvent();
    }
  }
  start () {
    if (this.isStart) return;
    this.isStart = true;
    this.Rate = this.baseRate + Math.random() / 100;
    this._rotateWheel(-Math.PI / 2, this.startRadianRange);
  }

  // 初始化事件绑定
  bindEvent () {
    this.dom.addEventListener('click', (e) => {
      window.console.log(e, '>>>>>>>>click-e');
      if (Math.abs(e.offsetX - this.clientX) < this.radius / 3 &&  Math.abs(e.offsetY - this.clientY) < this.radius /3) {
        this.start();
      }
    })
    this.dom.addEventListener('mousemove', (e) => {
      if (Math.abs(e.offsetX - this.clientX) < this.radius / 3 &&  Math.abs(e.offsetY - this.clientY) < this.radius /3) {
        this.dom.style.cursor = 'pointer';
      } else {
        this.dom.style.cursor = 'auto';
      }
    })
  }
  // 绘制圆盘
  _paintBoard (a) {
    this.context.clearRect(0,0, this.dom.width, this.dom.height);
    const rangeRadian = (Math.PI / 180) * (360 / this.list.length);
    let startRadian = a;
    this.list.forEach((item, index) => {
      this._paintRadian(item, index, this.radius, startRadian, startRadian + rangeRadian);
      startRadian += rangeRadian;
    })
    this._paintArrow();
    this._paintRadian({color: '#f2df2a'}, null, this.radius /3, 0, 2 * Math.PI, true);
    this._paintRadianStroke('#efefef', this.radius, 0, 2 * Math.PI);
    
  }
  // 绘制fill的圆弧
  _paintRadian (item, index = 0, radius, start, end, anticlockwise = false) {
    this.context.save();
    this.context.beginPath();
    this.context.moveTo(this.clientX,this.clientY);
    this.context.fillStyle = item.color || this.colorMap[index % this.colorMap.length];
    this.context.arc(this.clientX, this.clientY, radius, start, end, anticlockwise);
    this.context.fill();
    this.context.closePath()
    this.context.restore();
    // 绘制文字，之后要拆分出来，包括中间的圆环也要拆分出来
    if (anticlockwise) {
      this.context.save();
      this.context.font = 'bold 24px Helvetica, Arial';
      this.context.fillStyle = '#FFF';
      this.context.translate(
          this.clientX + this.context.measureText('开始').width / 2 + 8,
          this.clientY + 5
      );
      //this.context.rotate((start + end) / 2 + Math.PI / 2);
      this.context.fillText('开始', -this.context.measureText(item.name).width / 2, 0);
      this.context.restore();
    } else {
      this.context.save();
      this.context.font = 'bold 15px Helvetica, Arial';
      this.context.fillStyle = '#FFF';
      this.context.translate(
          this.clientX + Math.cos((start + end) / 2) * this.textRadius,
          this.clientY + Math.sin((start + end) / 2) * this.textRadius
      );
      this.context.rotate((start + end) / 2 + Math.PI / 2);
      this.context.fillText(item.name, -this.context.measureText(item.name).width / 2, 0);
      this.context.restore();
    }
    

    // if (anticlockwise) return;
    // this.context.save();
    // this.context.beginPath();
    // this.context.globalAlpha = 0.6;
    // this.context.moveTo(200,200);
    // this.context.fillStyle = 'red';
    // this.context.arc(200, 200, radius, start, end, anticlockwise);
    // this.context.scale(2, 2);
    // this.context.fill();
    // this.context.closePath()
    // this.context.restore();
  }
  // 绘制stroke的圆弧
  _paintRadianStroke (color, radius, start, end, anticlockwise = false) {
    this.context.save();
    this.context.beginPath();
    this.context.moveTo(this.clientX + this.radius,this.clientY);
    this.context.strokeStyle = color;
    this.context.arc(this.clientX, this.clientY, radius, start, end, anticlockwise);
    this.context.stroke();
    this.context.closePath()
    this.context.restore();
  }

  // 绘制箭头
  _paintArrow () {
    this.context.beginPath();
    this.context.fillStyle = '#f2df2a';
    this.context.moveTo(this.clientX, this.clientY);
    this.context.lineTo(this.clientX + 30, this.clientY);
    this.context.lineTo(this.clientX, this.clientY -120);
    this.context.lineTo(this.clientX - 30, this.clientY);
    this.context.fill();
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
    this.isStart = false;
    let piece = 2 * Math.PI / this.list.length;
    let index = this.list.length - Math.ceil((currentRadian + Math.PI / 2) % (2 * Math.PI) / piece);
    this.cb && this.cb(this.list[index]);
  }

  // 销毁示例
 
}







 