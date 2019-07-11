import vueRouter from 'vue-router';
import routes from '@/config/routeMenu';
import Vue from 'vue'
Vue.use(vueRouter);
const Router = new vueRouter({
  routes
})

export default Router;