<template>
  <div>
    <div v-for="file in paste.files">
      <ViewCodeFile
          v-if="file.meta.mime === 'text/plain'"
          @highlightupdate="updateURL()"
          :file="file"
      />
      <ViewUploadedFile v-else :file="file" />
    </div>
  </div>
</template>


<script lang="ts">
 import {Vue, Component, Watch, Lifecycle} from 'av-ts'

 import * as client from '../ts/client';
 import { CodeFile, Paste } from 'pasty-core'
 import {serializeLineNumbers, unserializeLineNumbers} from '../ts/code-helpers'
 import Spinner from './spinner.vue'
 import Settings from '../ts/settings'
 import ViewUploadedFile from './ViewUploadedFile.vue'
 import ViewCodeFile from './ViewCodeFile.vue'
 declare var $: any;
 declare var require: any;

 let Clipboard = require('clipboard');
 new Clipboard('.clipboard');

 @Component({
   name: 'viewfiles',
   components: {
     ViewUploadedFile,
     ViewCodeFile
   },
   props: ['paste'],
 })
 export default class ViewFiles extends Vue {
   paste: Paste;

   @Lifecycle
   mounted() {
     let settings = new Settings($);

     $("#hljs-theme").attr("href", `assets/hljs-themes/${settings.theme}`);
   }

   updateURL() {
     const highlightedlines = this.paste.files.map((e) => {
       if (e instanceof CodeFile) {
         return serializeLineNumbers(e.highlighted);
       }

       return '';
     }).join(";");

     this.$router.replace({
       name: highlightedlines ? 'view-options': 'view',
       params: {
         options: highlightedlines,
         key: this.$route.params.key,
         file: this.$route.params.file
       }
     });
   }
 }
</script>


<style>
</style>
