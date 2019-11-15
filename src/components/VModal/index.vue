<template>
  <div class="modal">
    <modal :name="modalName" :width="width">
      <div class="modal__header">
        <slot name="header"></slot>
      </div>
      <div class="modal__body">
        <slot name="body"></slot>
      </div>
      <div class="modal__footer">
        <slot name="footer"></slot>
      </div>
    </modal>
  </div>
</template>

<script>
  export default {
    name: "v-modal",

    props: {
      modalName: {
        type: String,
        required: true
      },

      width: {
        required: false,
        default: "400px"
      }
    },

    computed: {}
  };
</script>

<style lang="sass">

  .modal
    color: $c-gray
    font-size: 13px

    &__header
      padding: 10px
      font:
        size: 18px
        weight: bold
      text-align: center
      border-bottom: 1px solid $c-gray
      color: $c-white

    &__body
      padding: 10px 15px

    &__footer
      width: 100%
      padding: 13px
      text-align: center

      .btn
        margin: 0 5px

    .v--modal
      background: $c-shark
      box-shadow: 2px 2px 20px 7px rgba(0, 0, 0, .4)
</style>
