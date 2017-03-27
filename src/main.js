import View from './View.vue'
import Upload from './Upload.vue'
import Vue from 'vue'

const client = require('./js/client');

if(client.isView()) {
  new Vue({
    el: '#app',
    render: h => h(Upload)
  });

  client.viewHook();
} else {
  new Vue({
    el: '#app',
    render: h => h(Upload)
  });

  client.uploadHook();
}
