<template>
  <div class="volume-bar">
    <button :class="classesButton" @click="onButtonClick"></button>
    <vue-slider
      class="volume-bar__slider"
      v-model="volume"
      v-on:drag-start="onDragStart"
      v-on:callback="onSliderChange"
      v-on:drag-end="onDragEnd"
      :tooltip="false"
      :dot-size="15"
      :process-style="{'background': '#1db954'}"
      :bg-style="{'background': '#737575', 'width': '80px'}"
    >
    </vue-slider>
  </div>
</template>

<script>
  import api from '@/api'
  import {mapGetters} from 'vuex'

  export default {
    name: 'volume-bar',

    data() {
      return {
        volume: 0,
        tmpVolume: 0,
        dragStartVolume: 0
      }
    },

    computed: {
      ...mapGetters('player', {
        playback: 'getPlayback',
      }),

      classesButton() {
        return [
          'volume-bar__button',
          {
            'icon-sound-on': this.volume,
            'icon-sound-off': !this.volume,
          }
        ]
      }
    },

    methods: {
      setVolume(val) {
        try {
          api.spotify.player.volume(val);
        } catch (e) {
          console.log(e);
        }
      },

      onButtonClick() {
        if (this.volume > 0) {
          this.tmpVolume = this.volume;
          this.volume = 0;
        } else {
          this.volume = this.tmpVolume;
        }

        this.setVolume(this.volume);
      },

      onDragStart({currentValue}) {
        this.dragStartVolume = currentValue;
      },

      onDragEnd({currentValue}) {
        this.setVolume(currentValue);
      },

      onSliderChange(currentValue) {
        const diff = Math.abs(this.dragStartVolume - currentValue);

        if (diff >= 10) {
          this.dragStartVolume = currentValue;
          this.setVolume(currentValue);
        }
      }
    },

    watch: {
      playback(obj) {
        this.volume = obj.device.volume_percent;
      }
    },

    mounted() {
      this.volume = this.playback.device.volume_percent;
    }
  }
</script>

<style lang="sass">
  .volume-bar
    display: flex

    &__button
      margin-right: 5px
      color: $c-gray
      cursor: pointer
      outline: none

      &:hover
        color: $c-white

</style>
