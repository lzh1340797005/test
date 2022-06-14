<template>
  <div class="pregress">
    <el-progress :percentage="percentage" :color="customColor" :show-text="false"></el-progress>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percentage: 20,
      customColor: "#409eff",
    };
  },
  methods: {

  },
};
</script>

<style>
</style>