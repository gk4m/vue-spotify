<template>
  <div class="album-view">
    <entity-info
      v-if="album"
      :coverImg="album.images"
      :type="album.type"
      :name="album.name"
      :description="album.description"
      :artists="album.artists"
      :uri="album.uri"
    />
  </div>
</template>

<script>
  import api from '@/api'
  import {mapActions} from 'vuex'
  import EntityInfo from '@/components/EntityInfo';

  export default {
    name: 'album-view',

    components: {
      EntityInfo
    },

    data() {
      return {
        album: '',
        tracks: ''
      }
    },

    computed: {},

    methods: {
      ...mapActions({
        notFoundPage: 'app/notFoundPage',
      }),

      async getAlbum() {
        const albumID = this.$route.params.id;

        try {
          const response = await api.spotify.albums.getAlbum(albumID);
          this.album = response.data;
          console.log(this.album);
        } catch (e) {
          this.notFoundPage(true);
        }
      },

      async getAlbumTracks() {
        const albumID = this.$route.params.id;

        try {
          const response = await api.spotify.albums.getAlbumTracks(albumID);
          this.tracks = response.data;
          console.log(this.tracks);
        } catch (e) {
          this.notFoundPage(true);
        }
      }
    },

    created() {
      this.getAlbum();
      this.getAlbumTracks();
    },
  }
</script>

<style scoped lang="sass">

</style>
