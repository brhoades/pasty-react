<template>
  <div class="code-file-input container">
    <fieldset>
      <label for="filename">
        Filename
      </label>
      <input id="filename" v-model="data.name" placeholder="helloworld.rb" type="text"></input>
      <div v-on:click="$emit('delete')" class="icon-delete">
        <i class="icon-minus"></i>
      </div>
      <br />
      <textarea
          ref="code"
          id="code"
          v-on:blur="checkContent();"
          v-on:focus="checkContent();"
          v-model="data.contents"
          placeholder="puts 'Hello World'"
      >
      </textarea>
      <br />
      <label for="filetype">File type</label>
      <select id="filetype" v-model="data.type">
        <option value="auto" selected="">--auto--</option>
        <option v-for="option in options" :value="option">
          {{ option }}
        </option>
      </select>
    </fieldset>
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
   methods: {
     checkContent() {
       // workaround for vimperator. Check if #code has changed
       // every so often and fire an input if it doesn't reflect
       // our model
       let code = this.$refs.code;

       if(this.data.contents != code.value) {
         code.dispatchEvent(new Event('input'));
       }
     }
   },
   props: ['data']
 }
</script>

<style>
 .icon-delete {
   color: red;
   display: inline;
   padding: 2px;
   cursor: pointer;
 }

 #filename {
   display: inline-block;
 }

 #code {
   width: 90%;
   heigth: auto;
   min-height: 60vh;
 }

 @media (max-width: 62em) {
   #code {
     width: 90%;
     min-width: 300px;
   }
 }
</style>
