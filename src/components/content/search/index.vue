<template>
  <div class="search">
    <el-input
      class="search-input"
      v-model="keywords"
      placeholder="请输入内容"
      @focus="inSearch"
      @blur.capture.native="notinSearch"
      @keyupEnter="goSearchDetailPage"
    ></el-input>
    <template>
      <hot-search-list
        v-show="!isSearch && isFoucs"
        @hidden="hidden"
      ></hot-search-list>
      <!-- <hot-search-list v-show="true"></hot-search-list> -->
      <search-suggest v-show="isSearch  && isFoucs" :keywords="keywords" @hidden="hidden"></search-suggest>
    </template>
  </div>
</template>

<script>
import HotSearchList from "./hot-search-list";
import SearchSuggest from "./search-suggest.vue";
export default {
  components: { HotSearchList, SearchSuggest },
  data() {
    return {
      isSearch: false,
      isFoucs: false,
      keywords: "",
    };
  },
  methods: {
    inSearch() {
      this.isFoucs = true;
    },
    notinSearch(){
     setTimeout(()=>{
       this.isFoucs = false
     },100)
    },
    hidden() {
      this.isFoucs = false;
    },
    goSearchDetailPage() {
      this.$router.push(`/search-detail/${this.keywords}`);
      this.$refs.searchPoptip.hidden();
    },
  },
  watch: {
    keywords() {
      if (this.keywords != "" && !this.isSearch) {
        this.isSearch = true;
      }
      /**搜索关键词为空，并且isSearch为true时设置isSearch为false显示热搜列表 */
      if (this.keywords == "" && this.isSearch) {
        this.isSearch = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  line-height: 100%;
}
.search-input {
  align-items: center;
}
</style>