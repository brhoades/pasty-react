<template>
  <div class="vertical-center-parent" v-if="loading">
    <div class="vertical-center-child">
      <spinner v-bind:message="message"></spinner>
    </div>
  </div>

  <div v-else-if="error">
    {{ error }}
  </div>

  <div v-else-if="paste">
    <h1>Pasty - {{ paste.name }}</h1>

    <a :href=paste.fileDataB64()>View Raw</a>
    <button class="btn" data-clipboard-text={paste.getURL()}>[clip]</button><br />
    <a :download=paste.name :href=paste.fileDataB64Download()>Download</a>
  </div>
</template>


<script>
 import Spinner from './spinner.vue'
 const client = require("./js/client.js");

 export default {
   components: {
     'spinner': Spinner
   },
   watch: {
     '$route': 'fetchData'
   },
   data () {
     return {
       loading: true,
       paste: null,
       error: null,
       message: "Initializing..."
     };
   },
   created () {
     this.fetchData();
   },
   methods: {
     fetchData () {
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

           if(params.options && params.options == "raw") {
             window.location.href = data.fileDataB64();
           }
         }
       };

       client.view(params.file, params.key, state);
     }
   }
 }
</script>

<style>
</style>

<file-view>
  <h1 id="header">Pasty</h1>
  <div id="content"></div>
  <div id="links">
    <a id="download">Download</a>&nbsp;
    <a id="download-clp">[clip]</a><br />

    <a id="view">View</a>&nbsp;
    <a id="view-clp">[clip]</a><br />

    <a id="overview">Overview (this page)</a>&nbsp;
    <a id="overview-clp">[clip]</a><br />
  </div>
</file-view>
