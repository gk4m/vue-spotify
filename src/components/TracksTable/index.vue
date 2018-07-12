<template>
  <div class="tracks-table">
    <div class="tracks-table__row tracks-table__row--header">
      <div class="tracks-table__cell tracks-table__cell--playback"></div>
      <div class="tracks-table__cell tracks-table__cell--addition"></div>

      <div class="tracks-table__cell tracks-table__cell--name">
        Title
      </div>

      <div class="tracks-table__cell tracks-table__cell--artist">
        Artist
      </div>

      <div class="tracks-table__cell tracks-table__cell--album">
        Album
      </div>

      <div class="tracks-table__cell tracks-table__cell--added-at">
        <icon name="calendar-alt"/>
      </div>

      <div class="tracks-table__cell tracks-table__cell--duration">
        <icon name="clock"/>
      </div>
    </div>

    <div
      class="tracks-table__row"
      v-for="item in tracks"
      :key="item.track.id"
      :class="isActiveTrack(item.track)"
      :data-id="item.track.id"
    >
      <div class="tracks-table__cell tracks-table__cell--playback">
        <track-playback :trackUri="item.track.uri" :tracksUris="tracksUris"/>
      </div>

      <div class="tracks-table__cell tracks-table__cell--addition">
        <track-addition :trackID="item.track.id" v-on:remove="onTrackRemove"/>
      </div>

      <div class="tracks-table__cell">
        {{item.track.name}}
        <span v-if="item.track.explicit" class="tracks-table__explicit-label">
            Explicit
          </span>
      </div>

      <div class="tracks-table__cell">
        <div>
          <router-link
            class="tracks-table__link"
            v-for="(artist, index) in item.track.artists"
            :key="artist.id"
            :to="{name: 'artist', params:{id: artist.id}}"
          >
            {{artist.name}}
            <template v-if="index !== (item.track.artists.length - 1)">,&nbsp;</template>
          </router-link>
        </div>
      </div>

      <div class="tracks-table__cell">
        <router-link class="tracks-table__link" :to="{name: 'album', params:{id: item.track.album.id}}">
          {{item.track.album.name}}
        </router-link>
      </div>

      <div class="tracks-table__cell tracks-table__cell--added-at">
        {{item.added_at | moment("MM-DD-YYYY")}}
      </div>

      <div class="tracks-table__cell tracks-table__cell--duration">
        {{item.track.duration_ms | msToMinutes}}
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import TrackAddition from '@/components/TrackAddition'
  import TrackPlayback from '@/components/TrackPlayback'

  export default {
    name: 'tracks-table',

    components: {
      TrackAddition,
      TrackPlayback
    },

    props: {
      tracks: {
        required: true,
        default: []
      },
    },

    data() {
      return {
        reverse: false,
        tracksUris: ''
      }
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
      sortBy(sortKey, event) {
        //@todo Add columns sorting
      },

      fetchTrackUris() {
        this.tracksUris = this.tracks.map((el) => {
          return el.track.uri;
        });
      },

      isActiveTrack(current) {
        const isActiveTrack = this.playback.item && this.playback.item.id === current.id;

        return {
          'tracks-table__row--active': isActiveTrack,
          'tracks-table__row--paused': isActiveTrack && this.context && this.context.paused
        }
      },

      onTrackRemove(id) {
        //document.querySelectorAll(`[data-id='${id}']`)[0].remove();
        //@todo remove song from list
      }
    },

    watch: {
      tracks() {
        this.fetchTrackUris();
      }
    }
  }
</script>

<style lang="sass">
  .tracks-table
    display: flex
    flex-flow: column
    padding: 0 15px 20px

    &__link
      color: $c-white

      &:hover
        text-decoration: underline

    &__row
      position: relative
      display: flex
      min-height: 40px
      padding: 5px
      color: $c-white
      font-size: 13px
      line-height: 15px
      border-bottom: 1px solid $c-mine-shaft

      &:hover
        &:not(:first-of-type)
          background: $c-mine-shaft
          color: $c-white

        .tracks-table__explicit-label
          color: $c-white
          border-color: $c-white

        .track-addition__button
          color: $c-white

        .track-playback
          display: block

      &--header
        color: $c-gray
        text-transform: uppercase

      &--active
        background: $c-mine-shaft
        color: $c-green

        .tracks-table__link
          color: $c-green

        .track-playback
          display: block !important

    &__cell
      display: flex
      flex: 1
      align-items: center
      position: relative
      margin-right: 10px

      &--playback
        max-width: 40px

      &--addition
        max-width: 40px

      &--added-at
        max-width: 100px

      &--duration
        max-width: 60px

    &__explicit-label
      float: right
      margin-left: 5px
      padding: 3px
      border: 1px solid $c-gray
      border-radius: 3px
      color: $c-gray
      font-size: 9px
      line-height: 1
      letter-spacing: 1.5px
      text-transform: uppercase

    .track-playback
      display: none

</style>
