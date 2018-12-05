import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Login from '@/views/Login'
import UserView from '@/views/User'
import SearchView from '@/views/Search'
import SearchResultView from '@/views/Search/SearchResult'
import SearchAlbumView from '@/views/Search/SearchAlbum'
import SearchArtistView from '@/views/Search/SearchArtist'
import SearchPlaylistView from '@/views/Search/SearchPlaylist'
import SearchTrackView from '@/views/Search/SearchTrack'
import BrowseView from '@/views/Browse'
import BrowseGenresView from '@/views/Browse/Genres'
import GenresView from '@/views/Genres'
import NewReleasesView from '@/views/Browse/NewReleases'
import ArtistView from '@/views/Artist'
import AlbumView from '@/views/Album'
import PlaylistView from '@/views/Playlist'
import TracksCollectionView from '@/views/Collection/Tracks'
import AlbumsCollectionView from '@/views/Collection/Albums'
import ArtistsCollectionView from '@/views/Collection/Artists'

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
      redirect: {
        name: 'browse'
      },
    },

    {
      path: '/search',
      name: 'search',
      component: SearchView,
      children: [
        {
          path: 'result/:query',
          name: 'search-result',
          component: SearchResultView
        },
        {
          path: 'album/:query',
          name: 'search-album',
          component: SearchAlbumView
        },
        {
          path: 'artist/:query',
          name: 'search-artist',
          component: SearchArtistView
        },
        {
          path: 'playlist/:query',
          name: 'search-playlist',
          component: SearchPlaylistView
        },
        {
          path: 'track/:query',
          name: 'search-track',
          component: SearchTrackView
        },
      ]
    },

    {
      path: '/user/:id',
      name: 'user',
      component: UserView
    },

    {
      path: '/artist/:id',
      name: 'artist',
      component: ArtistView
    },

    {
      path: '/album/:id',
      name: 'album',
      component: AlbumView
    },

    {
      path: '/genres/:id',
      name: 'genres',
      component: GenresView
    },

    {
      path: '/browse',
      name: 'browse',
      component: BrowseView,
      redirect: {
        name: 'browse-genres'
      },
      children: [
        {
          name: 'browse-genres',
          path: 'genres',
          component: BrowseGenresView
        },
        {
          name: 'browse-new-releases',
          path: 'newreleases',
          component: NewReleasesView
        },
      ]
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
      path: '/collection/artists',
      name: 'artists-collection',
      component: ArtistsCollectionView
    },

    {
      path: '/user/:user_id/playlist/:playlist_id',
      name: 'playlist',
      component: PlaylistView
    },

    {
      path: '*',
      beforeEnter: function (to, from, next) {
        store.dispatch('app/notFoundPage', true);
        next();
      }
    }
  ]
});

router.beforeEach(function (to, from, next) {
  if (store.getters['app/notFound']) {
    store.dispatch('app/notFoundPage', false);
  }

  if (!store.getters['auth/getAccessToken'] && to.name !== 'Login') {
    store.dispatch('auth/login');
    next(false);
  }

  next();
});

export default router;
