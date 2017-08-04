<template>
  <div id="view" ref="view">
    <div class="action-box">
      <a
          class="clipboard icon--link icon--action"
          :data-clipboard-text=getShortURL(this.$route.params)
          alt="Copy shortened link to this page"
          title="Copy shortened link to this page"
      >
        <i class="icon-clipboard icon--scaling"></i>
      </a>
      <a
          class="icon--link icon--action"
          v-if="paste && paste.type == 'file'"
          alt="Download this file"
          title="Download this file"
          :download=paste.real_filename
          :href=paste.base64DownloadString()
      >
        <i class="icon-download-cloud icon--scaling"></i>
      </a>
    </div>
    <div class="vertical-center-parent" v-if="loading">
      <div class="vertical-center-child">
        <Spinner v-bind:message="message"/>
      </div>
    </div>

    <div v-else-if="error">
      {{ error }}
    </div>

    <div v-else-if="paste.type == 'file'">
      <ViewUploadedFile :paste="paste"/>
    </div>
    <div v-else-if="paste.type == 'code'">
      <ViewCodeFiles v-on:highlightupdate="updateURL()" :files="paste.files"/>
    </div>
  </div>
</template>


<script lang="ts">
 import {Vue, Component, Watch, Lifecycle} from 'av-ts'

 import * as client from '../ts/client';
 import { CodeFile } from 'pasty-core';
 import {serializeLineNumbers, unserializeLineNumbers} from '../ts/code-helpers'
 import Spinner from './spinner.vue'
 import Settings from '../ts/settings'
 import ViewUploadedFile from './ViewUploadedFile.vue'
 import ViewCodeFiles from './ViewCodeFiles.vue'
 declare var $: any;
 declare var require: any;

 type PasteT = {
   files: CodeFile[],
 }

 let Clipboard = require('clipboard');
 new Clipboard('.clipboard');

 @Component({
   name: 'view',
   components: {
     Spinner,
     ViewUploadedFile,
     ViewCodeFiles
   }
 })
 export default class View extends Vue {
   paste: null | PasteT = null;
   loading: boolean = true;
   error: string | null = null;
   message: string = "Initializing...";

   @Lifecycle
   mounted() {
     let settings = new Settings($);

     $("#hljs-theme").attr("href", `assets/hljs-themes/${settings.theme}`);
   }

   @Lifecycle
   created() {
     const params = this.$route.params;

     this.message = "Downloading...";
     this.error = this.paste = null;
     this.loading = true;

     // restrict state access
     let state = {
       error: (message) => {
         this.error = message;
       },
       message: (message) => {
         this.message = message;
       },
       data: (data) => {
         this.paste = data;
         this.loading = false;

         // attach highlighted lines to corresponding files
         if(params.options && data && data.type == "code") {
           const highlights = params.options.split(";");

           if(highlights.length == data.files.length) {
             for(let i=0; i<highlights.length; i++) {
               data.files[i].highlighted = unserializeLineNumbers(highlights[i]);
             }
           }
         }
       }
     };

     client.view(params.file, params.key, state);
   }

   @Watch('$route')
   fetchData(to, from) {
     // todo: react to changes--- refresh page or something
   }

   updateURL() {
     const highlightedlines = this.paste.files.map((e) => {
       return serializeLineNumbers(e.highlighted);
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

   getShortURL(params: any): string {
     return client.getShortURL(params);
   }
 }
</script>


<style>
.vertical-center-parent {
  display: table;
  width: 100%;
  height: 100%;
}

.vertical-center-child {
  display: table-cell;
  vertical-align: middle;
}

.spinner-message {
  text-align: center;
}

.icon--action {
  cursor: pointer;
  float: right;
  color: black;
  opacity: 0.4;
}

.icon--link:hover {
  opacity: 0.65;
}

.icon--link:active {
  opacity: 0.9;
}

.action-box {
  width: auto;
  float: right;
  border-color: #c2c2c2;
  padding: 1px 1px 1px 1px;

  border-width: 1px 1px 1px 1px;
}

.icon--scaling:before {
  font-size: 1.25em;
}

@media (max-width: 62em) {
  .icon--scaling:before {
    font-size: 2em;
  }
}
</style>
