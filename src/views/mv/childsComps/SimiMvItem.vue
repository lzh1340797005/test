<template>
  <div class="simi">
    <div
      class="simi-item"
      v-for="(item, index) in mvList"
      :key="index"
      @click="playMV(item.id)"
    >
      <div class="left">
        <img :src="item.cover" alt="" />
        <div class="count">
          <i class="iconfont icon-shipin"></i>
          <div class="play-count">{{ item.count }}</div>
        </div>
      </div>
      <div class="right">
        <div class="name">
          <h3><p class="gedan">MV</p></h3>
          <p class="mvname">{{ item.name }}</p>
        </div>
        <div class="artist">{{ item.artist }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SimiMvItem",
  props: {
    mvList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    playMV(id) {
      this.$router.push("/mv-detail/" + id);
    },
  },
};
</script>

<style lang="less" scoped>
h3 {
  //   padding: 5px 0px;
  display: flex;
  align-items: center;
  .gedan {
    width: 40px;
    height: 20px;
    color: #e83c3c;
    border: 1px solid #e83c3c;
    text-align: center;
    border-radius: 4px;
    font-size: 1rem;
    justify-content: center;
    line-height: 20px;
  }
}
.mvname {
    padding-top: 10px;
    margin-bottom: 10px;
}
</style>