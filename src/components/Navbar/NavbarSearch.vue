<template>
  <form class="navbar-search">
    <input
      @focus="onFocus"
      @keyup="onKeyUp"
      class="navbar-search__input"
      type="search"
      placeholder="Search"
      aria-label="Search"
    />
    <button class="navbar-search__btn">
      <icon name="search" />
    </button>
  </form>
</template>

<script>
  import router from "@/router";
  import { mapActions } from "vuex";

  export default {
    name: "navbar-search",

    methods: {
      ...mapActions({
        search: "search/search"
      }),

      onFocus(e) {
        const {
          name,
          params: { query }
        } = this.$route;

        const { value } = e.target;

        if (value) {
          router.push({ name: "search-result", params: { query: value } });
        } else if (name !== "search" && !query) {
          router.push("/search");
        }
      },

      onKeyUp(e) {
        const { value } = e.target;

        if (value !== "") {
          this.$router.replace({
            name: "search-result",
            params: { query: value }
          });
          this.search(value);
        }
      }
    }
  };
</script>

<style scoped lang="sass">

  .navbar-search
    position: relative
    width: 160px
    font-size: 14px

    &__input
      height: 25px
      margin: 0
      padding-right: 20px
      border-radius: 30px

    &__btn
      position: absolute
      right: 5px
      top: 0
      bottom: 0
      height: 16px
      margin: auto 0
      color: $c-shark
      outline: none
      pointer-events: none
</style>
