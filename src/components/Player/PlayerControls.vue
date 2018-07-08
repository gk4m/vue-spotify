<template>
  <div v-if="playback" class="player-controls">
    <button @click="shuffle" :class="classesShuffle" title="Shuffle"></button>
    <button @click="prev" class="player-controls__button icon-previous" title="Previous"></button>
    <template v-if="!context.paused">
      <button @click="pause" class="player-controls__button player-controls__button--pause icon-pause-circle"></button>
    </template>
    <template v-else>
      <button @click="play" class="player-controls__button player-controls__button--play icon-play-circle"></button>
    </template>

    <button @click="next" class="player-controls__button icon-next" title="Next"></button>
    <button @click="repeat" :class="classesRepeat" title="Repeat"></button>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import api from '@/api'

  export default {
    name: 'player-controls',

    computed: {
      ...mapGetters('player', {
        playback: 'getPlayback',
        context: 'getPlaybackContext',
      }),

      classesShuffle() {
        return [
          'player-controls__button',
          'icon-shuffle',
          {
            'player-controls__button--active': this.context.shuffle
          }]
      },

      classesRepeat() {
        return [
          'player-controls__button',
          {
            'icon-repeat': this.context.repeat_mode !== 2,
            'icon-repeat-one': this.context.repeat_mode === 2,
            'player-controls__button--active': this.context.repeat_mode > 0
          }]
      }
    },

    methods: {
      next() {
        api.spotify.player.nextTrack();
      },

      prev() {
        api.spotify.player.previousTrack();
      },

      pause() {
        api.spotify.player.pause();
      },

      play() {
        api.spotify.player.play();
      },

      shuffle() {
        api.spotify.player.shuffle(this.context.shuffle);
      },

      repeat() {
        const states = [
          'off',
          'context',
          'track'
        ];

        const repeatState = this.context.repeat_mode;
        let index = repeatState === 2 ? 0 : repeatState + 1;

        api.spotify.player.repeat(states[index]);
      }
    }
  }
</script>

<style scoped lang="sass">

  .player-controls
    display: flex
    justify-content: center

    &__button
      margin: auto 10px
      color: $c-gray
      font-size: 15px
      cursor: pointer
      outline: none

      &:hover
        color: $c-white

      &--active
        color: $c-green

      &--play,
      &--pause
        font-size: 35px

        &:hover
          color: $c-white
          transform: scale(1.1)

</style>
