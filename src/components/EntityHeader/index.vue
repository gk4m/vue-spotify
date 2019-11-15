<template>
  <div :class="elClass">
    <h2 class="entity-header__title">{{ title }}</h2>
  </div>
</template>

<script>
  export default {
    name: "entity-header",

    props: {
      title: {
        type: String
      },

      small: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      elClass() {
        return [
          "entity-header",
          {
            "entity-header--small": this.small
          }
        ];
      }
    }
  };
</script>

<style scoped lang="sass">

  .entity-header
    padding: 0 15px

    &--small
      .entity-header__title
        font-size: 18px

    &__title
      margin: 30px 0 15px

      font-size: 30px
</style>
