<template>
    <div class='recommend' ref='recommend'>
	 	<Scroll class='recommend-content' :data='discList' ref='scroll'>
	 		<div>
		 		<div v-if='recommends.length' class='slider-wrapper'>
		 			<div class="slider-content">
			 			<Slider ref='slider'>
			 				<div v-for='item in recommends'>
			 					<a :href='item.linkUrl'>
			 						<!-- 用needsclick解决冲突问题 -->
			 						<img :src="item.picUrl" @load='loadImg' class="needsclick">
			 					</a>
			 				</div>
			 			</Slider>
		 			</div>
		 		</div>
		 		<div class='recommend-list'>
		 			<h1 class='list-title'>
		 				热门歌单推荐
		 			</h1>
		 			<ul>
		 				<li v-for='item in discList' class="item">
		 					<div class="icon">
		 						<!-- <img :src='item.imgurl' width="60px" height="60px"> 改成懒加载-->
		 						<img v-lazy='item.imgurl' width="60px" height="60px">
		 					</div>
		 					<div class="text">
		 						<h2 class="name" v-html='item.creator.name'></h2>
		 						<p class="desc" v-html='item.dissname'></p>
		 					</div>
		 				</li>
		 			</ul>
		 		</div>
	 		</div>
	 		<div class="loading-container" v-show='!discList.length'>
	 			<Loading></Loading>
	 		</div>
	 	</Scroll>
	</div>
</template>

<script>
	import {getRecommend,getDiscList} from 'api/recommend'
	import {ERR_OK} from 'api/config'
	import Slider from 'base/slider/slider'
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'

	export default{
		data(){
			return {
				recommends:[],
				discList:[]
			}
		},
		created(){
			setTimeout(()=>{
				this._getRecommend();
			},20);
			// setTimeout(()=>{
			// 	this._getDiscList();
			// }, 10000);
			this._getDiscList();
		},
		methods:{
			_getRecommend(){
				getRecommend().then((res)=>{
					console.log(res);
					if (res.code===ERR_OK) {
						//console.log(res.data.slider);
						this.recommends=res.data.slider;
					}
				})
			},
			_getDiscList(){
				getDiscList().then((res)=>{
					if (res.code===ERR_OK) {
						//console.log(res.data);
						this.discList=res.data.list;
					}
				})
			},
			loadImg(){
				//设置标记位，保证逻辑执行一次
				if (!this.checkLoaded) {
					this.$refs.scroll.refresh();	
					this.checkLoaded=true;				
				}
			}
		},
		components:{
			Slider,
			Scroll,
			Loading
		}
	}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/variable.styl'
	.recommend
		position:fixed
		overflow:hidden
		width:100%
		top:88px
		bottom:0
		.recommend-content
			top:0
			height:100%
			overflow:hidden
			.slider-wrapper
				position:relative
				width:100%
				height:0
				padding-top:40%
				overflow:hidden
				.slider-content
					position:absolute
					top:0
					left:0
					width:100%
					height:100%
			.recommend-list
				.list-title
					height:65px
					line-height:65px
					text-align:center
					font-size:$font-size-medium
					color:$color-theme
				.item
					display:flex
					box-sizing:border-box
					align-items:center
					padding:0 20px 20px 20px
					.icon
						flex:0 0 60px
						width:60px
						padding-right:20px
					.text
						display:flex
						flex-direction:column
						justify-content:center
						flex:1
						line-height:20px
						overflow:hidden
						font-size:$font-size-medium
						.name
							margin-bottom:10px
							color:$color-text
						.desc
							color:$color-text-d
			.loading-container
				position:absolute
				width:100%
				top:50%
				transform:translateY(-50%)
				
					
</style>