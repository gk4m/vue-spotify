<template>
  <div class="albums-view" v-scroll @scrollReachBottom="loadMore">
    <entity-header title="Albums"/>
    <div class="albums-view__content">
      <media-container>
        <media-object
          v-for="(item, index) in albums.items"
          :key="index"
          :id="item.album.id"
          :uri="item.album.uri"
          :coverImg="item.album.images"
          :name="item.album.name"
          :artists="item.album.artists"
          :type="item.album.type"
        />
      </media-container>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import EntityHeader from '@/components/EntityHeader'
  import MediaObject from '@/components/MediaObject'
  import MediaContainer from '@/components/MediaContainer'

  export default {
    name: 'Albums',

    components: {
      MediaObject,
      EntityHeader,
      MediaContainer
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

</style>
