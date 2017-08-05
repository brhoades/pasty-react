<template>
  <div id="paste-file">
    <div id="content-paste-file" v-if="waiting">
      <form class="pure-form pure-form-stacked">
        <input ref="fileinput" type="file" hidden multiple />
        <div v-for="(file, i) in paste.files">
          <CodeFileInput
            class="file-spaced"
            v-if="isCodeInput(file)"
            :data="file"
            v-on:delete="deleteFile(i)"
          />
          <FileInput
            class="file-spaced"
            :file="file"
            v-on:delete="deleteFile(i)"
            v-else
          />
        </div>
        <button class="pure-button" v-on:click="addCodeFile();">
          <i class="icon-plus"></i>
          Add Text Input
        </button>
        <button class="pure-button" v-on:click="uploadFile();">
          <i class="icon-plus"></i>
          Add Files
        </button>
        <button class="pure-button" v-on:click="submit();">Paste</button>
      </form>
    </div>
    <div class="vertical-center-parent" v-else-if="uploading">
      <div class="vertical-center-child">
        <Spinner v-bind:message="message" />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
 import { Paste, File, CodeFile, PasteFile } from 'pasty-core';
 import * as client from '../ts/client';
 import CodeFileInput from './CodeFileInput.vue';
 import FileInput from './FileInput.vue';
 import Spinner from './spinner.vue';
 declare var $: any;

 export default {
   components: {
     CodeFileInput,
     Spinner,
     FileInput,
   },
   methods: {
     addCodeFile(): void {
       this.paste.files.push(CodeFile.empty());
     },
     deleteFile(index): void {
       this.paste.files.splice(index, 1);
     },
     isCodeInput(file: PasteFile | CodeFile): boolean {
       return file instanceof CodeFile;
     },
     uploadFile(): void {
       $(this.$refs.fileinput).trigger('click');
     }
   },
   data() {
     return {
       submit: () => {
         this.uploading = true;
         this.waiting = false;

         const state = {
           message: (message: string) => {
             this.message = message;
           }
         };

         client.uploadCodeFiles(this.paste, state);
       },
       paste: Paste.empty(),
       waiting: true,
       uploading: false,
       message: 'Encrypting...'
     };
   },
   mounted() {
     $(this.$refs.fileinput).change(() => {
       for (let f of this.$refs.fileinput.files) {
         const reader: FileReader = new FileReader();
         const paste = this.paste;
         reader.readAsDataURL(f);

         reader.addEventListener('load', () => {
           let res = reader.result;
           const byteString: string = reader.result.split(',')[1];

           if (File.isReadable(f.type)) {
             paste.files.push(
               new CodeFile(paste.files.length, f.name, atob(byteString).toString(),
                            'auto', f.type)
             );
           } else {
             paste.files.push(
               new PasteFile(paste.files.length, f.name, byteString, f.type)
             );
           }
         });
       }

       this.$refs.fileinput.value = '';
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
