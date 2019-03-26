import {getSongsUrl,getLyric} from 'api/song'
import { ERR_OK } from 'api/config'
import {Base64} from 'js-base64'

//类面向对象 类扩展性比对象强，代码集中到一起，有利于维护。所以使用类而不是对象。
export default class Song{
	//album专辑名称 duration歌曲长度
	constructor({id,mid,singer,name,album,duration,image,url}){
		this.id=id;
		this.mid=mid;
		this.singer=singer;
		this.name=name;
		this.album=album;
		this.duration=duration;
		this.image=image;
		this.url=url;
    	this.filename = `C400${this.mid}.m4a`;
	}
	//获取并返回歌词
	getLyric(){
		if (this.lyric) {
			return Promise.resolve(this.lyric);
		}
		return new Promise((resolve,reject)=>{
			getLyric(this.mid).then((res)=>{
				if (res.retcode===ERR_OK) {
					this.lyric=Base64.decode(res.lyric);
					resolve(this.lyric);
				}
				else{
					reject('no lyric');
				}
			})
		})
	}
}

export function createSong(musicData) {
	return new Song({
		id:musicData.songid,
		mid:musicData.songmid,
		singer:filterSinger(musicData.singer),
		name:musicData.songname,
		album:musicData.albumname,
		duration:musicData.interval,
		image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
		url:musicData.url
	})
}

export function processSongsUrl(songs) {
  if (!songs.length) {
    return Promise.resolve(songs)
  }
  return getSongsUrl(songs).then((purlMap) => {
    songs = songs.filter((song) => {
      const purl = purlMap[song.mid]
      if (purl) {
        song.url = purl.indexOf('http') === -1 ? `http://dl.stream.qqmusic.qq.com/${purl}` : purl
        return true
      }
      return false
    })
    return songs
  })
}

export function isValidMusic(musicData) {
  return musicData.songid && musicData.albummid && (!musicData.pay || musicData.pay.payalbumprice === 0)
}

function filterSinger(singer) {
	let ret=[];
	if (!singer) {
		return ''
	}
	singer.forEach((s)=>{
		ret.push(s.name);
	})
	return ret.join('/')
}