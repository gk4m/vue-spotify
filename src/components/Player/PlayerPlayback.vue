<template>
  <div class="player-playback" v-if="context">
    <div class="player-playback__time">{{progress | msToMinutes}}</div>
    <div class="player-playback__progress-bar">
      <vue-slider
        v-model="progress"
        v-on:drag-start="onDragStart"
        v-on:callback="onProgressChange"
        v-on:drag-end="onDragEnd"
        :max="songDuration"
        :tooltip="false"
        :dot-size="15"
        :process-style="{'background': '#1db954'}"
        :bg-style="{'background': '#737575'}"
      />
    </div>
    <div class=" player-playback__time">{{songDuration | msToMinutes}}</div>
  </div>
</template>

<script>
  import api from '@/api'
  import {mapGetters} from 'vuex'

  export default {
    name: 'player-player-playback',

    data() {
      return {
        progress: 0,
        progressInterval: null,
        isDragStart: false,
        songDuration: 0
      }
    },

    computed: {
      ...mapGetters('player', {
        playback: 'getPlayback',
        context: 'getPlaybackContext',
        isPlaying: 'isPlaying',
      })
    },

    methods: {
      updateProgress() {
        clearInterval(this.progressInterval);
        this.progress = this.context.position;

        if (!this.context.paused) {
          this.progressInterval = setInterval(() => {
            if (this.playback && ((this.progress + 1000) <= this.songDuration)) {
              this.progress = this.progress + 1000;
            }
          }, 1000);
        }
      },

      onDragStart({currentValue}) {
        this.isDragStart = true;
      },

      onDragEnd({currentValue}) {
        this.isDragStart = false;
        api.spotify.player.seekToPosition(currentValue);
      },

      onProgressChange(currentValue) {
        if (!this.isDragStart) {
          this.isDragStart = false;
          api.spotify.player.seekToPosition(currentValue);
        }
      }
    },

    watch: {
      playback() {
        this.songDuration = this.playback.item.duration_ms
      },

      context() {
        this.progress = this.context.position;
      },

      isPlaying() {
        this.updateProgress();
      }
    },

    created() {
      this.updateProgress();
      this.songDuration = this.playback.item.duration_ms;
    }
  }
</script>

<style lang="sass">

  .player-playback
    display: flex
    width: 100%

    &__time
      min-width: 40px

    &__progress-bar
      width: 100%

</style>
