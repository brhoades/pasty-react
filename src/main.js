import View from './View.vue'
import Upload from './Upload.vue'
import Vue from 'vue'
import VueClip from 'vue-clip'

Vue.use(VueClip);

const client = require('./js/client');

if($("#view").length) {
  new Vue({
    el: '#view',
    render: h => h(View)
  });

  client.viewHook();
} else if($("#upload").length) {
  new Vue({
    el: '#upload',
    render: h => h(Upload)
  });
}
