import request from "./../request";

export default {
  search(
    q,
    type = "album,artist,playlist,track",
    offset,
    limit,
    market,
    include_external
  ) {
    return request.get(`search`, {
      params: {
        q,
        type,
        limit,
        offset,
        market,
        include_external
      }
    });
  }
};
