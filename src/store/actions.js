import * as types from './mutation-types';
import {playMode} from 'common/js/config';
import {shuffle} from 'common/js/util';

import {saveSearch,deleteSearch,clearSearch,savePlay,saveFavorite,deleteFavorite} from 'common/js/cache';


function findIndex(list,song) {
	return list.findIndex((item)=>{
		return item.id===song.id;
	})
}


//actions有{commit,state}对象，修改成{list,index}列表是什么索引是什么
//actions对mutation做封装，提交mutation
export const selectPlay=function ({commit,state},{list,index}){
	commit(types.SET_SEQUENCE_LIST,list);
	if (state.mode===playMode.random) {
		let randomlist=shuffle(list);
		commit(types.SET_PLAYLIST,randomlist);
		index=findIndex(randomlist,list[index]);
	}
	else{
		commit(types.SET_PLAYLIST,list);
	}
	commit(types.SET_CURRENT_INDEX,index);
	commit(types.SET_FULL_SCREEN,true);
	commit(types.SET_PLAYING_STATE,true);
}

export const randomPlay=function({commit},{list}){
	commit(types.SET_PLAY_MODE,playMode.random);
	commit(types.SET_SEQUENCE_LIST,list);
	let randomlist=shuffle(list);
	commit(types.SET_PLAYLIST,randomlist);
	commit(types.SET_CURRENT_INDEX,0);
	commit(types.SET_FULL_SCREEN,true);
	commit(types.SET_PLAYING_STATE,true);
}

export const insertSong=function({commit,state},song){
	//修改副本，所以用slice
	let playlist=state.playlist.slice();
	let sequenceList=state.sequenceList.slice();
	let currentIndex=state.currentIndex;
	//当前歌曲
	let currentSong=playlist[currentIndex];

	//判断当前列表是否有当前歌曲
	let fpIndex=findIndex(playlist,song);
	//插入歌曲，索引+1
	currentIndex++;

	//插入这首歌到当前索引
	playlist.splice(currentIndex,0,song);
	//如果这首歌已经存在，找到这首歌并且删掉
	if (fpIndex>-1) {
		//当前插入索引大于之前列表中的索引
		if (currentIndex>fpIndex) {
			playlist.splice(fpIndex,1);//删除
			currentIndex--;
		}
		else{
			playlist.splice(fpIndex+1,1);//增加
		}
	}

	//获取在当前sequencelist中插入的位置
	let currentSIndex=findIndex(sequenceList,currentSong)+1;
	let fsIndex=findIndex(sequenceList,song);
	sequenceList.splice(currentIndex,0,song);

	if (fsIndex>-1) {
		if (currentSIndex>fsIndex) {
			sequenceList.splice(fsIndex,1);			
		}
		else{
			sequenceList.splice(fsIndex+1,1);//增加
		}
	}

	commit(types.SET_PLAYLIST,playlist);
	commit(types.SET_SEQUENCE_LIST,sequenceList);
	commit(types.SET_CURRENT_INDEX,currentIndex);
	commit(types.SET_FULL_SCREEN,true);
	commit(types.SET_PLAYING_STATE,true);
}

export const saveSearchHistory=function ({commit},query) {
	commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}

export const deleteSearchHistory=function ({commit},query) {
	commit(types.SET_SEARCH_HISTORY,deleteSearch(query))
}

export const clearSearchHistory=function ({commit}) {
	commit(types.SET_SEARCH_HISTORY,clearSearch())
}

export const deleteSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  if (!playlist.length) {
    commit(types.SET_PLAYING_STATE, false)
  } else {
    commit(types.SET_PLAYING_STATE, true)
  }
  // commit(types.SET_PLAYING_STATE, true)
}


//清空播放列表
export const deleteSongList=function ({commit}) {
	commit(types.SET_PLAYLIST,[])
	commit(types.SET_SEQUENCE_LIST,[])
	commit(types.SET_CURRENT_INDEX,-1)
	commit(types.SET_PLAYING_STATE,false);
}


export const savePlayHistory=function ({commit},song) {
	commit(types.SET_PLAY_HISTORY,savePlay(song))
}

//喜欢/不喜欢
export const saveFavoriteList=function ({commit},song) {
	commit(types.SET_FAVORITE_LIST,saveFavorite(song))
}
export const deleteFavoriteList=function ({commit},song) {
	commit(types.SET_FAVORITE_LIST,deleteFavorite(song))
}

