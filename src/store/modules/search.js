import api from "@/api";

const state = {
  query: "",
  result: "",
  isLoading: false,
  error: null,

  albums: "",
  albumsIsLoading: false,
  albumsError: null,

  artists: "",
  artistsIsLoading: false,
  artistsError: null,

  playlists: "",
  playlistsIsLoading: false,
  playlistsError: null,

  tracks: "",
  tracksIsLoading: false,
  tracksError: null
};

const getters = {};

const mutations = {
  SET_SEARCH_QUERY(state, data) {
    state.query = data;
  },

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
      items: [...state.albums.items, ...data.albums.items]
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
      items: [...state.artists.items, ...data.artists.items]
    };
  },

  REQUEST_GET_ARTISTS_ERROR(state, error) {
    state.artistsIsLoading = false;
    state.artistsError = error;
  },

  /* PLAYLISTS */
  REQUEST_GET_PLAYLISTS(state) {
    state.playlistsIsLoading = true;
  },

  REQUEST_GET_PLAYLISTS_SUCCESS(state, data) {
    state.playlistsIsLoading = false;
    state.playlists = {
      ...data.playlists,
      items: [...state.playlists.items, ...data.playlists.items]
    };
  },

  REQUEST_GET_PLAYLISTS_ERROR(state, error) {
    state.playlistsIsLoading = false;
    state.playlistsError = error;
  },

  /* TRACKS */
  REQUEST_GET_TRACKS(state) {
    state.tracksIsLoading = true;
  },

  REQUEST_GET_TRACKS_SUCCESS(state, data) {
    state.tracksIsLoading = false;
    state.tracks = {
      ...data.tracks,
      items: [...state.tracks.items, ...data.tracks.items]
    };
  },

  REQUEST_GET_TRACKS_ERROR(state, error) {
    state.tracksIsLoading = false;
    state.tracksError = error;
  }
};

const actions = {
  setSearchQuery({ commit }, query) {
    commit("SET_SEARCH_QUERY", query);
  },

  requestSearch({ commit }) {
    commit("REQUEST_SEARCH");
  },
  requestSearchSuccess({ commit }, data) {
    commit("REQUEST_SEARCH_SUCCESS", data);
  },
  requestSearchError({ commit }, error) {
    commit("REQUEST_SEARCH_ERROR", error);
  },

  async search({ commit, dispatch }, query) {
    dispatch("requestSearch");
    dispatch("setSearchQuery", query);

    try {
      const response = await api.spotify.search.search(query);
      dispatch("requestSearchSuccess", response.data);
    } catch (e) {
      dispatch("requestSearchError", e);
    }
  },

  /* ALBUMS */
  requestGetAlbums({ commit }) {
    commit("REQUEST_GET_ALBUMS");
  },

  requestGetAlbumsSuccess({ commit }, data) {
    commit("REQUEST_GET_ALBUMS_SUCCESS", data);
  },

  requestGetAlbumsError({ commit }, error) {
    commit("REQUEST_GET_ALBUMS_ERROR", error);
  },

  async getAlbums({ commit, dispatch, state: { albums, query } }) {
    dispatch("requestGetAlbums");

    try {
      if (albums.next) {
        const offset = albums.offset + albums.limit;
        const response = await api.spotify.search.search(
          query,
          "album",
          offset
        );

        dispatch("requestGetAlbumsSuccess", response.data);
      }
    } catch (e) {
      dispatch("requestGetAlbumsError", e);
    }
  },

  /* ARTISTS */
  requestGetArtists({ commit }) {
    commit("REQUEST_GET_ARTISTS");
  },

  requestGetArtistsSuccess({ commit }, data) {
    commit("REQUEST_GET_ARTISTS_SUCCESS", data);
  },

  requestGetArtistsError({ commit }, error) {
    commit("REQUEST_GET_ARTISTS_ERROR", error);
  },

  async getArtists({ commit, dispatch, state: { artists, query } }) {
    dispatch("requestGetArtists");

    try {
      if (artists.next) {
        const offset = artists.offset + artists.limit;
        const response = await api.spotify.search.search(
          query,
          "artist",
          offset
        );

        dispatch("requestGetArtistsSuccess", response.data);
      }
    } catch (e) {
      dispatch("requestGetArtistsError", e);
    }
  },

  /* PLAYLISTS */
  requestGetPlaylists({ commit }) {
    commit("REQUEST_GET_PLAYLISTS");
  },

  requestGetPlaylistsSuccess({ commit }, data) {
    commit("REQUEST_GET_PLAYLISTS_SUCCESS", data);
  },

  requestGetPlaylistsError({ commit }, error) {
    commit("REQUEST_GET_PLAYLISTS_ERROR", error);
  },

  async getPlaylists({ commit, dispatch, state: { playlists, query } }) {
    dispatch("requestGetPlaylists");

    try {
      if (playlists.next) {
        const offset = playlists.offset + playlists.limit;
        const response = await api.spotify.search.search(
          query,
          "playlist",
          offset
        );

        dispatch("requestGetPlaylistsSuccess", response.data);
      }
    } catch (e) {
      dispatch("requestGetPlaylistsError", e);
    }
  },

  /* TRACKS */
  requestGetTracks({ commit }) {
    commit("REQUEST_GET_TRACKS");
  },

  requestGetTracksSuccess({ commit }, data) {
    commit("REQUEST_GET_TRACKS_SUCCESS", data);
  },

  requestGetTracksError({ commit }, error) {
    commit("REQUEST_GET_TRACKS_ERROR", error);
  },

  async getTracks({ commit, dispatch, state: { tracks, query } }) {
    dispatch("requestGetTracks");

    try {
      if (tracks.next) {
        const offset = tracks.offset + tracks.limit;
        const response = await api.spotify.search.search(
          query,
          "track",
          offset
        );

        dispatch("requestGetTracksSuccess", response.data);
      }
    } catch (e) {
      dispatch("requestGetTracksError", e);
    }
  }
};

const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default module;
