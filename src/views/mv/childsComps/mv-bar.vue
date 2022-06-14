<template>
  <div class="dance-music-menu">
    <div class="dance-music-menu-item">
      <div class="dance-music-menu-item-title">语种：</div>
      <el-tabs
        class="item-menu"
        v-model="currentArea"
        @tab-click="handleAreasClick"
      >
        <el-tab-pane
          v-for="(item, index) in areas"
          :key="index"
          :label="item"
          :name="item"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div class="dance-music-menu-item">
      <div class="dance-music-menu-item-title">分类：</div>
      <el-tabs
        class="item-menu"
        v-model="currentType"
        @tab-click="handleTypesClick"
      >
        <el-tab-pane
          v-for="(item2, index2) in types"
          :key="index2"
          :label="item2"
          :name="item2"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div class="dance-music-menu-item">
      <div class="dance-music-menu-item-title">排序：</div>
      <el-tabs
        class="item-menu"
        v-model="currentOrder"
        @tab-click="handleOrdersClick"
      >
        <el-tab-pane
          v-for="(item3, index3) in orders"
          :key="index3"
          :label="item3"
          :name="item3"
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      areas: ["全部", "内地", "港台", "欧美", "韩国", "日本"],
      types: ["全部", "官方版", "原声", "现场版", "网易出品"],
      orders: ["上升最快", "最热", "最新"],
      currentArea: "全部",
      currentType: "全部",
      currentOrder: "上升最快",
    };
  },
  methods: {
    handleAreasClick(tab) {
      this.currentArea = this.areas[tab.index];
      this.$emit(
        "change",
        this.currentArea,
        this.currentType,
        this.currentOrder
      );
    },
    handleTypesClick(tab) {
      this.currentType = this.types[tab.index];
      this.$emit(
        "change",
        this.currentArea,
        this.currentType,
        this.currentOrder
      );
    },
    handleOrdersClick(tab) {
      this.currentOrder = this.orders[tab.index];
      this.$emit(
        "change",
        this.currentArea,
        this.currentType,
        this.currentOrder
      );
    },
  },
};
</script>

<style lang="less" scoped>
.dance-music-menu {
  &-item {
    margin: 5px 0px;
    padding-left: 10px;
    font-size: 13px;
    display: flex;
    align-items: center;
    &-title {
      height: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      span {
        display: inline-block;
        background: #8f9096;
        padding: 3px 5px;
        border-radius: 4px;
      }
    }
    .item-menu {
      width: calc(100% - 80px);
    }
  }
}
/deep/.el-tabs__item {
  font-size: 13px;
  width: 80px;
  height: 30px;
  padding: 0px 0px 0px 0px;
  line-height: 30px;
  text-align: center;
}
/deep/.el-tabs__header {
  margin: 0;
}
/deep/.el-tabs {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>