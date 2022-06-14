<template>
  <div>
    <!-- <ul class="infinite-list" v-infinite-scroll="load" style="overflow: auto">
      <li v-for="i in count" class="infinite-list-item" :key="i">
        {{ i }}
      </li>
    </ul> -->
    <!-- <song-list :music-list="musicList"></song-list> -->

    <div
      style="height:700px; overflow: auto"
      v-infinite-scroll="load"
      infinite-scroll-disabled="busy"
      infinite-scroll-delay="2000"
      infinite-scroll-immediate="false"
    >
      <div style="height: 700px">
        <song-list :music-list="musicList" :showheader="false"></song-list>
        <p v-if="busy">加载中...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { _getArtistAllMusic } from "network/artist";
import { _getSongsDetail, songDetail } from "network/detail";
import SongList from "components/common/song-list/song-list";
export default {
  props: {
    id: {
      type: [Number, String],
      default: 0,
    },
  },
  components: { SongList },
  data() {
    return {
      limit: 50,
      offset: 1,
      musicList: [],
      count: 0,
      busy: false,
    };
  },
  computed: {
    getoffset() {
      return (this.offset - 1) * this.limit;
    },
    disabled() {
      return this.busy;
    },
  },
  created() {
    this.getArtistAllMusic();
  },
  methods: {
    getArtistAllMusic() {
      _getArtistAllMusic(this.id, this.limit, this.getoffset).then((res) => {
        let songs = res.data.songs;
        // console.log(songs);
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
    onPageChange() {
      this.offset = this.offset+1
      this.getArtistAllMusic();
    },
    reset() {
      this.musicList = [];
      this.offset = 1
      this.busy = false;
    },
    load() {
      this.busy = true;
      setTimeout(() => {
        this.onPageChange();
        this.busy = false;
      }, 2000);
    },
  },
  watch: {
    id() {
      this.reset();
      this.getArtistAllMusic();
    },
  },
};
</script>

<style scoped>
.infinite-list-item {
  height: 1000px;
}
</style>