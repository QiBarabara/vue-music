<template>
  <div class="m-header">
    <!-- <div class="icon"> -->
    	<img src="./logo@2x.png" alt="">
    <!-- </div> -->
    <h1 class="text">Sound World</h1>
    <router-link to='/user' class='mine'tag='div'>
    	<i class="icon-mine"></i>
    </router-link>	
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/mixin'
	@import '~common/stylus/variable'
	.m-header
		position:relative
		height:44px
		// background-color:red
		text-align:center
		color:$color-theme
	// .icon
	// 	display:inline-block
	// 	vertical-align:top
	// 	margin-top:6px
	// 	width:30px
	// 	height:32px
	// 	margin-right:9px
	// 	bg-image('logo')
	// 	background-size:30px 32px
		img
			display:inline-block
			vertical-align:top
			margin-top:6px
			height:100%
			//height:48px
	.text
		display:inline-block
		vertical-align:top
		line-height:44px
		font-size:font-size-large
	.mine
		position:absolute
		top:0
		right:0
		.icon-mine
			display:block
			padding:12px
			font-size:20px
			color:$color-theme
</style>