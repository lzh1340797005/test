<template>
  <div
    class="rank-item"
    v-if="musicListDetail != null && rankId != null"
    @click="enterDetail()"
  >
    <div
      class="rank-item-top"
      :style="{
        background:
          'linear-gradient(to right,' + bgColor[0] + ',' + bgColor[1] + ')',
      }"
    >
      <div class="left">
        <div class="left-itemF">
          <i>{{ title[0] }}</i>
        </div>
        <div class="set">
          <div class="left-item">
            <i>{{ title[1] }}</i>
          </div>
          <div class="left-item">
            <i>{{ title[2] }}</i>
          </div>
          <div class="update">
            {{ getUpdateTime }}
          </div>
        </div>
      </div>
      <div class="right">
        <i class="iconfont icon-bofang"></i>
      </div>
    </div>
    <div class="center">
      <el-descriptions
        class="table-body"
        :colon="false"
        v-for="(item, index) in musiclist"
        :key="index"
      >
        <el-descriptions-item contentStyle="padding:5px 5px 5px 5px">
          <div
            class="table-list-body-index"
            :class="[index <= 2 ? 'active' : '']"
          >
            {{ "0" + (index + 1) }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item contentStyle="padding:5px 5px 5px 5px">
          <div class="table-list-body-name">
            {{ item.name }}
          </div></el-descriptions-item
        >
        <el-descriptions-item
          contentStyle="padding:5px 5px 5px 5px"
          class="table-list-body-artist"
        >
          <div class="table-list-body-artist">
            {{ item.artist.toString() }}
          </div></el-descriptions-item
        >
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import {
  _getMusicListDetail,
  _getSongsDetail,
  songDetail,
} from "network/detail";
import { formatDate } from "@/utils/tool";
export default {
  props: {
    rankId: {
      type: Number,
      default() {
        return 0;
      },
    },
    bgColor: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      musiclist: [],
      musicListDetail: null,
      artistname: null,
    };
  },

  mounted() {
    if (this.rankId != null) {
      // console.log(this.rankId);
      _getMusicListDetail(this.rankId).then((res) => {
        this.musicListDetail = res.data;
        /**遍历查询歌单所有歌曲详情 */
        for (let i of this.musicListDetail.playlist.trackIds.slice(0, 8)) {
          _getSongsDetail(i.id).then((res) => {
            let song = new songDetail(res.data.songs);
            // console.log(JSON.stringify(song));
            this.musiclist.push(song);
            // console.log(this.musiclist);
            /**刷新scroll */
            if (
              this.musiclist.length == 8 &&
              this.getTitleString.indexOf("热") == 0
            ) {
              this.$emit("refresh");
            }
          });
        }
      });
    }
  },
  methods: {
    enterDetail() {
      this.$router.push(
        "/musiclistdetail/" + this.rankId + "/" + new Date().getTime()
      );
    },
  },

  computed: {
    getUpdateTime() {
      let time = this.musicListDetail.playlist.updateTime;
      return formatDate(new Date(time), "MM月dd日");
    },
    getTitleString() {
      return this.title.toString();
    },

  },
};
</script>

<style lang="less" scoped>
.rank-item {
  cursor: pointer;
  width: calc(30%);
  height: 400px;
  margin-right: 25px;
}
.rank-item-top {
  width: 100%;
  height: 100px;
  position: relative;
}
.table-list-body-index {
  width: 45px;
  height: 16px;
  //   background-color: #000;
}
.table-list-body-name {
  width: 106px;
  height: 16px;
  //   background-color: #000;
}
.table-list-body-artist {
  width: 68px;
  height: 16px;
  overflow: hidden;
  //   text-align: right;
}
.rank-item-top .left {
  width: 200px;
  padding: 0px 25px;
  display: flex;
  align-items: center;
  padding-top: 10px;
  color: #fff;
}
.left-itemF {
  font-size: 54px;
  margin-right: 10px;
}
.set {
  display: flex;
  position: relative;
}
.update {
  width: 100px;
  position: absolute;
  left: 5px;
  top: 15px;
}
.left-item {
  font-size: 26px;
  margin-top: -20px;
}
.right {
  width: 50px;
  height: 50px;
  position: absolute;
  right: 20px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  color: #fff;
}
.iconfont {
  font-size: 42px;
}
.center {
  width: 100%;
}
.center .table-body {
  width: 100%;
  font-size: 13px;
  color: #575757;
  font-family: "Times New Roman", Times, serif;
}

.active {
  color: var(--main-color);
}
/deep/.el-descriptions__table {
  table-layout: fixed;
}
/deep/.el-descriptions-item__container {
  white-space: nowrap;
  overflow: hidden;
  display: flex;
}
/deep/.el-descriptions-row {
  height: 30px;
}
/deep/.el-descriptions :hover {
  background-color: #ebeced;
}
/deep/.el-descriptions :not(.is-bordered) .el-descriptions-item__cell {
  padding-bottom: 0px;
}
</style>