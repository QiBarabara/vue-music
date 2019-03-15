import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';

//每次通过mutation修改state时候，会通过控制台打印Logger，看到修改记录
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const debug=process.env.NODE_ENV!=='production'; 

export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations,
	//debug是true的时候开启严格模式，上线的时候关闭（模式开启时候会有损耗，不建议线上使用）
	strict:debug,
	plugins:debug?[createLogger()]:[]
})