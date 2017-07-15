<template>
  <div id="upload-file">
    <vue-clip :options="options" v-if="waiting">
      <template slot="clip-uploader-action" scope="params">
        <div v-bind:class="{'is-dragging': params.dragging}" class="upload-action">
          <div class="dz-message"><h2>Click or drag and drop files here to upload</h2></div>
        </div>
      </template>
    </vue-clip>

    <div class="vertical-center-parent" v-else-if="uploading">
      <div class="vertical-center-child">
        <Spinner v-bind:message="message" />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
 import Spinner from './spinner.vue'
 import * as client from '../ts/client'

 export default {
   components: {
     Spinner
   },
   params: ['dragging', 'message'],
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
           this.message = "Encrypting...";

           let state = {
             message: (msg) => {
               this.message = msg;
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
       }
     }
   }
 }
</script>

<style>
 #upload-file {
   text-align: center;
 }

 .is-dragging {
   background-color: #aaafb1;
   transition: background .25s linear;
   -moz-transition: background .25s linear;
   -webkit-transition: background .25s linear;

   border-radius: 10px;
 }

 .upload-action {
   height: 80vh; /* Relative height on #upload-file fails */
   padding-top: 3vh;

   transition: background .25s linear;
   -moz-transition: background .25s linear;
   -webkit-transition: background .25s linear;
 }
</style>
