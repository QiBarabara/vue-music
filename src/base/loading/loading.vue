<template>
	<div class="loading">
		<img src="./loading.gif" width="24" height="24">
		<p class="desc">{{title}}</p>
	</div>
</template>

<script>
	export default{
		props:{
			title:{
				type:String,
				default:'从火星赶来需要一点点时间哦~'
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/variable.styl'
	.loading
		width:100%
		text-align:center
		.desc
			line-height:20px
			color:$color-text-l
			font-size:$font-size-small
</style>