<template>
  <div class="app-layout">
    <app-top-bar/>
    <div class="app-layout__wrap">
      <app-sidebar/>
      <div class="app-layout__main">
        <router-view />
      </div>
    </div>
    <player/>
  </div>
</template>

<script>
  import AppTopBar from '@/components/AppTopBar';
  import AppSidebar from '@/components/AppSidebar';
  import Player from '@/components/Player';

  export default {
    name: 'AppLayout',

    components: {
      AppTopBar,
      AppSidebar,
      Player
    }
  }
</script>

<style scoped lang="sass">

  .app-layout
    position: relative
    display: flex
    flex-flow: column
    flex-grow: 1
    color: $c-white

    &__wrap
      display: flex
      flex-flow: row
      flex-grow: 1
      background: $c-shark-dark

    &__main
      flex-grow: 1
      max-height: calc(100vh - 130px)
      overflow-y: auto

    .sidebar
      width: 220px
      min-width: 220px

</style>
