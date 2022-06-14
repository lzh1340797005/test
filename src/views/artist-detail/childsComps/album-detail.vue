<template>
  <div class="artist-album-detail">
    <div class="artist-album-detail-left">
      <img :src="album.picUrl" alt="" />
    </div>
    <div class="artist-album-detail-right">
      <p>{{ album.name }}</p>
      <song-list
        :music-list="musicList"
        :lines="lines"
        :showheader="showheader"
      ></song-list>
    </div>
  </div>
</template>

<script>
import { _getSongsDetail, songDetail } from "network/detail";
import { _getAlbum } from "network/artist";
import SongList from "components/common/song-list/song-list";
export default {
  components: { SongList },
  props: {
    album: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      musicList: [],
      lines: [true, true, true, false, false, true],
      showheader: false,
    };
  },
  created() {
    if (Object.keys(this.album).length) this.initRequest();
  },
  methods: {
    initRequest() {
      _getAlbum(this.album.id).then((res) => {
        let songs = res.data.songs;
        for (let i in songs) {
          _getSongsDetail(songs[i].id).then((res) => {
            let song = new songDetail(res.data.songs);
            this.musicList.push(song);
            if (i == songs.length - 1) {
              this.$emit("refresh");
            }
          });
        }
      });
    },
    reset() {
      this.musicList = [];
    },
  },
  watch: {
    album() {
      this.initRequest();
      this.reset();
    },
  },
};
</script>

<style lang="less" scoped>
.artist-album-detail {
  align-items: flex-start;
  padding: 10px 0px;
  display: flex;
  overflow-y: auto;
  &-left {
    width: 150px;
    flex: 1;
    padding-right: 10px;
    img {
      width: 100%;
    }
  }
  &-right {
    p {
      font-size: 14px;
      padding-bottom: 8px;
    }
    flex: 4;
    padding: 0px 10px;
  }
}
</style>