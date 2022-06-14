<template>
  <div class="table-list">
    <el-table
      :data="musicList"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      @row-dblclick="handleDbclick"
      :show-header="showheader"
      stripe
    >
      <el-table-column label="" min-width="7%" type="index" v-if="lines[0]">
        <template slot-scope="scope">
          <span
            v-show="
              !(player
                ? scope.$index == playIndex &&
                  musicList[scope.$index].name == playName
                : musicList[scope.$index].id == playId &&
                  scope.$index == playIndex &&
                  musicList[scope.$index].name == playName)
            "
            >{{ getListIndex(scope.$index) }}</span
          >
          <i
            class="iconfont icon-V"
            v-show="
              player
                ? scope.$index == playIndex &&
                  musicList[scope.$index].name == playName
                : musicList[scope.$index].id == playId &&
                  scope.$index == playIndex &&
                  musicList[scope.$index].name == playName
            "
          ></i>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="pic" min-width="8%" v-if="lines[1]">
        <template slot-scope="scope">
          <i class="iconfont icon-xihuan" v-if="!newsongs" />
          <div class="dance-music-table-tr-td-two-card" v-if="newsongs">
            <img :src="scope.row.pic" alt="" />
            <div class="card-play">
              <i class="iconfont icon-icon_play"></i>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="音乐标题"
        v-if="lines[2]"
        show-overflow-tooltip
        min-width="25%"
      ></el-table-column>
      <el-table-column
        prop="artist"
        label="歌手"
        v-if="lines[3]"
        show-overflow-tooltip
        min-width="23%"
      ></el-table-column>
      <el-table-column
        prop="album"
        label="专辑"
        v-if="lines[4]"
        show-overflow-tooltip
        min-width="25%"
      ></el-table-column>
      <el-table-column
        prop="time"
        label="时长"
        min-width="10%"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { playMusic } from "mixin/global/play-music";
import { playing } from "player/playing";
export default {
  data() {
    return {
      index: 0,
    };
  },
  mixins: [playMusic, playing],
  props: {
    musicList: {
      type: Array,
      default: [],
    },
    lines: {
      type: Array,
      default: () => [true, true, true, true, true, true],
    },
    player: {
      type: Boolean,
      default: false,
    },
    length: {
      type: Number,
      default: null,
    },
    showheader: {
      type: Boolean,
      default: true,
    },
    newsongs: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getLength() {
      return this.length;
    },
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      row.row_index = rowIndex;
      this.index = row.row_index;
      // console.log(JSON.stringify(row));
    },
    getListIndex(index) {
      let currentIndex = 0;
      currentIndex = index < 9 ? "0" + (index + 1) : index + 1;
      if (currentIndex == this.getLength) {
        this.$emit("refresh");
      }
      return currentIndex;
    },
    handleDbclick(row) {
      this.index = row.row_index;
      // console.log(this.index);
      if (this.player) {
        this.$bus.$emit("PlayMusicListItem", this.index);
        return;
      }
      // console.log("song-list:" + this.id);
      this.playMusic(this.index);
    },
    // celStyle({ row, column, rowIndex, columnIndex}) {
    //   let stylejson = {};
    //   if (rowIndex > 0) {
    //     stylejson.win = "green";
    //     return stylejson;
    //   } else {
    //     return "";
    //   }
    // },
  },
};
</script>

<style lang="less" scoped>
.table-list {
  cursor: pointer;
}
/deep/.el-table .el-table__cell {
  padding: 3px 0;
  white-space: nowrap;
}
/deep/.el-table__row {
  text-overflow: ellipsis;
  overflow-x: hidden;
  font-size: 14px;
  font-weight: 400;
  font-family: "Times New Roman", Times, serif;
  // font-weight: bold;
}

.dance-music-table-tr-td-two-card {
  line-height: 0px;
  text-align: center;
  img {
    // width: 100%;
    width: 50px;
    height: 50px;
    border-radius: 4px;
  }
  position: relative;
}
.card-play {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .icon-icon_play {
    font-size: 14px;
    color: var(--main-color);
  }
}
</style>>
