<template>
  <div
    v-scroll
    class="search-result-view"
  >
    <div class="search-result-view__content">
      <template v-if="isTracksExists">
        <entity-header
          @click.native="goTo('search-track')"
          title="Tracks"
          small
        />

        <tracks-list :tracks="getTracks"/>
      </template>

      <template v-if="isPlaylistsExists">
        <entity-header
          @click.native="goTo('search-playlist')"
          title="Playlists"
          small
        />

        <media-container>
          <media-object
            v-for="(playlist, index) in playlists.items"
            v-if="index < maxResults"
            :key="playlist.id"
            :id="playlist.id"
            :uri="playlist.uri"
            :coverImg="playlist.images"
            :name="playlist.name"
            :type="playlist.type"
          />
        </media-container>
      </template>

      <template v-if="isAlbumsExists">
        <entity-header
          @click.native="goTo('search-album')"
          title="Albums"
          small
        />
        <media-container>
          <media-object
            v-for="(album, index) in albums.items"
            v-if="index < maxResults"
            :key="album.id"
            :id="album.id"
            :uri="album.uri"
            :coverImg="album.images"
            :name="album.name"
            :artists="album.artists"
            :type="album.type"
          />
        </media-container>
      </template>

      <template v-if="isArtistsExists">
        <entity-header
          @click.native="goTo('search-artist')"
          title="Artists"
          small
        />
        <media-container>
          <media-object
            v-for="(artist, index) in artists.items"
            v-if="index < maxResults"
            :key="artist.id"
            :id="artist.id"
            :uri="artist.uri"
            :name="artist.name"
            :type="artist.type"
            :coverImg="artist.images"
          />
        </media-container>
      </template>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import router from '@/router'
  import EntityHeader from '@/components/EntityHeader'
  import MediaObject from '@/components/MediaObject'
  import MediaContainer from '@/components/MediaContainer'
  import TracksList from '@/components/TracksList'

  export default {
    name: 'search-result-view',

    components: {
      TracksList,
      MediaObject,
      EntityHeader,
      MediaContainer
    },

    data() {
      return {
        maxResults: 12,
      }
    },

    computed: {
      ...mapState('search', [
        'query',
        'result',
        'isLoading',
        'error',
        'albums',
        'tracks',
        'artists',
        'playlists',
      ]),

      isTracksExists() {
        return this.tracks && this.tracks.total > 0
      },

      isAlbumsExists() {
        return this.albums && this.albums.total > 0
      },

      isArtistsExists() {
        return this.artists && this.artists.total > 0
      },

      isPlaylistsExists() {
        return this.playlists && this.playlists.total > 0
      },

      getTracks() {
        return this.tracks && this.tracks.items
          ? Object.keys(this.tracks.items)
            .slice(0, 5)
            .map(key => ({...this.tracks.items[key]}))
          : []
      }
    },

    methods: {
      goTo(name) {
        router.push({name, params: {query: this.query}})
      }
    },
  }
</script>

<style scoped lang="sass">

  .search-result-view
    height: calc(100vh - 227px)

</style>
