<template>
  <div class="mv-list">
      <h4 class="mv-list-title">全部MV</h4>
      <mv-bar class="mv-list-bar" @change="handleChange"/>
      <mv-list :mv-list="mvList" />
      <div class="mv-list-bottom">
        <el-pagination
          background
          :current-page.sync="offset"
          :page-count="50"
          @current-change="onPageChange"
        />
      </div>
  </div>
</template>

<script>
import MvBar from "./childsComps/mv-bar";
import MvList from "components/content/mv-list/mv-list";
import { _AllMv, MV } from "network/mv";
export default {
  components: {MvBar,MvList },
  data() {
    return {
      currentArea: "全部",
      currentType: "全部",
      currentOrder: "上升最快",
      limit: 40,
      offset: 1,
      mvList: [],
    };
  },
  created(){
    this.initRequest()
  },
  computed:{
    getOffset(){
      return (this.offset-1)*this.limit;
    }
  },
  methods:{
    onPageChange() {
      this.initRequest();
    },
    handleChange(currentArea, currentType, currentOrder){
      this.currentArea = currentArea;
      this.currentType = currentType;
      this.currentOrder = currentOrder;
      this.initRequest();
    },
    initRequest() {
      this.mvList = [];
      _AllMv(
        this.currentArea,
        this.currentType,
        this.currentOrder,
        this.limit,
        this.getOffset
      ).then((res) => {
        let mvs = res.data.data;
        for (let i in mvs) {
          let mv = new MV(
            mvs[i].id,
            mvs[i].cover,
            mvs[i].name,
            mvs[i].artistName,
            mvs[i].playCount
          );
          this.mvList.push(mv);
          // if (i == mvs.length - 1) {
          //   this.$nextTick(() => {
          //     this.handleRefresh();
          //     this.$refs.scroll.scrollTo(0, 0);
          //   });
          // }
        }
      });
    },
  }
}
</script>

<style lang="less" scoped>
.mv-list {
  padding: 10px 30px 0px 30px;
}
/deep/.el-tabs__active-bar {
  background-color: transparent !important;
}
/*去掉tabs底部的下划线*/
/deep/.el-tabs__nav-wrap::after {
  position: static !important;
}
.mv-list {
  &-title{
    padding: 10px 20px;
  }
  &-bar {
    padding: 0px 10px;
  }
  &-bottom {
    text-align: center;
  }
}
</style>