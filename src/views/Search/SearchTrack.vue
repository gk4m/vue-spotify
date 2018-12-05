<template>
  <div class="search-view">
    search-track-view
  </div>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapActions,
  } from 'vuex'

  export default {
    name: 'search-track-view',

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
