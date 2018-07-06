import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import Icon from 'vue-awesome/components/Icon'

import './directives';
import 'optiscroll';
import 'vue-awesome/icons';

Vue.component('icon', Icon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
