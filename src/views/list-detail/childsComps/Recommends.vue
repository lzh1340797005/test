<template>
  <div class="recommend">
    <div class="head">
      <textarea name="" id="" cols="30" rows="10"></textarea>
      <p>
        <el-button size="small">评论</el-button>
      </p>
    </div>
    <template v-if="isEmpty">
      <p class="title">精彩评论</p>
      <el-descriptions
        v-for="(item, index) in recommends"
        :key="index"
        :colon="false"
      >
        <el-descriptions-item>
          <div class="left">
            <img :src="item.user.avatarUrl" alt="" @load="handleImgLoad" />
          </div>
          <div class="right">
            <div class="desc">
              <span>{{ item.user.nickname }}:</span>
              {{ item.content }}
              <div class="bottom">{{ _formatDate(item.time) }}</div>
            </div>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </template>
    <template v-else>
      <empty />
    </template>
  </div>
</template>

<script>
import { _pushCommend } from "network/detail";
import { formatDate } from "utils/tool";
import empty from "components/common/empty/empty";
export default {
  name: "Recommends",
  components: { empty },
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
    id: {
      type: [String, Number],
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      content: "",
    };
  },
  computed: {
    isEmpty() {
      return this.recommends && this.recommends.length;
    },
  },
  methods: {
    _formatDate(data) {
      return formatDate(new Date(data), "yyyy年MM月dd日 hh:mm:ss");
    },
    pushCommend() {
      //   this.$Toast.warning("请先登陆");
    },
    handleImgLoad() {
      if (this.imgCount == this.recommends.length) this.$emit("refresh");
      this.imgCount++;
    },
  },
};
</script>

<style lang="less" scoped>
.recommend {
  width: 100%;
  .head {
    padding: 15px 10px 10px 10px;
    position: relative;
    background: #f0f0f2;
    p {
      text-align: right;
    }
  }
  textarea {
    width: 100%;
    height: 60px;
    outline-style: none;
    border: 1px solid var(--border);
    padding: 5px;
  }
}
/deep/.el-descriptions{
    // margin-top: 10px;
    // height: 58px;
    overflow: hidden;
}
/deep/.el-descriptions-item__content {
  // height: 42px;
//   line-height: 58px;
  padding: 8px 20px;
  display: flex;
  font-size: 13px;
  justify-content: center;
  align-items: center;
  .left {
    width: 40px;
    // height: 40px;
    position: relative;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .right {
    flex: 1;
    padding-left: 20px;
    font-size: 14px;
    font-family: 'Times New Roman', Times, serif;
    // height: 42px;
    .desc {
      padding: 5px 0px;
      box-sizing: border-box;
      // height: 42px;
      span {
        color: var(--tag-color);
      }
    }
  }
}
.list-title {
  padding-left: 0px;
}
</style>