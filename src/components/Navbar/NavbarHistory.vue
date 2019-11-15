<template>
  <div class="navbar-history">
    <a class="navbar-history__link" @click="onPrevClick">
      <icon name="chevron-left" />
    </a>
    <a class="navbar-history__link" @click="onNextClick">
      <icon name="chevron-right" />
    </a>
  </div>
</template>

<script>
  export default {
    name: "navbar-history",

    methods: {
      onNextClick() {
        this.$router.forward();
      },

      onPrevClick() {
        this.$router.back();
      }
    }
  };
</script>

<style scoped lang="sass">

  .navbar-history
    display: inline-block

    &__link
      margin: auto 5px
      line-height: 0
      cursor: pointer
</style>
