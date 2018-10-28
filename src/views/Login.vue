<template>
  <div class="login"></div>
</template>

<script>
  import {mapActions} from 'vuex'
  import router from '@/router'

  export default {
    name: 'Login',

    methods: {
      ...mapActions('auth',[
        'setAccessToken',
        'setRefreshToken',
        'setExpiryTime'
      ]),
    },

    created() {
      const {access_token, refresh_token, expires_in, error} = this.$route.query;

      if (error) {
        console.error(error);
      } else if (access_token && refresh_token && expires_in) {
        this.setAccessToken(access_token);
        this.setRefreshToken(refresh_token);
        this.setExpiryTime(expires_in);
      }

      router.push('/');
    }
  }
</script>
