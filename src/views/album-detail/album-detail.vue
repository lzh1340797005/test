<template>
  <div class="album-detail" ref="album">
    <div class="dance-music-album-detail">
      <base-info
        :base-info="album"
        :album-detail="albumDetail"
        :cover="getAlbumCover"
        @playMusic="playMusic"
      ></base-info>
      <song-list
        :music-list="musicList"
        @refresh="handleRefresh"
        ref="songList"
      />
    </div>
  </div>
</template>

<script>
import { _getSongsDetail, songDetail } from "network/detail";
import { _getAlbum } from "network/artist";
import { _getAlbumDetail } from "network/album";

import { playMusic } from "mixin/global/play-music";
import baseInfo from "./childsComps/baseInfo.vue";
import SongList from "components/common/song-list/song-list";
export default {
  mixins: [playMusic],
  components: {
    baseInfo,
    SongList
  },
  data() {
    return {
      album: {},
      albumDetail: {},
      musicList: [],
    };
  },
  created() {
    this.album = this.$route.query.album;
    this.getAlbumDetail();
    this.getAlbumSongs();
  },
  computed: {
    getAlbumCover() {
      if (this.musicList[0] && this.musicList[0].pic)
        return this.musicList[0].pic;
    },
  },
  methods: {
    handleRefresh() {
      location.reload()
      // this.$router.go(0)
    },
    /**获取专辑信息：收藏数、分享数等 */
    getAlbumDetail() {
      _getAlbumDetail(this.album.id).then((res) => {
        this.albumDetail = res.data;
      });
    },
    /**获取专辑歌曲 */
    getAlbumSongs() {
      _getAlbum(this.album.id).then((res) => {
        let songs = res.data.songs;
        for (let i in songs) {
          _getSongsDetail(songs[i].id).then((res) => {
            let song = new songDetail(res.data.songs);
            this.musicList.push(song);
            // if (i == songs.length - 1) {
            //   this.$nextTick(() => {
            //     this.handleRefresh();
            //   });
            // }
          });
        }
      });
    },
  },
  watch: {
    $route: {
      handler() {
        if (this.$route.path.indexOf("album-detail") > 0) {
          this.album = this.$route.query.album;
          this.getAlbumDetail();
          this.getAlbumSongs();
        }
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.dance-music-album-detail {
  padding: 10px 30px 0px 30px;
}
</style>