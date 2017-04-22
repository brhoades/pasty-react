<template>
  <div id="">
    Filename: <input v-model="data.name" placeholder="helloworld.rb" type="text"></input>
    <br />
    <textarea v-model="data.contents" placeholder="puts 'Hello World'" class="code-input">
    </textarea>
    <br />
    File type: <select v-model="data.type">
    </select>
  </div>
</template>


<script>
 export default {
   data() {
     return {
     }
   },
   props: ['data']
 }
</script>

<style>
</style>
