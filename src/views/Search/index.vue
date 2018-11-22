<template>
  <div class="search-view">
    search-view"
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'search-view',

    components: {
    },

    data() {
      return {
      }
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
