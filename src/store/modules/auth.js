import api from '@/api';

const state = {
  accessToken: '',
  refreshToken: '',
  expiryTime: ''
};

const getters = {
  getAccessToken: state => state.accessToken,
  getRefreshToken: state => state.refreshToken,
  getExpiryTime: state => state.expiryTime
};

const mutations = {
  SET_ACCESS_TOKEN(state, token) {
    state.accessToken = token;
  },

  SET_REFRESH_TOKEN(state, token) {
    state.refreshToken = token;
  },

  SET_EXPIRY_TIME(state, time) {
    state.expiryTime = time;
  },
};

const actions = {
  login: async function ({commit}) {
    console.log('login');
    try {
      const response = await api.auth.getUserAuthURL();
      console.log(response.data);
      if (response.data) {
        window.location.href = response.data;
      }
    } catch (e) {
      console.log(e);
    }
  },

  refreshToken: async function ({commit, state, dispatch}) {
    try {
      if (state.refreshToken) {
        const response = await api.auth.refreshToken(state.refreshToken);
        commit('SET_ACCESS_TOKEN', response.data.access_token);
        dispatch('login');
      }
    } catch (e) {
      console.log(e);
    }
  },

  logout: function ({dispatch}) {
  },

  setAccessToken({commit}, token) {
    commit('SET_ACCESS_TOKEN', token);
  },

  setRefreshToken({commit}, token) {
    commit('SET_REFRESH_TOKEN', token);
  },

  setExpiryTime({commit}, time) {
    commit('SET_EXPIRY_TIME', time);
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
