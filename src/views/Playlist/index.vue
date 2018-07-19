<template>
  <div class="playlist-view" v-scroll @scrollReachBottom="getPlaylistTracks">
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
        :ownerID="playlist.owner.id"
      />
      <tracks-table :tracks="tracks.items"/>
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
        tracks: null,

      }
    },

    methods: {
      ...mapActions({
        notFoundPage: 'app/notFoundPage',
      }),

      initData() {
        this.tracks = {
          limit: 50,
          offset: 0,
          total: 1,
          items: []
        }
      },

      async getPlaylist() {
        const {user_id, playlist_id} = this.$route.params;

        try {
          const response = await api.spotify.playlists.getPlaylist(user_id, playlist_id, 'uri, name, type, images, description, owner, followers');
          this.playlist = response.data;
        } catch (e) {
          this.notFoundPage(true);
        }
      },

      async getPlaylistTracks() {
        try {
          if (this.tracks.total > this.tracks.offset) {
            const {user_id, playlist_id} = this.$route.params;
            const response = await api.spotify.playlists.getPlalistsTracks(user_id, playlist_id, this.tracks.offset, this.tracks.limit);

            this.tracks.offset = response.data.offset + this.tracks.limit;
            this.tracks.total = response.data.total;
            this.tracks.items.push(...response.data.items);
          }
        } catch (e) {
          this.notFoundPage(true);
        }
      }
    },

    watch: {
      $route() {
        this.initData();
        this.getPlaylist();
        this.getPlaylistTracks();
      }
    },

    created() {
      this.initData();
      this.getPlaylist();
      this.getPlaylistTracks();
    },
  }
</script>

<style scoped lang="sass">

</style>
