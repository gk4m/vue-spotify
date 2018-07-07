<template>
  <div class="top-bar">
    <user-menu />
  </div>
</template>

<script>
  import UserMenu from './UserMenu'

  export default {
    name: 'top-bar',

    components: {
      UserMenu
    },

    computed: {},

    methods: {},

    mounted() {
    }
  }
</script>

<style scoped lang="sass">

  .top-bar
    display: flex
    height: 40px
    background: $c-shark

    .user-menu
      margin: auto 30px auto auto

</style>
