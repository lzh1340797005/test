<template>
  <div class="artist-desc-detail">
    <div class="desc">
      <h4 class="h4">{{ name }}简介</h4>
      <p class="p">
        {{ descDetail.briefDesc }}
      </p>
    </div>
    <div class="content">
      <div
        class="intro-item"
        v-for="(item, index) in descDetail.introduction"
        :key="index"
      >
        <h4 class="h4">{{ item.ti }}</h4>
        <div>
          <p class="p" v-for="(item, index) in formatText(item.txt)" :key="index">
            {{ item }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { _getArtistDescDetail } from "network/artist";
export default {
  props: {
    id: {
      type: [Number, String],
      default: 0,
    },
    name: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      descDetail: "",
    };
  },
  created() {
    if (this.id != 0) {
      this.initRequest();
    }
  },
  methods: {
    formatText(text) {
      let newText = text.split("\n");
      return newText;
    },
    initRequest() {
      _getArtistDescDetail(this.id).then((res) => {
        this.descDetail = res.data;
      });
    },
  },
  watch: {
    id() {
      this.initRequest();
    },
  },
};
</script>

<style lang="less" scoped>
.artist-desc-detail {
  width: 100%;
  padding-right: 20px;
  font-size: 14px;
  font-family: 'Times New Roman', Times, serif;
}
.h4 {
  padding: 10px 0px;
}
.p {
  text-indent: 2.5rem;
  margin-top: 10px;
  text-indent: 35px;
  line-height: 30px;
}
</style>