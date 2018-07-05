import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import HomeView from '@/views/HomeView'
import NotFoundView from '@/views/NotFoundView'

Vue.use(Router);

const router = new Router({
  routes: [
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

  next();
});

export default router;
