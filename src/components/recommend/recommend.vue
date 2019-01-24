<template>
    <div class='recommend' ref='recommend'>
	 	<div class='recommend-content'>
	 		<div class='slider-wrapper'>
	 		</div>
	 		<div class='recommend-list'>
	 			<h1 class='list-title'>
	 				热门歌单推荐
	 			</h1>
	 			<ul></ul>
	 		</div>
	 	</div>
	</div>
</template>

<script>
	import {getRecommend} from 'api/recommend'
	import {ERR_OK} from 'api/config'
	export default{
		create(){
			this._getRecommend()
		},
		methods:{
			_getRecommend(){
				console.log('1111111');
				getRecommend().then((res)=>{
					console.log('1111111');
					console.log(res);
					if (res.code===ERR_OK) {
						console.log('成功'+res.data.slider);
					}
				})
			}
		}
	}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/variable.styl'
	.recommend
		position:fixed
		width:100%
		top:88px
		bottom:0
		.recommend-content
			height:100%
			overflow:hidden
			.slider-wrapper
				position:relative
				width:100%
				height:0
				padding-top:40%
				overflow:hidden
			.recommend-list
				.list-title
					height:65px
					line-height:65px
					text-align:center
					color:$color-theme
					font-size:$font-size-medium
</style>