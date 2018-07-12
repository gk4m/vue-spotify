<template>
  <div class="playlist-view" v-scroll @scrollReachBottom="loadMore">
    <div class="playlist-view__content">
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
      <tracks-table :tracks="tracks"/>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import {mapActions} from 'vuex'
  import EntityInfo from '@/components/EntityInfo'
  import TracksTable from '@/components/TracksTable'

  export default {
    name: 'playlist-view',

    components: {
      EntityInfo,
      TracksTable
    },

    data() {
      return {
        playlist: '',
        tracks: '',
        limit: 20,
        offset: 0,
        total: 0
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
        try {
          const {user_id, playlist_id} = this.$route.params;
          const response = await api.spotify.playlists.getPlalistsTracks(user_id, playlist_id, 0, this.limit);

          this.tracks = response.data.items;
          this.offset = response.data.offset;
          this.total = response.data.total;

        } catch (e) {
          this.notFoundPage(true);
        }
      },

      async loadMore(){
        try {
          const {user_id, playlist_id} = this.$route.params;
          const response = await api.spotify.playlists.getPlalistsTracks(user_id, playlist_id, 0, this.limit);

          this.tracks = response.data.items;
          this.offset = response.data.offset;
          this.tracks.push(...response.data.items);

        } catch (e) {
          this.notFoundPage(true);
        }
      }
    },

    watch: {
      $route() {
        this.getPlaylist();
        this.getPlaylistTracks();
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
