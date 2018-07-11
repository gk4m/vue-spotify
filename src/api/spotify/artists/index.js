import request from './../request'

export default {
  getArtist(id) {
    return request.get(`artists/${id}`);
  },

  getArtistAlbums(id, include_groups, offset = 0, limit = 50, market) {
    return request.get(`artists/${id}/albums`, {
      params: {
        include_groups,
        limit,
        offset,
        market
      }
    });
  }
};

