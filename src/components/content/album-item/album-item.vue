<template>
  <div class="album-item" @click="enteralbumDesc">
    <div class="left">
      <img v-lazy="album.picUrl" alt="" v-if="album.picUrl" />
      <b-avatar size="calc(100vh /12)" shape="square" v-else />
    </div>
    <div class="right">
      <div class="right-name">{{ album.name }}</div>
      <div class="right-item">
        发行时间：<span>{{ getTime }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from "utils/tool";
export default {
  name: "AlbumItem",
  computed: {
    getTime() {
      return formatDate(new Date(this.album.publishTime), "yyyy-MM-dd");
    },
  },
  props: {
    album: {
      type: Object,
      default: {},
    },
  },
  methods: {
    enteralbumDesc() {
      this.$router.push({
        path: "/album-detail",
        query: {
          album: this.album,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.album-item {
  padding: 8px 0px;
  display: flex;
  cursor: pointer;
  .left {
    width: calc(100vh / 12);
    height: calc(100vh / 12);
    img {
      width: 100%;
      border-radius: 4px;
    }
  }
  .right {
    height: calc(100vh / 12);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 500;
    .right-item {
      span{
        color: #0c73c2;
      }
    }
  }
}
.album-item:hover{
  background-color: #f9f9f9;
}
</style>