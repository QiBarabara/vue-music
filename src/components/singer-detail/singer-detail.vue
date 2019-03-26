<template>
	<transition name='slide'>
		<MusicList :songs='songs' :title='title' :bg-image='bgImage'></MusicList>
	</transition>
</template>

<script>
import {mapGetters} from 'vuex';
import {getSingerDetail} from 'api/singer';
import {ERR_OK} from 'api/config';
//import {createSong} from 'common/js/song';
import {createSong, Song, processSongsUrl} from 'common/js/song';
import MusicList from 'components/music-list/music-list.vue'

export default{
	data(){
		return {
			songs:[]
		}
	},
	components:{
		MusicList
	},
	computed:{
		title(){
			return this.singer.name
		},
		bgImage(){
			return this.singer.avatar
		},
		...mapGetters([
			'singer'
		])
	},
	created(){
		//console.log(this.singer);
		this._getDetail();
	},
	methods:{
		_getDetail(){
			if (!this.singer.id) {
				this.$router.push('/singer');
				return;
			}
			getSingerDetail(this.singer.id).then((res)=>{
				if (res.code===ERR_OK) {
					//console.log(res.data.list);
					 processSongsUrl(this._normalizeSongs(res.data.list)).then((songs) => {
			            this.songs = songs
			            //console.log(this.songs)
			        })
					//this.songs=this._normalizeSongs(res.data.list);
					//console.log(this.songs);
				}
			})
		},
		_normalizeSongs(list){
			let ret=[];
			list.forEach((item)=>{
				let {musicData}=item;
				if (musicData.songid&&musicData.albummid) {
					ret.push(createSong(musicData))
				}
			})
			return ret;
		}
	}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
	.slide-enter-active, .slide-leave-active
		transition:all,0.3s
	.slide-enter, .slide-leave-to
		transform:translate3d(100%,0,0)
</style>