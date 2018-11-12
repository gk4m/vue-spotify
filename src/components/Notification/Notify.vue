<template>
  <div :class="classes">
    <span v-html="message"></span>
    <button
      class="notify__close-btn"
      @click="close()"
      type="button"
      aria-label="Close alert"
    >
      <icon name="times-circle" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'notify',

  props: {
    type: {
      type: String,
      default: 'info',
    },
    message: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 4000,
    },
  },

  computed: {
    classes() {
      return ['notify', this.type ? `notify--${this.type}` : ''];
    },
  },

  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="sass" scoped>

  $bg: $c-black
  $color: $c-white
  $success: #7cbd71
  $info: #35a5e9
  $error: #e93735
  $warning: #dfa941

  .notify
    position: fixed
    width: 100%
    margin-bottom: 1px
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
