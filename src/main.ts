import Vue from 'vue'
import VueRouter from 'vue-router'
import VueClip from 'vue-clip'
import { router } from './js/router'

Vue.use(VueRouter);
Vue.use(VueClip);


const app = new Vue({
  router
}).$mount("#app");
