import api from '@/api'

const state = {
  result: '',
  isLoading: false,
  error: null,

  albums: '',
  albumsIsLoading: false,
  albumsError: null,

  artists: '',
  artistsIsLoading: false,
  artistsError: null,

  playlists: '',
  tracks: '',
};

const getters = {};

const mutations = {
  REQUEST_SEARCH(state) {
    state.isLoading = true;
  },

  REQUEST_SEARCH_SUCCESS(state, data) {
    state.result = data;
    state.albums = data.albums;
    state.artists = data.artists;
    state.playlists = data.playlists;
    state.tracks = data.tracks;
    state.isLoading = false;
  },

  REQUEST_SEARCH_ERROR(state, error) {
    state.isLoading = false;
    state.error = error;
  },

  /* ALBUMS */
  REQUEST_GET_ALBUMS(state) {
    state.albumsIsLoading = true;
  },

  REQUEST_GET_ALBUMS_SUCCESS(state, data) {
    state.albumsIsLoading = false;
    state.albums = {
      ...data.albums,
      items: [...state.albums.items, ...data.albums.items],
    };
  },

  REQUEST_GET_ALBUMS_ERROR(state, error) {
    state.albumsIsLoading = false;
    state.albumsError = error;
  },

  /* ARTISTS */
  REQUEST_GET_ARTISTS(state) {
    state.artistsIsLoading = true;
  },

  REQUEST_GET_ARTISTS_SUCCESS(state, data) {
    state.artistsIsLoading = false;
    state.artists = {
      ...data.artists,
      items: [...state.artists.items, ...data.artists.items],
    };
  },

  REQUEST_GET_ARTISTS_ERROR(state, error) {
    state.artistsIsLoading = false;
    state.artistsError = error;
  },
};

const actions = {
  requestSearch({commit}) {
    commit('REQUEST_SEARCH')
  },
  requestSearchSuccess({commit}, data) {
    commit('REQUEST_SEARCH_SUCCESS', data)
  },
  requestSearchError({commit}, error) {
    commit('REQUEST_SEARCH_ERROR', error)
  },

  async search({commit, dispatch}, data) {
    dispatch('requestSearch');

    try {
      const response = await api.spotify.search.search(data);
      dispatch('requestSearchSuccess', response.data)
    } catch (e) {
      dispatch('requestSearchError', e);
    }
  },

  /* ALBUMS */
  requestGetAlbums({commit}) {
    commit('REQUEST_GET_ALBUMS')
  },
  requestGetAlbumsSuccess({commit}, data) {
    commit('REQUEST_GET_ALBUMS_SUCCESS', data)
  },
  requestGetAlbumsError({commit}, error) {
    commit('REQUEST_GET_ALBUMS_ERROR', error)
  },

  async getAlbums({commit, dispatch, state: { albums }}, data) {
    dispatch('requestGetAlbums');

    try {
      if (albums.next){
        const offset = albums.offset + albums.limit;
        const response = await api.spotify.search.search(data, 'album', offset);

        dispatch('requestGetAlbumsSuccess', response.data)
      }
    } catch (e) {
      dispatch('requestGetAlbumsError', e);
    }
  },

  /* ARTISTS */
  requestGetArtists({commit}) {
    commit('REQUEST_GET_ARTISTS')
  },
  requestGetArtistsSuccess({commit}, data) {
    commit('REQUEST_GET_ARTISTS_SUCCESS', data)
  },
  requestGetArtistsError({commit}, error) {
    commit('REQUEST_GET_ARTISTS_ERROR', error)
  },

  async getArtists({commit, dispatch, state: { artists }}, data) {
    dispatch('requestGetArtists');

    try {
      if (artists.next){
        const offset = artists.offset + artists.limit;
        const response = await api.spotify.search.search(data, 'artist', offset);

        dispatch('requestGetArtistsSuccess', response.data)
      }
    } catch (e) {
      dispatch('requestGetArtistsError', e);
    }
  },
};

const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default module;
