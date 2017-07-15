declare function require(path: string): any;
import VueRouter from 'vue-router';
import View from '../components/View.vue';
import UploadFile from '../components/UploadFile.vue';
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
    path: '/up/file',
    component: UploadFile
  },
  {
    path: '/up/file/:options',
    component: UploadFile
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
