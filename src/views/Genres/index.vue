<template>
  <div class="genres-view" v-scroll @vScroll="loadMore">
    <entity-header :title="title" />
    <media-container>
      <media-object
        v-for="(item, index) in playlists.items"
        :key="index"
        :id="item.id"
        :uri="item.uri"
        :coverImg="item.images"
        :name="item.name"
        :type="item.type"
      />
    </media-container>
  </div>
</template>

<script>
  import api from '@/api'
  import {mapActions} from 'vuex'
  import EntityHeader from '@/components/EntityHeader'
  import MediaObject from '@/components/MediaObject'
  import MediaContainer from '@/components/MediaContainer'

  export default {
    name: 'genres',

    components: {
      EntityHeader,
      MediaObject,
      MediaContainer
    },

    data() {
      return {
        categoryID: null,
        playlists: {
          limit: 25,
          offset: 0,
          total: 1,
          items: []
        },
        isMore: false
      }
    },

    computed: {
      title(){
        return `${this.categoryID.replace('_',' ')} playlists`
      }
    },

    methods: {
      ...mapActions({
        notFoundPage: 'app/notFoundPage',
      }),

      async getCategoryPlaylists(categoryID) {
        try {
          if (this.playlists.total > this.playlists.offset) {
            const response = await api.spotify.browse.getCategoryPlaylists(categoryID, this.playlists.offset, this.playlists.limit);

            const playlists = response.data.playlists;

            this.playlists.offset = playlists.offset + this.playlists.limit;
            this.playlists.total = playlists.total;
            this.playlists.items.push(...playlists.items);
            this.isMore = false;
          }
        } catch (e) {
          this.notFoundPage(true)
        }
      },

      async loadMore(ev) {
        if (this.isMore) {
          return false;
        }

        if (ev.detail.scrollbarV.percent > 70) {
          this.isMore = true;
          this.getCategoryPlaylists(this.categoryID);
        }
      }
    },

    created() {
      const {id} = this.$route.params;
      this.categoryID = id;
      this.getCategoryPlaylists(id);
    },
  }
</script>

<style lang="sass">
  .genres-view
    .entity-header__title
      &:first-letter
        text-transform: uppercase

</style>
