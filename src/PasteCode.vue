<template>
  <div id="paste-file">
    <h2>Pasty</h2>

    <div id="content-paste-file">
      <codefileinput :id="1"/>
      <button style="margin-top: 30px;" v-on:click="submit();">Paste</button>
    </div>
  </div>
</template>


<script>
 const client = require("./js/client.ts");
 import CodeFileInput from "./CodeFileInput.vue"

 export default {
   components: {
     "codefileinput": CodeFileInput
   },
   data() {
     return {
       submit: () => {
         console.log("HELLO WORLD");
       },
       filetype: ""
     }
   }
 }
</script>

<style>
 #content-paste-file {
   text-align: left;
   padding: 25px;
 }
</style>
