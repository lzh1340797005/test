<template>
  <div class="player-list">
    <div>
      <div class="player-list-top">
        <h4>播放列表</h4>
        <button
          type="text"
          class="el-icon-headset"
          width="30px"
          transparent
        ></button>
      </div>
      <song-list :music-list="musicList" :lines="lines" player />
    </div>

  </div>
</template>
<script>
import SongList from "components/common/song-list/song-list";
export default {
  name: "PlayerList",
  // mixins: [theme,forcible],
  components: { SongList },
  props: {
    musicList: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      lines: [true, false, true, true, false, true],
    };
  },
  methods: {

  },
  watch: {

  },
};
</script>
<style lang="less" scoped>
.player-list {
  width: 500px;
  height: 500px;
  border-radius: 6px;
  overflow-y: auto;
  position: absolute;
  box-shadow: 0 0 2px var(--border-tt);
  &-dark {
    background: var(--dark-bg-color);
  }
  &-light,
  &-green {
    background: #fff;
  }
  h4 {
    text-align: center;
  }
  &-top {
    height: 35px;
  }
}
.icon-close {
  position: absolute;
  right: 0px;
  top: 0px;
}
.scroll {
  height: 500px;
}
</style>