<template>
  <form class="navbar-search">
    <input
      class="navbar-search__input"
      type="search"
      placeholder="Search"
      aria-label="Search"
    >
    <button
      class="navbar-search__btn"
      type="submit"
    >
      <icon name="search"/>
    </button>
  </form>
</template>

<script>
  export default {
    name: 'navbar-search',

    data() {
      return {}
    },

    computed: {},

    methods: {}
  }
</script>

<style scoped lang="sass">

  .navbar-search
    position: relative
    width: 160px
    font-size: 14px

    &__input
      height: 25px
      margin: 0
      padding-right: 20px
      border-radius: 30px

    &__btn
      position: absolute
      right: 5px
      top: 0
      bottom: 0
      height: 16px
      margin: auto 0
      color: $c-shark
      outline: none

</style>
