<template>
  <div class="main">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>

export default {

};
</script>

<style lang="less" scoped>
.main{
  position: relative;
  top: 70px;
  width: 82%;
  overflow-y:auto;
  float: left;
  height: calc(100% - 70px - 70px);
  // padding: 10px 100px 0px 100px;
}
</style>