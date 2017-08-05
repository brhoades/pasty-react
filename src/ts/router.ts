declare function require(path: string): any;
import VueRouter from 'vue-router';
import View from '../components/View.vue';
import PasteCode from '../components/PasteCode.vue';
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
    path: '/up/paste',
    component: PasteCode
  },
  {
    path: '/',
    component: PasteCode
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
