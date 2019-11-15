const state = {
  lastSavedTrack: "",
  lastRemovedTrack: ""
};

const getters = {
  getSavedTrack: (state) => state.lastSavedTrack,
  getRemovedTrack: (state) => state.lastRemovedTrack
};

const mutations = {
  SET_SAVED_TRACK(state, track) {
    state.lastRemovedTrack = "";
    state.lastSavedTrack = track;
  },

  SET_REMOVED_TRACK(state, track) {
    state.lastSavedTrack = "";
    state.lastRemovedTrack = track;
  }
};

const actions = {
  saveTrack({ commit }, track) {
    commit("SET_SAVED_TRACK", track);
  },

  removeTrack({ commit }, track) {
    commit("SET_REMOVED_TRACK", track);
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
