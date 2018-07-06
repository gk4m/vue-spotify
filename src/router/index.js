import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Login from '@/views/Login'
import HomeView from '@/views/HomeView'
import NotFoundView from '@/views/NotFoundView'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/',
      name: 'Home',
      component: HomeView
    },

    {
      path: '*',
      component: NotFoundView,
      beforeEnter: function (to, from, next) {
        store.dispatch('app/notFoundPage', true);
        next();
      }
    }
  ]
});

router.beforeEach(function (to, from, next) {

  if(store.getters['app/notFound']) {
    store.dispatch('app/notFoundPage', false);
  }

  if (!store.getters['auth/getAccessToken'] && to.name !== 'Login') {
    store.dispatch('auth/login');
    next(false);
  }

  next();
});

export default router;
