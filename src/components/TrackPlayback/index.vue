<template>
  <div :class="elClass">
    <button class="track-playback__button track-playback__button--sound-on icon-sound-on"></button>
    <button @click="play" class="track-playback__button track-playback__button--play icon-play-circle"></button>
    <button @click="pause" class="track-playback__button track-playback__button--pause icon-pause-circle"></button>
  </div>
</template>

<script>
  import api from '@/api'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'track-playback',

    components: {},

    props: {
      trackUri: {
        required: true
      },

      tracksUris: {
        required: false
      },

      contextUri: {
        required: false
      }
    },

    data() {
      return {}
    },

    computed: {
      ...mapGetters(
        'player', {
          playback: 'getPlayback',
          context: 'getPlaybackContext'
        }),

      elClass() {
        const isActiveTrack = this.playback.item && this.playback.item.uri === this.trackUri;

        return [
          'track-playback',
          {
            'track-playback--active': isActiveTrack,
            'track-playback--paused': isActiveTrack && this.context && this.context.paused
          }
        ]
      }
    },

    methods: {
      play() {
        if (this.playback.item && this.playback.item.uri === this.trackUri) {
          api.spotify.player.play();
        } else {
          api.spotify.player.play(null, {uri: this.trackUri}, this.tracksUris);
        }
      },

      pause() {
        api.spotify.player.pause();
      },
    }
  }
</script>

<style scoped lang="sass">
  .track-playback
    .track-playback__button--play
      display: block

    &--active
      &:hover
        .track-playback__button--play,
        .track-playback__button--sound-on
          display: none

        .track-playback__button--pause
          display: block

      .track-playback__button--play,
      .track-playback__button--pause
        display: none

      .track-playback__button--sound-on
        display: block

    &--paused
      &:hover
        .track-playback__button--pause,
        .track-playback__button--sound-on
          display: none

        .track-playback__button--play
          display: block

    &__button
      display: none
      width: 25px
      height: 25px
      color: $c-gray
      font-size: 25px
      line-height: 1
      outline: 0

      &:hover
        color: $c-white

      &--sound-on
        height: 18px
        color: $c-white
        font-size: 18px

</style>
