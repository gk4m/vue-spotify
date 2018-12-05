<template>
  <div class="search-view">
    search-playlist
  </div>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapActions,
  } from 'vuex'

  export default {
    name: 'search-playlist',

    components: {},

    computed: {
    },

    methods: {
      ...mapActions({
        notFoundPage: 'app/notFoundPage',
      }),
    },
  }
</script>

<style scoped lang="sass">
</style>
