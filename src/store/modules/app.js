const state = {
  notFound: false
};

const getters = {
  notFound: state => state.notFound
};

const mutations = {
  SET_NOT_FOUND(state, status) {
    state.notFound = status;
  },
};

const actions = {
  notFoundPage({commit}, status) {
    commit('SET_NOT_FOUND', status);
  },

  init({dispatch, rootGetters}) {
    if (rootGetters['auth/getAccessToken']) {
      dispatch('user/getUserProfile', null, {root: true});
      // dispatch('user/getCurrentUserPlaylists', null, {root: true});
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
