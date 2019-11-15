<template>
  <div class="genres-view" v-scroll>
    <entity-header title="Genres & Moods" :small="true" />
    <div class="genres-view__inner">
      <div
        class="genres-view__category"
        v-for="(item, index) in categories"
        :key="index"
      >
        <router-link :to="{ name: 'genres', params: { id: item.id } }">
          <img
            class="genres-view__category-img"
            :src="item.icons[0].url"
            :alt="item.name"
          />
          <div class="genres-view__category-name">{{ item.name }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "@/api";
  import EntityHeader from "@/components/EntityHeader";

  export default {
    name: "genres",

    components: {
      EntityHeader
    },

    data() {
      return {
        categories: ""
      };
    },

    methods: {
      async getCategories() {
        try {
          const response = await api.spotify.browse.getCategories();
          this.categories = response.data.categories.items;
        } catch (e) {
          console.log(e);
        }
      }
    },

    created() {
      this.getCategories();
    }
  };
</script>

<style scoped lang="sass">

  .genres-view
    height: calc(100vh - 227px)

    &__inner
      padding: 0 15px 0 8px

    &__category
      position: relative
      display: inline-block
      width: 50%
      padding: 7px
      vertical-align: top

    &__category-img
      width: 100%

    &__category-name
      position: absolute
      top: 70%
      left: 0
      right: 0
      padding: 0 15px
      color: $c-white
      font-size: 16px
      text-align: center

      &:hover
        text-decoration: underline

  +breakpoint(medium)
    .genres-view
      &__category
        width: 33%

  +breakpoint(large)
    .genres-view
      &__category
        width: 25%

  +breakpoint(xlarge)
    .genres-view
      &__category
        width: 16.66%
</style>
