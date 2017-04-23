<template>
  <div id="paste-file">
    <h2>Pasty</h2>

    <div id="content-paste-file">
      <codefileinput :data="files[0]"/>
      <button style="margin-top: 30px;" v-on:click="submit();">Paste</button>
    </div>
  </div>
</template>


<script>
 const client = require("./js/client.ts");
 import CodeFile from "./js/codefile.ts"
 import CodeFileInput from "./CodeFileInput.vue"

 export default {
   components: {
     "codefileinput": CodeFileInput
   },
   data() {
     return {
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
         (new CodeFile(0, "", "", "")).rawObject()
       ]
     }
   }
 }
</script>
