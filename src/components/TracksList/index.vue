<template>
  <div class="tracks-list">
    tracks-list
  </div>
</template>

<script>
  import api from '@/api'

  import {mapGetters} from 'vuex'

  export default {
    name: 'tracks-list',

    components: {},

    props: {
    },

    data() {
      return {
      }
    },

    computed: {
      ...mapGetters(
        'player', {
          playback: 'getPlayback',
          context: 'getPlaybackContext'
        }
      )
    },

    methods: {
    },

    watch: {
    },

    mounted() {
    }
  }
</script>

<style scoped lang="sass">

</style>
