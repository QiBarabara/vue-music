//localStorage相关逻辑

import storage from 'good-storage'

const SEARCH_KEY='__search__'
//只保存15条搜索数据，新换旧
const SEARCH_MAX_LENGTH=15

const PLAY_KEY='__play__'
const PLAY_MAX_LENGTH=200

const FAVORITE_KEY='__favorite__'
const FAVORITE_MAX_LENGTH=200


function insertArray(arr,val,compare,maxLen) {
	//compare-比较函数
	const index=arr.findIndex(compare)
	//数组中已经存在，而且是第一条数据
	if (index===0) {
		return
	}
	//数组中已经存在，而且不是第一条数据，删掉存在的数据并且插入数据
	if (index>0) {
		arr.splice(index,1)
	}
	arr.unshift(val)
	//如果数组达到最大长度，删除最早的数据
	if (maxLen&&arr.length>maxLen) {
		arr.pop()
	}
}

export function saveSearch(query) {
	let searches=storage.get(SEARCH_KEY,[])
	//最新搜索的在数组最前面
	insertArray(searches,query,(item)=>{
		return item===query
	},SEARCH_MAX_LENGTH)
	storage.set(SEARCH_KEY,searches)
	return searches
}


//从数组中删除
function deleteFromArray(arr,compare) {
	const index=arr.findIndex(compare)
	if (index>-1) {
		arr.splice(index,1)
	}
}


//从本地缓存读取searchList
export function loadSearch() {
	return storage.get(SEARCH_KEY,[])
}

//删除搜索记录
export function deleteSearch(query) {
	let searches=storage.get(SEARCH_KEY,[])
	deleteFromArray(searches,(item)=>{
		return item===query
	})
	storage.set(SEARCH_KEY,searches)
	return searches
}

//清空搜索记录
export function clearSearch() {
	storage.remove(SEARCH_KEY)
	return []
}
//存播放历史
export function savePlay(song) {
	let songs=storage.get(PLAY_KEY,[])
	insertArray(songs,song,(item)=>{
		return item.id===song.id
	},PLAY_MAX_LENGTH)
	storage.set(PLAY_KEY,songs)
	return songs
}
//读取播放历史
export function loadPlay() {
	return storage.get(PLAY_KEY,[])
}

export function saveFavorite(song) {
	let songs=storage.get(FAVORITE_KEY,[])
	insertArray(songs,song,(item)=>{
		return song.id===item.id
	},FAVORITE_MAX_LENGTH)
	storage.set(FAVORITE_KEY,songs)
	return songs
}
export function deleteFavorite(song) {
	let songs=storage.get(FAVORITE_KEY,[])
	deleteFromArray(songs,(item)=>{
		return song.id===item.id
	})
	storage.set(FAVORITE_KEY,songs)
	return songs
}
export function loadFavorite() {
	return storage.get(FAVORITE_KEY,[])
}
