<template>
  <button @click="onClick" :class="elClass">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'Button',

    props: {
      onClick: {
        required: true
      },

      isBlack: {
        default: false
      }
    },

    computed: {
      elClass(){
        return [
          'btn',
          {
            'btn--black': this.isBlack
          }
        ]
      }
    }
  }
</script>

<style lang="sass" scoped>

  .btn
    min-width: 130px
    padding: 9px 37px
    background: $c-green
    border-radius: 50px
    font:
      size: 12px
      weight: 600
    color: $c-white
    line-height: 1
    letter-spacing: 1px
    text-transform: uppercase
    cursor: pointer
    outline: none

    &:hover
      background: $c-green + 15

    &--black
      background: $c-black
      border: 1px solid $c-white

      &:hover
        background: $c-black + 30

</style>
