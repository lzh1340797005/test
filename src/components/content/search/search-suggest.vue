<template>
  <div class="search-suggest-scroll">
    <div class="dance-music-search-suggest">
      <div class="search-suggest-title">
        搜索<span>{{ keywords }}</span
        >相关的结果
      </div>
      <div class="search-suggest-list">
        <dl>
          <dt v-if="songs && songs.length">
            <i class="iconfont icon-musicnoteeighth"></i>单曲
          </dt>
          <dd
            v-for="(item1, index1) in songs"
            :key="index1 + 'songs'"
            @click="handleSongsClick(index1)"
          >
            {{ item1.name }}——{{ item1.artists[0].name }}
          </dd>
          <dt v-if="artists && artists.length">
            <i class="iconfont icon-mansingle"></i>歌手
          </dt>
          <dd
            v-for="(item2, index2) in artists"
            :key="index2 + 'artists'"
            @click="handleArtistClick(index2)"
          >
            {{ item2.name }}
          </dd>
          <dt v-if="albums && albums.length">
            <i class="iconfont icon-album-line" />专辑
          </dt>
          <dd
            v-for="(item3, index3) in albums"
            :key="index3 + 'albums'"
            @click="handleAlbumClcick(index3)"
          >
            {{ item3.name }}——{{ item3.artist.name }}
          </dd>
          <dt v-if="playlists && playlists.length">
            <i class="iconfont icon-gedan" />歌单
          </dt>
          <dd
            v-for="(item4, index4) in playlists"
            :key="index4 + 'playlists'"
            @click="handlePlayListClick(index4)"
          >
            {{ item4.name }}
          </dd>
        </dl>
      </div>
    </div>
    <div>
      <dl>
        <dd></dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { _getSongsDetail, songDetail } from "network/detail";
import { _Suggest } from "network/search";
import { debounce } from "lodash";
import { playMusic } from "mixin/global/play-music";
export default {
  mixins: [playMusic],
  props: {
    keywords: {
      Object: String,
      default: "",
    },
  },
  data() {
    return {
      albums: [], //专辑列表
      artists: [], //歌手列表
      playlists: [], //歌单列表
      songs: [], //单曲列表
      musicList: [], //歌曲列表，单曲播放用
    };
  },
  methods: {
    Suggest: debounce(function () {
      if (!this.keywords) {
        return;
      }
      _Suggest(this.keywords).then((res) => {
        const { albums, artists, playlists, songs } = res.data.result;
        this.albums = albums;
        this.artists = artists;
        this.playlists = playlists;
        this.songs = songs;
      });
    }, 500),
    /**处理搜索建议歌单点击 */
    handlePlayListClick(index) {
      this.$router.push(
        "/musiclistdetail/" +
          this.playlists[index].id +
          "/" +
          new Date().getTime()
      );
      this.$emit("hidden");
    },
    /**搜索建议歌手点击 */
    handleArtistClick(index) {
      this.$router.push({
        path: "/artist-detail",
        query: {
          artist: JSON.stringify(this.artists[index]),
        },
      });
      this.$emit("hidden");
    },
    /**专辑点击 */
    handleAlbumClcick(index) {
      this.$router.push({
        path: "/album-detail",
        query: {
          album: this.albums[index],
        },
      });
      this.$emit("hidden");
    },
    /**处理搜索建议单曲点击
     * 点击单曲直接逼疯
     */
    async handleSongsClick(index) {
      /**获取歌曲详情 */
      await _getSongsDetail(this.songs[index].id).then((res) => {
        let song = new songDetail(res.data.songs);
        this.musicList.push(song);
      });
      this.playMusic();
      this.$emit("hidden");
    },
  },
  watch: {
    keywords: {
      handler() {
        this.Suggest();
      },
      immediate: false,
    },
  },
};
</script>

<style lang="less" scoped>
.search-suggest-scroll {
  height: 530px;
  z-index: 4;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  top: 4rem;
  font-family: "Times New Roman", Times, serif;
  border: 1px #dcdde4 solid;
  border-radius: 5px;
  // cursor: pointer;
  background-color: #fff;
}
.dance-music-search-suggest {
  width: 400px;
  padding: 5px 20px 0px 20px;
  font-size: 13px;
  line-height: initial;
  text-align: initial;
  // span {
  //   color: var(--tag-color);
  // }
}
.search-suggest {
  &-title {
    padding: 5px 0px;
  }
  &-list {
    .iconfont {
      margin-right: 5px;
    }
    dl {
      dt {
        padding: 7px 0px;
        font-size: 17px;
      }
      dd {
        padding: 7px 20px;
        cursor: pointer;
        font-size: 16px;
      }
      dd:hover {
        color: #2d8cf0;
      }
    }
  }
}
</style>