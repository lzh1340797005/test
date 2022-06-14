<template>
  <div class="artist-base-info">
    <div class="left">
      <img :src="artist.picUrl" alt="" />
    </div>
    <div class="right">
      <h3>
        <p class="gedan">歌手</p>
        <p class="name">{{ artist.name }}</p>
      </h3>
      <div class="desc">
        <p><span>单曲数：</span>{{ artist.musicSize }}</p>
        <p><span>专辑数：</span>{{ artist.albumSize }}</p>
        <p><span>MV数：</span>{{ mvCount }}</p>
        <p class="desc-title"><span>简介：</span>{{desc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { _getArtistDesc } from "network/artist";
export default {
  props: {
    artist: {
      type: Object,
      default: {},
    },
    mvCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      desc: "",
    };
  },
//   created(){
//       this.getArtistDesc()
//   },
  watch: {
    artist: {
      handler() {
        _getArtistDesc(this.artist.id).then((res) => {
          this.desc = res.data.briefDesc;
        });
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.artist-base-info {
  width: 100%;
  padding: 10px 20px;
  display: flex;
  position: relative;
}
.left {
  width: 200px;
  img {
    width: 100%;
  }
}
.right {
  flex: 1;
  padding-left: 35px;
  h3 {
    padding: 5px 0px;
    display: flex;
    align-items: center;
    .gedan {
      width: 52px;
      height: 26px;
      color: #e83c3c;
      border: 1px solid #e83c3c;
      text-align: center;
      border-radius: 4px;
      font-size: 1rem;
      justify-content: center;
      line-height: 24px;
    }
    .name {
      padding-left: 5px;
    }
  }
}
.desc {
  padding: 10px 0px;
  font-size: 13px;
  p {
    padding-top: 6px;
  }
  span {
    color: var(--tag-color);
  }
  
  &-title {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
}
</style>