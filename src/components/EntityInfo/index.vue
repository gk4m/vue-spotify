<template>
  <div class="entity-info" :class="isPlaying">
    <div class="entity-info__cover" v-if="coverImg[0]">
      <img class="entity-info__cover__img" :src="coverImg[0].url" alt="cover"/>
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
  </div>
</template>

<script>
  import api from '@/api'
  import {mapGetters} from 'vuex'
  import vButton from '@/components/VButton'

  export default {
    name: 'entity-info',

    components: {
      vButton
    },

    props: {
      uri: {
        required: true
      },
      coverImg: {
        type: Array
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
      }
    },

    data() {
      return {}
    },

    computed: {
      ...mapGetters(
        'player', {
          playbackContext: 'getPlaybackContext'
        }
      ),

      isPlaying() {
        return {
          'entity-info--playing': !this.playbackContext.paused && this.playbackContext.context && this.playbackContext.context.uri === this.uri,
        }
      }
    },

    methods: {
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

    &__cover
      width: 40%
      min-width: 150px
      max-width: 200px

      &__img
        width: 100%

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
