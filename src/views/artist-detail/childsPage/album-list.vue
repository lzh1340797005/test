<template>
  <div class="album-list">
    <artist-hot-50 :id="id"></artist-hot-50>
    <album-detail v-for="(item,index) in hotAlbums" :key="index" :album="item"></album-detail>
  </div>
</template>

<script>
import ArtistHot50 from "../childsComps/artist-hot50";
import AlbumDetail from '../childsComps/album-detail'
import {_getArtistAlbum} from 'network/artist'
export default {
  components: {
    ArtistHot50,
    AlbumDetail,
  },
  props: {
    id: {
      type: [Number, String],
      default: 0,
    },
  },
  data(){
      return{
          hotAlbums:[]
      }
  },
  created(){
      this.initRequest()
  },
  methods: {
    reset() {
      this.hotAlbums = [];
    },
    initRequest(){
        _getArtistAlbum(this.id).then((res)=>{
            this.hotAlbums = res.data.hotAlbums
        })
    }
  },
  watch: {
    id() {
      this.reset();
      this.initRequest();
    },
  },
};
</script>

<style scoped>
.album-list {
  width: 100%;
  padding: 10px 20px;
}
</style>