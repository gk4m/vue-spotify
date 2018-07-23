<template>
  <div class="player">
    <div v-if="playback" class="player__inner">
      <current-track class="player__left"/>

      <div class="player__center">
        <player-controls/>
        <player-playback/>
      </div>

      <div class="player__right">
        <device-picker/>
        <volume-bar/>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import VolumeBar from './VolumeBar'
  import CurrentTrack from './CurrentTrack'
  import PlayerControls from './PlayerControls'
  import PlayerPlayback from './PlayerPlayback'
  import DevicePicker from './DevicePicker'

  export default {
    name: 'player',

    components: {
      VolumeBar,
      CurrentTrack,
      PlayerControls,
      PlayerPlayback,
      DevicePicker
    },

    computed: {
      ...mapGetters('player', {
        playback: 'getPlayback',
      })
    }
  }
</script>

<style scoped lang="sass">

  .player
    position: fixed
    bottom: 0
    width: 100%
    height: 90px
    z-index: 1
    background: $c-shark

    &__inner
      display: flex
      align-items: center
      height: 100%

    &__left
      width: 30%
      min-width: 180px

    &__right
      display: flex
      width: 30%
      min-width: 180px

      .device-picker
        margin: 2px 5px 0 auto

      .volume-bar
        margin: 0 15px 0 5px

    &__center
      width: 60%


</style>
