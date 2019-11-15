<template>
  <div v-scroll @vScroll="loadMore($event, tracks.next, getTracks)">
    <tracks-list :tracks="tracks.items" />
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";

  import { loadMore } from "@/mixins";
  import TracksList from "@/components/TracksList";

  export default {
    name: "search-playlist-view",

    mixins: [loadMore],

    components: {
      TracksList
    },

    computed: {
      ...mapState("search", ["tracks"])
    },

    methods: {
      ...mapActions({
        getTracks: "search/getTracks"
      })
    }
  };
</script>
