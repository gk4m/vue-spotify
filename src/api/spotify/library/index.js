import request from './../request'

export default {
  getTracks(offset = 0, limit = 50, market) {
    return request.get('me/tracks', {
      params: {
        limit,
        offset,
        market
      }
    });
  },

  getAlbums(offset = 0, limit = 50, market) {
    return request.get('me/albums', {
      params: {
        limit,
        offset,
        market
      }
    });
  },

  checkUserSavedTracks(ids) {
    return request.get('me/tracks/contains', {
      params: {
        ids
      }
    });
  },

  saveTracks(ids) {
    return request.put('me/tracks', {
      ids
    });
  },

  removeTracks(ids) {
    return request.delete('me/tracks', {
      data: {
        ids
      }
    });
  }
};

