<template>
  <div class="artist-view" v-scroll>
    <div class="artist-view__content">
      <entity-info
        v-if="artist"
        :coverImg="artist.images"
        :type="artist.type"
        :name="artist.name"
        :uri="artist.uri"
        :followers="artist.followers.total"
      />

      <entity-header title="Popular" :small="true"/>
      <tracks-list :tracks="tracks"/>

      <entity-header title="Albums" :small="true"/>
      <media-container>
        <media-object
          v-if="albums"
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
  </div>
</template>

<script>
  import api from '@/api'
  import {mapActions} from 'vuex'
  import EntityHeader from '@/components/EntityHeader'
  import EntityInfo from '@/components/EntityInfo';
  import MediaObject from '@/components/MediaObject'
  import MediaContainer from '@/components/MediaContainer'
  import TracksList from '@/components/TracksList'

  export default {
    name: 'artist',

    components: {
      EntityHeader,
      EntityInfo,
      MediaObject,
      MediaContainer,
      TracksList
    },

    data() {
      return {
        artist: '',
        albums: '',
        tracks: '',
        limit: 25,
        offset: 0,
        total: 0
      }
    },

    computed: {
      ...mapActions({
        notFoundPage: 'app/notFoundPage',
      }),
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

      async getArtistTopTracks() {
        try {
          const artistID = this.$route.params.id;
          const response = await api.spotify.artists.getArtistTopTracks(artistID, 'PL');

          this.tracks = response.data.tracks;
        } catch (e) {
          console.log(e)
        }
      },

      async loadMore() {

      }
    },

    watch: {
      $route() {
        this.albums = '';
        this.artist = '';
        this.tracks = '';

        this.getArtist();
        this.getArtistAlbums();
        this.getArtistTopTracks();
      }
    },

    created() {
      this.getArtist();
      this.getArtistAlbums();
      this.getArtistTopTracks();
    },
  }
</script>

<style scoped lang="sass">
</style>
