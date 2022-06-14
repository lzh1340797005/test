<template>
  <div class="dance-music-mv-detail" v-if="id != null">
    <div class="layout-left">
      <div class="title">
        <h3><p class="gedan">MV</p></h3>
        <div class="name">{{ detail.name }}</div>
        <div class="artistname">{{ detail.artistName }}</div>
      </div>
      <div class="video">
        <video
          :src="url"
          controls
          autoplay
          width="100%"
          class="video-play"
        ></video>
      </div>
      <div class="recommend">
        <p class="p">评论</p>
        <recommends :recommends="recommends"></recommends>
      </div>
    </div>
    <div class="right">
      <div class="desc">
        <p class="p">MV介绍</p>
        <div class="base">
          <div class="date">发布时间:{{detail.publishTime}}</div>
          <div class="playCount">播放次数:{{detail.playCount}}次</div>
          <div class="clear"></div>
        </div>
        <div class="mv-desc">
          <div  v-if="detail.desc">
            <span>简介：</span>
            {{detail.desc}}
          </div>
        </div>
      </div>
      <div class="alia">
        <p class="p">相关推荐</p>
        <simi-mv-item :mv-list="simiMv"></simi-mv-item>
      </div>
    </div>
    <div class="mv-detail-bot">
      <el-pagination
        background
        :current-page.sync="offset"
        :page-count="page"
        @current-change="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import SimiMvItem from "views/mv/childsComps/SimiMvItem";
import Recommends from "views/list-detail/childsComps/Recommends";
import {
  _getMvDetail,
  _getMVUrl,
  _getMVComment,
  _getSimiMv,
  MV,
} from "network/mv";

export default {
  data() {
    return {
      id: null,
      detail: {},
      url: null,
      recommends: null,
      offset: 1,
      limit: 20,
      simiMv: [],
      page: 0,
    };
  },
  components: {
    Recommends,SimiMvItem
  },
  computed: {
    getOffset() {
      return (this.offset - 1) * this.limit;
    },
  },
  watch: {
    $route() {
      this.id = this.$route.params.id;
      if (this.id != null) {
        this.reset();
        this.initRequest();
      }
    },
  },
  created() {
    this.id = this.$route.params.id;
    if (this.id != null) {
      this.initRequest();
    }
  },
  methods: {
    /**处理分页 */
    onPageChange() {
      this.getComment();
    },
    initRequest() {
      _getMvDetail(this.id).then((res) => {
        this.detail = res.data.data;
      });
      _getMVUrl(this.id).then((res) => {
        this.url = res.data.data.url;
      });
      _getMVComment(this.id, this.limit,this.getOffset).then((res) => {
        this.recommends = res.data.comments;
        this.page = Math.ceil(res.data.total / this.limit);
      });
      _getSimiMv(this.id).then((res) => {
        let mvs = res.data.mvs;
        for (let i in mvs) {
          let mv = new MV(
            mvs[i].id,
            mvs[i].cover,
            mvs[i].name,
            mvs[i].artistName,
            mvs[i].playCount
          );
          this.simiMv.push(mv);
        }
      });
    },
    getComment() {
      _getMVComment(this.id, this.limit, this.offset).then((res) => {
        this.recommends = res.data.comments;
        // this.$nextTick(() => {
        //   let top = this.$refs.recom.offsetTop;
        //   // this.$refs.scroll.scrollTo(-top,0);
        // });
      });
    },
    reset() {
      this.simiMv = [];
      this.offset = 1;
    },
  },
};
</script>

<style lang="less" scoped>
.dance-music-mv-detail {
  padding: 10px 100px 0px 100px;
}
h3 {
  //   padding: 5px 0px;
  display: flex;
  align-items: center;
  .gedan {
    width: 52px;
    height: 26px;
    color: #e83c3c;
    border: 1px solid #e83c3c;
    text-align: center;
    border-radius: 4px;
    font-size: 1rem;
    justify-content: center;
    line-height: 24px;
  }
}
.title {
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
}
.name {
  margin-left: 5px;
}
.artistname {
  margin-left: 5px;
}
.layout-left {
  display: inline-block;
  width: 70%;
}
.video-play {
  outline-style: none;
}
.right{
  padding-left: 20px;
  width: 30%;
  float: right;
  font-family: 'Times New Roman', Times, serif;
}
.clear {
  clear: both;
}
.p {
  font-size: 18px;
  // color: var(--color-text-tint);
  margin-bottom: 10px;
}
.base {
  font-size: 12px;
  color: var(--color-text-an);
  margin-bottom: 10px;
}
.base .date {
  float: left;
}
.base .playCount {
  float: right;
}
.mv-desc {
  max-height: 288px;
  width: 100%;
  overflow: hidden;
  line-height: 1.2em;
  font-size: 13px;
  margin-bottom: 15px;
  text-overflow: ellipsis;
  span{
    font-size: 14px;
  }
}
</style>