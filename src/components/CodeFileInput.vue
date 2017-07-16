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
          v-on:blur="checkContent(); checkType();"
          v-on:focus="checkContent();"
          v-model="data.contents"
          placeholder="puts 'Hello World'"
      >
      </textarea>
      <br />
      <label for="filetype">File type</label>
      <select id="filetype" v-model="data.type" v-on:click="setManualType()">
        <option value="auto" selected="">--auto--</option>
        <option value="plain">--plain--</option>
        <option v-for="option in options" :value="option">
          {{ option }}
        </option>
      </select>
    </fieldset>
  </div>
</template>


<script lang="ts">
 declare var hljs: any;

 export default {
   data() {
     let options = hljs.listLanguages();

     return {
       options: options,
       manualType: false
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
     },
     checkType() {
       // things get slow when it gets larger
       if(this.$refs.code.value.length > 1000 || this.data.type == 'plain'
          || this.manualType) {
         return;
       }

       let res = hljs.highlightAuto(this.$refs.code.value);

       this.data.type = res.language;
     },
     setManualType() {
       // if the type is user set to something other than auto, do not automatically set
       // the type.
       this.manualType = this.data.type != 'auto';
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
   font-family: "Sans Mono", "Consolas", "Courier", monospace;
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
