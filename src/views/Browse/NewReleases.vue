<template>
  <div class="new-releases-view" v-scroll @scrollReachBottom="loadMore">
    <entity-header title="New albums & singles" :small="true"/>
    <div class="new-releases-view__inner">
      <media-object
        v-for="(item, index) in albums.items"
        :key="index"
        :id="item.id"
        :uri="item.uri"
        :coverImg="item.images[1].url"
        :name="item.name"
        :artists="item.artists"
      />
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import MediaObject from '@/components/MediaObject'
  import EntityHeader from '@/components/EntityHeader'

  export default {
    name: 'new-releases',

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

      async loadMore(a) {
        console.log(a);
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

    &__inner
      padding: 0 15px 0 8px

    .media-object
      display: inline-block
      width: 50%
      padding: 7px
      vertical-align: top

  +breakpoint(medium)
    .new-releases-view
      .media-object
        width: 33%

  +breakpoint(large)
    .new-releases-view
      .media-object
        width: 25%

  +breakpoint(xlarge)
    .new-releases-view
      .media-object
        width: 16.66%

</style>
