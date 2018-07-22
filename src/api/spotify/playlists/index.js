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

  getPlalistsTracks(user_id, playlist_id, offset = 0, limit = 50, fields) {
    return request.get(`users/${user_id}/playlists/${playlist_id}/tracks`, {
      params: {
        fields,
        limit,
        offset
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
  },

  updatePlaylist(user_id, playlist_id, name, description) {
    return request.put(`users/${user_id}/playlists/${playlist_id}`, {
      name,
      description
    });
  },

  updatePlaylistCover(user_id, playlist_id, base64) {
    return request({
      method: 'put',
      url: `users/${user_id}/playlists/${playlist_id}/images`,
      headers: { 'content-type': 'image/jpeg' },
      data: {...base64}
    });
  }
};
