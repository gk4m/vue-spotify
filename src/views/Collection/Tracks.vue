<template>
  <div class="tracks-view" v-scroll @scrollReachBottom="loadMore">
    <div class="tracks-view__content">
      <!-- @todo add play button -->
      <entity-header title="Songs"/>
      <tracks-table :tracks="tracks" type="library"/>
    </div>
  </div>
</template>

<script>
  //@todo GLOBAL: load more item when scroll reach 70%
  import api from '@/api'
  import EntityHeader from '@/components/EntityHeader'
  import TracksTable from '@/components/TracksTable'

  export default {
    name: 'Tracks',

    components: {
      EntityHeader,
      TracksTable
    },

    data() {
      return {
        tracks: '',
        limit: 50,
        offset: 0,
        total: 0
      }
    },

    computed: {},

    methods: {
      async getTracks() {
        try {
          const response = await api.spotify.library.getTracks(0, this.limit);

          this.tracks = response.data.items;
          this.offset = response.data.offset;
          this.total = response.data.total;

        } catch (e) {
          console.log(e);
        }
      },

      async loadMore(){
        try {
          let offset = this.offset + this.limit;

          if (this.total > offset) {
            const response = await api.spotify.library.getTracks(offset, this.limit);

            this.offset = response.data.offset;
            this.tracks.push(...response.data.items);
          }

        } catch (e) {
          console.log(e);
        }
      }
    },

    created() {
      this.getTracks();
    }
  }
</script>

<style scoped lang="sass">

</style>
