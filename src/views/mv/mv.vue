<template>
  <div class="mv">
    <div class="mv-title">
      <div class="mv-title-left">
        <h4>最新MV</h4>
      </div>
      <div class="mv-right">
        <el-tabs v-model="activeAreaName" @tab-click="handleAreasClick">
          <el-tab-pane
            v-for="(item, index) in areas"
            :key="index"
            :label="item"
            :name="item"
          ></el-tab-pane>
        </el-tabs>
      </div>
      <div class="mv-title-forword">
        <router-link to="/mv-list" title="查看更多MV"
          ><i class="el-icon-arrow-right"></i
        ></router-link>
      </div>
    </div>
    <mv-list :mv-list="mvList" />
    <h4 class="mv-h4">推荐mv</h4>
    <mv-list :mv-list="perMV" />
    <div class="mv-title">
      <div class="mv-title-left">
        <h4>MV排行榜</h4>
      </div>
      <div class="mv-right">
        <el-tabs v-model="activeMvrankName" @tab-click="handleRankMvClick">
          <el-tab-pane
            v-for="(item2, index2) in mvRank"
            :key="index2"
            :label="item2"
            :name="item2"
          ></el-tab-pane>
        </el-tabs>
      </div>
      <div class="mv-title-forword">
        <router-link to="/mv-list" title="查看更多MV"
          ><i class="el-icon-arrow-right"></i
        ></router-link>
      </div>
    </div>
    <mv-rank-list class="mv-rank-list" :top-mv="topMv"></mv-rank-list>
    <el-button plain @click="open"> 消息 </el-button>
  </div>
</template>

<script>
import MvList from "components/content/mv-list/mv-list";
import MvRankList from "components/content/mv-rank-list/mv-rank-list";
import { _getNewMV, MV, _getTopMv, _Personalized } from "network/mv";
export default {
  name: "Mv",
  components: { MvList, MvRankList },
  data() {
    return {
      areas: ["内地", "港台", "欧美", "日本", "韩国"],
      mvRank: ["内地", "港台", "欧美", "日本", "韩国"],
      currentArea: "内地",
      activeAreaName: "内地",
      activeMvrankName: "内地",
      limit: 8,
      mvList: [], //最新MV
      topMv: [], //排行榜MV
      perMV: [], //推荐MV
      currentRankMV: "内地",
      oofset: 1, //MV排行榜分页
    };
  },
  created() {
    this.getNewMv();
    this.getTopMv();
    this.Personalized();
    this.open();
  },
  methods: {
    open() {
      this.$notify.info({
        title: "系统提示：",
        message: "点击更多按钮可查看全部MV哦~",

        customClass:"inforight"
      });
    },
    handleAreasClick(tab) {
      this.currentArea = this.areas[tab.index];
      this.mvList = [];
      this.getNewMv();
    },
    handleRankMvClick(tab) {
      this.currentRankMV = this.mvRank[tab.index];
      this.topMv = [];
      this.getTopMv();
    },
    //最新音乐
    getNewMv() {
      _getNewMV(this.limit, this.currentArea).then((res) => {
        for (let i of res.data.data) {
          let mv = new MV(i.id, i.cover, i.name, i.artistName, i.playCount);
          this.mvList.push(mv);
        }
      });
    },
    /**MV排行榜 */
    getTopMv() {
      _getTopMv(10, this.currentRankMV, this.offset).then((res) => {
        for (let i of res.data.data) {
          let mv = new MV(i.id, i.cover, i.name, i.artistName, i.playCount);
          this.topMv.push(mv);
        }
      });
    },
    /**推荐 */
    Personalized() {
      _Personalized().then((res) => {
        let mvs = res.data.result;
        for (let i in mvs) {
          let mv = new MV(
            mvs[i].id,
            mvs[i].picUrl,
            mvs[i].name,
            mvs[i].artistName,
            mvs[i].playCount
          );
          this.perMV.push(mv);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.mv {
  padding: 10px 30px 0px 30px;
}
/deep/.el-tabs__active-bar {
  background-color: transparent !important;
}
/*去掉tabs底部的下划线*/
/deep/.el-tabs__nav-wrap::after {
  position: static !important;
}
.mv-title {
  display: flex;
}
.mv-right {
  /deep/.el-tabs__item {
    font-size: 13px;
    padding: 5px 5px;
  }
}
.mv-rank-list {
  padding: 0px 20px;
}
.item-menu {
  font-size: 13px;
}
.mv-title {
  display: flex;
  position: relative;
  &-forword {
    position: absolute;
    right: 18px;
    bottom: 3px;
    opacity: 0.6;
    i {
      color: #000;
      font-size: 23px;
    }
  }
  &-forword:hover {
    opacity: 1; 
  }
}

</style>

<style>
.inforight{
  position:absolute !important;

}
</style>