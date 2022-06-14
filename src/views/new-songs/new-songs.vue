<template>
  <div class="dance-music-newsongs">
    <div class="newsongs-title">
      <el-tabs v-model="activeAreaName" @tab-click="handleAreasClick">
        <el-tab-pane
          v-for="(item, index) in areas"
          :key="index"
          :label="item.content"
          :name="item.content"
        ></el-tab-pane>
      </el-tabs>
      <song-list :music-list="musicList" newsongs />
    </div>
  </div>
</template>

<script>
import { _getTopSongs } from "network/individuation";
import { _getSongsDetail, songDetail } from "network/detail";
import SongList from "components/common/song-list/song-list";
import lodash from 'lodash'
export default {
  name: "NewSongs",
  components: { SongList },
  data() {
    return {
      areas: [
        { value: 0, content: "全部" },
        { value: 7, content: "华语" },
        { value: 96, content: "欧美" },
        { value: 16, content: "韩国" },
        { value: 8, content: "日本" },
      ],
      currentArea: 0,
      activeAreaName: "全部",
      page: 1,
      musicList: [],
    };
  },
  created() {
    this.getTopSongs();
  },

  methods: {
    handleAreasClick: lodash.debounce(function(tab){
      this.musicList = [];
      this.currentArea = this.areas[tab.index].value;
      this.getTopSongs();
    },2000) ,


    getTopSongs() {
      this.musicList = [];
      _getTopSongs(this.currentArea).then((res) => {
        let list = res.data.data;
        for (let i in list) {
          _getSongsDetail(list[i].id).then((res) => {
            let song = new songDetail(res.data.songs);
            this.musicList.push(song);
            // if (i == list.length - 1) {
            //   this.$nextTick(()=>{
            //       this.handleRefresh();
            //   })
            // }
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.dance-music-newsongs {
  padding: 10px 50px 0px 50px;
}
::v-deep .vbestui-menu-item-container i {
  margin-right: 0px !important;
}
.newsongs {
  &-title {
    font-size: 14px;
  }
}
</style>