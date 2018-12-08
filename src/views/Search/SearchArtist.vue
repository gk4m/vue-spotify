<template>
  <div
    v-scroll
    @vScroll="loadMore"
    class="search-artist-view"
  >
    <div class="search-artist-view__content">
      <media-container>
        <media-object
          v-for="(item) in artists.items"
          :key="item.id"
          :id="item.id"
          :uri="item.uri"
          :name="item.name"
          :type="item.type"
          :coverImg="item.images"
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

  import MediaObject from '@/components/MediaObject'
  import MediaContainer from '@/components/MediaContainer'

  export default {
    name: 'search-artist-view',

    components: {
      MediaObject,
      MediaContainer
    },

    computed: {
      ...mapState('search', [
        'artists',
      ]),
    },

    methods: {
      ...mapActions({
        getArtists: 'search/getArtists',
      }),

      async loadMore(ev) {
        if(this.artists.next && ev.detail.scrollbarV.percent > 70) {
          this.getArtists();
        }
      }
    },
  }
</script>

<style scoped lang="sass">
  .search-artist-view
    height: calc(100vh - 227px)
</style>
