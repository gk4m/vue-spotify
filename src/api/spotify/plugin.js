import request from './request';

let isFetchingToken = false;

const plugin = store => {
  request.interceptors.request.use(function (config) {
    if (store.getters['auth/getAccessToken']) {
      config.headers.common['Authorization'] = `Bearer ${store.getters['auth/getAccessToken']}`;
    }
    return config;
  }, null);

  request.interceptors.response.use(null, (error) => {
    const {status} = error.response;

    if (store.getters['auth/getAccessToken'] && status === 401 && !isFetchingToken) {
      isFetchingToken = true;
      store.dispatch('auth/refreshToken').then(()=>{
        isFetchingToken = false;
        location.reload();
      });
    } else if (status === 404) {
      throw error.response;
    } else if (status === 403) {
      console.warn('403 - You need to have premium account')
    } else {
      store.dispatch('auth/login');
    }
  });
};

export default plugin;
