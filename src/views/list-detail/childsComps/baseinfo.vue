<template>
  <div class="base-info">
    <div class="left">
      <img :src="baseInfo.img" alt="" />
    </div>
    <div class="right">
      <h3>
        <p class="gedan">歌单</p>
        <p class="name">{{ baseInfo.name }}</p>
      </h3>
      <div class="right-item">
        <el-avatar size="large" :src="baseInfo.creatorAvatar"></el-avatar>
        <span class="creator-name">{{ baseInfo.creatorName }}</span>
        <span>创建时间：{{ getCreateDate }}</span>
      </div>
      <div class="right-item">
        <el-button type="danger" class="button" @click="handlePlayMusic">
          <i class="iconfont icon-bofang"></i> 播放全部
        </el-button>
        <el-button plain class="button">
          <i class="iconfont icon-shoucang" /> 收藏({{
            baseInfo.subscribedCount
          }})
        </el-button>
        <el-button plain class="button"
          ><i class="iconfont icon-fenxiang" /> 分享({{ baseInfo.shareCount }})
        </el-button>
      </div>
      <div class="desc">
        <p>
          标签：<span>{{ getTags }}</span>
        </p>
        <p class="desc-title">简介:{{ baseInfo.title }}</p>
      </div>
    </div>
    <div class="play">
      <div class="play-left">
        歌曲数
        <br />
        {{ baseInfo.trackCount }}
      </div>
      <div class="play-right">
        播放数
        <br />
        {{ getPlayCount }}
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils/tool";
export default {
  props: {
    baseInfo: {
      type: Object,
      default: {},
    },
  },
  computed: {
    getCreateDate() {
      return formatDate(new Date(this.baseInfo.createTime), "yyyy-MM-dd");
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
  methods:{
    handlePlayMusic(){
      this.$emit('playMusic');
    }
  }
};
</script>

<style lang="less" scoped>
.base-info {
  width: 100%;
  padding: 10px 0;
  position: relative;
  display: flex;
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
.desc {
  padding: 10px 0px;
  font-size: 13px;
  span {
    color: #0c73c2;
  }
  &-title {
    padding-top: 5px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
.play{
    display: flex;
    align-items: center;
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 13px;
    &-left{
        padding: 5px;
        border-right: 1px solid #dcdfe6;
    }
    &-right{
        padding: 5px;
    }
}
</style>