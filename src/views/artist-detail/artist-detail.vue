<template>
  <div class="artist-detail">
    <artist-baseinfo :artist="getArtist" :mvCount="getMvCount" />
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in list"
          :key="index"
          :label="item"
          :name="item"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <album-list :id="getArtistId" v-show="isShow == 0"> </album-list>
    <artist-allmusic :id="getArtistId" v-show="isShow == 1"></artist-allmusic>
    <artist-mvs
      :show-artist="false"
      :mv-list="mvList"
      :lineNum="6"
      :height="8"
      v-show="isShow == 2"
    ></artist-mvs>
    <artist-desc-detail
      :id="getArtistId"
      :name="artist.name"
      v-show="isShow == 3"
    ></artist-desc-detail>
    <artist-simi :id="getArtistId" v-show="isShow == 4"></artist-simi>
  </div>

  <!-- </scroll> -->
</template>
<script>
import { formatDate } from "utils/tool";

import { _getArtistMv } from "network/artist";
import { MV } from "network/mv";
import ArtistBaseinfo from "./childsComps/artist-baseinfo";
import AlbumList from "./childsPage/album-list";
import ArtistMvs from "components/content/mv-list/mv-list";
import ArtistDescDetail from "./childsPage/artist-desc-detail";
import ArtistSimi from "./childsPage/artist-simi.vue";
import ArtistAllmusic from './childsPage/artist-allmusic.vue'
export default {
  name: "ArtistDetail",
  components: {
    ArtistBaseinfo,
    AlbumList,
    ArtistMvs,
    ArtistDescDetail,
    ArtistSimi,
    ArtistAllmusic
  },
  data() {
    return {
      artist: null,
      list: ["专辑","所有歌曲", "MV", "歌手详情", "相似歌手"],
      isWheel: false, //是否禁用wheel
      isShow: 0,
      mvList: [],
      activeName: "专辑",
    };
  },
  created() {
    this.artist = JSON.parse(this.$route.query.artist);
    this.initRequest();
    // this.isShow = 0
  },
  computed: {
    /**获取歌曲初始数据 */
    getArtist() {
      return this.artist;
    },
    /**获取歌手id */
    getArtistId() {
      if (this.artist.id) return this.artist.id;
    },
    getMvCount() {
      return this.mvList.length;
    },
  },
  methods: {
    reset() {
      this.mvList = [];
      this.isShow = "专辑";
    },
    getIsshow() {
      this.isShow = 0;
    },
    initRequest() {
      _getArtistMv(this.artist.id).then((res) => {
        let mvs = res.data.mvs;
        for (let i in mvs) {
          let mv = new MV(
            mvs[i].id,
            mvs[i].imgurl,
            mvs[i].name,
            mvs[i].artistName,
            mvs[i].playCount,
            formatDate(new Date(mvs[i].duration), "MM:dd")
          );
          this.mvList.push(mv);
          // console.log(JSON.stringify(this.mvList));
        }
      });
    },
    handleClick(tab) {
      // let index = tab.index
      // console.log(tab.name);
      // console.log(tab.index);
      this.isShow = tab.index;
    },
  },
  // handleRefresh() {
  //   this.$refs.scroll.refresh();
  // },
  /**鼠标进入热门50首，禁用启用外层wheel */
  watch: {
    /**路由变化数据置空 */
    $route() {
      if (this.$route.path.indexOf("artist-detail") > 0) {
        this.artist = JSON.parse(this.$route.query.artist);
        this.reset();
        this.initRequest();
        this.getIsshow();
        this.activeName = "专辑";
      }
    },
  },
};
</script>
<style lang="less" scoped>
.artist-detail {
  height: 100%;
  padding: 10px 30px 0px 30px;
}
/deep/.el-tabs__item {
  width: 140px;
  text-align: center;
  padding: 0px;
  height: 60px;
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  line-height: 60px;
}
</style>