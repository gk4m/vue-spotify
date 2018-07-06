<template>
  <div class="loading-spinner">
    <div v-for="i in 12" :class="['circle-' + i]"></div>
  </div>
</template>

<script>
  export default {
    name: 'loading-spinner',
  }
</script>

<style scoped lang="sass">
  =circles()
    $rotate: 30
    $rotate-interval: 30
    $delay: -1.1
    $delay-interval: 0.1

    @for $i from 2 through 12
      .circle-#{$i}
        transform: rotate(#{$rotate}deg)

        &:before
          animation-delay: #{$delay}s

      $rotate: $rotate + $rotate-interval
      $delay: $delay + $delay-interval

  .loading-spinner
    +absolute-center
    +circles
    width: 80px
    height: 80px

    > div
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%

      &:before
        display: block
        width: 15%
        height: 15%
        margin: 0 auto
        background-color: $c-black
        border-radius: 100%
        animation: circleFadeDelay 1.2s infinite ease-in-out both
        content: ''

  @keyframes circleFadeDelay
    0%, 39%, 100%
      opacity: 0

    40%
      opacity: 1

</style>
