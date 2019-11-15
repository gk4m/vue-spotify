<template>
  <div class="track-addition">
    <button
      v-if="!isSaved"
      @click="saveTrack"
      class="track-addition__button"
      title="Save to your library"
    >
      <icon name="plus" />
    </button>
    <button
      v-if="isSaved"
      @click="removeTrack"
      class="track-addition__button track-addition__button--remove"
      title="Remove from your library"
    >
      <icon class="track-addition__check-icon" name="check" />
      <icon class="track-addition__times-icon" name="times" />
    </button>
  </div>
</template>

<script>
  import api from "@/api";
  import { mapGetters, mapActions } from "vuex";

  export default {
    name: "track-addition",

    components: {},

    props: {
      trackID: {
        required: true
      },
      isSaved: {
        default: false
      }
    },

    data() {
      return {};
    },

    computed: {
      ...mapGetters("library", {
        savedTrack: "getSavedTrack",
        removedTrack: "getRemovedTrack"
      })
    },

    methods: {
      ...mapActions("library", {
        saveLastTrack: "saveTrack",
        removeLastTrack: "removeTrack"
      }),

      async saveTrack() {
        try {
          await api.spotify.library.saveTracks([this.trackID]);
          this.saveLastTrack(this.trackID);
        } catch (e) {
          console.log(e);
        }
      },

      async removeTrack() {
        try {
          await api.spotify.library.removeTracks([this.trackID]);
          this.removeLastTrack(this.trackID);
          this.$emit("savedTrackRemove", this.trackID);
        } catch (e) {
          console.log(e);
        }
      }
    },

    watch: {
      savedTrack(val) {
        if (val === this.trackID) {
          this.$emit("updateTrackstatus", val);
        }
      },

      removedTrack(val) {
        if (val === this.trackID) {
          this.$emit("updateTrackstatus", val);
        }
      }
    }
  };
</script>

<style scoped lang="sass">

  .track-addition
    display: inline-block
    line-height: 0

    &__times-icon
      display: none

    &__button
      color: $c-gray
      outline: none

      &:hover
        color: $c-white

      &--remove
        &:hover
          .track-addition__check-icon
            display: none

          .track-addition__times-icon
            display: block

    .fa-icon
      width: 16px
      height: 16px
</style>
