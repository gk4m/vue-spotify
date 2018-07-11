<template>
  <div class="tracks-list">
    <div
      v-for="(item, index) in tracks"
      :key="index"
      class="tracks-list__row"
      :class="isActiveTrack(item)"
    >
      <div class="tracks-list__cell">
        <img class="tracks-list__img" :src="item.album.images[2].url" :alt="item.album.name"/>
      </div>

      <div class="tracks-list__cell tracks-list__cell--index">
        {{index + 1}}
      </div>

      <!--<div class="tracks-list__cell">-->
      <!--<button class="tracks-list__playback-btn tracks-list__playback-btn&#45;&#45;sound-on icon-sound-on"></button>-->
      <!--<button class="tracks-list__playback-btn tracks-list__playback-btn&#45;&#45;play icon-play-circle"></button>-->
      <!--<button class="tracks-list__playback-btn tracks-list__playback-btn&#45;&#45;pause icon-pause-circle"></button>-->
      <!--</div>-->

      <div class="tracks-list__cell">
        <track-save :trackID="item.id"/>
      </div>

      <div class="tracks-list__cell tracks-list__cell--name">
        {{item.name}}
      </div>

      <div class="tracks-list__cell tracks-list__cell--duration">
        {{item.duration_ms | msToMinutes}}
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import {mapGetters} from 'vuex'
  import TrackSave from '@/components/TrackSave'

  export default {
    name: 'tracks-list',

    components: {
      TrackSave
    },

    props: {
      tracks: {
        required: true
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
        }
      )
    },

    methods: {
      isActiveTrack(current) {
        const isActiveTrack = this.playback.item && this.playback.item.id === current.id;

        return {
          'tracks-list__row--active': isActiveTrack,
          'tracks-list__row--paused': isActiveTrack && this.context && this.context.paused
        }
      }
    },

    watch: {},

    mounted() {
    }
  }
</script>

<style lang="sass">
  .tracks-list
    padding: 0 15px

    &__row
      position: relative
      display: flex
      color: $c-white
      font-size: 13px
      line-height: 15px
      border-bottom: 1px solid $c-mine-shaft

      &:first-of-type
        border-top: 1px solid $c-mine-shaft

      &:hover
        &:not(.tracks-list__row--active)
          background: $c-mine-shaft
          color: $c-white

        .track-save__button
          color: $c-white

      &--active
        background: $c-mine-shaft
        color: $c-green

    &__cell
      display: flex
      align-items: center

      &:not(:first-of-type)
        margin: 0 8px

      &--index
        min-width: 35px

      &--name
        width: 100%

    &__img
      width: 40px
      height: 40px

</style>
