<template>
  <div class="not-found-view">
    <div class="not-found-view__content">
      <p>Sorry, it looks like we couldn't find what you're looking for. <br>Click the button below to go back.</p>
      <v-button :onClick="onBackButton">Return to the app</v-button>
    </div>
  </div>
</template>

<script>
  import vButton from '@/components/VButton'

  export default {
    name: 'NotFound',

    components: {
      vButton
    },

    methods: {
      onBackButton() {
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped lang="sass">

  .not-found-view
    width: 100%
    height: 100%
    background:
      image: url('../assets/img/error-bg.jpg')
      size: cover
      position: 50%
    color: $c-white
    text-align: center

    &:before
      position: absolute
      top: 0
      bottom: 0
      right: 0
      left: 0
      background: rgba(0, 0, 0, .75)
      content: ''

    &__content
      +absolute-center

      p
        font-size: 30px

</style>
