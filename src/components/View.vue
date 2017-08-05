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
    </div>
    <div class="vertical-center-parent" v-if="loading">
      <div class="vertical-center-child">
        <Spinner v-bind:message="message"/>
      </div>
    </div>

    <div v-else-if="paste == null">
      Unknown error
    </div>

    <div v-else-if="error">
      {{ error }}
    </div>

    <div v-else>
      <ViewFiles :paste="paste" />
    </div>
  </div>
</template>


<script lang="ts">
 import { Vue, Component, Watch, Lifecycle } from 'av-ts'

 import * as client from '../ts/client';
 import { CodeFile, Paste } from 'pasty-core';
 import { serializeLineNumbers, unserializeLineNumbers } from '../ts/code-helpers';
 import ViewFiles from './ViewFiles.vue';
 import Spinner from './spinner.vue';
 import Settings from '../ts/settings';
 declare var $: any;
 declare var require: any;

 let Clipboard = require('clipboard');
 new Clipboard('.clipboard');

 @Component({
   name: 'view',
   components: {
     Spinner,
     ViewFiles,
   }
 })
 export default class View extends Vue {
   paste: null | Paste = null;
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
       data: (paste: Paste) => {
         this.paste = paste;
         this.loading = false;

         // attach highlighted lines to corresponding files
         if (params.options && paste) {
           const highlights: string[] = params.options.split(";");

           if (highlights.length == paste.files.length) {
             highlights.map((hl, i) => {
               if (paste.files[i] instanceof CodeFile) {
                 (<CodeFile>paste.files[i]).highlighted = unserializeLineNumbers(hl);
               } else {
                 throw new Error(`File ${i} is not a code file.`);
               }
             });
           }
         }
       }
     };

     client.view(params.file, params.key, state);
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
