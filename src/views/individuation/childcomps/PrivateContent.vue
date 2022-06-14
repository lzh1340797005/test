<template>
  <div class="private" v-if=" pri != null">
    <h4 class="top">{{ pri.name }}</h4>
    <div class="content">
      <div
        class="item"
        v-for="(item, index) in pri.result"
        :key="index"
        @click="playMV(item.id)"
      >
        <div class="loco">
          <i class="iconfont icon-shipin"></i>
        </div>
        <img v-lazy="item.picUrl" alt />
        <div class="bottom" >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrivateContent",
  data() {
      return{
          // privateContent: null, 
      }
  },
  props:{
    pri:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    playMV(id){
      console.log("点击了");
    }
  },
  created() {
      
  },
};
</script>

<style scoped>
.private {
  width: 100%;
  padding: 20px 0;
}
h4 {
  padding-left: 10px;
}
.content {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.item {
  position: relative;
  width: calc(33% - 20px);
  margin: 0px 10px;
  overflow: hidden;
}
.item img {
  width: 100%;
}
.bottom {
  font-size: 13px;
}
.loco {
  position: absolute;
  left: 5px;
  top: 5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}
.loco img {
  width: 20px;
  border: 50%;
}
.iconfont {
  color: #ffffff;
}
</style>