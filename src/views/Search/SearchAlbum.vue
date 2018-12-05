<template>
  <div
    v-if="isAlbumsExists"
    v-scroll
    @vScroll="loadMore"
    class="search-album-view"
  >
    <entity-header title="Albums" small/>

    <div class="search-album-view__content">
      <media-container>
        <media-object
          v-for="(album, index) in albums.items"
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
    name: 'search-album-view',

    components: {
      MediaObject,
      EntityHeader,
      MediaContainer
    },

    computed: {
      ...mapState('search', [
        'albums',
        'albumsIsLoading',
        'albumsError',
      ]),

      isAlbumsExists() {
        return this.albums && this.albums.total > 0
      },
    },

    methods: {
      ...mapActions({
        getAlbums: 'search/getAlbums',
      }),

      async loadMore(ev) {
        const {query} = this.$route.params;

        if(this.albums.next && query && ev.detail.scrollbarV.percent > 70) {
          this.getAlbums(query);
        }
      }
    },
  }
</script>

<style scoped lang="sass">
  .search-album-view
    height: calc(100vh - 227px)
</style>
