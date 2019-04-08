import {playMode} from 'common/js/config';

import {loadSearch,loadPlay,loadFavorite} from 'common/js/cache'


const state={
	singer:{},
	playing:false,//暂停
	fullScreen:false,//全屏播放
	playlist:[],//播放列表
	sequenceList:[],//顺序播放
	mode:playMode.sequence,//播放模式
	currentIndex:-1,//当前播放索引
	disc:{},//歌单对象，与singer类似
	topList:{},//排行榜
	searchHistory:loadSearch(),//搜索历史
	playHistory:loadPlay(),//播放历史
	favoriteList:loadFavorite()
}
export default state
