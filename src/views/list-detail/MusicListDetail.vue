<template>
  <div class="detailClass">
    <base-info :base-info="baseInfo" @playMusic="playMusic"></base-info>
    <div>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item
          v-for="(item, index) in list"
          :key="index"
          :index="item.index"
          >{{ list[index].title }}</el-menu-item
        >
        <!-- <el-menu-item index="1">评论</el-menu-item>
        <el-menu-item index="2">收藏者</el-menu-item> -->
      </el-menu>
      <div class="detail-container">
        <song-list
          ref="songList"
          :music-list="musicList"
          :length="length"
          v-show="activeIndex == '0'"
        ></song-list>

        <div class="detail-container-recommend" v-show="activeIndex == '1'">
          <recommends ref="recommend" :recommends="recommends" :id="id" />
          <div class="recommend-bottom">
            <el-pagination
              background
              :current-page.sync="offset"
              :page-size.sync="limit"
              :page-count="recommengdPages"
              @current-change="onPageChange"
            />
          </div>
        </div>
        <music-list-live :subs="subs" v-show="activeIndex == '2'" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  _getRecommends,
  _getMusicListDetail,
  _getSongsDetail,
  _getSub,
  baseInfo,
} from "network/detail";
import { playMusic } from "mixin/global/play-music";
import Recommends from "./childsComps/Recommends";
import BaseInfo from "./childsComps/baseinfo";
import SongList from "components/common/song-list/song-list";
import MusicListLive from "./childsComps/MusicListLive";
import { songDetail } from "@/network/detail";
export default {
  mixins: [playMusic],
  components: { Recommends, BaseInfo, SongList, MusicListLive },
  data() {
    return {
      id: null,
      limit: 30,
      offset: 1, //分页
      // offset:1,
      recommends: null,
      recommendsCount: 0,
      activeIndex: "0",
      musicList: [],
      list: [
        {
          index: "",
          title: "",
        },
      ],
      isShow: "music",
      subs: null,
      length: null,
      baseInfo: {},
      menuindex: "",
      recommengdPages: 0,
      busy: false,
    };
  },
  created() {
    this.getDetailRequestDate();
  },
  computed: {
    getoffset() {
      return (this.offset - 1) * this.limit;
    },
    // disabled() {
    //   return this.busy;
    // },
  },
  methods: {

    /**处理分页点击 */
    onPageChange() {
      // this.offset = this.offset+1
      this.getRecommends();

      // 点击评论下一页后自动滚到评论顶部
      // this.$nextTick(()=>{
      //   let posY=this.$refs.recommend.$el.offsetTop;
      //   // this.$refs.scroll.scrollTo(posY,0);
      //   this.handleRefresh();
      // })
    },

    getRecommends() {
      // console.log("id",this.id);
      // console.log("limit",this.limit);
      // console.log("offset",this.offset);
      _getRecommends(this.id, this.limit, this.getoffset).then((res) => {
        this.recommends = res.data.comments;
        this.recommengdPages = Math.ceil(res.data.total / this.limit);
      });
    },
    handleSelect(key) {
      this.activeIndex = key;
    },
    init() {
      this.limit = 20;
      this.list = [];
      this.baseinfo = {};
      this.musicList = [];
      this.isShow = "music";
      this.recommends = null;
      this.subs = null;
    },
    async getDetailRequestDate() {
      this.id = this.$route.params.id;
      if (!this.id) return;

      this.init();
      const res = await _getMusicListDetail(this.id);
      /**保存歌单基础信息 */
      this.baseInfo = new baseInfo(res.data && res.data.playlist);
      /**获取歌单评论数 */
      this.recommendsCount = res.data.playlist.commentCount;
      let str = "评论(" + this.recommendsCount + ")";
      this.list = [
        { index: "0", title: "歌曲列表" },
        { index: "1", title: str },
        { index: "2", title: "收藏者" },
      ];

      /**遍历查询歌单所有歌曲详情 */
      const trackIds = res.data.playlist.trackIds;
      /**获取歌曲列表长度 */
      this.length = trackIds.length;
      for (let i = 0, length = trackIds.length; i < length; i++) {
        _getSongsDetail(trackIds[i].id).then((res) => {
          let song = new songDetail(res.data.songs);
          this.musicList.push(song);
        });
      }
      /**获取歌单评论 */
      this.getRecommends();
      /**获取歌单收藏者 */
      _getSub(this.id, 30).then((res) => {
        this.subs = res.data.subscribers;
      });
    },
  },
  watch: {
    /**监听导航变化重新发送请求 */
    $route() {
      if (this.$route.path.indexOf("musiclistdetail") > 0) {
        this.getDetailRequestDate();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.detailClass {
  height: 100%;
  padding: 10px 30px 0px 30px;
}
</style>