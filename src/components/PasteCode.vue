<template>
  <div id="paste-file">
    <div id="content-paste-file" v-if="waiting">
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
    <div class="vertical-center-parent" v-else-if="uploading">
      <div class="vertical-center-child">
        <Spinner v-bind:message="message" />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
 import { Paste, CodeFile } from "pasty-core"
 import * as client from "../ts/client"
 import CodeFileInput from "./CodeFileInput.vue"
 import Spinner from './spinner.vue';

 export default {
   components: {
     CodeFileInput,
     Spinner,
   },
   methods: {
     defaultFile(): CodeFile {
       return CodeFile.empty();
     },
     addFile(): void {
       this.paste.files.push(this.defaultFile());
     },
     deleteFile(index): void {
       this.paste.files.splice(index, 1);
     }
   },
   data() {
     let data = {
       addEmptyFile: () => {
         this.addFile();
       },
       submit: () => {
         this.uploading = true;
         this.waiting = false;

         const state = {
           message: (message: string) => {
             this.message = message;
           }
         };

         client.uploadCodeFiles(this.paste, state);
       },
       paste: Paste.empty(),
       waiting: true,
       uploading: false,
       message: 'Encrypting...'
     };

     data.paste.files.push(this.defaultFile());

     return data;
   }
 }
</script>

<style>
</style>
