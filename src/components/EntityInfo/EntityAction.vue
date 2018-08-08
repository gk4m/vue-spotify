<template>
  <div :class="elClass">
    <v-button :onClick="onPlay" class="entity-action__btn entity-action__btn--play">Play</v-button>
    <v-button :onClick="onPause" class="entity-action__btn entity-action__btn--pause">Pause</v-button>
    <v-button :onClick="onFollow" class="entity-action__btn entity-action__btn--follow" isBlack="true">Follow</v-button>
    <v-button :onClick="onUnfollow" class="entity-action__btn entity-action__btn--unfollow" isBlack="true">Unfollow
    </v-button>
  </div>
</template>

<script>
  import api from '@/api'
  import {mapGetters, mapActions} from 'vuex'
  import vButton from '@/components/VButton'

  export default {
    name: 'entity-action',

    components: {
      vButton
    },

    props: {
      uri: {
        type: String,
        required: true
      },
      playlistID: {
        type: String,
        required: true
      },
      ownerID: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    },

    data() {
      return {
        isFollowing: false
      }
    },

    computed: {
      ...mapGetters({
        user: 'user/getProfile',
        playbackContext: 'player/getPlaybackContext',
      }),

      elClass() {
        return [
          'entity-action',
          {
            'entity-action--playing': !this.playbackContext.paused && this.playbackContext.context && this.playbackContext.context.uri === this.uri,
            'entity-action--following': this.isFollowing
          }
        ]
      }
    },

    methods: {
      ...mapActions({
        getUserPlaylists: 'user/getCurrentUserPlaylists',
        clearUserPlaylists: 'user/clearUserPlaylists',
      }),

      onPlay() {
        if (this.playbackContext.context.uri === this.uri) {
          api.spotify.player.play();
        } else {
          api.spotify.player.play(this.uri);
        }
      },

      onPause() {
        api.spotify.player.pause();
      },

      async onFollow() {
        try {
          await api.spotify.follow.followPlaylist(this.ownerID, this.playlistID);
          this.isFollowing = !this.isFollowing;

          this.clearUserPlaylists();
          this.getUserPlaylists();

        } catch (e) {
          console.log(e);
        }
      },

      async onUnfollow() {
        try {
          await api.spotify.follow.unfollowPlaylist(this.ownerID, this.playlistID);
          this.isFollowing = !this.isFollowing;

          this.clearUserPlaylists();
          this.getUserPlaylists();

        } catch (e) {
          console.log(e);
        }
      },

      async checkIfUserFollowPlaylist(owner_id, playlist_id, ids) {
        try {
          const response = await api.spotify.follow.checkIfUserFollowPlaylist(owner_id, playlist_id, ids);
          this.isFollowing = response.data[0];
        } catch (e) {
          console.log(e);
        }
      },

      init() {
        this.isFollowing = null;
        this.checkIfUserFollowPlaylist(this.ownerID, this.playlistID, this.user.id)
      }
    },

    watch: {
      $route() {
        this.init()
      }
    },

    created() {
      this.init();
    }
  }
</script>

<style lang="sass" scoped>

  .entity-action
    display: flex
    padding: 15px 0 10px

    &--playing
      .entity-action__btn--play
        display: none

      .entity-action__btn--pause
        display: block

    &--following
      .entity-action__btn--follow
        display: none

      .entity-action__btn--unfollow
        display: block

    &__btn
      margin-right: 10px

      &--pause,
      &--unfollow
        display: none

</style>
