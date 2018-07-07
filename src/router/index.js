import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Login from '@/views/Login'
import HomeView from '@/views/HomeView'
import NotFoundView from '@/views/NotFound'
import UserView from '@/views/User'
import BrowseView from '@/views/Browse'
import TracksCollectionView from '@/views/Collection/Tracks'
import AlbumsCollectionView from '@/views/Collection/Albums'
import PlaylistView from '@/views/Playlist'

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
      path: '/user/:id',
      name: 'user',
      component: UserView
    },

    {
      path: '/browse',
      name: 'browse',
      component: BrowseView
    },

    {
      path: '/collection/tracks',
      name: 'tracks-collection',
      component: TracksCollectionView
    },

    {
      path: '/collection/albums',
      name: 'albums-collection',
      component: AlbumsCollectionView
    },

    {
      path: '/user/:user_id/playlist/:playlist_id',
      name: 'playlist',
      component: PlaylistView
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
