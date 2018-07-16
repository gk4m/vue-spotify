<template>
  <div v-if="playback" class="current-track">
    <div class="current-track__cover">
      <router-link :to="createUrlForCover(playback.context)">
        <img class="current-track__img" :src="playback.item.album.images[2].url"/>
      </router-link>
    </div>

    <div class="current-track__info">
      <router-link class="current-track__name" :to="{name: 'album', params:{id: playback.item.album.id}}">
        {{playback.item.name}}
      </router-link>

      <track-addition :trackID="currentTrackID" :isSaved="isSavedTrack" v-on:updateTrackstatus="onTrackUpdate"/>

      <div class="current-track__artists">
        <router-link
          class="current-track__link"
          v-for="(artist, index) in playback.item.artists"
          :key="index"
          :to="{name: 'artist', params: {id:artist.id}}"
        >
          {{artist.name}}
          <template v-if="index !== (playback.item.artists.length-1)">,&nbsp;</template>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import {mapGetters} from 'vuex'
  import TrackAddition from '@/components/TrackAddition'

  export default {
    name: 'current-track',

    components: {
      TrackAddition
    },

    computed: {
      ...mapGetters('player', {
        playback: 'getPlayback',
      }),
    },

    data() {
      return {
        currentTrackID: '',
        isSavedTrack: false
      }
    },

    methods: {
      async checkSavedTrack(id) {
        try {
          const response = await api.spotify.library.checkUserSavedTracks(id);
          this.isSavedTrack = response.data[0];
        } catch (e) {
          console.log(e);
        }
      },

      createUrlForCover(context) {
        if (context) {
          const chunks = context.uri.split(':');
          let route = {name: context.type};

          switch (context.type) {
            case 'playlist':
              Object.assign(route, {params: {user_id: chunks[2], playlist_id: chunks[chunks.length - 1]}});
              break;

            case 'album':
            case 'artist':
              Object.assign(route, {params: {id: chunks[chunks.length - 1]}});
              break;
          }

          return route;
        } else {
          return {}
        }
      },

      onTrackUpdate(id) {
        this.checkSavedTrack(id);
      }
    },

    watch: {
      playback() {
        if (this.currentTrackID !== this.playback.item.id) {
          this.currentTrackID = this.playback.item.id;
        }

        this.checkSavedTrack(this.currentTrackID);
      }
    },

    created() {
      this.currentTrackID = this.playback.item.id;
      this.checkSavedTrack(this.currentTrackID);
    }
  }
</script>

<style lang="sass">

  .current-track
    display: flex
    align-items: center

    &__cover
      width: 56px
      min-width: 56px
      height: 56px
      margin: 0 15px

    &__img
      width: 100%

    &__info
      position: relative
      overflow: hidden
      padding-right: 20px
      white-space: nowrap
      text-overflow: ellipsis

      .track-addition
        position: absolute
        right: 0
        top: 2px

    &__name
      color: $c-white
      font-size: 14px

      &:hover
        text-decoration: underline

    &__artists
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
      padding: 5px 0
      font-size: 11px

    &__link
      color: $c-gray

      &:hover
        color: $c-white
        text-decoration: underline

</style>
