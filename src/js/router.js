import VueRouter from 'vue-router'
import View from '../View.vue'
import Upload from '../Upload.vue'

const routes = [
  {
    path: '/',
    component: Upload
  },
  {
    path: '/view/:file/:key',
    component: View
  }
];

const router = new VueRouter({
  routes /*{
    history: false,
    hashbang: true  // Do not store history in the browser
  }*/
});

module.exports = {
  router: router
};
