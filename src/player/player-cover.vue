<template>
  <div class="player-cover" v-if="song">
    <div
      class="player-cover-left"
      @mouseenter="isShade = true"
      @mouseleave="isShade = false"
      @click="togglePlayerPure"
    >
      <el-avatar shape="square" :size="60" class="avatar">
        <img :src="song.pic || song.picUrl" alt="" />
        <div class="inPure">
          <i
            class="iconfont icon-zuidahua"
            style="font-size: 36px"
            v-show="isShade"
          ></i>
        </div>
      </el-avatar>
    </div>
    <div class="player-cover-right">
      <div class="player-cover-right-title">{{ song.name }}</div>
      <div class="player-cover-right-artiist">{{ song.artist }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShade: false, //是否是纯净模式
    };
  },
  props: {
    song: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    togglePlayerPure() {
      // console.log("点击了");
      this.$parent.isPure = !this.$parent.isPure;
    },
  },
};
</script>

<style lang="less" scoped>
.player-cover {
  width: 18%;
  height: 100%;
  position: absolute;
  z-index: 3;
  top: -100%;
  left: 0px;
  display: flex;
  &-left {
    padding: 0px 10px 0px 5px;
    height: 60px;
    .avatar {
      position: relative;
    }
  }
  &-right {
    flex: 1;
    font-size: 13px;
    padding: 0px 10px;
    position: relative;
    &-title {
      font-weight: 600;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    &-artist {
      position: absolute;
      bottom: 0px;
    }
  }
}
.inPure {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: inherit;
}
</style>

