<template>
  <nav class="nav-view">
    <ul class="nav-view__nav">
      <router-link
        v-for="(item, index) in links"
        v-show="item.isVisible !== undefined ? item.isVisible : true"
        :key="index"
        :to="item.to"
        exact tag="li"
        class="nav-view__nav-item"
        active-class="nav-view__nav-item--active"
      >
        {{item.name}}
      </router-link>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'nav-view',

    props: {
      links: {
        required: true
      },
    },
  }
</script>

<style scoped lang="sass">

  .nav-view
    padding: 8px

    &__nav
      display: flex
      padding: 15px 0
      justify-content: center

    &__nav-item
      position: relative
      margin: 0 15px
      color: $c-gray
      font-size: 17px
      text-transform: uppercase
      cursor: pointer

      &:hover
        color: $c-white

      &--active
        color: $c-white

        &:after
          +horizontal-center
          bottom: -10px
          width: 50px
          height: 3px
          background: $c-green
          content: ''

    &__content
      padding: 15px 0

</style>
