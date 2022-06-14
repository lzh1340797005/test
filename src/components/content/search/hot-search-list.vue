<template>
  <div class="search-scroll">
    <div class="dance-music-search-list">
      <div class="search-list-main">
        <!-- <el-descriptions :colon="false" :column="1">
          <el-descriptions-item
            class="searchItem"
            v-for="(item, index) in hotlist"
            :key="index"
          >
            <div class="search-item" @click="handleHotItemClick(index)">
              <span class="listindex">{{ index + 1 }}</span>
              <div class="search-item-desc">
                <div class="search-item-top">
                  <div class="search-item-top-name">{{ item.searchWord }}</div>
                  <div class="search-item-top-score">{{ item.score }}</div>
                  <div class="search-item-top-url" v-if="item.iconUrl">
                    <img
                      :src="item.iconUrl"
                      :style="{ width: item.iconType == 5 ? '14px' : '24px' }"
                    />
                  </div>
                </div>
                <div class="search-item-bottom">{{ item.content }}</div>
              </div>
            </div>
          </el-descriptions-item>
        </el-descriptions> -->
        <el-table
          :data="hotlist"
          style="width: 100%"
          :show-header="false"
          :row-class-name="tableRowClassName"
          @row-click="handleHotItemClick"
        >
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="searchWord" width="100%"></el-table-column>
          <el-table-column prop="score" width="100%"></el-table-column>
          <el-table-column prop="iconUrl">
            <template slot-scope="scope">
              <img
                :src="scope.row.iconUrl"
                :style="{ width: scope.row.iconType == 5 ? '14px' : '24px' }"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { _hotSearchDetail } from "network/search";
export default {
  data() {
    return {
      hotlist: [],
    };
  },
  created() {
    this.hotSearchDetail();
  },
  methods: {
    hotSearchDetail() {
      _hotSearchDetail().then((res) => {
        this.hotlist = res.data.data;
        // console.log(JSON.stringify(this.hotlist));
      });
    },
    tableRowClassName({ row, rowIndex }) {
      row.row_index = rowIndex;
    },
    handleHotItemClick(row) {
      // console.log("点击了", row.row_index);
      // this.$emit('hidden');
      this.$router.push('/search-detail/'+this.hotlist[row.row_index].searchWord);
      this.$emit('hidden');
    },
  },
};
</script>

<style lang="less" scoped>
.search-scroll {
  height: 530px;
  z-index: 4;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  top: 4rem;
  font-family: "Times New Roman", Times, serif;
  border: 1px #dcdde4 solid;
  border-radius: 5px;
  cursor: pointer;
}
.dance-music-search-list {
  width: 400px;
  //   padding: 5px 20px 0px 20px;
  font-size: 13px;
  line-height: initial;
  text-align: initial;
}
.search-list {
  &-title {
    padding: 8px 0px;
    font-size: 15px;
    .iconfont {
      margin-left: 5px;
    }
  }
}
.search-list-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.search-item {
  padding: 10px 0 0 0;
}
.searchItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  clear: both;
  float: left;
}
.search-item-top {
  display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  padding: 10px;
  //   width: 10rem;
}
.listindex {
  float: left;
  padding: 10px;
  font-size: 17px;
}
.search-item-top-score {
  color: #dcdde4;
}
.search-item-top-name {
  font-weight: 500;
  margin-right: 1rem;
  font-size: 17px;
}
.search-item-top-score {
  margin-right: 1rem;
  font-size: 17px;
}
.search-item-bottom {
  float: left;
  padding: 10px;
  color: #adadad;
  overflow: hidden;
}
.search-item-desc {
  display: flex;
  float: left;
  flex-direction: column;
  justify-content: space-around;
}
</style>