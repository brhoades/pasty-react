import Vue from 'vue'
import VueRouter from 'vue-router'
import { router } from './ts/router'

Vue.use(VueRouter);

const app = new Vue({
  router
}).$mount("#app");
