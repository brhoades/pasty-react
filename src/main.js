import View from './View.vue'
import Upload from './Upload.vue'
import Vue from 'vue'
import VueClip from 'vue-clip'

Vue.use(VueClip);

const client = require('./js/client');

if(client.isView()) {
  new Vue({
    el: '#app',
    render: h => h(View)
  });

  client.viewHook();
} else {
  new Vue({
    el: '#app',
    render: h => h(Upload)
  });
}
