<template>
  <div class="sidebar">
    <div class="sidebar__inner" v-scroll @scrollReachBottom="loadMore">
      <nav-bar :links="browse"/>
      <nav-bar title="Library" :links="library"/>
      <nav-bar title="Playlists" :links="playlists.items"/>
    </div>
    <button class="sidebar__btn" @click="$modal.show('playlist-modal')">
      <icon class="sidebar__btn-icon" name="plus"/>
      <span>New playlist</span>
    </button>
    <!-- @todo cover -->
    <playlist-modal/>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import NavBar from './NavBar'
  import PlaylistModal from "@/components/PlaylistModal"

  export default {
    name: 'sidebar',

    components: {
      PlaylistModal,
      NavBar
    },

    computed: {
      ...mapGetters('user', {
        playlists: 'getPlaylists',
      }),

      browse() {
        return [
          {
            type: 'browse',
            name: 'Browse'
          }
        ]
      },

      library() {
        return [
          {
            type: 'tracks-collection',
            name: 'Songs'
          },
          {
            type: 'albums-collection',
            name: 'Albums'
          }
        ]
      }
    },

    methods: {
      ...mapActions('user', {
        getUserPlaylists: 'getCurrentUserPlaylists',
      }),

      loadMore() {
        this.getUserPlaylists(25)
      },
    },

    created() {
      this.getUserPlaylists();
    }
  }
</script>

<style scoped lang="sass">

  .sidebar
    padding-top: 30px
    background: $c-black

    &__inner
      height: calc(100vh - 232px)

    &__btn
      display: flex
      align-items: center
      position: relative
      height: 50px
      width: 100%
      margin-top: 20px
      padding: 0 15px
      color: $c-gray
      font-size: 14px
      border-top: 1px solid $c-sirocco
      outline: 0
      cursor: pointer

      &:hover
        color: $c-white

    &__btn-icon
      margin: auto 8px

    .nav-bar
      &:not(:last-of-type)
        margin-bottom: 30px

</style>
