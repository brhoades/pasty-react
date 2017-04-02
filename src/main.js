import Vue from 'vue'
import VueRouter from 'vue-router'
import VueClip from 'vue-clip'

Vue.use(VueRouter);
Vue.use(VueClip);

const router = require('./js/router').router;
const client = require('./js/client');

const app = new Vue({
  router
}).$mount("#app");
