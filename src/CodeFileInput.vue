<template>
  <div id="">
    Filename: <input v-model="data.name" placeholder="helloworld.rb" type="text"></input>
    <br />
    <textarea v-model="data.contents" placeholder="puts 'Hello World'" class="code-input">
    </textarea>
    <br />
    File type: <select v-model="data.type">
      <option value="auto" selected="">--auto--</option>
      <option v-for="option in options" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>


<script>
 export default {
   data() {
     let options = hljs.listLanguages();

     return {
       options: options
     }
   },
   props: ['data']
 }
</script>
