declare function require(path: string): any;
import VueRouter from 'vue-router'
let View = require('../View.vue');
let Upload = require('../Upload');

const routes = [
  {
    path: '/view/:file/:key',
    component: View
  },
  {
    path: '/view/:file/:key/:options',
    component: View
  },
  {
    path: '/up/:type',
    component: Upload
  },
  {
    path: '/',
    component: Upload
  },
];

const router = new VueRouter({
  base: window.location.href,
  mode: "hash",
  routes: routes
});

export { router };
