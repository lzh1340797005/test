<template>
  <div class="newSongs">
    <h4 class="top">最新音乐</h4>
    <div class="content">
      <div
        class="item"
        v-for="(item, index) in musicList"
        :key="index"
        @dblclick="playMusic(index)"
      >
        <div class="number">
          <span
            
            >{{ index + 1 }}</span
          >
          <i
            class="iconfont icon-V"         
          ></i>
        </div>
        <div class="title">
          <img v-lazy="item.picUrl" alt />
          <div class="icon">
            <i class="iconfont icon-bofang"></i>
          </div>
        </div>
        <div class="mess">
          <div>{{ item.name }}</div>
          <br />
          <div class="bottom">{{ item.song.album.company }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { playing } from "player/playing";
import { playMusic } from '@/mixin/global/play-music';
export default {
  name: "newSongs",
  data() {
    return {
      // songList: null,
      // musicList:[],
      songSrc:null,
    };
  },
  props:{
    musicList:{
      type:Array,
      default() {
        return [];
      },
    }
  },
  mixins:[playMusic,playing],
  methods: {
 
  },
  created(){

  },
  
};
</script>
<style lang="less" scoped>
.newSongs {
  width: 100%;
}
.top {
  border-bottom: 1px solid #b8b6b6;
}
.content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.item {
  padding: 10px 0px;
  width: 50%;
  height: 70px;
  display: flex;
  cursor: pointer;
}
.number {
  height: 70px;
  width: 40px;
  text-align: center;
  line-height: 70px;
}
.title {
  position: relative;
  height: 100%;
}
.title img {
  height: 100%;
}
.icon {
  // background: rgba(00, 0, 0, 0.3);
  border-radius: 50%;
  width: 18px;
  height: 18px;
  position: absolute;
  left: 0px;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  color: #fff;
}
.icon img {
  width: 100%;
}
.mess {
  flex: 1;
  margin-left: 10px;
  font-size: 13px;
  position: relative;
}
.mess .bottom {
  position: absolute;
  bottom: 0px;
}
</style>