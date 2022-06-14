<template>
  <div class="artist-category">
    <div class="artist-category-menu">
      <div class="artist-category-menu-item">
        <div class="artist-category-menu-item-title">语种：</div>
        <div class="item-menu">
          <keep-alive>
            <el-tabs v-model="activeAreas" @tab-click="handleAreasClick">
              <el-tab-pane
                v-for="(item, index) in areas"
                :key="index"
                :label="item.content"
                :name="item.value.toString()"
              ></el-tab-pane>
            </el-tabs>
          </keep-alive>
        </div>
      </div>
      <div class="artist-category-menu-item">
        <div class="artist-category-menu-item-title">分类：</div>
        <div class="item-menu">
          <keep-alive>
            <el-tabs v-model="activeTypes" @tab-click="handleTypesClick">
              <el-tab-pane
                v-for="(item2, index2) in types"
                :key="index2"
                :label="item2.content"
                :name="item2.value.toString()"
              ></el-tab-pane>
            </el-tabs>
          </keep-alive>
        </div>
      </div>
      <div class="artist-category-menu-item initial">
        <div class="artist-category-menu-item-title">筛选：</div>
        <div class="item-menu">
          <keep-alive>
            <el-tabs v-model="activeInitial" @tab-click="handleInitialClick">
              <el-tab-pane
                v-for="(item3, index3) in initial"
                :key="index3"
                :label="item3.content"
                :name="item3.value.toString()"
                class="tab-pane"
              ></el-tab-pane>
            </el-tabs>
          </keep-alive>
        </div>
      </div>
    </div>
    <div class="artist-category-container">
      <!-- <artist-list :artist-list="artistlist"></artist-list> -->
      <artist-list :artist-list="artistlist"></artist-list>
      <div class="artist-category-page">
        <el-pagination
          background
          :current-page.sync="offset"
          :page-size.sync="limit"
          :page-count="50"
          @current-change="onPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { areas, types, initial } from "./data";
import { _getArtist } from "network/artist";
import ArtistList from "components/content/artist-list/artist-list";

export default {
  components: { ArtistList },
  name: "ArtisiList",

  data() {
    return {
      areas,
      types,
      initial,
      limit: 30,
      currentArea: -1,
      currentType: -1,
      currentName: -1,
      artistlist: [],
      offset: 1,
      activeAreas: "-1",
      activeTypes: "-1",
      activeInitial: "-1",
      pageCount:0
    };
  },
  created() {
    this.getArtist();
  },
  computed:{
    getoffset(){
      return (this.offset - 1) * this.limit
    }
  },
  methods: {
    //分页
    onPageChange() {
      this.getArtist();
      // 点击评论下一页后自动滚到评论顶部
      // this.$nextTick(()=>{
      //   let posY=this.$refs.recommend.$el.offsetTop;
      //   // this.$refs.scroll.scrollTo(posY,0);
      //   this.handleRefresh();
      // })
    },
    handleAreasClick(tab) {
      // console.log(tab.name);
      this.currentArea = tab.name;
      this.getArtist();
      // console.log(JSON.stringify(this.artistlist));
    },
    handleTypesClick(tab) {
      // console.log(tab.name);
      this.currentType = tab.name;
      this.getArtist();
      // console.log(JSON.stringify(this.artistlist));
    },
    handleInitialClick(tab) {
      // console.log(tab.name);
      this.currentName = tab.name;
      this.getArtist();
      // console.log(JSON.stringify(this.artistlist));
    },
    async getArtist() {
      const res = await _getArtist(
        this.currentArea,
        this.currentType,
        this.currentName,
        this.limit,
        this.getoffset
      );
      // console.log(this.getoffset);
      this.artistlist = res.data.artists;
      // this.pageCount = Math.ceil(res.data.total / this.limit);
      // console.log(JSON.stringify(this.artistlist));
    },
  },
};
</script>

<style lang="less" scoped>
.artist-category {
  padding: 10px 100px 0px 100px;
}
/deep/.el-tabs__header {
  margin: 0;
}
/deep/.el-tabs__nav-wrap {
  margin: 0;
}
/deep/.el-tabs__active-bar {
  background-color: transparent !important;
}
/*去掉tabs底部的下划线*/
/deep/.el-tabs__nav-wrap::after {
  position: static !important;
}
.initial {
  /deep/ .el-tabs__item {
    padding: 0 10px;
  }
}
.artist-category-menu {
  font-size: 14px;
  &-item {
    height: 40px;
    display: flex;
    margin: 5px 0px;
    padding-left: 10px;
    align-items: center;
    &-title {
      padding: 0px 8px 0px 0px;
      height: 40px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 40px;
      span {
        display: inline-block;
        background: #8f9096;
        padding: 3px 5px;
        border-radius: 4px;
      }
    }
    .item-menu {
      width: calc(100% - 80px);
      display: flex;
      align-items: center;
    }
  }
}
.artist-category-container {
  height: 100%;
}
.artist-category-page{
  text-align: center;
}
</style>