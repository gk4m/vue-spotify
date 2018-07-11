<template>
  <div>
    <entity-info
      v-if="playlist"
      :coverImg="playlist.images"
      :type="playlist.type"
      :name="playlist.name"
      :description="playlist.description"
      :author="playlist.owner.display_name"
      :followers="playlist.followers.total"
      :uri="playlist.uri"
    />

    <tracks-list/>
  </div>
</template>

<script>
  import api from '@/api'
  import {mapActions} from 'vuex'
  import EntityInfo from '@/components/EntityInfo'
  import TracksList from '@/components/TracksList'

  export default {
    name: 'playlist-view',

    components: {
      EntityInfo,
      TracksList
    },

    data() {
      return {
        playlist: '',
        tracks: ''
      }
    },

    computed: {},

    methods: {
      ...mapActions({
        notFoundPage: 'app/notFoundPage',
      }),

      async getPlaylist() {
        const {user_id, playlist_id} = this.$route.params;

        try {
          const response = await api.spotify.playlists.getPlaylist(user_id, playlist_id, 'uri, name, type, images, description, owner, followers');
          this.playlist = response.data;
          console.log(this.playlist)
        } catch (e) {
          this.notFoundPage(true);
        }
      },

      async getPlaylistTracks() {
        const {user_id, playlist_id} = this.$route.params;

        try {
          const response = await api.spotify.playlists.getPlalistsTracks(user_id, playlist_id);
          this.tracks = response.data;
          console.log(this.tracks)
        } catch (e) {
          this.notFoundPage(true);
        }
      }
    },

    watch: {
      $route() {
        this.getPlaylist();
      }
    },

    created() {
      this.getPlaylist();
      this.getPlaylistTracks();
    },
  }
</script>

<style scoped lang="sass">

</style>
