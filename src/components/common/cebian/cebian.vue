<template>
  <div>
    <el-row class="tac">
      <el-col>
        <el-menu
          :default-active="items.path"
          class="el-menu-vertical-demo"
          background-color="#f9f9f9"
          router
        >
          <!-- <keep-alive> -->
            <el-menu-item
              v-for="(item, index2) in items"
              :key="index2"
              :index="item.path"
              :route="item.path"
              class="menuItem"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          <!-- </keep-alive> -->
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          path: "/individuation",
          title: "个性推荐",
          icon: "iconfont icon-music",
        },
        {
          path: "/allmusiclist",
          title: "歌单",
          icon: "iconfont icon-gedan",
        },
        {
          path: "/rank-list",
          title: "排行榜",
          icon: "iconfont icon-PCbofangye_paihangbang",
        },
        {
          path: "/artist-list",
          title: "歌手",
          icon: "iconfont icon-mansingle",
        },
        {
          path: "/mv",
          title: "MV",
          icon: "iconfont icon-shipin",
        },
        {
          path: "/newsongs",
          title: "最新音乐",
          icon: "iconfont icon-musicnoteeighth",
        },
      ],
    };
  },
  methods: {
    // handleOpen(key, keyPath) {
    //   console.log(打开页面了);
    // },
    // handleClose(key, keyPath) {
    //   console.log(切换页面了);
    // },
  },
};
</script>

<style scoped>
</style>