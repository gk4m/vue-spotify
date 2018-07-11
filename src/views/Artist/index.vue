<template>
  <div class="artist-view">
    <entity-info
      v-if="artist"
      :coverImg="artist.images"
      :type="artist.type"
      :name="artist.name"
      :uri="artist.uri"
      :followers="artist.followers.total"
    />

    <entity-header title="Albums" :small="true"/>
    <media-container>
      <media-object
        v-for="(item, index) in albums"
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
</template>

<script>
  import api from '@/api'
  import {mapActions} from 'vuex'
  import EntityHeader from '@/components/EntityHeader'
  import EntityInfo from '@/components/EntityInfo';
  import MediaObject from '@/components/MediaObject'
  import MediaContainer from '@/components/MediaContainer'

  export default {
    name: 'artist',

    components: {
      EntityHeader,
      EntityInfo,
      MediaObject,
      MediaContainer
    },

    data() {
      return {
        artist: '',
        albums: '',
        limit: 25,
        offset: 0,
        total: 0
      }
    },

    computed: {
      ...mapActions({
        notFoundPage: 'app/notFoundPage',
      }),

      t() {
        return !!this.artist;
      }
    },

    methods: {
      async getArtist() {
        try {
          const artistID = this.$route.params.id;
          const response = await api.spotify.artists.getArtist(artistID);
          this.artist = response.data;
        } catch (e) {
          this.notFoundPage(true);
        }
      },

      async getArtistAlbums() {
        try {
          const artistID = this.$route.params.id;
          const response = await api.spotify.artists.getArtistAlbums(artistID, 'album,single', this.limit);

          this.albums = response.data.items;
          this.offset = this.albums.offset;
          this.total = this.albums.total;
        } catch (e) {
          console.log(e)
        }
      },

      async loadMore() {

      }
    },

    watch: {
      $route() {
        this.getArtist();
        this.getArtistAlbums();
      }
    },

    created() {
      this.getArtist();
      this.getArtistAlbums();
    },
  }
</script>

<style scoped lang="sass">
  .artist-view
    height: calc(100vh - 227px)
</style>
