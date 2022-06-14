<template>
  <div class="dance-music-artist-list">
    <div
      class="dance-music-artist-list-item"
      v-for="(item, index) in artistList"
      :key="index"
      @mouseenter="handleEnter(index)"
      @mouseleave="handleLeave"
      @click="enterArtistDetail(item)"
    >
      <div class="dance-music-artist-list-item-container" >
        <img :src="item.picUrl || item.coverImgUrl" alt="" />
        <transition name="dance-music-opacity">
          <div class="container-detail" v-show="currentIndex==index">
          <i class="iconfont icon-homeicondetails"></i>
        </div>
        </transition>
      </div>
      <div class="dance-music-artist-list-item-desc">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArtistList",
  props: {
    artistList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data(){
    return{
      currentIndex:null
    }
  },
  methods: {
    handleEnter(index) {
      // if (this.emptyDesc) return;
      this.currentIndex = index;
    },
    handleLeave(index) {
      // if (this.emptyDesc) return;
      this.currentIndex = null;
    },
    enterArtistDetail(item) {
      this.$router.push({
        path: "/artist-detail",
        query: {
          // id: item.id,
          // name:item.name,
          // musicSize: item.musicSize,
          // albumSize: item.albumSize,
          // picUrl: item.picUrl,
          artist: JSON.stringify(item),
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.dance-music-artist-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  &-item {
    width: calc(100% / 6);
    padding: 5px 10px;
    cursor: pointer;
    &-container {
      position: relative;
      .container-detail {
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 10rem;
        background-color: rgba(179, 172, 172,0.3);
        .icon-homeicondetails {
          color: #2d8cf0;
          font-size: 1.4em;
        }
      }
    }
    img {
      width: 100%;
      height: 10rem;
      border-radius: 4px;
    }
    &-desc {
      font-size: 13px;
    }
  }
}
</style>