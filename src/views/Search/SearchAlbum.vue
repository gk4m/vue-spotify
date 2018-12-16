<template>
  <div
    v-scroll
    @vScroll="loadMore($event, albums.next, getAlbums)"
  >
    <media-container>
      <media-object
        v-for="(album) in albums.items"
        :key="album.id"
        :id="album.id"
        :uri="album.uri"
        :coverImg="album.images"
        :name="album.name"
        :artists="album.artists"
        :type="album.type"
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
    name: 'search-album-view',

    mixins: [loadMore],

    components: {
      MediaObject,
      MediaContainer
    },

    computed: {
      ...mapState('search', [
        'albums',
      ]),
    },

    methods: {
      ...mapActions({
        getAlbums: 'search/getAlbums',
      }),
    },
  }
</script>
