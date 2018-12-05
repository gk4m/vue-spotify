<template>
  <div
    v-scroll
    class="search-result-view"
  >
    <entity-header title="Albums" small/>
    <div class="search-result-view__content">
      <media-container>
        <media-object
          v-for="(album, index) in albums"
          v-if="index < maxResults"
          :key="index"
          :id="album.id"
          :uri="album.uri"
          :coverImg="album.images"
          :name="album.name"
          :artists="album.artists"
          :type="album.type"
        />
      </media-container>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions,
  } from 'vuex'

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

      albums() {
        return this.result && this.result.albums && this.result.albums.items;
      }
    },

    methods: {
      ...mapActions({
        notFoundPage: 'app/notFoundPage',
      }),
    },
  }
</script>

<style scoped lang="sass">

  .search-result-view
    height: calc(100vh - 227px)

</style>
