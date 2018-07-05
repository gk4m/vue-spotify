<template>
  <div id="app" class="app">
    <app-layout v-if="!notFound" />
    <not-found-view v-if="notFound" />
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import AppLayout from '@/layouts/AppLayout'
  import NotFoundView from '@/views/NotFoundView'

  export default {
    name: 'app',

    components: {
      AppLayout,
      NotFoundView
    },

    computed: {
      ...mapGetters({
        notFound: 'app/notFound',
      })
    },

    methods: {
      ...mapActions({
        init: 'app/init',
      })
    },
  }
</script>

<style lang="sass">
  @import styles/app

  .app
    display: flex
    flex-flow: column
    position: absolute
    width: 100%
    min-width: 630px
    height: 100%

</style>
