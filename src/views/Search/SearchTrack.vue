<template>
  <div
    v-scroll
    @vScroll="loadMore"
    class="search-track-view"
  >
    <div class="search-track-view__content">
      <tracks-list :tracks="tracks.items"/>
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
  import TracksList from '@/components/TracksList'

  export default {
    name: 'search-playlist-view',

    components: {
      TracksList,
      MediaObject,
      MediaContainer
    },

    computed: {
      ...mapState('search', [
        'tracks',
      ]),
    },

    methods: {
      ...mapActions({
        getTracks: 'search/getTracks',
      }),

      async loadMore(ev) {
        if(this.tracks.next && ev.detail.scrollbarV.percent > 70) {
          this.getTracks();
        }
      }
    },
  }
</script>

<style scoped lang="sass">
  .search-track-view
    height: calc(100vh - 227px)
</style>
