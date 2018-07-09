<template>
  <div class="albums-view" v-scroll @scrollReachBottom="loadMore">
    <entity-header title="Albums"/>

    <div class="albums-view__content">
      <media-object
        v-for="(item, index) in albums.items"
        :key="index"
        :id="item.album.id"
        :uri="item.album.uri"
        :coverImg="item.album.images[1].url"
        :name="item.album.name"
        :artists="item.album.artists"
      />
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import EntityHeader from '@/components/EntityHeader'
  import MediaObject from '@/components/MediaObject'

  export default {
    name: 'Albums',

    components: {
      MediaObject,
      EntityHeader
    },

    data() {
      return {
        albums: '',
        limit: 25,
        offset: 0,
        total: 0
      }
    },

    methods: {
      async getAlbums() {
        try {
          const response = await api.spotify.library.getAlbums(0, this.limit);

          this.albums = response.data;
          this.offset = this.albums.offset;
          this.total = this.albums.total;

        } catch (e) {
          console.log(e)
        }
      },

      async loadMore() {
        try {
          let offset = this.offset + this.limit;

          if (this.total > offset) {
            const response = await api.spotify.library.getAlbums(offset, this.limit);

            this.offset = response.data.offset;
            this.total = response.data.total;
            this.albums.items.push(...response.data.items);

          }
        } catch (e) {
          console.log(e)
        }
      }
    },

    created() {
      this.getAlbums();
    }
  }
</script>

<style scoped lang="sass">

  .albums-view
    &__content
      display: flex
      flex-flow: wrap
      padding: 8px

  .media-object
    display: inline-block
    width: 50%
    padding: 7px
    vertical-align: top

  +breakpoint(medium)
    .albums-view
      .media-object
        width: 33%

  +breakpoint(large)
    .albums-view
      .media-object
        width: 25%

  +breakpoint(xlarge)
    .albums-view
      .media-object
        width: 16.66%

</style>
