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

    <tracks-list :tracks="tracks" :showArtists="true"/>
  </div>
</template>

<script>
  import api from '@/api'
  import {mapActions} from 'vuex'
  import EntityInfo from '@/components/EntityInfo';
  import TracksList from '@/components/TracksList'

  export default {
    name: 'album-view',

    components: {
      EntityInfo,
      TracksList
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
        try {
          const albumID = this.$route.params.id;
          const response = await api.spotify.albums.getAlbum(albumID);
          this.album = response.data;
        } catch (e) {
          this.notFoundPage(true);
        }
      },

      async getAlbumTracks() {
        const albumID = this.$route.params.id;

        try {
          const response = await api.spotify.albums.getAlbumTracks(albumID);
          this.tracks = response.data.items;
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
