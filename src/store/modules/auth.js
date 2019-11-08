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
  login: async function () {
    try {
      const response = await api.auth.getUserAuthURL();
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
        
        const accessToken = response.data.access_token

        dispatch("setAccessToken", accessToken)
        return response;
      }
    } catch (e) {
      console.log(e);
    }
  },

  logout: function () {
    let script = document.createElement('script');

    script.src = 'https://www.spotify.com/logout/';
    document.getElementById('app').appendChild(script);

    window.localStorage.clear();
    window.sessionStorage.clear();

    setTimeout(() => {
      location.reload();
    }, 1000)
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
