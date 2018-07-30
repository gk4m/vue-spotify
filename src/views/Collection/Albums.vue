<template>
  <div class="albums-view" v-scroll @vScroll="loadMore">
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
        albums: {
          limit: 25,
          offset: 0,
          total: 1,
          items: []
        },
        isMore: null
      }
    },

    methods: {
      async getAlbums() {
        try {
          if (this.albums.total > this.albums.offset) {
            const response = await api.spotify.library.getAlbums(this.albums.offset, this.albums.limit);

            this.albums.offset = response.data.offset + this.albums.limit;
            this.albums.total = response.data.total;
            this.albums.items.push(...response.data.items);
            this.isMore = false;
          }
        } catch (e) {
          console.log(e)
        }
      },

      async loadMore(ev) {
        if (this.isMore) {
          return false;
        }

        if (ev.detail.scrollbarV.percent > 70) {
          this.isMore = true;
          this.getAlbums();
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
