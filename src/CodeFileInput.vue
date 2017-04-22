<template>
  <div id="">
    Filename: <input v-model="filetype" placeholder="helloworld.rb" type="text"></input>
    <br />
    <textarea placeholder="puts 'Hello World'" class="code-input">
    </textarea>
    <br />
    File type: <select>
    </select>
  </div>
</template>


<script>
 export default {
   data() {
     return {
       filetype: "",
       contents: "",
       id: -1
     }
   }
 }
</script>

<style>
</style>
