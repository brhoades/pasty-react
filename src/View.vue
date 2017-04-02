<template>
  <div class="vertical-center-parent">
    <div class="vertical-center-child">
      <spinner></spinner>
    </div>
  </div>
</template>


<script>
 import Spinner from './spinner.vue'

 export default {
   data () {
     const client = require("./js/client.js");
     const params = this.$route.params;


     //client.view(params.file, params.key);
     return {};
   },
   components: {
     'spinner': Spinner
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
