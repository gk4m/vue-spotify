import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/views/HomeView'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    }
  ]
});
export default router;
