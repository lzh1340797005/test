<template>
  <div>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in banner" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { _getBanner } from "network/individuation";
export default {
  data() {
    return {
      banner: null,
    };
  },
  methods: {
    getBanner() {
      _getBanner().then((res) => {
        this.banner = res.data.banners.slice(0, 6);
        // console.log(res.data.banners.slice(0, 6));
      });
    },
  },
  created() {
    this.getBanner();
  },
};
</script>

<style scoped>
.el-carousel__item img{
    width: 100%;
    height: 100%;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>