<template>
  <div class="sidebar">
    <div class="sidebar__inner" v-scroll @scrollReachBottom="loadMore">
      <sidebar-nav :links="browse"/>
      <sidebar-nav title="Library" :links="library"/>
      <sidebar-nav title="Playlists" :links="playlists.items"/>
    </div>
    <button class="sidebar__btn" @click="$modal.show('playlist-create-modal')">
      <icon class="sidebar__btn-icon" name="plus"/>
      <span>New playlist</span>
    </button>
    <!-- @todo cover -->
    <playlist-create-modal />
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import SidebarNav from './SidebarNav'
  import PlaylistCreateModal from "@/components/PlaylistCreateModal"

  export default {
    name: 'sidebar',

    components: {
      PlaylistCreateModal,
      SidebarNav
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
          },
          {
            type: 'artists-collection',
            name: 'Artists'
          }
        ]
      }
    },

    methods: {
      ...mapActions('user', {
        getUserPlaylists: 'getCurrentUserPlaylists',
      }),

      loadMore() {
        //@todo
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
    position: relative
    padding-top: 30px
    background: $c-black

    &__inner
      max-height: calc(100vh - 232px)

    &__btn
      display: flex
      align-items: center
      position: absolute
      bottom: 90px
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

    .sidebar-nav
      &:not(:last-of-type)
        margin-bottom: 30px

</style>
