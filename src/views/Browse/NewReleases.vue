<template>
  <div class="new-releases-view" v-scroll @scrollReachBottom="loadMore">
    <entity-header title="New albums & singles" :small="true"/>
    <div class="new-releases-view__inner">
      <media-container>
        <media-object
          v-for="(item, index) in albums.items"
          :key="index"
          :id="item.id"
          :uri="item.uri"
          :coverImg="item.images"
          :name="item.name"
          :artists="item.artists"
          :type="item.type"
        />
      </media-container>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import MediaObject from '@/components/MediaObject'
  import EntityHeader from '@/components/EntityHeader'
  import MediaContainer from '@/components/MediaContainer'

  export default {
    name: 'new-releases',

    components: {
      EntityHeader,
      MediaObject,
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

    computed: {},

    methods: {
      async getNewReleases() {
        try {
          const response = await api.spotify.browse.getNewReleases(0, this.limit);

          this.albums = response.data.albums;
          this.offset = response.data.albums.offset;
          this.total = response.data.albums.total;

        } catch (e) {
          console.log(e)
        }
      },

      async loadMore() {
        try {
          let offset = this.offset + this.limit;

          if (this.total > offset) {
            const response = await api.spotify.browse.getNewReleases(offset, this.limit);

            this.offset = response.data.albums.offset;
            this.total = response.data.albums.total;
            this.albums.items.push(...response.data.albums.items);

          }
        } catch (e) {
          console.log(e)
        }
      }
    },

    created() {
      this.getNewReleases()
    }
  }
</script>

<style scoped lang="sass">

  .new-releases-view
    height: calc(100vh - 227px)

</style>
