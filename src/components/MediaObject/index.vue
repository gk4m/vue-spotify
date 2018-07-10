<template>
  <div v-if="playbackContext" :class="elClass">
    <router-link tag="div" class="media-object__cover" :to="createUrl()">
      <img v-if="coverImg[0]" class="media-object__cover-inner" v-lazy="coverImg[0].url" :alt="name + '-cover'"/>
      <div v-else class="media-object__cover-inner">
          <icon class="media-object__music-icon" name="music" />
      </div>

      <div class="media-object__cover-hover">
        <button class="media-object__play icon-play-circle" @click="onPlay"></button>
        <button class="media-object__sound-on icon-sound-on"></button>
        <button class="media-object__pause icon-pause-circle" @click="onPause"></button>
      </div>
    </router-link>

    <div class="media-object__info">
      <div>
        <router-link class="media-object__name" :to="createUrl()">{{name}}</router-link>
      </div>

      <router-link
        class="media-object__artist"
        v-if="artists"
        v-for="(artist, index) in artists"
        :key="artist.id"
        :to="{name: 'artist', params:{id: artist.id}}">
        {{artist.name}}
        <template v-if="index !== (artists.length - 1)">,&nbsp;</template>
      </router-link>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import {mapGetters} from 'vuex'

  export default {
    name: 'media-object',

    props: {
      id: {
        required: true
      },
      uri: {
        required: true
      },
      coverImg: {
        required: true
      },
      name: {
        type: String,
        required: true
      },
      type: {
        required: true
      },
      artists: {
        required: false
      }
    },

    computed: {
      ...mapGetters(
        'player', {
          playbackContext: 'getPlaybackContext'
        }
      ),

      elClass() {
        return [
          'media-object',
          {
            'media-object--playing': !this.playbackContext.paused && this.playbackContext.context.uri && this.playbackContext.context.uri.indexOf(this.id) >= 0,
            'media-object--active': this.playbackContext.context.uri && this.playbackContext.context.uri.indexOf(this.id) >= 0,
            'media-object--no-image': !this.coverImg[0]
          }
        ]
      },
    },

    methods: {
      createUrl() {
        const chunks = this.uri.split(':');
        let url = null;

        switch (this.type) {
          case 'album':
            url = {name: 'album', params: {id: this.id}};
            break;

          case 'playlist':
            url = {name: 'playlist', params: {user_id: chunks[2], playlist_id: chunks[chunks.length - 1]}};
            break;
        }

        return url;
      },

      onPlay(e) {
        e.stopPropagation();

        if (this.playbackContext.context.uri && this.playbackContext.context.uri.indexOf(this.id) >= 0) {
          api.spotify.player.play();
        } else {
          api.spotify.player.play(this.uri);
        }
      },

      onPause(e) {
        e.stopPropagation();
        api.spotify.player.pause();
      }
    }
  }
</script>

<style scoped lang="sass">

  .media-object
    &:hover
      .media-object__play
        display: block

    &--active
      .media-object__name
        color: $c-green

    &--playing
      .media-object__sound-on
        display: block

      &:hover
        .media-object__pause
          display: block

        .media-object__play,
        .media-object__sound-on
          display: none

    &__pause,
    &__sound-on
      display: none

    &__play,
    &__pause
      font-size: 50px

    &__sound-on
      position: relative
      width: 60px
      height: 60px
      background: rgba(0, 0, 0, .6)
      border-radius: 50%
      font-size: 40px

      &:before
        +absolute-center

    &__play
      display: none

    &__cover
      position: relative
      min-width: 130px
      padding-top: 100%

      &:hover
        .media-object__cover-hover
          background: rgba(0, 0, 0, .6)

    &__cover-inner
      position: absolute
      top: 0
      width: 100%
      height: 100%
      background: $c-gray

    &__cover-hover
      display: block
      position: absolute
      top: 0
      width: 100%
      height: 100%

      button
        +absolute-center
        color: $c-white
        outline: none

    &__info
      margin-top: 5px
      font-size: 14px
      line-height: 20px

    &__name
      color: $c-white
      cursor: pointer

      &:hover
        text-decoration: underline

    &__artist
      color: $c-gray
      text-decoration: none

      &:hover
        color: $c-white
        text-decoration: underline

    &__avatar
      position: relative
      min-width: 130px
      min-height: 130px
      width: 100%
      height: 100%
      background: $c-sirocco

    &__music-icon
      +absolute-center
      width: 40%
      height: 40%

</style>
