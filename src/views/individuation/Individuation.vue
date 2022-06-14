<template>
  <div class="individuation">
    <Banner />
    <h4>推荐歌单</h4>
    <music-list :music-list="personalized"/>
    <private-content :pri="privateContent"/>
    <new-song class="newsong" :music-list="songList"/>
  </div>
</template>

<script>
import Banner from "./childcomps/banner.vue";
import PrivateContent from "./childcomps/PrivateContent.vue";
import MusicList from "components/content/musiclist/MusicList";
import NewSong from "./childcomps/newSong.vue";
import { 
  _getPersonalized,
  _getPrivateContent,
  _getNewSong 
} from "network/individuation";

export default {
  name: "Individuation",
  components: {
    Banner,
    MusicList,
    PrivateContent,
    NewSong,
  },
  data(){
    return{
      personalized: null, //保存获取到的推荐歌单
      limit: 10, //一次获取的歌单数量
      privateContent:null,//保存获取到的独家播放
      songList:null,//保存获取到的最新音乐
      musiclist: [],
    }
  },
  methods: {
    playMusic(index) {
      this.musiclist = [];
      for (let i in this.songList) {
        _getSongsDetail(this.songList[i].id).then((res) => {
          let song = new songDetail(res.data.songs);
          this.musiclist.push(song);
          if (i == this.songList.length - 1) {
            this.PlayMusic(index);
          }
        });
      }
    },
    getPersonalized() {
      _getPersonalized(this.limit).then((res) => {
        this.personalized = res.data.result;
      });
    },
    getPrivateContent() {
      _getPrivateContent().then((res) => {
        this.privateContent = res.data;
        // console.log(res.data);
      })
    },
    getNewSong() {
      _getNewSong().then((res) => {
        this.songList = res.data.result;
        // console.log(JSON.stringify(res.data.result));
      });
    },
  },
  created() {
    this.getPersonalized(),
    this.getPrivateContent(),
    this.getNewSong()
  },
};
</script>

<style scoped>
.individuation {
  width: 100%;
  height: 100%;
  padding: 10px 100px 0px 100px;
}

</style>