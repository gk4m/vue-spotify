<template>
  <div class="artists-view" v-scroll @vScroll="loadMore">
    <entity-header title="Artists"/>
    <div class="artists-view__content">
      <media-container>
        <template>
          <media-object
            v-for="(item) in artists.items"
            :key="item.id"
            :id="item.id"
            :uri="item.uri"
            :name="item.name"
            :type="item.type"
            :coverImg="item.images"
          />
        </template>
      </media-container>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import EntityHeader from '@/components/EntityHeader'
  import MediaObject from '@/components/MediaObject'
  import MediaContainer from '@/components/MediaContainer'

  export default {
    name: 'ArtistsView',

    components: {
      MediaObject,
      EntityHeader,
      MediaContainer
    },

    data() {
      return {
        artists: {
          limit: 25,
          offset: 0,
          total: 1,
          items: []
        },
        isMore: null
      }
    },

    methods: {
      async getArtist() {
        try {
          if (this.artists.total > this.artists.offset) {
            const response = await api.spotify.follow.getFollowedArtists();

            this.artists.offset = response.data.offset + this.artists.limit;
            this.artists.total = response.data.total;
            this.artists.items.push(...response.data.artists.items);
            this.isMore = false;
          }
        } catch (e) {
          console.error(e)
        }
      },

      async loadMore(ev) {
        if (this.isMore) {
          return false;
        }

        if (ev.detail.scrollbarV.percent > 70) {
          this.isMore = true;
          this.getArtist();
        }
      }
    },

    created() {
      this.getArtist();
    }
  }
</script>

<style scoped lang="sass"></style>
