<template>
  <div id="paste-file">
    <h2>Pasty</h2>

    <textarea class="code-input">
    </textarea>
    <br />
    <select>
    </select>
    <button style="margin-top: 30px;" v-on:click="submit();">Paste</button>
  </div>
</template>


<script>
 const client = require("./js/client.ts");

 export default {
   components: {
   },
   data() {
     return {
       submit: () => {
         console.log("HELLO WORLD");
       },
     }
   }
 }
</script>

<style>
 .upload-action.is-dragging {
   background: green;
 }
</style>
