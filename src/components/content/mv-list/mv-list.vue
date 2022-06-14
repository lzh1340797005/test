<template>
  <div class="dance-music-mvs">
    <div
      class="dance-music-mvs-item"
      :style="itemStyle"
      v-for="(item, index) in mvList"
      :key="index"
      @mouseenter="handleEnter(index)"
      @mouseleave="handleLeave"
      @click="enterMvDetail(item)"
    >
      <div class="dance-music-mvs-item-container">
        <div class="dance-music-mvs-item-top">
          <i class="iconfont icon-shipin"></i>
          <span v-if="item.count || item.playCount">{{
            (item.count || item.playCount).toString().slice(0, 2) + "万"
          }}</span>
        </div>
        <img :style="imgStyle" :src="item.cover" alt="" />
        <transition>
          <div class="dance-music-mvs-item-play" v-show="currentIndex == index">
            <i class="iconfont icon-icon_play"></i>
          </div>
        </transition> 
      </div>
      <div class="dance-music-mvs-item-desc">
          <p>{{ item.name }}</p>
          <span v-if="showArtist">{{ item.artist }}</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mvList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    showArtist:{
      type:Boolean,
      default:true
    },
    lineNum:{
      type:Number,
      default:4
    },
    height:{
      type:Number,
      default:10
    }
  },
  data(){
    return{
      currentIndex:null
    }
  },
  computed:{
    itemStyle(){
      return{
        width: `calc(100% / ${this.lineNum})`,
      }
    },
    imgStyle(){
      return{
        height:this.height + 'vw'
      }
    }
  },
  methods:{
    handleEnter(index){
      this.currentIndex = index
    },
    handleLeave(){
      this.currentIndex = null
    },
    enterMvDetail(item){
      this.$router.push("/mv-detail/"+ item.id)
    }
  }
};
</script>

<style lang="less" scoped>
.dance-music-mvs{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  &-item{
    width: calc(100% / 4);
    padding: 5px 20px;
    cursor: pointer;
    &-container{
      position: relative;
    }
    img{
      width: 100%;
      height: 10vw;
      border-radius: 5px;
    }
    &-top{
      position:absolute;
      top: 0;
      right: 0;
      color: #fff;
      padding: 3px 3px;
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.3)
      );
    }
    &-play{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin: auto;
      .iconfont{
        font-size: 1.7rem;
        color: #e83c3c;
      }
    }
  }
}
</style>