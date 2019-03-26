<!-- 左右区块联动 计算实时滚动位置 用watch观测Y变化 -->
<template>
	<Scroll class='listview' :data='data' ref='listview' :listenScroll='listenScroll' @scroll='scroll'
	        :probeType='probeType'>
		<ul>
			<li v-for='group in data' class="list-group" ref='listGroup'>
				<h2 class="list-group-title">{{group.title}}</h2>
				<ul>
					<li v-for='item in group.items' class="list-group-item" @click='selectItem(item)'>
						<img v-lazy='item.avatar' class="avatar">
						<span class="name">{{item.name}}</span>
					</li>
				</ul>
			</li>
		</ul>
		<div class="list-shortcut" @touchstart='onShortcutTouchStart' @touchmove.stop.prevent='onShortcutTouchMove'>
			<ul>
				<li v-for='(item,index) in shortcutList' class="item"
				 :class="{'current':currentIndex===index}"
				 :data-index='index'>{{item}}</li>
			</ul>
		</div>
		<div class="list-fixed" v-show='fixedTitle' ref='fixed'>
			<h1 class="fixed-title">{{fixedTitle}}</h1>
		</div>
		<div v-show='!data.length' class="loading-container">
			<Loading></Loading>
		</div>
	</Scroll>	
</template>

<script>
	import Scroll from 'base/scroll/scroll';
	import {getData} from 'common/js/dom';
	import Loading from 'base/loading/loading'

	const Anchor_height=18;//字母每个字体的高度+padding得到的实际高度值
	const Title_height=30;//title高度

	export default{
		created(){
			this.touch={}; 
			this.listenScroll=true;
			this.listHeight=[];
			this.probeType=3;
		},
		props:{
			data:{
				type:Array,
				default:[]
			}
		},
		components:{
			Scroll,
			Loading
		},
		computed:{
			shortcutList(){
				return this.data.map((group)=>{
					return group.title.substr(0,1);
				})
			},
			fixedTitle(){
				if (this.scrollY>0) {
					return '';
				}
				return this.data[this.currentIndex]?this.data[this.currentIndex].title:''
			}
		},
		data(){
			return{
				scrollY:-1,
				currentIndex:0,
				//区块（fixedTitle）上限与当前位置的滚动差
				diff:-1
			}
		},
		watch:{
			data(){
				setTimeout(()=>{
					this._caculateHeight();
				},20);
			},
			scrollY(newY){
				const listHeight=this.listHeight;
				//当滚动到顶部，newY>0
				if (newY>0) {
					this.currentIndex=0;
					return;
				}
				//在中间部分滚动
				for (let i = 0; i < listHeight.length-1; i++) {
					let height1=listHeight[i];
					let height2=listHeight[i+1];
					//遍历到最后一个或者落在height1 2 之间 就可以不循环了
					if (-newY>=height1 && -newY<height2) {
						this.currentIndex=i;
						//console.log(this.currentIndex);
						this.diff=height2+newY;//newY是负的
						return;
					}
				}
				//当滚动到底部，且-newY大于最后一个元素上限
				this.currentIndex=listHeight.length-2;
			},
			//diff新值
			diff(newVal){
				let fixedTop=(newVal>0&&newVal<Title_height)?newVal-Title_height:0;
				if (this.fixedTop===fixedTop) {return;}
				this.fixedTop=fixedTop;
				this.$refs.fixed.style.transform=`translate3d(0,${fixedTop}px,0)`;
			}
		},
		methods:{
			onShortcutTouchStart(e){
				let anchorIndex=getData(e.target,'index');
				let fristTouch=e.touches[0];
				this.touch.y1=fristTouch.pageY;
				this.touch.anchorIndex=anchorIndex;//刚开始偏移多少锚点
				this._scrollTo(anchorIndex);
				//this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex],0)
			},
			onShortcutTouchMove(e){
				let fristTouch=e.touches[0];
				this.touch.y2=fristTouch.pageY;
				let delta=(this.touch.y2-this.touch.y1)/Anchor_height|0; //多少偏移
				let anchorIndex=parseInt(this.touch.anchorIndex)+delta;
				this._scrollTo(anchorIndex);
			},
			refresh(){
				this.$refs.listview.refresh();
			},
			scroll(pos){
				this.scrollY=pos.y;
			},
			_scrollTo(index){
				if (!index&&index!==0) {
					return;
				}
				//边界情况
				if (index<0) {
					index=0;
				}
				else if (index>this.listHeight.length-2) {
					index=this.listHeight.length-2;
				}
				this.scrollY=-this.listHeight[index];
				this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0);
			},
			_caculateHeight(){
				this.listHeight=[];
				const list=this.$refs.listGroup;
				let height=0;
				this.listHeight.push(height);
				for (let i = 0; i < list.length; i++) {
					let item=list[i];
					height+=item.clientHeight;
					this.listHeight.push(height);
				}
			},
			selectItem(item){
				this.$emit('select',item);//派发事件
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
	.listview
		position:relative
		width:100%
		height:100%
		overflow:hidden
		background:$color-background
		.list-group
			padding-bottom:30px
			.list-group-title
				height:30px
				line-height:30px
				padding-left:20px
				font-size:$font-size-small
				color:$color-text-l
				background:$color-highlight-background
			.list-group-item
				display:flex
				align-items:center
				padding:20px 0 0 30px
				.avatar
					width:50px
					height:50px
					border-radius:50%
				.name
					margin-left:20px
					color:$color-text-l
					font-size:$font-size-medium
		.list-shortcut
			position:absolute
			z-index:30
			right:0
			top:10%
			tansform:translateY(-50%)
			width:20px
			padding:20px 0
			border-radius:10px
			text-align:center
			background:$color-background-d
			font-family:Helvetica
			.item
				padding:3px
				line-height:1
				color:$color-text-l
				font-size:$font-size-small
				&.current
					color:$color-theme
		.list-fixed
			position:absolute
			top:-2px
			left:0
			width:100%
			.fixed-title
				height:30px
				line-height:30px
				padding-left:20px
				font-size:$font-size-small
				color:$color-text-l
				background:$color-highlight-background
		.loading-container
			position:absolute
			width:100%
			top:50%
			transform:translateY(-50%)
</style>