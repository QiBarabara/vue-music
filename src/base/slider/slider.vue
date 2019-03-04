<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class='{active:currentPageIndex===index}' 
      v-for='(item,index) in dots' ></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'
export default{
  data(){
    return{
      dots:[],
      currentPageIndex:0
    }
  },
  props:{
    loop:{
      type:Boolean,
      default:true
    },
    autoPlay:{
      type:Boolean,
      default:true
    },
    //轮播间隔
    interval:{
      type:Number,
      default:3000
    }
  },
  mounted(){
    setTimeout(()=>{
      this._setSliderWidth();
      this._initSlider();
      this._initDots();
      if (this.autoPlay) {
        this._play()
      }
    },20);
    //适应视口
    window.addEventListener('resize',()=>{
      if (!this.slider) {
        return;
      }
      this._setSliderWidth(true);
      this.slider.refresh();
    })
  },
  methods:{
    _setSliderWidth(isResize){
      this.children=this.$refs.sliderGroup.children;
      //console.log(this.children.length);
      let width=0;
      let sliderWidth=this.$refs.slider.clientWidth;
      for (let i = 0; i <this.children.length; i++) {
        let child=this.children[i];
        addClass(child,'slider-item');
        child.style.width=sliderWidth+'px';
        width+=sliderWidth;
      }
      if (this.loop&&!isResize) {
        width+=2*sliderWidth;
      }
      this.$refs.sliderGroup.style.width=width+'px';
    },
     _initDots(){
      //console.log(this.children.length-2);
      this.dots=new Array(this.children.length-2)
      //console.log(this.dots);
    },
    _initSlider(){
      this.slider=new BScroll(this.$refs.slider,{
        scrollX:true,//横向滚动
        scrollY:false,//不能纵向滚动
        momentum:false,
        snap:true,
        snapLoop:this.loop,//克隆两份 达到无缝衔接
        snapthreshold:0.3,
        snapspeed:400,
        // click:true  BS库和fastclick冲突了 阻止页面正常的click，所以删去   
      })
      this.slider.on('scrollEnd',()=>{
        //console.log('当前页码'+this.currentPageIndex);
        let pageIndex=this.slider.getCurrentPage().pageX;
        //console.log('this.slider.getCurrentPage:'+this.slider.getCurrentPage());
        if (this.loop) {
          pageIndex-=1;//由于bscroll循环播放首尾各加一个,因此索引-1
        }
        this.currentPageIndex=pageIndex;
        if (this.autoPlay) {
          clearTimeout(this.timer);
          this._play();
        }
      })
    },
    _play(){
      let pageIndex=this.currentPageIndex+1;
      if (this.loop) {
        pageIndex+=1;
      }
      this.timer=setTimeout(()=>{
        this.slider.goToPage(pageIndex,0,400)  //(,Y方向的，X方向的)
      }, this.interval);
    }
  },
  activated(){
    if (this.autoPlay) {
      this._play();
    }
  },
  deactivated(){
    clearTimeout(this.timer);
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    position: relative
    min-height: 1px
   //border:3px solid yellow
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom:7px
      transform: translateZ(1px)
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 10px
          height:10px
          border-radius: 50%
          background: $color-theme
</style>