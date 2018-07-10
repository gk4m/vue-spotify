import request from './../request'

export default {
  getAlbum(id) {
    return request.get(`albums/${id}`);
  },

  getAlbumTracks(id) {
    return request.get(`albums/${id}/tracks`);
  },

  getAlbums(ids, market) {
    return request.get(`albums`, {
      ids,
      market
    });
  }
};

