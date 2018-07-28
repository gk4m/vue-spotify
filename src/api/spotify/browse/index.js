import request from './../request'

export default {
  getNewReleases(offset, limit, country) {
    return request.get('browse/new-releases', {
      params: {
        limit,
        offset,
        country
      }
    });
  },

  getCategories(offset, limit, country, locale) {
    return request.get('browse/categories', {
      params: {
        limit,
        offset,
        country,
        locale
      }
    });
  },

  getCategoryPlaylists(category_id, offset, limit, country) {
    return request.get(`browse/categories/${category_id}/playlists`, {
      params: {
        category_id,
        limit,
        offset,
        country
      }
    });
  }
};
