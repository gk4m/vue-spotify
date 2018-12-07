<template>
  <div
    v-scroll
    @vScroll="loadMore"
    class="search-playlist-view"
  >
    <entity-header title="Playlists" small/>

    <div class="search-playlist-view__content">
      <media-container>
        <media-object
          v-for="(item) in playlists.items"
          :key="item.id"
          :id="item.id"
          :uri="item.uri"
          :coverImg="item.images"
          :name="item.name"
          :type="item.type"
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
    name: 'search-playlist-view',

    components: {
      MediaObject,
      EntityHeader,
      MediaContainer
    },

    computed: {
      ...mapState('search', [
        'playlists',
      ]),
    },

    methods: {
      ...mapActions({
        getPlaylists: 'search/getPlaylists',
      }),

      async loadMore(ev) {
        if(this.playlists.next && ev.detail.scrollbarV.percent > 70) {
          this.getPlaylists();
        }
      }
    },
  }
</script>

<style scoped lang="sass">
  .search-playlist-view
    height: calc(100vh - 227px)
</style>
