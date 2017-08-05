<template>
  <div id="paste-file">
    <div id="content-paste-file">
      <form class="pure-form pure-form-stacked">
        <div v-for="(file, i) in paste.files">
          <CodeFileInput
            :data="file"
            v-on:delete="deleteFile(i);"
          />
        </div>
        <button class="pure-button" v-on:click="addEmptyFile();">
          <i class="icon-plus"></i>
          Add Another File
        </button>
        <button class="pure-button" v-on:click="submit();">Paste</button>
      </form>
    </div>
  </div>
</template>


<script lang="ts">
 import { Paste, CodeFile } from "pasty-core"
 import * as client from "../ts/client"
 import CodeFileInput from "./CodeFileInput.vue"

 export default {
   components: {
     "CodeFileInput": CodeFileInput
   },
   methods: {
     defaultFile() {
       return CodeFile.empty();
     },
     addFile() {
       this.paste.files.push(this.defaultFile());
     },
     deleteFile(index) {
       this.paste.files.splice(index, 1);
     }
   },
   data() {
     let data = {
       addEmptyFile: () => {
         this.addFile();
       },
       submit: () => {
         // TODO: Implement submit here.
         let state = {
           message: () => {}
         };

         client.uploadCodeFiles(this.paste, state);
       },
       paste: Paste.empty(),
     };

     data.paste.files.push(this.defaultFile());

     return data;
   }
 }
</script>

<style>
</style>
