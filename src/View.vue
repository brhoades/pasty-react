<template>
  <div>
    <div class="vertical-center-parent" v-if="loading">
      <div class="vertical-center-child">
        <Spinner v-bind:message="message"/>
      </div>
    </div>

    <div v-else-if="error">
      {{ error }}
    </div>

    <div v-else-if="pasteFile">
      <ViewUploadedFile :paste="paste"/>
    </div>
    <div v-else-if="pasteCode">
      Code!

    </div>
  </div>
</template>


<script>
 import Spinner from './spinner.vue'
 import ViewUploadedFile from './ViewUploadedFile.vue'
 const client = require("./js/client.ts");
 new Clipboard('.clipboard');

 export default {
   components: {
     'Spinner': Spinner,
     'ViewUploadedFile': ViewUploadedFile,
   },
   watch: {
     '$route': 'fetchData'
   },
   data () {
     return {
       loading: true,
       paste: null,
       error: null,
       pasteFile: false,
       pasteCode: false,
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
           console.log(data[0]);
           console.log(data.type);
           this.pasteFile = data.type == "file";
           this.pasteCode = data.type == "code";
           this.loading = false;
         }
       };

       client.view(params.file, params.key, state);
     }
   }
 }
</script>

<style>
</style>
