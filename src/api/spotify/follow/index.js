import request from "./../request";

export default {
  followArtist(type, ids) {
    return request.put(`me/following`, {
      params: {
        type,
        ids
      }
    });
  },

  unfollowArtist(type, ids) {
    return request.delete(`me/following`, {
      params: {
        type,
        ids
      }
    });
  },

  checkIfUserFollowPlaylist(owner_id, playlist_id, ids) {
    return request.get(
      `users/${owner_id}/playlists/${playlist_id}/followers/contains`,
      {
        params: {
          ids
        }
      }
    );
  },

  followPlaylist(owner_id, playlist_id) {
    return request({
      method: "put",
      url: `users/${owner_id}/playlists/${playlist_id}/followers`,
      headers: {
        "content-type": "application/json"
      }
    });
  },

  unfollowPlaylist(owner_id, playlist_id) {
    return request.delete(
      `users/${owner_id}/playlists/${playlist_id}/followers`
    );
  },

  getFollowedArtists(limit, after) {
    return request.get(`me/following?type=artist`, {
      params: {
        limit,
        after
      }
    });
  }
};
