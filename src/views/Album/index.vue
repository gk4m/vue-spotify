<template>
  <div class="album-view" v-scroll>
    <div>
      <entity-info
        v-if="album"
        :coverImg="album.images"
        :type="album.type"
        :name="album.name"
        :description="album.description"
        :artists="album.artists"
        :uri="album.uri"
      />

      <tracks-list
        v-if="album && tracks"
        :tracks="tracks"
        :showArtists="true"
        :contextUri="album.uri"
      />
    </div>
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
        albumID: null,
        album: null,
        tracks: null
      }
    },

    methods: {
      ...mapActions({
        notFoundPage: 'app/notFoundPage',
      }),

      async getAlbum(albumID) {
        try {
          const response = await api.spotify.albums.getAlbum(albumID);
          this.album = response.data;
        } catch (e) {
          this.notFoundPage(true);
        }
      },

      async getAlbumTracks(albumID) {
        try {
          const response = await api.spotify.albums.getAlbumTracks(albumID);
          this.tracks = response.data.items;
        } catch (e) {
          this.notFoundPage(true);
        }
      }
    },

    created() {
      this.albumID = this.$route.params.id;
      this.getAlbum(this.albumID);
      this.getAlbumTracks(this.albumID);
    },
  }
</script>

<style scoped lang="sass">

</style>
