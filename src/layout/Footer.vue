<template>
  <div class="footer">
      <Player/>
  </div>
</template>

<script>
import Player from 'player/Player'
export default {
  components:{
    Player
  }
}
</script>

<style scoped>
.footer{
  position: absolute;
  width: 100%;
  height: 70px;
  bottom: 0;
  background-color: #fff;
}
</style>