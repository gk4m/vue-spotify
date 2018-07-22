<template>
  <div class="playlist-create-modal">
    <v-modal :modalName="modalName">
      <template slot="header">
        Create Playlist
      </template>
      <template slot="body">
        <form>
          <div>
            <label for="name">Name</label>
            <input id="name" name="name" v-model="name"/>
          </div>
          <div>
            <label for="description">Description</label>
            <textarea id="description" name="description" v-model="description"></textarea>
          </div>
        </form>
      </template>
      <template slot="footer">
        <v-button :onClick="hide" :isBlack="true">Cancel</v-button>
        <v-button :onClick="create">Create</v-button>
      </template>
    </v-modal>
  </div>
</template>

<script>
  import api from '@/api';
  import {mapGetters, mapActions} from 'vuex'
  import VButton from '@/components/VButton'
  import VModal from '@/components/VModal'

  export default {
    name: 'playlist-modal',

    components: {
      VButton,
      VModal
    },

    data() {
      return {
        modalName: 'playlist-create-modal',
        name: '',
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
        this.$modal.hide(this.modalName);
      },

      clearForm(){
        this.name = '';
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
      },
    }
  }
</script>

<style lang="sass">

</style>
