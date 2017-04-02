<template>
  <div id="upload">
    <h2>Pasty</h2>

    <vue-clip :options="options">
      <template slot="clip-uploader-action">
        <div v-bind:class="{'is-dragging': params.dragging}" class="upload-action">
          <div class="dz-message"><h2> Click or Drag and Drop files here upload </h2></div>
        </div>
      </template>

      <template slot="clip-uploader-body" scope="props">
        <div v-for="file in props.files">
          {{ file.name }} {{ file.status }}
        </div>
      </template>
    </vue-clip>
  </div>
</template>


<script>
 console.log("Upload");

 export default {
   data () {
     const client = require("./js/client.js");
     console.log("Upload inner");

     return {
       client: client,
       options: {
         url: '/bad-url',
         accept: client.uploadHook,
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
