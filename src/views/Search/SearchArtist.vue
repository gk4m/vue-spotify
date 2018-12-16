<template>
  <div
    v-scroll
    @vScroll="loadMore($event, artists.next, getArtists)"
  >
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
</template>

<script>
  import {
    mapState,
    mapActions,
  } from 'vuex'

  import {loadMore} from '@/mixins'
  import MediaObject from '@/components/MediaObject'
  import MediaContainer from '@/components/MediaContainer'

  export default {
    name: 'search-artist-view',

    mixins: [loadMore],

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
    },
  }
</script>
