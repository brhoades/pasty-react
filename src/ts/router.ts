declare function require(path: string): any;
import VueRouter from 'vue-router';
import View from '../components/View.vue';
import Paste from '../components/Paste.vue';
import About from '../components/About.vue';

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
    path: '/',
    component: Paste
  },
  {
    path: '/settings',
    component: require("../components/Settings.vue")
  },
  {
    path: '/about',
    component: About
  },
];

const router = new VueRouter({
  base: window.location.href,
  mode: "hash",
  routes: routes
});

export { router };
