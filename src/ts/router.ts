declare function require(path: string): any;
import VueRouter from 'vue-router'
let View = require('../components/View.vue');
let Upload = require('../components/Upload.vue');

const routes = [
  {
    path: '/view/:file/:key',
    name: 'view',
    component: View
  },
  {
    path: '/view/:file/:key/:options',
    name: 'view-options',
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
  {
    path: '/settings',
    component: require("../components/Settings.vue")
  },
];

const router = new VueRouter({
  base: window.location.href,
  mode: "hash",
  routes: routes
});

export { router };
