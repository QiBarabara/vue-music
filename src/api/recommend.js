import jsonp from 'common/js/jsonp'//获取封装好的jsonp函数
import {commonParams,options} from './config'
import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production';

//轮播图数据
export function getRecommend() {
	const url='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
	const data=Object.assign({},commonParams,{
		platform:'h5',
		uin:0,
		needNewCode:1
	})
	return jsonp(url,data,options)
}
//歌单数据
export function getDiscList(){
	const url =  '/api/getDiscList';
	//const url='https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
	const data=Object.assign({},commonParams,{
		platform:'yqq',
		uin:0,
		hostUin:0,
		sin:0,
		ein:29,
		sortId:5,
		needNewCode:0,
		categoryId:10000000,
		rnd:Math.random(),
		format:'json'
	})
	return axios.get(url,{
		params:data
	}).then((res)=>{
		return Promise.resolve(res.data);
	})
}

export function getSongList(disstid) {
	const url = '/api/getCdInfo';
	const data=Object.assign({},commonParams,{
		disstid,
		type:1,
		json:1,
		utf8:1,
		onlysong:0,
		hostUin:0,
		platform:'yqq',
		needNewCode:0
	})
	return axios.get(url,{
		params:data
	}).then((res)=>{
		return Promise.resolve(res.data);
	})
}