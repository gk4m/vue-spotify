<template>
  <div class="entity-header">
    <h2 class="entity-header__title">{{title}}</h2>
  </div>
</template>

<script>
  export default {
    name: 'entity-header',

    props: {
      title: {
        type: String
      }
    }
  }
</script>

<style scoped lang="sass">

  .entity-header
    padding: 0 15px

    &__title
      margin: 30px 0 15px

      font-size: 30px

</style>
