<template>
  <div class="search-view">
    <p v-if="!query">
      Find your favorite songs, artists, albums and playlists.
    </p>

    <template v-if="!isResult && query">
      No result found for "{{query}}"
      <div>Please make sure your words are spelled correctly or use less of different keywords.</div>
    </template>

    <nav-view
      v-if="query"
      :links="navLinks"
    />

    <div class="search-view__content">
      <router-view/>
    </div>
  </div>
</template>

<script>

  import {
    mapState,
    mapActions,
  } from 'vuex'

  import NavView from '@/components/NavView'

  export default {
    name: 'search-view',

    components: {
      NavView,
    },

    data() {
      return {
        query: ''
      }
    },

    computed: {
      ...mapState('search', [
        'isLoading',
        'result',
        'error',
      ]),

      isTracksExists() {
        return this.result && this.result.tracks && this.result.tracks.total > 0
      },

      isPlaylistsExists() {
        return this.result && this.result.playlists && this.result.playlists.total > 0
      },

      isAlbumsExists() {
        return this.result && this.result.albums && this.result.albums.total > 0
      },

      isArtistsExists() {
        return this.result && this.result.artists && this.result.artists.total > 0
      },

      isResult() {
        return this.isTracksExists || this.isAlbumsExists || this.isPlaylistsExists || this.isArtistsExists
      },

      navLinks() {
        return [
          {
            to: {name: 'search-result', params: {query: this.query}},
            name: 'Top results',
          },
          {
            to: {name: 'search-track', params: {query: this.query}},
            name: 'Tracks',
            isVisible: this.isTracksExists,
          },
          {
            to: {name: 'search-playlist', params: {query: this.query}},
            name: 'Playlists',
            isVisible: this.isPlaylistsExists,
          },
          {
            to: {name: 'search-album', params: {query: this.query}},
            name: 'Albums',
            isVisible: this.isAlbumsExists,
          },
          {
            to: {name: 'search-artist', params: {query: this.query}},
            name: 'Artists',
            isVisible: this.isArtistsExists,
          },
        ]
      }
    },

    methods: {
      ...mapActions({
        notFoundPage: 'app/notFoundPage',
      }),
    },

    watch: {
      '$route': function (route) {
        const {query} = route.params;
        this.query = query || '';
      }
    }
  }
</script>

<style scoped lang="sass">
</style>
