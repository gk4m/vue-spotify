<template>
  <div
    v-scroll
    @vScroll="loadMore($event, tracks.next, getTracks)"
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

  import {loadMore} from '@/mixins'
  import TracksList from '@/components/TracksList'

  export default {
    name: 'search-playlist-view',

    mixins: [loadMore],

    components: {
      TracksList,
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
    },
  }
</script>

<style scoped lang="sass">

  .search-track-view
    height: calc(100vh - 227px)

</style>
