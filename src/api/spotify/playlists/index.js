import request from './../request'

export default {
  getCurrentUserPlaylists(limit = 2, offset) {
    return request.get('me/playlists', {
      params: {
        limit,
        offset
      }
    });
  },

  getPlaylist(user_id, playlist_id, fields) {
    return request.get(`users/${user_id}/playlists/${playlist_id}`, {
      params: {
        fields
      }
    });
  },

  getUserPlalists(user_id, offset = 0, limit = 50) {
    return request.get(`users/${user_id}/playlists`, {
      params: {
        limit,
        offset
      }
    });
  },

  createPlaylist(user_id, name, description) {
    return request.post(`users/${user_id}/playlists`, {
      name,
      description
    });
  }
};
