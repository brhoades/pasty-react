<template>
  <div>
    <div v-if="waiting">
      <div v-if="dragging" class="dragging" @dragover.prevent>
        <div class="vertical-center-parent">
          <h2 class="vertical-center-child">Drop files here to upload.</h2>
        </div>
      </div>
      <div v-else>
        <div v-if="paste.files.length === 0">
          <h2>Drop files here or click a button to begin.</h2>
        </div>
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
          <button class="pure-button" v-if="paste.files.length > 0" v-on:click="submit();">Paste</button>
        </form>
      </div>
      <div class="vertical-center-parent" v-else-if="uploading">
        <div class="vertical-center-child">
          <Spinner v-bind:message="message" />
        </div>
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

 // TODO move elsewhere.
 // The plugin code for draghover
 // https://stackoverflow.com/a/10310815
 $.fn.draghover = function(options) {
   return this.each(() => {
     var collection = $(),
         self = $(this);

     self.off('dragenter').on('dragenter', function(e) {
       if (collection.length === 0) {
         self.trigger('draghoverstart');
       }
       collection = collection.add(e.target);
     });

     self.off('dragleave').on('dragleave', function(e) {
       collection = collection.not(e.target);
       if (collection.length === 0) {
         self.trigger('draghoverend');
       }
     });

     self.off('drop').on('drop', function(e) {
       e.preventDefault();
       e.stopPropagation();
       collection = $();
       self.trigger('draghoverdrop', e);
     });
   });
 };

 export default {
   components: {
     CodeFileInput,
     Spinner,
     FileInput,
   },
   methods: {
     addCodeFile(): void {
       let file: CodeFile = CodeFile.empty();
       file.id = this.paste.files.length;

       this.paste.files.push(file);
     },
     deleteFile(index): void {
       this.paste.files.splice(index, 1);
     },
     isCodeInput(file: PasteFile | CodeFile): boolean {
       return file instanceof CodeFile;
     },
     uploadFile(): void {
       $(this.$refs.fileinput).trigger('click');
     },
     readFile(f, cb) {
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

         if (cb) {
           cb()
         }
       });
     },
     readFiles(files, cb) {
       for (let i=0; i<files.length; i++) {
         if (i == files.length-1) {
           this.readFile(files[i], cb);
         } else {
           this.readFile(files[i]);
         }
       }
     },
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
       message: 'Encrypting...',
       dragging: false,
     };
   },
   mounted() {
     $(window).draghover().on({
       'draghoverstart': () => {
         this.dragging = true;
       },
       'draghoverend': () => {
         this.dragging = false;
       },
       'draghoverdrop': (ev, dropev) => {
         this.dragging = false;
         let files = dropev.dataTransfer.files;

         if (files) {
           this.readFiles(files);
         }
       }
     });

     $(this.$refs.fileinput).change((ev) => {
       this.readFiles(ev.target.files, () => {
         ev.target.value = '';
       });
     });
   },
   destroy() {
     $(this.$refs.fileinput).unbind();
   },
 }
</script>

<style>
 .dragging {
   border-radius: 5px;
   border-style: dashed;
   border-width: 3px;
   border-color: black;

   -webkit-transition: height 2s; /* Safari */
   transition: height 2s;

   height: 100vh;
 }

 .dragging-inner {
   height: 100%;
   width: 100%;
 }

</style>
