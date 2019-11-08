import request from './request';

const createRequestInterceptor = (store) => {
  request.interceptors.request.use(function (config) {
    if (store.getters['auth/getAccessToken']) {
      config.headers.common['Authorization'] = `Bearer ${store.getters['auth/getAccessToken']}`;
    }
    return config;
  }, null);
}

const createResponseInterceptor = (store) => {
 request.interceptors.response.use(null, async (error) => {
    const {status, data} = error.response;
    
     if (status === 403 && data.error.reason === "PREMIUM_REQUIRED") {
        store.dispatch('notification/add', {
          type: 'warning',
          message: 'You need to have premium account.',
        })
      }

     // reject promise if custom error
     if (status !== 401) {
        return Promise.reject(error)
     }

     try {
      store.dispatch('auth/refreshToken')
     } catch(e) {
       console.error(e)
     }
  });
}


const plugin = store => {
  createRequestInterceptor(store)
  createResponseInterceptor(store)
};

export default plugin;
