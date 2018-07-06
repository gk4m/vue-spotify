<template>
  <div :class="elClass" v-show="show">
    <span v-html="message"></span>
    <button class="notification__close-btn" @click="close()" type="button" aria-label="Close alert">
      <icon name="times-circle"></icon>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'notification',

    props: {
      type: String,
      message: String,
      duration: {
        type: Number,
        default: 4500
      }
    },

    data() {
      return {
        show: true,
        timer: null
      }
    },

    computed: {
      elClass() {
        return ['notification', this.type ? `notification--${this.type}` : '']
      }
    },

    methods: {
      close: function () {
        clearTimeout(this.timer);

        this.show = false;
        this.$emit('close-notification');
      }
    },

    mounted() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => this.close(), this.duration)
      }
    }
  }
</script>

<style lang="sass" scoped>

  $bg: $c-black
  $color: $c-white
  $success: #7cbd71
  $info: #35a5e9
  $error: #e93735
  $warning: #dfa941

  .notification
    position: relative
    padding: 8px 35px
    color: $color
    font:
      size: 11px
      weight: 500
    line-height: 16px
    text-align: center
    z-index: 1111
    background: $bg

    &--success
      background: $success

    &--info
      background: $info

    &--error
      background: $error

    &--warning
      background: $warning

    &__close-btn
      +vertical-center
      right: 10px
      color: $color
      font-size: 16px
      line-height: 0
      outline: 0
      cursor: pointer

</style>
