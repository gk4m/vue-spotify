<template>
  <div class="arrow-nav">
    <a class="arrow-nav__link" @click="onPrevClick">
      <icon name="chevron-left" />
    </a>
    <a class="arrow-nav__link" @click="onNextClick">
      <icon name="chevron-right" />
    </a>
  </div>
</template>

<script>
  export default {
    name: 'arrow-nav',

    methods: {
      onNextClick() {
        this.$router.forward()
      },

      onPrevClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped lang="sass">

  .arrow-nav
    display: inline-block
    margin-left: 15px

    &__link
      margin: auto 5px
      line-height: 0
      cursor: pointer

</style>
