<template>
  <div class="playlist-modal">
    <modal name="playlist-modal" width="400px">
      <div class="playlist-modal__header">
        Create Playlist
      </div>
      <div class="playlist-modal__body">
        <form>
          <div class="playlist-modal__name">
            <label for="name">Name</label>
            <input id="name" name="name" v-model="name"/>
          </div>
          <div class="playlist-modal__description">
            <label for="description">Description</label>
            <textarea id="description" name="description" v-model="description"></textarea>
          </div>
        </form>
      </div>
      <div class="playlist-modal__footer">
        <v-button :onClick="hide" :isBlack="true">Cancel</v-button>
        <v-button :onClick="create">Create</v-button>
      </div>
    </modal>
  </div>
</template>

<script>
  import api from '@/api';
  import {mapGetters, mapActions} from 'vuex'
  import VButton from '@/components/VButton'

  export default {
    name: 'playlist-modal',

    components: {
      VButton
    },

    data() {
      return {
        name: 'New Playlist',
        description: ''
      }
    },

    computed: {
      ...mapGetters({
        user: 'user/getProfile',
      })
    },

    methods: {
      ...mapActions({
        addNotification: 'notification/addNotification',
        getUserPlaylists: 'user/getCurrentUserPlaylists',
        clearUserPlaylistst: 'user/clearUserPlaylistst',
      }),

      hide() {
        this.$modal.hide('playlist-modal');
      },

      clearForm(){
        this.name = 'New Playlist';
        this.description = '';
      },

      async create() {
        if (this.name) {
          const response = await api.spotify.playlists.createPlaylist(this.user.id, this.name, this.description);

          this.clearUserPlaylistst();
          this.getUserPlaylists();

          this.$router.push({
            name: 'playlist',
            params: {
              user_id: this.user.id,
              playlist_id: response.data.id
            }
          });

          this.hide();
          this.clearForm();

        } else {
          this.addNotification({
            type: 'error',
            message: 'You must give your playlist a name.',
            duration: 3000
          });
        }
      }
    }
  }
</script>

<style lang="sass">

  .playlist-modal
    color: $c-gray
    font-size: 13px

    &__header
      padding: 10px
      font-weight: bold
      text-align: center
      border-bottom: 1px solid $c-gray
      color: $c-white

    &__body
      padding: 10px 15px

    &__footer
      position: absolute
      bottom: 0
      width: 100%
      padding: 13px
      text-align: center

      .btn
        margin: 0 5px

    .v--modal
      background: $c-shark
      box-shadow: 2px 2px 20px 7px rgba(0, 0, 0, .4)

</style>
