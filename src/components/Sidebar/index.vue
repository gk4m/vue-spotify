<template>
  <div class="sidebar">
    <div class="sidebar__inner" v-scroll @scrollReachBottom="loadMore">
      <nav-bar :links="browse"/>
      <nav-bar title="Library" :links="library"/>
      <nav-bar title="Playlists" :links="playlists.items"/>
    </div>
    <!-- @todo cover -->
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import NavBar from './NavBar'

  export default {
    name: 'sidebar',

    components: {
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
        this.getUserPlaylists(10)
      }
    },

    created() {
      this.getUserPlaylists();
    },
  }
</script>

<style scoped lang="sass">

  .sidebar
    padding-top: 30px
    background: $c-black

    .nav-bar
      margin-bottom: 30px

</style>
