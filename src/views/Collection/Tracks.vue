<template>
  <div class="tracks-view" v-scroll @vScroll="loadMore">
    <div class="tracks-view__content">
      <!-- @todo add play button -->
      <entity-header title="Songs" />
      <tracks-table :tracks="tracks.items" type="library" />
    </div>
  </div>
</template>

<script>
  import api from "@/api";
  import EntityHeader from "@/components/EntityHeader";
  import TracksTable from "@/components/TracksTable";

  export default {
    name: "Tracks",

    components: {
      EntityHeader,
      TracksTable
    },

    data() {
      return {
        tracks: {
          limit: 25,
          offset: 0,
          total: 1,
          items: []
        },
        isMore: null
      };
    },

    computed: {},

    methods: {
      async getTracks() {
        try {
          if (this.tracks.total > this.tracks.offset) {
            const response = await api.spotify.library.getTracks(
              this.tracks.offset,
              this.tracks.limit
            );

            this.tracks.offset = response.data.offset + this.tracks.limit;
            this.tracks.total = response.data.total;
            this.tracks.items.push(...response.data.items);
            this.isMore = false;
          }
        } catch (e) {
          console.log(e);
        }
      },

      async loadMore(ev) {
        if (this.isMore) {
          return false;
        }

        if (ev.detail.scrollbarV.percent > 70) {
          this.isMore = true;
          this.getTracks();
        }
      }
    },

    created() {
      this.getTracks();
    }
  };
</script>

<style scoped lang="sass"></style>
