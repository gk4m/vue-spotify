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

  getPlaylist(user_id, playlist_id) {
    return request.get(`users/${user_id}/playlists/${playlist_id}`);
  }
};

