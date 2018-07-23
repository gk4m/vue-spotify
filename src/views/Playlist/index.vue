<template>
  <div class="playlist-view" v-scroll @vScroll="loadMore">
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
      <tracks-table :tracks="tracks.items" :contextUri="playlist.uri"/>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import {mapGetters, mapActions} from 'vuex'
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
        userID: null,
        playlistID: null,
        tracks: null,
        more: null
      }
    },

    computed: {
      ...mapGetters('playlist', {
        playlist: 'getPlaylist',
      }),
    },

    methods: {
      ...mapActions({
        notFoundPage: 'app/notFoundPage',
        fetchPlaylist: 'playlist/fetchPlaylist',
      }),

      initData() {
        this.tracks = {
          limit: 50,
          offset: 0,
          total: 1,
          items: []
        }
      },

      async getPlaylistTracks(userID, playlistID) {
        try {
          if (this.tracks.total > this.tracks.offset) {
            const response = await api.spotify.playlists.getPlalistsTracks(userID, playlistID, this.tracks.offset, this.tracks.limit);

            this.tracks.offset = response.data.offset + this.tracks.limit;
            this.tracks.total = response.data.total;
            this.tracks.items.push(...response.data.items);
            this.more = false;
          }
        } catch (e) {
          this.notFoundPage(true);
        }
      },

      async loadMore(ev) {
        if (this.more) {
          return false;
        }

        if (ev.detail.scrollbarV.percent > 70) {
          this.more = true;
          this.getPlaylistTracks(this.userID, this.playlistID);
        }
      },

      init(){
        const {user_id, playlist_id} = this.$route.params;

        this.userID = user_id;
        this.playlistID = playlist_id;

        this.initData();
        this.getPlaylistTracks(this.userID, this.playlistID);
        this.fetchPlaylist({userID: this.userID, playlistID: this.playlistID})
      }
    },

    watch: {
      $route() {
        this.init();
      }
    },

    created() {
      this.init();
    },
  }
</script>

<style scoped lang="sass">

</style>
