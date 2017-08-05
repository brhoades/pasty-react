<template>
  <div>
    <div v-for="file in paste.files" class="file-spaced">
      <ViewCodeFile
        v-if="file.isReadable()"
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
 import ViewUploadedFile from './ViewUploadedFile.vue'
 import ViewCodeFile from './ViewCodeFile.vue'
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
 .file-spaced {
   padding-top: 1em;
   padding-bottom: 1em;
 }
</style>
