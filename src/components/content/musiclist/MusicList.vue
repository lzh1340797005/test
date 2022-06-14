<template>
  <div class="private">
    <div class="content">
      <div
        class="item"
        v-for="(item, index) in musicList"
        :key="index"
        @mouseenter="handleEnter(index)"
        @mouseleave="handleLeave(index)"
        @click="enterMusicListDetail(index)"
      >
        <div class="playlist-container">
          <template>
            <transition name="playlist-slide">
              <div class="playlist-desc" v-show="currentIndex == index">
                {{ item.copywriter }}
              </div>
            </transition>
          </template>
          <transition name="playlist-slide">
            <div class="playlist-count" v-show="currentIndex != index">
              <i class="iconfont icon-erji"></i>
              {{ item.playCount }}
            </div>
          </transition>
          <img :src="item.picUrl || item.coverImgUrl" alt />
          <transition name="dance-music-opacity">
            <div class="playlist-play" v-show="currentIndex == index">
              <i class="iconfont icon-icon_play"></i>
            </div>
          </transition>
        </div>
        <div class="bottom">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { _getPersonalized } from "network/individuation";
export default {
  name:"MusicList",
  data() {
    return {
      // limit: 10, //一次获取的歌单数量
      personalized: null, //保存获取到的推荐歌单
      currentIndex: null,
      ishow: true,
    };
  },
  props: {
    musicList: {
      type: Array,
      default: [],
    },
    emptyDesc: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleEnter(index) {
      this.currentIndex = index;
    },
    handleLeave(index) {
      this.currentIndex = null;
    },
    enterMusicListDetail(index) {
      this.$router.push(
        "/musiclistdetail/" + this.musicList[index].id + "/" + new Date().getTime()
      );
    },
    handleRefresh() {
      if (this.imgCount == this.musicList.length) {
        this.$emit("refresh");
      }
      this.imgCount++;
    },
  },
  // created() {
  //   this.getPersonalized();
  // },
};
</script>

<style scoped lang="less">
.private {
  width: 100%;
  padding: 0 0;
}
h4 {
  padding-left: 10px;
}
.content {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.item {
  position: relative;
  width: calc(20%);
  margin: 0;
  overflow: hidden;
  padding-left: 1rem;
}
.item img {
  width: 100%;
  border-radius: 0.28571rem;
}
.bottom {
  font-size: 1rem;
  font-family: 'Times New Roman', Times, serif;
}
.loco {
  position: absolute;
  left: 5px;
  top: 5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}
.loco img {
  width: 20px;
  border: 50%;
}
.iconfont {
  color: #ffffff;
}
.playlist-container {
  position: relative;
  cursor: pointer;
}
.playlist-desc {
  background-color: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  height: 25px;
  text-align: left;
  padding-left: 5px;
  line-height: 25px;
  position: absolute;
  width: 100%;
  font-size: 13px;
  top: 0;
  left: 0;
  // animation-name: in;
  // animation-duration: 0.4s;
  // animation-direction: reverse;
}
.playlist-count {
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
  color: #ffffff;
  height: 25px;
  text-align: right;
  padding-right: 5px;
  line-height: 25px;
  position: absolute;
  width: 100%;
  font-size: 13px;
  top: 0;
  right: 0;
  // animation-name: out;
  // animation-duration: 0.4s;
  // animation-direction: reverse;
}
.playlist-play {
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 8px;
  left: 5px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  .icon-icon_play {
    font-size: 18px;
    color: red;
  }
  // animation: slideInDown 0.4s;
  // animation: slideInDown 0.4s reverse;
}
// @keyframes in {
//   from {
//     transform: translateY(-25px);
//   }
//   to {
//     transform: translateY(0px);
//   }
// }
// @keyframes out {
//   to {
//     transform: translateY(-25px);
//   }
// }
.playlist-slide-enter-active {
  animation: slideInDown 0.4s;
}
.playlist-slide-leave-active {
  animation: slideInDown 0.4s reverse;
}
</style>