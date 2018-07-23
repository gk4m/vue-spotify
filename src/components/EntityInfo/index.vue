<template>
  <div :class="elClass">
    <div class="entity-info__cover">
      <img v-if="coverImg[0]" class="entity-info__cover-img" :src="coverImg[0].url" alt="cover"/>
      <icon class="entity-info__cover-icon" name="music" />
      <div @click="onCoverClick" class="entity-info__cover-hover" title="Edit image">
        <icon class="entity-info__cover-icon" name="pencil-alt" />
      </div>
    </div>

    <div class="entity-info__info">
      <div class="entity-info__type">{{type}}</div>
      <h2 class="entity-info__name">{{name}}</h2>
      <p class="entity-info__desc" v-if="description" v-html="$options.filters.convertURLs(description)"></p>

      <div v-if="artists" class="entity-info__artists">
        By
        <router-link
          class="entity-info__link"
          v-for="(artist, index) in artists"
          :key="index"
          :to="{name: 'artist', params: {id:artist.id}}"
        >
          {{artist.name}}
          <template v-if="index !== (artists.length-1)">,&nbsp;</template>
        </router-link>
      </div>

      <div v-if="author" class="entity-info__author">Author: {{author}}</div>
      <v-button :onClick="onPlay" class="entity-info__action entity-info__action--play">Play</v-button>
      <v-button :onClick="onPause" class="entity-info__action entity-info__action--pause">Pause</v-button>
    </div>

    <div v-if="followers" class="entity-info__followers">
      <div>Followers</div>
      {{ followers}}
    </div>
    <playlist-update-modal  v-if="ownerID === user.id && type === 'playlist'"/>
  </div>
</template>

<script>
  import api from '@/api'
  import {mapGetters} from 'vuex'
  import vButton from '@/components/VButton'
  import PlaylistUpdateModal from "@/components/PlaylistUpdateModal"

  export default {
    name: 'entity-info',

    components: {
      vButton,
      PlaylistUpdateModal
    },

    props: {
      uri: {
        required: true
      },
      coverImg: {
        type: Array,
        required: false
      },
      type: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: false
      },
      author: {
        type: String,
        required: false
      },
      artists: {
        type: Array,
        required: false
      },
      followers: {
        type: [Number, String],
        required: false
      },
      ownerID: {
        type: String,
        required: false
      }
    },

    data() {
      return {}
    },

    computed: {
      ...mapGetters({
        playbackContext: 'player/getPlaybackContext',
        user: 'user/getProfile',
      }),

      elClass() {
        return [
          'entity-info',
          {
            'entity-info--editable': this.ownerID === this.user.id && this.type === 'playlist',
            'entity-info--playing': !this.playbackContext.paused && this.playbackContext.context && this.playbackContext.context.uri === this.uri,
          }]
      }
    },

    methods: {
      onCoverClick() {
        this.$modal.show('playlist-update-modal');
      },

      onPlay(e) {
        e.stopPropagation();
        if (this.playbackContext.context.uri === this.uri) {
          api.spotify.player.play();
        } else {
          api.spotify.player.play(this.uri);
        }
      },

      onPause(e) {
        e.stopPropagation();
        api.spotify.player.pause();
      }
    },
  }
</script>

<style lang="sass">

  .entity-info
    display: flex
    position: relative
    padding: 15px
    font-size: 12px

    &--playing
      .entity-info__action--play
        display: none

      .entity-info__action--pause
        display: block

    &--editable
      .entity-info__cover
        &:hover
          > .entity-info__cover-icon
            display: none

          .entity-info__cover-hover
            display: block

    &__cover
      position: relative
      width: 40%
      min-width: 150px
      max-width: 200px
      background: $c-mine-shaft
      box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, .4)

    &__cover-img
      position: relative
      z-index: 2
      width: 100%
      height: 100%

    &__cover-icon
      +absolute-center
      width: 40%
      height: 40%

    &__cover-hover
      display: none
      position: absolute
      top: 0
      z-index: 10
      width: 100%
      height: 100%
      background: rgba(0,0,0, 0.7)
      cursor: pointer

    &__info
      display: flex
      flex-direction: column
      justify-content: flex-end
      width: 60%
      padding: 15px 15px 0

    &__type
      font-size: 11px
      text-transform: uppercase

    &__name
      margin: 10px 0
      font-size: 30px

    &__desc
      color: $c-gray

    &__artists
      color: $c-gray

    &__action
      width: 130px
      margin: 15px 0 0

      &--pause
        display: none

    &__followers
      display: block !important
      position: absolute
      right: 15px
      bottom: 15px
      color: $c-gray
      line-height: 15px
      text:
        align: right
        transform: uppercase

    &__link,
    a
      color: $c-white

      &:hover
        text-decoration: underline

</style>
