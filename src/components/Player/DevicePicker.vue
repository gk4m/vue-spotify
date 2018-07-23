<template>
  <div :class="elClass">
    <button class="device-picker__button" @click="onClick">
      <icon class="device-picker__button-d" name="desktop"/>
      <icon class="device-picker__button-m" name="mobile-alt"/>
    </button>

    <div class="device-picker__container" v-if="isVisible">
      <h3 class="device-picker__title">Connect to a device</h3>

      <div class="device-picker__content" v-scroll>
        <img class="device-picker__header" :src="require('@/assets/img/connect-header.png')" alt="connect-header"/>

        <ul class="device-picker__list">
          <li v-for="(device, index) in devices" :key="index" class="device-picker__list-item"
              :class="{'device-picker__list-item--active': device.is_active}">
            <button class="device-picker__list-item" @click="onDeviceConnect(device.id)">
              <icon v-if="device.type==='Smartphone'" name="mobile-alt" class="device-picker__device-icon"/>
              <icon v-if="device.type==='Computer'" name="laptop" class="device-picker__device-icon"/>

              <div class="device-picker__device-info">
                <span class="device-picker__device-title">
                  <template v-if="!device.is_active">{{device.name}}</template>
                  <template v-if="device.is_active">Listening On</template>
                </span>
                <span class="device-picker__device-subtitle icon-sound-on">
                  <template v-if="device.is_active" class="icon-sound-on">{{device.name}}</template>
                  <template v-else class="icon-sound-on"> Spotify Connect</template>
                </span>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api'

  export default {
    name: 'device-picker',

    data() {
      return {
        devices: null,
        isVisible: false
      }
    },

    computed: {
      elClass() {
        return [
          'device-picker',
          {
            'device-picker--opened': this.isVisible
          }
        ]
      }
    },

    methods: {
      async getUserDevices() {
        try {
          const response = await api.spotify.player.getUserDevices();
          this.devices = response.data.devices;
        } catch (e) {
          console.log(e);
        }
      },

      clickOutEvent: function (e) {
        const $dropdown = this.$el.children[0];
        if (e.target !== $dropdown && !$dropdown.contains(e.target)) {
          this.close();
        }
      },

      onClick() {
        this.isVisible = !this.isVisible;

        if (this.isVisible) {
          setTimeout(() => document.addEventListener('click', this.clickOutEvent), 100);
        }
      },

      close: function () {
        this.isVisible = false;
        document.removeEventListener('click', this.clickOutEvent);
      },

      async onDeviceConnect(id) {
        try {
          await api.spotify.player.transferUsersPlayback([id]);

          setTimeout(() => {
            this.getUserDevices();
          }, 500)

        } catch (e) {
          console.log(e);
        }
      }
    },

    created() {
      this.getUserDevices();
    }
  }
</script>

<style lang="sass">

  .device-picker
    position: relative

    &--opened
      .device-picker__button
        color: $c-green

    &__button
      color: $c-gray
      outline: none

      &:hover
        color: $c-white

      &-m
        position: relative
        left: -5px
        background: $c-shark

    &__container
      position: absolute
      bottom: 45px
      right: -125px
      width: 250px
      z-index: 1000
      padding: 8px 0 0
      background: $c-shark
      box-shadow: 0 6px 12px rgba(0, 0, 0, .175)
      color: $c-white

    &__content
      height: 250px !important

    &__title
      margin: 5px 0 13px
      font:
        size: 18px
        weight: bold
      text-align: center

    &__header
      width: 100%
      padding: 5px 40px

    &__list-item--active
      .device-picker__list-item,
      .device-picker__device-subtitle
        color: $c-green

    &__list-item
      display: flex
      align-items: center
      width: 100%
      padding: 8px 5px
      text-align: left
      font-size: 14px
      color: $c-white
      outline: none

      &:hover
        background: $c-mine-shaft

    &__device-info
      display: flex
      flex-direction: column

    &__device-subtitle
      display: flex
      margin: 5px 0
      font-size: 12px
      color: $c-gray

      &:before
        margin-right: 5px

    &__device-icon
      width: 30px
      height: 30px
      margin: 5px 15px 5px 5px


</style>
