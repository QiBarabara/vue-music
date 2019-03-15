<template>
    <div class="singer" ref='singer'>
		<ListView :data='singers' @select='selectSinger'></ListView>	
		<!-- 承载子路由 -->
		<router-view></router-view>
	</div>
</template>

<script>
	import {getSingerList} from 'api/singer';
	import {ERR_OK} from 'api/config';
	import Singer from 'common/js/singer'
	import ListView from 'base/listview/listview'

	import {mapMutations} from 'vuex';//vuex对mutations做的封装

	const Hot_Name='热门';
	const Hot_Singers_Line=10;

	export default{
		data(){
			return{
				singers:[]
			}
		},
		created(){
			this._getSingerList()
		},
		components:{
			ListView
		},
		methods:{
			selectSinger(singer){
				this.$router.push({
					path:`/singer/${singer.id}`
				});
				this.setSinger(singer)
			},
			_getSingerList(){
				getSingerList().then((res)=>{
					if (res.code===ERR_OK) {
						this.singers=this._normalizeSinger(res.data.list);
						//console.log(this._normalizeSinger(this.singers));
					}
				})
			},
			_normalizeSinger(list){
				let map={
					hot:{
						title:Hot_Name,
						items:[]
					}
				}
				list.forEach((item,index)=>{
					if (index<Hot_Singers_Line) {
						map.hot.items.push(new Singer({
							id:item.Fsinger_mid,
							name:item.Fsinger_name
						}))
					}
					const key=item.Findex;
					if (!map[key]) {
						map[key]={
							title:key,
							items:[]
						}
					}
					map[key].items.push(new Singer({
						id:item.Fsinger_mid,
						name:item.Fsinger_name
					}))
				})
				//console.log(map);
				//要处理map 得到有序列表
				let hot=[];
				let ret=[];
				for(let key in map){
					let val=map[key];
					//console.log(val.title);
					if (val.title.match(/[a-zA-Z]/)) {
						//console.log('1111');
						ret.push(val);
					}
					else if (val.title===Hot_Name) {
						hot.push(val);
					}
				}
				// console.log(hot);
				ret.sort((a,b)=>{
					return a.title.charCodeAt(0)-b.title.charCodeAt(0)
				})
				return hot.concat(ret);
			},
			...mapMutations({
				setSinger:'SET_SINGER',
			})
			
		}
	}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
	.singer
		position:fixed
		top:88px
		bottom:0
		width:100%
		//border:1px solid red
</style>