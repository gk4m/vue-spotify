<template>
  <div
    v-scroll
    @vScroll="loadMore"
    class="search-artist-view"
  >
    <entity-header title="Artists" small/>

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

  import EntityHeader from '@/components/EntityHeader'
  import MediaObject from '@/components/MediaObject'
  import MediaContainer from '@/components/MediaContainer'

  export default {
    name: 'search-artist-view',

    components: {
      MediaObject,
      EntityHeader,
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
        const {query} = this.$route.params;

        if(this.artists.next && query && ev.detail.scrollbarV.percent > 70) {
          this.getArtists(query);
        }
      }
    },
  }
</script>

<style scoped lang="sass">
  .search-artist-view
    height: calc(100vh - 227px)
</style>
