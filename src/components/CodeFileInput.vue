<template>
  <div class="code-file-input container">
    <Card @delete="$emit('delete')" :file="data">
      <fieldset>
        <div class="left-input">
          <label for="filename">
            Filename
          </label>
          <input id="filename" v-model="data.name" :placeholder="data.getName()" type="text"></input>
        </div>
        <div class="right-input">
          <label for="filetype">File type</label>
          <LanguageSelector
             @change="value => {highlight = value}"
            :highlight="data.meta.highlight"
            :languages="languages"
          />
        </div>
        <textarea
            ref="code"
            id="code"
            v-on:blur="checkContent(); checkType();"
            v-on:focus="checkContent();"
            v-model="data.data"
            placeholder="puts 'Hello World'"
        >
        </textarea>
      </fieldset>
    </Card>
  </div>
</template>

<script lang="ts">
 declare var hljs: any;
 declare var $: any;
 import Card from './Card.vue';
 import LanguageSelector from './LanguageSelector.vue';
 import Settings from '../ts/settings';
 import { registerLanguage } from '../ts/code-helpers';

 export default {
   components: {
     Card,
     LanguageSelector,
   },
   data() {
     let settings: Settings = new Settings($);
     registerLanguage(hljs);
     hljs.configure({
       languages: settings.languages
     });

     return {
       manualType: false,
       languages: settings.languages,
     }
   },
   methods: {
     checkContent() {
       // workaround for vimperator. Check if #code has changed
       // every so often and fire an input if it doesn't reflect
       // our model
       let code = this.$refs.code;

       if(this.data.data != code.value) {
         code.dispatchEvent(new Event('input'));
       }
     },
     checkType() {
       // things get slow when it gets larger
       if(this.$refs.code.value.length > 1000 || this.data.meta.highlight == 'plain'
          || this.manualType) {
         return;
       }

       let res = hljs.highlightAuto(this.$refs.code.value);
       if (res.language) {
         this.data.meta.highlight = res.language;
       } else {
         this.data.meta.highlight = "auto";
       }
     },
     setManualType() {
       // if the type is user set to something other than auto, do not automatically set
       // the type.
       this.manualType = this.data.meta.highlight != 'auto';
     }
   },
   props: ['data']
 }
</script>

<style>
 #filename {
   display: inline-block;
 }

 #code {
   font-family: "Sans Mono", "Consolas", "Courier", monospace;
   width: 100%;
   height: auto;
   min-height: 60vh;
 }

 @media (max-width: 62em) {
   #code {
     width: 100%;
     min-width: 300px;
   }
 }

 .left-input {
   display: inline-block;
 }

 .right-input {
   display: inline-block;
   float: right;
 }
</style>
