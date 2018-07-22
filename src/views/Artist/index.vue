<template>
  <div class="artist-view" v-scroll @vScroll="loadMore">
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

      <entity-header v-if="albums" title="Albums" :small="true"/>
      <media-container>
        <media-object
          v-if="albums"
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
        tracks: '',
        albums: null,
        more: null
      }
    },

    computed: {},

    methods: {
      ...mapActions({
        notFoundPage: 'app/notFoundPage',
      }),

      initData() {
        this.artist = '';
        this.tracks = '';
        this.albums = {
          limit: 25,
          offset: 0,
          total: 1,
          items: []
        };
      },

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
          if (this.albums.total > this.albums.offset) {
            const artistID = this.$route.params.id;
            const response = await api.spotify.artists.getArtistAlbums(artistID, 'album,single', this.albums.offset, this.albums.limit);

            this.albums.offset = response.data.offset + this.albums.limit;
            this.albums.total = response.data.total;
            this.albums.items.push(...response.data.items);
            this.more = false;
          }
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

      async loadMore(ev) {
        if (this.more) {
          return false;
        }

        if (ev.detail.scrollbarV.percent > 70) {
          this.more = true;
          this.getArtistAlbums();
        }
      }
    },

    watch: {
      $route() {
        this.initData();
        this.getArtist();
        this.getArtistAlbums();
        this.getArtistTopTracks();
      }
    },

    created() {
      this.initData();
      this.getArtist();
      this.getArtistAlbums();
      this.getArtistTopTracks();
    },
  }
</script>

<style scoped lang="sass">
</style>
