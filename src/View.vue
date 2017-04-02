<template>
  <div class="vertical-center-parent" v-if="loading">
    <div class="vertical-center-child">
      <spinner v-bind:message="message"></spinner>
    </div>
  </div>

  <div v-else-if="error">
    bad things man
    {{ error }}
  </div>

  <div v-else-if="paste">
    <h1>Pasty - {{ paste.name }}</h1>

    <a :href=paste.fileDataB64()>View Raw</a><br />
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
       this.message = "Downloading...";
       const params = this.$route.params;
       console.log(`${params.file}, ${params.key}`);

       this.error = this.post = null;
       this.loading = true;
       let error = (message) => { this.error = message; };
       let message = (message) => { this.message = message; };
       let data = (data) => {
         this.paste = data;
         this.loading = false;
       };

       client.view(params.file, params.key, message, error, data);
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
