<template>
  <div class="artist-hot50">
    <div class="artist-hot50-left">
      <img :src="getPic" alt="" />
    </div>
    <div class="artist-hot50-right">
      <p>热门50首</p>
      <song-list
        :music-list="musicList"
        :lines="lines"
        :showheader="showheader"
      ></song-list>
    </div>
  </div>
</template>

<script>
import SongList from "components/common/song-list/song-list";
import { _getArtistHot50 } from "network/artist";
import { _getSongsDetail, songDetail } from "network/detail";
export default {
  components: { SongList },
  props: {
    id: {
      type: [Number, String],
      type: 0,
    },
  },
  data() {
    return {
      musicList: [],
      lines: [true, true, true, false, false, true],
      showheader: false,
    };
  },
  methods: {
    initRequest() {
      _getArtistHot50(this.id).then((res) => {
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
    reset(){
        this.musicList=[]
    }
  },
  created() {
    this.initRequest();
  },
  computed: {
    getPic() {
      if (this.musicList.length) return this.musicList[0].pic;
    },
  },
  watch:{
      id(){
          this.reset()
          this.initRequest()
      }
  }
};
</script>

<style lang="less" scoped>
.artist-hot50{
    height: 350px;
    margin:10px 0;
    display: flex;
    overflow-y: auto;
    &-left{
        width: 150px;
        flex: 1;
        padding-right: 10px;
        img{
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