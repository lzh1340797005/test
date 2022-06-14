<template>
  <div class="base-info" v-if="Object.keys(baseInfo).length">
    <div class="left">
      <img :src="cover" alt="" />
    </div>
    <div class="right">
      <h3>
        <p class="gedan">歌单</p>
        <p class="name">{{ baseInfo.name }}</p>
      </h3>

      <div class="right-item">
        <el-button type="danger" class="button" @click="handlePlayMusic">
          <i class="iconfont icon-bofang"></i> 播放全部
        </el-button>
        <el-button plain class="button">
          <i class="iconfont icon-shoucang" /> 收藏({{ albumDetail.subCount }})
        </el-button>
        <el-button plain class="button"
          ><i class="iconfont icon-fenxiang" /> 分享({{
            albumDetail.shareCount
          }})
        </el-button>
      </div>
      <div class="play">
        <div class="play-top">
          歌手：{{ baseInfo.artist.name }}
          <br />
        </div>
        <div class="play-bottom">
          时间：{{ getCreateDate }}
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "utils/tool.js";
export default {
  props: {
    baseInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    albumDetail: {
      type: Object,
      default: () => {
        return {};
      },
    },
    cover: {
      type: String,
      default: "",
    },
  },
  computed: {
    getCreateDate() {
      return formatDate(new Date(this.baseInfo.publishTime), "yyyy-MM-dd");
    },
    getTags() {
      return this.baseInfo.tags && this.baseInfo.tags.join("/");
    },
    getPlayCount() {
      return (
        this.baseInfo.playCount &&
        this.baseInfo.playCount.toString().slice(0, 2) + "万"
      );
    },
  },
  methods: {
    handlePlayMusic() {
      this.$emit("playMusic");
    },
  },
};
</script>

<style lang="less" scoped>
.base-info {
  width: 100%;
  padding: 10px 0;
  position: relative;
  display: flex;
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
    .name {
      padding-left: 5px;
    }
  }
  &-item {
    display: flex;
    padding: 5px 0px;
    align-items: center;
    .creator-name {
      margin: 0px 10px;
    }
    .iconfont {
      margin-right: 8px;
    }
    .button {
      margin-right: 15px;
    }
  }
}
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
.button {
  border-radius: 4px;
  width: 150px;
  height: 40px;
}
.play {
  font-size: 1rem;
  font-weight: 700;
  &-top {
    padding: 10px 0 10px 0;
  }
  &-bottom {
    padding: 10px 0 10px 0;
  }
}
</style>