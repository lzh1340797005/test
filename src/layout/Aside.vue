<template>
  <div class="aside">
    <Cebian />
    <div class="my-music-list">
      <!-- <p class="title">创建的歌单</p> -->
      <div class="aside-scroll">
        <ul class="my-music-list-main">
          <li
            v-for="(item, index) in playList"
            :key="index"
            @click="enterMusicListDetail(index)"
          >
            <img :src="item.cover" alt="" />
            <div class="my-music-list-main-name">{{ item.name }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Cebian from "components/common/cebian/cebian";
import { _getSongList, PlayList ,_getLikelist} from "network/user";

export default {
  data() {
    return {
      playList: [],
    };
  },
  components: {
    Cebian,
  },
  computed: {
    getUserId() {
      return this.$store.getters.getUserId;
    },
  },
  methods: {
    getPriPlayList() {
      this.playList = [];
      _getSongList(this.getUserId).then((res) => {
        let playlist = res.data.playlist;
        console.log(res.data.playlist);
        for (let i in playlist) {
          let playList = new PlayList(playlist[i]);
          this.playList.push(playList);
          if (i == playlist.length - 1) {
            localStorage.setItem("playList", JSON.stringify(this.playList));
          }
        }
      });
    },
    getLikelist(){
        _getLikelist(this.getUserId).then((res)=>{
          // let playlist = res.data.playlist
          console.log(JSON.stringify(res.data));
        })
    },
    enterMusicListDetail(index) {
      if(index == 0){
        // this.$router.push()
      }
      else {
        this.$router.push(
          "/musiclistdetail/" +
            this.playList[index].id +
            "/" +
            new Date().getTime()
        );
      }
    },
  },
  created() {
    this.getLikelist()
    /**首先从本地存储获取歌单，没有则请求数据 */
    if (localStorage.getItem("playList")) {
      this.playList = JSON.parse(localStorage.getItem("playList"));
    } else {
      if (this.getUserId) {
        this.getPriPlayList();
      }
    }
  },
  watch: {
    getUserId() {
      this.getPriPlayList();
    },
  },
};
</script>

<style lang="less" scoped>
.aside {
  position: relative;
  top: 70px;
  width: 18%;
  float: left;
  height: calc(100% - 10rem);
  background-color: #f9f9f9;
}
/deep/ .el-menu {
  border-right: none;
}
.my-music-list {
  height: calc(40%);
  padding: 10px 0px;
  .title {
    font-size: 13px;
  }
  &-main {
    list-style-type: none;
    padding-left: 20px;
    // overflow-x: hidden;
    // overflow-y: scroll;
    li {
      height: 30px;
      font-size: 13px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      align-items: center;
      img {
        height: 80%;
        border-radius: 2px;
      }
    }
    &-name {
      padding: 0px 10px;
    }
  }
}
.aside-scroll {
  height: calc(100%);
  overflow: auto;
}
.aside-scroll::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
  display: none;
}
</style>