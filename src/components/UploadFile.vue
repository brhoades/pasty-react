<template>
  <div id="upload-file">
    <vue-clip :options="options" v-if="waiting">
      <template slot="clip-uploader-action">
        <div v-bind:class="{'is-dragging': params.dragging}" class="upload-action">
          <div class="dz-message"><h2>Click or drag and drop files here to upload</h2></div>
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


<script lang="ts">
 import Spinner from './spinner.vue'
 import * as client from '../js/client'

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

           client.uploadFileHook(file, state);
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
  #upload-file {
    text-align: center;
  }
</style>
