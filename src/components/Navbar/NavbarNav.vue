<template>
  <div v-if="user" class="navbar-nav">
    <div class="navbar-nav__item">
      <router-link
        :to="{ name: 'user', params: { id: user.id } }"
        class="navbar-nav__link"
      >
        {{ user.display_name }}
      </router-link>
      <button class="navbar-nav__icon" @click="onClick">
        <icon name="chevron-down" />
      </button>
    </div>
    <transition name="fade">
      <ul class="navbar-nav__dropdown" v-show="isVisible">
        <li class="navbar-nav__list-item" @click="onAccountClick">Account</li>
        <li class="navbar-nav__list-item" @click="onHelpClick">Help</li>
        <li class="navbar-nav__list-item" @click="logout">Logout</li>
      </ul>
    </transition>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";

  export default {
    name: "navbar-nav",

    data() {
      return {
        isVisible: false
      };
    },

    computed: {
      ...mapGetters({
        user: "user/getProfile"
      })
    },

    methods: {
      ...mapActions("auth", ["logout"]),

      clickOutEvent: function(e) {
        const $dropdown = this.$el.children[0];
        if (e.target !== $dropdown && !$dropdown.contains(e.target)) {
          this.close();
        }
      },

      onClick() {
        this.isVisible = !this.isVisible;

        if (this.isVisible) {
          setTimeout(
            () => document.addEventListener("click", this.clickOutEvent),
            100
          );
        } else {
          this.close();
        }
      },

      close: function() {
        this.isVisible = false;
        document.removeEventListener("click", this.clickOutEvent);
      },

      onAccountClick() {
        window.open(
          "https://www.spotify.com/pl/account/overview/?utm_source=play&utm_campaign=wwwredirect",
          "_blank"
        );
      },

      onHelpClick() {
        window.open(
          "https://support.spotify.com/pl/?utm_campaign=wwwredirect&utm_source=play",
          "_blank"
        );
      }
    }
  };
</script>

<style scoped lang="sass">

  .navbar-nav
    position: relative
    z-index: 10

    &__item
      display: flex
      align-items: center
      height: 40px

    &__link
      color: $c-white
      font-size: 13px

      &:hover
        text-decoration: underline

    &__icon
      margin: 0 6px
      color: $c-white
      font-size: 12px
      line-height: 0
      outline: none
      cursor: pointer

    &__dropdown
      font:
        size: 13px
        weight: normal
      background: $c-tundora
      box-shadow: -2px 2px 5px 0 rgba(0, 0, 0, .75)

    &__list-item
      padding: 10px
      cursor: pointer

      &:hover
        background: $c-black-light

    .fade-enter-active,
    .fade-leave-active
      transition: opacity .3s

    .fade-enter,
    .fade-leave-to
      opacity: 0
</style>
