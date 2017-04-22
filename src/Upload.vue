<template>
  <div id="upload">
    <div style="padding-bottom: 25px;">
      <a id="paste_button" style="padding-right: 30px;" v-on:click="p=true; u=false;">paste</a>
      <a id="paste_button" v-on:click="p=false; u=true;">upload</a>
    </div>
    <div v-if="u">
      <UploadFile/>
    </div>
    <div v-else-if="p">
      <PasteCode/>
    </div>
  </div>
</template>

<script>
 import UploadFile from "./UploadFile.vue"
 import PasteCode from "./PasteCode.vue"

 export default {
   components: {
     'UploadFile': UploadFile,
     'PasteCode': PasteCode
   },
   data() {
     return {
       u: true,
       p: false,
     }
   }
 }
</script>

<style>
 .code-input {
   width: 600px;
   height: 300px;
 }
</style>
