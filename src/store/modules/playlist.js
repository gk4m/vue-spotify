import api from '@/api'

const state = {
  playlist: '',
};

const getters = {
  getPlaylist: state => state.playlist,
};

const mutations = {
  SET_PLAYLIST(state, playlist) {
    state.playlist = playlist;
  }
};

const actions = {
  async fetchPlaylist({commit}, data){
    try {
      const response = await api.spotify.playlists.getPlaylist(data.userID, data.playlistID, 'uri, name, type, images, description, owner, followers');
      commit('SET_PLAYLIST', response.data)
    } catch (e) {
      this.notFoundPage(true);
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
