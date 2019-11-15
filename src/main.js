import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

import Icon from "vue-awesome/components/Icon";
import VModal from "vue-js-modal";
import VueMoment from "vue-moment";
import VueLazyload from "vue-lazyload";
import vueSlider from "vue-slider-component/src/vue2-slider.vue";

import "./directives";
import "./filters";
import "optiscroll";
import "vue-awesome/icons";

Vue.component("icon", Icon);
Vue.component("vueSlider", vueSlider);

Vue.use(VModal);
Vue.use(VueMoment);
Vue.use(VueLazyload);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
