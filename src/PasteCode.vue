<template>
  <div id="paste-file">
    <h2>Pasty</h2>

    <div id="content-paste-file">
      <form class="pure-form">
        <div v-for="file in files">
          <CodeFileInput :data="file"/>
        </div>
        <button class="pure-button" v-on:click="addEmptyFile();">Add Another File</button>

        <button class="pure-button" v-on:click="submit();">Paste</button>
      </form>
    </div>
  </div>
</template>


<script>
 const client = require("./js/client.ts");
 import CodeFile from "./js/codefile.ts"
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
