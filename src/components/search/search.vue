<template>
    <div class="search">
		<div class="search-box-wrapper">
			<search-box ref='searchBox' @query='onQueryChange'></search-box>
		</div>
		<div class="shortcut-wrapper" v-show="!query" ref='shortcutWrapper'>
			<Scroll class="shortcut" :data='shortcut' ref='shortcut' :refreshDelay='refreshDelay'>
        <div>
  				<div class="hot-key">
  					<h1 class="title">热门搜索</h1>
  					<ul>
  						<li @click='addQuery(item.k)' class="item" v-for='item in hotKey'>
  							<span>{{item.k}}</span>
  						</li>
  					</ul>
  				</div>
          <div class="search-history" v-show='searchHistory.length'>
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click='showConfirm'>
                <i class="icon-clear"></i>
              </span>
            </h1>
            <SearchList :searches='searchHistory' @select='addQuery' @delete='deleteSearchHistory'></SearchList>
        </div>
        </div>
			</Scroll>
		</div>
    <div class="search-result" v-show="query" ref='searchResult'> 
      <suggest :query="query" @listScroll='blurInput' @select='saveSearch' ref='suggest'></suggest>
    </div>
    <Confirm ref='confirm' text='是否要清空搜索历史？' confirmBtnText='清空' cancelBtnText='不了' @confirm='clearSearchHistory'></Confirm>
    <router-view></router-view>
	</div>
</template>

<script>
import SearchBox from 'base/search-box/search-box';
import {getHotKey} from 'api/search';
import {ERR_OK} from 'api/config';
import Suggest from 'components/suggest/suggest';
import {mapActions,mapGetters} from 'vuex';
import SearchList from 'base/search-list/search-list';
import Confirm from 'base/confirm/confirm';
import Scroll from 'base/scroll/scroll';
import {playlistMixin,searchMixin} from 'common/js/mixin'


export default{
  mixins:[playlistMixin,searchMixin],
	created(){
		this._getHotKey();
	},
	data(){
		return{
			hotKey:[]
		}
	},
	methods:{
    handlePlaylist(playlist){
      const bottom=playlist.length>0?'60px':''
      this.$refs.shortcutWrapper.style.bottom=bottom
      this.$refs.shortcut.refresh()

      this.$refs.searchResult.style.bottom=bottom
      this.$refs.suggest.refresh()
    },
    saveSearch(){
      this.saveSearchHistory(this.query)
    },
    showConfirm(){
      this.$refs.confirm.show()
    },
		_getHotKey(){
			getHotKey().then((res)=>{
				if (res.code===ERR_OK) {
					this.hotKey=res.data.hotkey.slice(0,10);
				}
			})
		},
    ...mapActions([
      'clearSearchHistory'
    ])
	},
  computed:{
    ...mapGetters([
      'searchHistory'
    ]),
    shortcut(){
      return this.hotKey.concat(this.searchHistory)
    }
  },
	components:{
		SearchBox,
    Suggest,
    SearchList,
    Confirm,
    Scroll
	},
  watch:{
    query(newQuery){
      setTimeout(()=>{
        this.$refs.shortcut.refresh()
      }, 20);
    }
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-theme-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>