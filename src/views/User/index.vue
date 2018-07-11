<template>
  <div class="user-view" v-scroll @scrollReachBottom="loadMore">
    <div class="user-view__info">
      <img v-if="!!(user.images && user.images[0])" class="user-view__avatar" :src="user.images[0].url">

      <div v-else class="user-view__avatar">
        <icon class="user-view__user-icon" name="user"/>
      </div>

      <h1 class="user-view__name">{{user.display_name}}</h1>
    </div>

    <entity-header title="Public Playlists" :small="true"/>
    <media-container>
      <media-object
        v-for="(item, index) in playlists"
        :key="index"
        :id="item.id"
        :uri="item.uri"
        :coverImg="item.images"
        :name="item.name"
        :type="item.type"
      />
    </media-container>
  </div>
</template>

<script>
  import api from '@/api'
  import {mapActions} from 'vuex'
  import EntityHeader from '@/components/EntityHeader'
  import MediaObject from '@/components/MediaObject'
  import MediaContainer from '@/components/MediaContainer'

  export default {
    name: 'user-view',

    components: {
      EntityHeader,
      MediaObject,
      MediaContainer
    },

    data() {
      return {
        user: '',
        playlists: '',
        limit: 25,
        offset: 0,
        total: 0
      }
    },

    computed: {},

    methods: {
      ...mapActions({
        notFoundPage: 'app/notFoundPage',
      }),

      async getUser(id) {
        try {
          const response = await api.spotify.users.getUserProfile(id);
          this.user = response.data;
        } catch (e) {
          this.notFoundPage(true)
        }
      },

      async getUserPlaylists(id) {
        try {
          const response = await api.spotify.playlists.getUserPlalists(id, 0, this.limit);

          this.playlists = response.data.items;
          this.offset = response.data.offset;
          this.total = response.data.total;

        } catch (e) {
          console.log(e);
        }
      },

      async loadMore() {
        try {
          const userID = this.$route.params.id;
          let offset = this.offset + this.limit;

          if (this.total > offset) {
            const response = await api.spotify.playlists.getUserPlalists(userID, offset, this.limit);

            this.offset = response.data.offset;
            this.total = response.data.total;
            this.playlists.push(...response.data.items);

          }
        } catch (e) {
          console.log(e)
        }
      }
    },

    created() {
      const userID = this.$route.params.id;

      this.getUser(userID);
      this.getUserPlaylists(userID);
    }
  }
</script>

<style scoped lang="sass">

  .user-view
    &__info
      display: flex
      flex-direction: column
      align-items: center
      margin: 30px

    &__avatar
      position: relative
      width: 200px
      height: 200px
      border-radius: 50%
      background: $c-sirocco

    &__user-icon
      +absolute-center
      width: 40%
      height: 40%

</style>
