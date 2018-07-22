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
      const fields = 'uri, name, type, images, description, owner, followers';
      const response = await api.spotify.playlists.getPlaylist(data.userID, data.playlistID, fields);
      commit('SET_PLAYLIST', response.data)
    } catch (e) {
      console.log(e);
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
