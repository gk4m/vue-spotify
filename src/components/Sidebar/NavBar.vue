<template>
  <div class="nav-bar">
    <h2 v-if="title" class="nav-bar__title">{{title}}</h2>
    <ul>
      <router-link
        exact
        tag="li"
        class="nav-bar__item"
        active-class="nav-bar__item--active"
        v-for="(link, index) in links"
        :key="index"
        :to="createRoute(link)"
      >
        {{link.name}}
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'nav-bar',

    props: {
      title: {
        type: String,
        required: false
      },
      links: {
        required: true
      }
    },

    methods: {
      createRoute(item) {
        let to = {name: item.type};

        switch (item.type) {
          case 'playlist': {
            Object.assign(to, {params: {user_id: item.owner.id, playlist_id: item.id}});
            break;
          }
        }

        return to;
      }
    }
  }
</script>

<style scoped lang="sass">
  .nav-bar
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
      padding-left: 23px
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

</style>
