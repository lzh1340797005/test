<template>
  <div class="all-music-list">
    <div class="poptip">
      <el-dropdown trigger="click" placement="top-start" hide-on-click>
        <span class="el-dropdown-link">
          {{ cat }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="pop-container">
          <div class="cate-item" v-for="(item, index) in list" :key="index">
            <div class="cate-item-left">
              <i :class="['iconfont', `${iconList[index]}`]"></i>
              <span>
                {{ categories[index] }}
              </span>
            </div>
            <div class="cate-item-right">
              <el-dropdown-item>
                <el-button
                  class="button"
                  v-for="(cate, index2) in item"
                  :key="index2"
                  @click.native="handleButtonClick(index, index2)"
                  >{{ cate.name }}</el-button
                >
              </el-dropdown-item>
            </div>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="menu">
      <div class="menu-title">热门标签</div>
      <div :default-active="activeIndex" class="menu-main">
        <el-menu mode="horizontal">
          <el-menu-item
            v-for="(item3, index3) in hotTags"
            :key="index3"
            :index="item3"
            @click="handleMenuClick(index3)"
          >
            {{ item3 }}
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="all-musiclist">
      <music-list empty-desc :music-list="playList" />
    </div>
    <div class="all-musiclist-bottom">
      <el-pagination
        background
        :current-page.sync="offset"
        :page-count="pageCount"
        @current-change="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import {
  _getCatList,
  _getMusicListHoT,
  _getPlayList,
} from "network/music-list";
import MusicList from "components/content/musiclist/MusicList";
export default {
  name: "AllMusuiList",
  components: {
    MusicList,
  },
  data() {
    return {
      list: [1, 2, 3, 4, 5],
      categories: [],
      iconList: [
        "icon-global",
        "icon-music",
        "icon-kafei",
        "icon-biaoqing",
        "icon-huatizhuti",
      ],
      limit: 50,
      offset: 1,
      hotTags: [],
      activeIndex: "",
      playList: [],
      pageCount: 0,
      cat: "全部",
    };
  },
  props: {
    // index:{
    //   type: String,
    //   default:''
    // }
  },
  computed: {
    getOffset() {
      return (this.offset - 1) * this.limit;
    },
  },
  methods: {
    onPageChange() {
      this.getPlayList();
    },
    getCatList() {
      _getCatList().then((res) => {
        this.categories = Object.values(res.data.categories);
        let subs = res.data.sub;
        /**对sub进行分类 */
        for (
          let i = 0, length = Object.keys(this.categories).length;
          i < length;
          i++
        ) {
          this.list[i] = subs.filter((item) => {
            return item.category == i;
          });
        }
        // console.log("categories", this.categories);
        // console.log("list:", this.list);
      });
    },
    getMusicListHot() {
      _getMusicListHoT().then((res) => {
        this.hotTags = res.data.tags.map((item) => {
          return item.name;
        });
        this.getPlayList();
      });
    },
    getPlayList() {
      _getPlayList(this.cat, this.limit, this.getOffset).then((res) => {
        this.playList = res.data.playlists;
        this.pageCount = Math.ceil(res.data.total / this.limit);
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleMenuClick(index3) {
      this.reset();
      this.cat = this.hotTags[index3];
      this.getPlayList();
      // console.log("出发了");
    },
    reset() {
      this.offset = 1;
    },
    handleButtonClick(index, index2) {
      this.reset();
      this.cat = this.list[index][index2].name;
      this.getPlayList();
    },
  },
  created() {
    this.getCatList();
    this.getMusicListHot();
  },
};
</script>

<style lang="less" scoped>
.all-music-list {
  width: 100%;
  height: 100%;
  padding: 10px 100px 0px 100px;
}
.all-musiclist {
  padding: 0px 10px 0px 10px;
  &-bottom {
    text-align: right;
  }
}
.poptip {
  box-shadow: 0 0 0.07143rem #767676;
  position: relative;
  display: flex;
  margin-left: 10px;
  width: 90px;
  height: 30px;
  border-radius: 4xp;
  font-size: 13px;
  align-items: center;
  justify-content: center;
  color: #000;
  cursor: pointer;
}

.pop-container {
  width: 520px;
  height: 332px;
  overflow-y: auto;
  padding: 10px 10px;
  position: absolute;
  left: 300px;
  .cate-item {
    padding: 10px 0px;
    display: flex;
    // align-items: center;
    align-items: flex-start center;
    justify-content: center;

    &-left {
      flex: 1;
      text-align: center;
      font-size: 18px;
      padding-top: 5px;
      .iconfont {
        font-size: 18px;
        margin-left: 5px;
      }
    }
    &-right {
      flex: 5;
      display: flex;
      flex-wrap: wrap;
    }
  }
}
.button {
  width: 80px;
  height: 35px;
  padding: 0;
  margin: 0;
  border: 0.5px solid #e8eaec;
}
.menu {
  padding: 10px 10px;
  font-size: 13px;
  display: flex;
  &-title {
    width: 70px;
    height: 30px;
    line-height: 30px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  &-main {
    height: 30px;
    flex: 1;
  }
}
/deep/ .el-menu-item {
  line-height: 30px;
  height: 30px;
}
/deep/ .el-menu--horizontal {
  height: 30px;
  line-height: 30px;
}
</style>