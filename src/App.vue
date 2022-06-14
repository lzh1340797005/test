<template>
  <div id="app">
    <layout-header/>
    <layout-aside/>
    <layout-main/>
    <layout-footer/>
  </div>
</template>

<script>
import LayoutHeader from 'layout/Header'
import LayoutFooter from 'layout/Footer'
import LayoutMain from 'layout/Main'
import LayoutAside from 'layout/Aside'
export default {
  name: 'App',
  components: {
    LayoutHeader,
    LayoutFooter,
    LayoutMain ,
    LayoutAside
  },
}
</script>

<style lang="less" scoped>
@import url("./styles/index.css");
#app {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
}
</style>
