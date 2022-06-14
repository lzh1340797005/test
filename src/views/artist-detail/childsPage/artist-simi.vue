<template>
  <div>
    <artist-list :artist-list="artists"></artist-list>
  </div>
</template>

<script>
import ArtistList from "components/content/artist-list/artist-list";
import { _getSimiArtist } from "network/artist";
export default {
  components: {
    ArtistList,
  },
  props: {
    id: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      artists: [],
    };
  },
  created() {
    this.initRequest();
  },
  methods: {
    initRequest() {
      _getSimiArtist(this.id).then((res) => {
        this.artists = res.data.artists;
        // console.log(this.artists);
      });
    },
  },
  watch: {
    // id() {
    //   if (this.getCookie) {
    //     this.initRequest();
    //   } else {
    //     this.$Toast.warning("请先登陆");
    //   }
    // },
    id() {
      this.initRequest();
    },
  },
};
</script>

<style>
</style>