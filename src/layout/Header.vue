<template>
  <div class="headClass">
    <div class="header-title">
      <div
        class="header-title-left"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="item">
          <transition>
            <!-- <i class="iconfont icon-home" v-show="isShow"></i> -->
          </transition>
        </div>
        <div class="item">
          <transition>
            <!-- <i class="iconfont icon-zuixiaohua" v-show="isShow"></i> -->
          </transition>
        </div>
        <div class="item">
          <transition>
            <!-- <i class="iconfont icon-zuidahua" v-show="isShow"></i> -->
          </transition>
        </div>
      </div>
      <div class="header-title-right">
        <div class="contro" @click="go(-1)">
          <transition>
            <i class="el-icon-arrow-left"></i>
          </transition>
        </div>
        <div class="contro" @click="go(1)">
          <transition>
            <i class="el-icon-arrow-right"></i>
          </transition>
        </div>
      </div>
    </div>
    <div class="header-main">
      <div class="main-left">
        <div class="serach">
          <Search />
        </div>
        <div class="main-right">
          <div class="avatar" @click="handleAvatarClick">
                <el-avatar :src="getAvatar"></el-avatar>
          </div>
        </div>
      </div>
      <div>
        <transition>
          <Login v-show="isLogin" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "components/content/search";
import Login from "components/content/user/Login";
export default {
  components: {
    Search,
    Login,
  },
  data() {
    return {
      isShow: false,
      isLogin: false,
    };
  },
  methods: {
    handleMouseEnter() {
      this.isShow = true;
    },
    handleMouseLeave() {
      this.isShow = false;
    },
    handleAvatarClick(){
      this.isLogin = true;
    },
    hideLogin() {
      this.isLogin = false;
    },
    go(index){
      this.$router.go(index)
    }
  },
  computed:{
    getAvatar() {
      return this.$store.getters.getAvatar;
    },
  }
};
</script>

<style lang="less" scoped>
.headClass {
  background-color: #f9f9f9;
  position: absolute;
  display: flex;
  align-items: center;
  height: 70px;
  width: 100%;
}
.header-title {
  width: 18%;
  height: 100%;
  text-align: center;
  display: flex;
}
.header-title-left {
  width: 10%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-around;
}
.title {
  display: flex;
}
.item {
  width: 23px;
  height: 23px;
  border-radius: 50%;
  line-height: 18px;
  overflow: hidden;
  // cursor: pointer;
  i {
    display: inline-block;
  }
}

.item:nth-child(1) {
  background: #ed655a;
}
.item:nth-child(2) {
  background: #e0c04c;
}
.item:nth-child(3) {
  background: #72be47;
}
.iconfont {
  font-size: 12px;
}
.header-title-right {
  // width: 8%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-around;
}
.contro {
  width: 23px;
  height: 23px;
  // border-radius: 50%;
  line-height: 18px;
  overflow: hidden;
  cursor: pointer;
  font-size: 20px;
  .rightitem {
    flex: 1;
    text-align: center;
    cursor: pointer;
  }
}
.header-main {
  width: 82%;
  height: 100%;
  text-align: center;
  display: flex;
}
.main-left {
  display: flex;
  width: 100%;
}
.main-right{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.serach{
  margin-left: 3rem;
}
.avatar{
  cursor: pointer;
}
</style>