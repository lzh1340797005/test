<template>
  <div class="player">
    <player-cover class="player-cover" :song="playList[currentIndex]" />
    <player-lyric
      class="player-lyric-simple"
      :lyric="lyric"
      height="60px"
      :scroll="true"
      :currentTime="currentTime"
      v-show="isShowLyric"
    />
    <transition name="player-side">
      <player-list
        class="player-list"
        :class="[isShowList ? 'player-list-active' : '']"
        :music-list="musicList"
        v-show="isShowList"
      />
    </transition>
    <transition name="player-pure-side">
      <play-pure
        :song="playList[currentIndex]"
        :lyric="lyric"
        :current-time="currentTime"
        v-show="isPure"
      >
      </play-pure>
    </transition>
    <audio
      :src="getSongSrc"
      autoplay
      ref="audio"
      @timeupdate="audioTimeUpdate()"
      @pause="musicPause()"
      @ended="musicEnded()"
      @play="playLoad()"
      @playing="musicPlaying()"
      @error="musicErr()"
    ></audio>
    <div class="player-toggle">
      <div class="player-pre player-toggle-item" @click="preMusic">
        <i class="player-icon iconfont icon--previous"></i>
      </div>
      <div class="player-player-type player-toggle-item" @click="toggle">
        <i class="player-icon-type iconfont icon-bofang1" v-show="!isPlay"></i>
        <i class="player-icon-type iconfont icon-zanting" v-show="isPlay"></i>
      </div>
      <div class="player-next player-toggle-item" @click="nextMusic">
        <i class="player-icon iconfont icon-next"></i>
      </div>
    </div>
    <div class="player-progress">
      <div class="player-progress-current-time">{{ getCurrentTime }}</div>
      <div class="player-progress-main">
        <div class="block">
          <!-- <span class="demonstration">隐藏 Tooltip</span> -->
          <el-slider
            class="slider"
            v-model="PlayerPercentage"
            :show-tooltip="false"
            @change="changePlayerPercent"
          ></el-slider>
        </div>
      </div>
      <div class="player-progress-time">{{ getDurationTime }}</div>
    </div>
    <div class="player-volumn">
      <span @click="toggleaVolume">
        <i class="player-small-icon iconfont icon-V" v-show="!isVolume" />
        <i class="player-small-icon iconfont icon-jingyin" v-show="isVolume" />
      </span>
      <div class="player-volumn-progress">
        <el-slider
          class="slider"
          v-model="volumnPercent"
          :show-tooltip="false"
          @change="changeVolumnPercent"
        >
        </el-slider>
      </div>
    </div>
    <div class="player-tool">
      <div class="player-tool-schema" @click="toggleSchema">
        <a href="#" title="顺序播放" v-show="schemaIndex == 0"
          ><i class="player-small-icon iconfont icon-shunxu"
        /></a>
        <a href="#" title="随机播放" v-show="schemaIndex == 1"
          ><i class="player-small-icon iconfont icon-suiji"
        /></a>
        <a href="#" title="单曲播放" v-show="schemaIndex == 2"
          ><i class="player-small-icon iconfont icon-danqu"
        /></a>
      </div>
      <div class="player-tool-lyric" @click="toggleLyric">
        <a href="#" title="歌词"
          ><i class="player-small-icon iconfont icon-lyric" :class="[this.isShowLyric ? 'icon-active':'']"
        /></a>
      </div>
      <div class="player-tool-list" @click="toggleMusicList">
        <a href="#" title="歌单"
          ><i class="player-small-icon iconfont icon-gedan" :class="[this.isShowList ? 'icon-active':'']"
        /></a>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerCover from "./player-cover";
import PlayerLyric from "./player-lyric";
import PlayerList from "./player-list.vue";
import PlayPure from "./player-pure.vue";
import { formatDate } from "@/utils/tool";
import { _getLyric } from "network/detail";
export default {
  components: {
    PlayerCover,
    PlayerLyric,
    PlayerList,
    PlayPure,
  },
  data() {
    return {
      isPlay: false, //播放状态
      isVolume: false, //是否静音
      schemaIndex: 0, //音乐播放方式--0:顺序、1：随机、2：单曲
      PlayerPercentage: 0, //播放进度
      volumnPercent: 10, //音量百分比
      preVolumePrecent: 0, //之前音量大小
      musicList: [], //歌单
      isShowList: false, //是否显示播放列表
      id: null, //接收传来的播放列表唯一标识
      playList: [], //播放列表
      currentIndex: 0, //当前播放音乐
      currentTime: 0, //当前音乐播放时间
      duration: 0, ////音乐总时间
      // isMusicDrag: false, //是否音乐进度条正在拖拽正在拖拽
      lyric: null, //歌词
      isShowLyric: false, //是否显示歌词
      isPure: false, //是否打开播放页
    };
  },
  methods: {
    //播放列表显示
    toggleMusicList() {
      this.isShowList = !this.isShowList;
    },
    //设置要播放的音乐
    setCurrentIndex(index) {
      for (let i in this.playList) {
        if (this.playList[i].index == index) {
          this.currentIndex = i;
          break; //break跳出循环------continue跳出本次循环
        }
      }
    },
    //音乐进度条点击拖拽
    changePlayerPercent() {
      //  this.isMusicDrag = true;
      this.setMusicCurrent();
    },
    //音量百分比点击拖拽
    changeVolumnPercent() {
      this.setVolume();
    },
    /**返回当前的播放时间 */
    audioTimeUpdate() {
      if (this.$refs.audio != null) {
        this.currentTime = this.$refs.audio.currentTime;

        if (!this.isMusicDrag)
          this.PlayerPercentage = (this.currentTime / this.duration) * 100;
      }
    },
    /**监听音乐加载 */
    playLoad() {
      this.duration = this.$refs.audio.duration;
      _getLyric(this.playList[this.currentIndex].id).then((res) => {
        this.lyric = (res.data.lrc && res.data.lrc.lyric) || "暂无歌词";
        // console.log(res.data);
      });
    },
    //监听音乐暂停
    musicPause() {
      this.isPlay = false;
      if (this.$refs.player != null) this.$refs.player.isPlay = false;
    },
    //监听音乐结束并判断播放方式
    musicEnded() {
      console.log("end:" + this.schemaIndex);
      switch (this.schemaIndex) {
        case 0: //循环播放
          this.currentIndex >= this.playList.length - 1
            ? 0
            : this.currentIndex++;
          break;
        case 1: //随机播放
          this.currentIndex = Math.floor(Math.random() * this.playList.length);
          break;
        case 2: //单曲循环
          this.currentIndex = this.currentIndex;
          break;
      }
    },
    //监听音乐已经开始播放
    musicPlaying() {
      this.isPlay = true;
      this.$bus.$emit(
        "Playing",
        this.playList[this.currentIndex].index,
        this.playList[this.currentIndex].name,
        this.index
      );
      if (this.$refs.player != null) this.$refs.player.isPlay = true;
    },
    //监听音乐错误
    musicErr() {
      console.log("err");
      // this.$Toast.error("当前音频不可用")
      this.currentIndex++;
    },
    //上一首
    preMusic() {
      if (this.currentIndex <= 0) this.currentIndex = this.playList.length - 1;
      else this.currentIndex--;
      this.$refs.audio.src = this.playList[this.currentIndex].src;
    },
    //下一首
    nextMusic() {
      console.log("end:" + this.schemaIndex);
      switch (this.schemaIndex) {
        case 0: //循环播放
          if (this.currentIndex >= this.playList.length - 1)
            this.currentIndex = 0;
          else this.currentIndex++;
          break;
        case 1: //随机播放
          this.currentIndex = Math.floor(Math.random() * this.playList.length);
          break;
        case 2: //单曲循环
          this.currentIndex = this.currentIndex;
          break;
      }
      // if (this.currentIndex >= this.playList.length - 1) this.currentIndex = 0;
      // else this.currentIndex++;
      this.$refs.audio.src = this.playList[this.currentIndex].src;
    },
    //暂停/播放
    toggle() {
      this.isPlay = !this.isPlay;
      if (this.isPlay && this.$refs.audio.readyState == 4) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    //设置音乐进度
    setMusicCurrent() {
      this.$refs.audio.currentTime =
        (this.PlayerPercentage / 100) * this.$refs.audio.duration;
      this.PlayerPercentage =
        (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100;
    },
    //设置音量
    setVolume() {
      if (this.$refs.audio) this.$refs.audio.volume = this.volumnPercent / 100;
    },
    //点击音量按钮
    toggleaVolume() {
      this.isVolume = !this.isVolume;
      if (this.isVolume) {
        this.preVolumePrecent = this.volumnPercent;
        this.$refs.audio.volume = 0.0;
        this.volumnPercent = 0;
      } else {
        this.$refs.audio.volume = this.preVolumePrecent / 100;
        this.volumnPercent = this.preVolumePrecent;
      }
    },
    //切换播放方式
    toggleSchema() {
      if (this.schemaIndex >= 2) this.schemaIndex = 0;
      else this.schemaIndex++;
    },
    toggleLyric() {
      this.isShowLyric = !this.isShowLyric;
      // console.log(this.lyric);
    },
  },
  computed: {
    getSongSrc() {
      return (
        (this.playList[this.currentIndex] &&
          this.playList[this.currentIndex].src) ||
        ""
      );
    },
    //格式化歌曲当前播放时间
    getCurrentTime() {
      return formatDate(new Date(this.currentTime * 1000), "mm:ss") || "00:00";
    },
    getDurationTime() {
      return formatDate(new Date(this.duration * 1000), "mm:ss") || "00:00";
    },
  },
  mounted() {
    /**list是音乐列表，index是要播放的音乐在列表中的位置，path是当前播放音乐的路由路径,musicList是歌单信息*/
    this.$bus.$on("playMusic", (playList, index, musicList, id) => {
      this.id = id;
      this.musicList = musicList;
      this.playList = [];
      let transferList = [];
      transferList = playList.filter((item) => {
        return item.src;
      });
      transferList = transferList.sort((a, b) => {
        return a.index - b.index;
      });
      this.playList = transferList;
      this.setCurrentIndex(index);
    });

    this.$bus.$on("PlayMusicListItem", (index) => {
      this.setCurrentIndex(index);
    });
  },
};
</script>

<style lang="less" scoped>
.player {
  width: 100%;
  height: 60px;
  display: flex;
  position: relative;
  a {
    text-decoration: none;
    color: inherit;
  }
}
.player-cover {
  background-color: #fff;
}
.player-toggle {
  width: 18%;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  &-item {
    padding: 0px 20px;
    text-align: center;
    cursor: pointer;
  }
}
.player-progress {
  flex: 1;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
  &-current-time {
    width: 50px;
    text-align: left;
  }
  &-time {
    width: 50px;
    text-align: right;
  }
  &-main {
    flex: 1;
  }
}
.player-volumn {
  width: 150px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &-progress {
    flex: 1;
    padding: 0px 0px 0px 15px;
  }
}
.player-tool {
  width: 200px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  text-align: center;
  &-schema {
    width: calc(33%);
  }
  &-lyric {
    width: calc(33%);
  }
  &-list {
    width: calc(33%);
  }
}
/**player iconfont */
.player-icon {
  font-size: 26px;
}
/**toggle图标 */
.player-icon-type {
  font-size: 30px;
}
// 右侧小图标
.player-icon {
  font-size: 24px;
}
.player-list {
  position: absolute;
  right: 0px;
  bottom: 60px;
  z-index: 9;
  background-color: #fff;
}
.slider {
  /deep/.el-slider__bar {
    background-color: #007aff;
    border-radius: 3px;
  }
  /deep/.el-slider__button {
    width: 0;
    height: 0;
    border: none;
  }
  :hover {
    /deep/.el-slider__button {
      width: 16px;
      height: 16px;
      border: 2px solid #409eff;
      background-color: #fff;
      border-radius: 50%;
      transition: 0.2s;
    }
  }
}
.player-lyric-simple {
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 70px;
  margin: auto;
  height: 60px;
  // transform: translateY(60px);
}
.player-list {
  position: absolute;
  right: 0px;
  bottom: 60px;
  z-index: 9;
  animation-name: list;
  animation-duration: 1s;
  transition-timing-function:ease;
}

.icon-active{
  color: #409eff;
}
.player-side-enter-active {
  animation: slideInRight var(--animation-base-time);
}
.player-side-leave-active {
  animation: slideInRight var(--animation-base-time) reverse;
}
.player-pure-side-enter-active {
  animation: slideInUp var(--animation-base-time);
}
.player-pure-side-leave-active {
  animation: slideInUp var(--animation-base-time) reverse;
}

</style>