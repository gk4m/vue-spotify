import request from './request';

const plugin = store => {
  request.interceptors.request.use(function (config) {
    if (store.getters['auth/getAccessToken']) {
      config.headers.common['Authorization'] = `Bearer ${store.getters['auth/getAccessToken']}`;
    }
    return config;
  }, null);

  request.interceptors.response.use(null, (error) => {
    const {status} = error.response;
    if (store.getters['auth/getAccessToken'] && status === 401) {
      store.dispatch('auth/refreshToken');
    } else if (status === 404) {
      throw error.response;
    } else {
      store.dispatch('auth/login');
    }
  });
};

export default plugin;
