<template>
  <div class="update-modal">
    <v-modal :modalName="modalName" width="500px">
      <template slot="header">
        Update Playlist Details
      </template>
      <template slot="body">
        <form class="update-modal__form">
          <div class="update-modal__form-left">
            <v-input-file :cover-url="coverUrl" v-on:onFileChange="onFileChange"/>
          </div>
          <div class="update-modal__form-right">
            <div>
              <label for="name">Name</label>
              <input id="name" name="name" v-model="name" maxlength="100"/>
            </div>
            <div>
              <label for="description">Description</label>
              <textarea id="description" name="description" v-model="description" maxlength="300"></textarea>
            </div>
          </div>
        </form>
      </template>
      <template slot="footer">
        <v-button :onClick="hide" :isBlack="true">Cancel</v-button>
        <v-button :onClick="update">Save</v-button>
      </template>
    </v-modal>
  </div>
</template>

<script>
  import api from '@/api';
  import {mapGetters, mapActions} from 'vuex'
  import VButton from '@/components/VButton'
  import VInputFile from '@/components/VInputFile'
  import VModal from '@/components/VModal'

  export default {
    name: 'playlist-modal',

    components: {
      VButton,
      VInputFile,
      VModal
    },

    data() {
      return {
        modalName: 'playlist-update-modal',
        name: '',
        description: '',
        coverUrl: '',
        coverBase64: '',
      }
    },

    computed: {
      ...mapGetters({
        user: 'user/getProfile',
        playlist: 'playlist/getPlaylist',
      })
    },

    methods: {
      ...mapActions({
        addNotification: 'notification/addNotification',
        getUserPlaylists: 'user/getCurrentUserPlaylists',
        clearUserPlaylistst: 'user/clearUserPlaylistst',
        fetchPlaylist: 'playlist/fetchPlaylist',
      }),

      hide() {
        this.$modal.hide(this.modalName);
      },

      clearForm() {
        this.name = '';
        this.description = '';
      },

      getPlaylistID() {
        let tmp = this.playlist.uri.split(':');
        return tmp[tmp.length - 1];
      },

      onFileChange(file) {
        let reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
          this.coverBase64 = reader.result;
        };
      },

      validate() {
        let valid = true;

        if (!this.name) {
          this.addNotification({
            type: 'error',
            message: 'You must give your playlist a name.',
            duration: 3000
          });

          return false;
        }

        return valid;
      },

      async updateCover() {
        //@to do update cover
        if (this.coverBase64) {
          try {
            let playlistID = this.getPlaylistID();
            await api.spotify.playlists.updatePlaylistCover(this.user.id, playlistID, this.coverBase64);
          } catch (e) {
            console.log(e);
          }
        }
      },

      async update() {
        //this.updateCover();

        if (this.validate()) {
          try {
            let playlistID = this.getPlaylistID();

            await api.spotify.playlists.updatePlaylist(this.user.id, playlistID, this.name, this.description);

            this.fetchPlaylist({userID: this.userID, playlistID});

            this.addNotification({
              type: 'success',
              message: 'Playlist details updated.',
              duration: 2000
            });

          } catch (e) {
            console.log(e);
          }

          this.hide();
        }
      },

      init() {
        this.name = this.playlist.name;
        this.description = this.playlist.description;
        this.coverUrl = '';

        if (this.playlist.images[0]) {
          this.coverUrl = this.playlist.images[0].url;
        }
      }
    },

    watch: {
      playlist() {
        this.init();
      }
    },

    created() {
      this.init();
    }
  }
</script>

<style scoped lang="sass">

  .update-modal
    &__form
      display: flex

    &__form-left
      width: 35%

    &__form-right
      width: 65%

</style>
