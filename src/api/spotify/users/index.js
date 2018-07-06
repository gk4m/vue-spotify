import request from './../request'

export default {
  getUserProfile(userID) {
    if (userID) {
      return request.get(`users/${userID}`);
    } else {
      return request.get('me');
    }
  }
};

