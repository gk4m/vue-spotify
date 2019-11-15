<template>
  <div class="sidebar-nav">
    <h2 v-if="title" class="sidebar-nav__title">
      {{ title }}
    </h2>
    <ul>
      <router-link
        tag="li"
        class="sidebar-nav__item"
        active-class="sidebar-nav__item--active"
        v-for="(link, index) in links"
        :key="index"
        :to="createRoute(link)"
      >
        {{ link.name }}
        <button
          v-if="
            playbackContext.context && playbackContext.context.uri === link.uri
          "
          class="sidebar-nav__playing-icon icon-sound-on"
        ></button>
      </router-link>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "sidebar-nav",

    props: {
      title: {
        type: String,
        required: false
      },
      links: {
        type: Array,
        required: true,
        default: () => []
      }
    },

    computed: {
      ...mapGetters("player", {
        playbackContext: "getPlaybackContext"
      })
    },

    methods: {
      createRoute(item) {
        let to = { name: item.type };

        switch (item.type) {
          case "playlist": {
            Object.assign(to, {
              params: { user_id: item.owner.id, playlist_id: item.id }
            });
            break;
          }
        }

        return to;
      }
    }
  };
</script>

<style scoped lang="sass">

  .sidebar-nav
    padding-right: 10px
    color: $c-gray
    font-size: 14px

    &__title
      padding-left: 23px
      font:
        size: 12px
        weight: normal
      text-transform: uppercase
      letter-spacing: 1px

    &__item
      position: relative
      margin-bottom: 10px
      padding:
        left: 23px
        right: 20px
      cursor: pointer

      &:hover
        color: $c-white

      &--active
        color: $c-white

        &:before
          position: absolute
          left: 0
          height: 100%
          border-left: 4px solid $c-green
          content: ''

    &__playing-icon
      position: absolute
      right: 3px
      top: 0
      color: $c-white
      outline: none
</style>
