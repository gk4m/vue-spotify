<template>
  <div id="app" class="app">
    <notification
      v-for="notification in notifications"
      :key="notification.id"
      :message="notification.message"
      :type="notification.type"
      :duration="notification.duration"
      v-on:close-notification="removeNotification(notification)">
    </notification>

    <app-layout v-if="!notFound" />
    <not-found-view v-if="notFound" />
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import AppLayout from '@/layouts/AppLayout'
  import NotFoundView from '@/views/NotFound'
  import Notification from '@/components/Notification/'

  export default {
    name: 'app',

    components: {
      AppLayout,
      NotFoundView,
      Notification
    },

    computed: {
      ...mapGetters({
        notFound: 'app/notFound',
        notifications: 'notification/getNotifications'
      })
    },

    methods: {
      ...mapActions({
        init: 'app/init',
        removeNotification: 'notification/removeNotification'
      })
    },

    created(){
      this.init();
    }
  }
</script>

<style lang="sass">
  @import styles/app

  .app
    display: flex
    flex-flow: column
    position: absolute
    width: 100%
    min-width: 630px
    height: 100%

</style>
