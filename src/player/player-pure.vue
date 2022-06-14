<template>
  <div class="player-pure">
    <div class="player-pure-container">
      <el-button
        class="closebutton"
        type="warning"
        icon="iconfont icon-min"
        size="small"
        @click="closePure"
      >
      </el-button>
      <div class="player-pure-top">
        <div class="player-record">
          <div class="player-record-support">
            <img src="../assets/player/play-bar-support.png" alt="" />
          </div>
          <div class="player-record-bar">
            <img src="../assets/player/play-bar.png" alt="" />
          </div>
          <div class="player-pure-pic">
            <img v-lazy="song.pic" alt="" />
          </div>
        </div>
        <div class="player-pure-lyric">
          <div class="player-pure-lyric-desc">
            <div class="song-title">{{ song.name }}</div>
            <div class="song-artist">{{ song.artist}}</div>
          </div>
          <lyric :lyric="lyric" middle :current-time="currentTime" />
        </div>
      </div>
      <recommends
        ref="recommend"
        :recommends="recommends"
        class="player-pure-recommends"
      />
      <div class="player-pure-bottom">
        <el-pagination
          background
          :current-page.sync="offset"
          :page-count="pageCount"
          @current-change="onPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Recommends from "views/list-detail/childsComps/Recommends";
import Lyric from "./player-lyric.vue";
// import Recommends from "@/views/list-detail/childsComps/Recommends";
import { _musicRecommend } from "network/detail";
export default {
  data() {
    return {
      recommends: null,
      limit: 30,
      offset: 1,
      pageCount: 50,
      count : 0
    };
  },
  props: {
    song: {
      type: Object,
      default() {
        return {};
      },
    },
    lyric: {
      type: String,
      default: "",
    },
    currentTime: {
      type: Number,
      default: 0,
    },
  },
  components: {
    Lyric,
    // Recommends
    Recommends,
  },
  computed: {
    getOffset() {
      return (this.offset - 1) * this.limit;
    },
  },
  watch: {
    song: {
      immidiate: true,
      handler(song) {
        if (song.id) this.getRecom();
      },
    },
  },
  methods: {
    closePure() {
      this.$parent.isPure = false;
    },
    async getRecom() {
      await _musicRecommend(this.song.id, this.limit, this.getOffset).then(
        (res) => {
          this.recommends = res.data.comments;
          this.count = res.data.total
          this.pageCount = Math.ceil(this.count / 30) 
        }
      );
    },
    /**分页 */
    onPageChange() {
      // console.log(this.recommends.length);
      // for(let i =0 ; this.recommends.length == 30 ;i++){
      //   this.pageCount = i
      // }
      this.getRecom();
      /**分页后滚动到评论顶部 */
      // this.$nextTick(() => {
      //   let posY = this.$refs.recommend.$el.offsetTop;
      //   this.$refs.scroll.scrollTo(posY, 0);
      // });
    },
  },
};
</script>

<style lang="less" scoped>
.player-pure {
  width: 100%;
  height: calc(100vh - 70px - 60px);
  overflow-y: auto;
  position: absolute;
  z-index: 2;
  left: 0px;
  bottom: 60px;
  background-color: #fff;
  &-container {
    padding: 0px 250px;
  }
  &-recommends {
    margin-top: 20px;
  }
}
.closebutton {
  position: absolute;
  right: 200px;
  top: 10px;
}
.icon-min {
  font-weight: 700;
}
.player-pure-top {
  height: 400px;
  display: flex;
  background: radial-gradient(closest-side, #928e8d, #fff);
}
.player-record {
  flex: 1;
  position: relative;
  &-support {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    z-index: 3;
    left: 0;
    right: 0;
    top: 0;
    margin: auto;
    img {
      width: 100%;
    }
  }
  &-bar {
    width: 80px;
    transform-origin: 0 0;
    transform: rotate(-7deg);
    transition: transform 0.3s;
    position: absolute;
    z-index: 2;
    left: 49%;
    top: 17px;
    img {
      width: 100%;
    }
  }
}
.player-pure-lyric {
  overflow: hidden;
  width: 40%;
  &-desc {
    padding: 0px 20px;
    border: 40px;
    .song-title {
      font-size: 20px;
    }
    .song-artist {
      font-size: 13px;
      padding: 3px 0px;
    }
  }
}
.player-pure-pic {
  width: 240px;
  height: 240px;
  border: 40px solid #0e0e11;
  border-radius: 50%;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 60px;
  margin: auto;
  animation: rotate 20s linear infinite;
  img {
    width: 100%;
    border-radius: 50%;
  }
}
.player-pure-recommends{
  padding-bottom: 50px;
}
.player-pure-bottom {
  text-align: center;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(1turn);
  }
}
</style>