<template>
  <div class="search-view">
    search-artist-view
  </div>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapActions,
  } from 'vuex'

  export default {
    name: 'search-artist-view',

    components: {},

    computed: {
      ...mapState('search', [
        'isLoading',
        'result',
        'error',
      ]),
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
