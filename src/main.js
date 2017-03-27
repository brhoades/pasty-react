import {App as View} from './View.vue'
import {App as Upload} from './Upload.vue'
import Vue from 'vue'

const client = require('./js/client');

let app;

if(client.isView()) {
  app = new Vue({
    el: '#app',
    render: h => h(View)
  });
} else {

  app = new Vue({
    el: '#app',
    render: h => h(Upload)
  });
}
