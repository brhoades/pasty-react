<template>
  <div id="paste-file">
    <div id="content-paste-file">
      <form class="pure-form pure-form-stacked">
        <div v-for="(file, i) in files">
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
 import * as client from "../ts/client"
 import CodeFile from "../ts/codefile"
 import CodeFileInput from "./CodeFileInput.vue"

 export default {
   components: {
     "CodeFileInput": CodeFileInput
   },
   methods: {
     defaultFile() {
       return new CodeFile(0, "", "", "auto");
     },
     addFile() {
       this.files.push(this.defaultFile().rawObject());
     },
     deleteFile(index) {
       this.files.splice(index, 1);
     }
   },
   data() {
     return {
       addEmptyFile: () => {
         this.addFile();
       },
       submit: () => {
         const files = this.files.map((f) => {
           return new CodeFile(f.id, f.name, f.contents, f.type);
         });

         let state = {
           message: () => {}
         };

         client.uploadCodeFiles(files, state);
       },
       files: [
         (this.defaultFile()).rawObject()
       ]
     }
   }
 }
</script>

<style>
</style>
