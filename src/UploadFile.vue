<template>
  <div id="upload-file">
    <h2>Pasty</h2>

    <vue-clip :options="options" v-if="waiting">
      <template slot="clip-uploader-action">
        <div v-bind:class="{'is-dragging': params.dragging}" class="upload-action">
          <div class="dz-message"><h2> Click or Drag and Drop files here upload </h2></div>
        </div>
      </template>
    </vue-clip>

    <div class="vertical-center-parent" v-else-if="uploading">
      <div class="vertical-center-child">
        <spinner v-bind:message="message"></spinner>
      </div>
    </div>
  </div>
</template>


<script>
 import Spinner from './spinner.vue'
 const client = require("./js/client.ts");

 export default {
   components: {
     'spinner': Spinner
   },
   data() {
     return {
       message: "",
       uploading: false,
       waiting: true,
       client: client,
       options: {
         url: '/bad-url',
         accept: (file, done) => {
           this.waiting = false;
           this.uploading = true;

           let state = {
             message: (msg) => {
               this.loading = msg;
             },
             waiting: (status) => {
               this.waiting = status;
             },
             uploading: (status) => {
               this.uploading = status;
             }
           };

           client.uploadHook(file, state);
           return false;
         },
         uploadMultiple: false
       },
       params: {
         dragging: false
       }
     }
   }
 }
</script>

<style>
 .upload-action.is-dragging {
   background: green;
 }
</style>
