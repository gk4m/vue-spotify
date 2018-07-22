<template>
  <div class="top-bar">
    <arrow-nav/>
    <user-menu/>
  </div>
</template>

<script>
  import UserMenu from './UserMenu'
  import ArrowNav from './ArrowNav'

  export default {
    name: 'top-bar',

    components: {
      UserMenu,
      ArrowNav
    }
  }
</script>

<style scoped lang="sass">

  .top-bar
    display: flex
    height: 40px
    background: $c-shark

    .arrow-nav
      display: flex

    .user-menu
      margin: auto 30px auto auto

</style>
