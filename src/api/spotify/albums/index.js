import request from "./../request";

export default {
  getAlbum(id) {
    return request.get(`albums/${id}`);
  },

  getAlbumTracks(id, offset = 0, limit = 50, market) {
    return request.get(`albums/${id}/tracks`, {
      params: {
        limit,
        offset,
        market
      }
    });
  },

  getAlbums(ids, market) {
    return request.get(`albums`, {
      ids,
      market
    });
  }
};
