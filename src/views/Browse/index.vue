<template>
  <div class="browse-view" >
    <ul class="browse-view__nav">
      <router-link
        exact tag="li"
        :to="{name:'browse-genres'}"
        class="browse-view__nav-item"
        active-class="browse-view__nav-item--active"
      >
        Genres & Moods
      </router-link>
      <router-link
        exact tag="li"
        :to="{name:'browse-new-releases'}"
        class="browse-view__nav-item"
        active-class="browse-view__nav-item--active"
      >
        New releases
      </router-link>
    </ul>

    <div class="browse-view__content" >
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'browse-view',
  }
</script>

<style scoped lang="sass">

  .browse-view
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
