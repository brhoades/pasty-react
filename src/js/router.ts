import VueRouter from 'vue-router'
import View from '../View.vue'
import Upload from '../Upload.vue'

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
