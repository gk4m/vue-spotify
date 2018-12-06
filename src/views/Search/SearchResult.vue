<template>
  <div
    v-scroll
    class="search-result-view"
  >
    <div class="search-result-view__content">
      <template v-if="isAlbumsExists">
        <entity-header
          @click.native="goTo('search-album')"
          title="Albums"
          small
        />
        <media-container>
          <media-object
            v-for="(album, index) in albums"
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
            v-for="(artist, index) in artists"
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
  import {
    mapState,
    mapActions,
  } from 'vuex'
  import router from '@/router'
  import EntityHeader from '@/components/EntityHeader'
  import MediaObject from '@/components/MediaObject'
  import MediaContainer from '@/components/MediaContainer'

  export default {
    name: 'search-result-view',

    components: {
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
        'isLoading',
        'result',
        'error',
      ]),

      isAlbumsExists() {
        return this.result && this.result.albums && this.result.albums.total > 0
      },

      isArtistsExists() {
        return this.result && this.result.artists && this.result.artists.total > 0
      },

      albums() {
        return this.result && this.result.albums && this.result.albums.items;
      },

      artists() {
        return this.result && this.result.artists && this.result.artists.items;
      }
    },

    methods: {
      ...mapActions({
        notFoundPage: 'app/notFoundPage',
      }),

      goTo(name) {
        const {query} = this.$route.params;
        router.push({ name, params: { query }})
      }
    },
  }
</script>

<style scoped lang="sass">

  .search-result-view
    height: calc(100vh - 227px)

</style>
