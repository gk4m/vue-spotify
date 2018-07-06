import api from '@/api';

const state = {
  profile: '',
  playlists: ''
};

const getters = {
  getProfile: state => state.profile,
  getPlaylists: state => state.playlists,
};

const mutations = {
  SET_PROFILE(state, profile) {
    state.profile = profile;
  },

  SET_PLAYLISTS(state, playlists) {
    if (state.playlists) {
      state.playlists.limit = playlists.limit;
      state.playlists.offset = playlists.offset;
      state.playlists.next = playlists.next;
      state.playlists.total = playlists.total;
      state.playlists.items.push(...playlists.items);
    } else {
      state.playlists = playlists;
    }
  },
};

const actions = {
  async getUserProfile({commit}) {
    try {
      const response = await api.spotify.users.getUserProfile();
      commit('SET_PROFILE', response.data);
    } catch (e) {
      console.log(e);
    }
  },

  async getCurrentUserPlaylists({getters, commit}, limit = 20) {
    let offset = 0;

    if (getters.getPlaylists) {
      offset = getters.getPlaylists.limit + getters.getPlaylists.offset
    }

    if (!(getters.getPlaylists.total < offset)) {
      try {
        const response = await api.spotify.playlists.getCurrentUserPlaylists(limit, offset);
        commit('SET_PLAYLISTS', response.data);
      } catch (e) {
        console.log(e);
      }
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
