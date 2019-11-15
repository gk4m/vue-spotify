const state = {
  notifications: []
};

const getters = {
  getNotifications: (state) => state.notifications
};

const mutations = {
  NOTIFICATION_ADD(state, data) {
    state.notifications.push(data);
  },
  NOTIFICATION_REMOVE(state, data) {
    const index = state.notifications.indexOf(data);
    state.notifications.splice(index, 1);
  }
};

const actions = {
  add({ commit, dispatch }, notification) {
    commit("NOTIFICATION_ADD", notification);

    if (notification.duration > 0) {
      setTimeout(() => {
        dispatch("remove", notification);
      }, notification.duration);
    }
  },

  remove({ commit }, notification) {
    commit("NOTIFICATION_REMOVE", notification);
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
