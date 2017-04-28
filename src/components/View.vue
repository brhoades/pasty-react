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

    <div v-else-if="paste.type == 'file'">
      <ViewUploadedFile :paste="paste"/>
    </div>
    <div v-else-if="paste.type == 'code'">
      <ViewCodeFiles :files="paste.files"/>
    </div>
  </div>
</template>


<script>
 import Spinner from './spinner.vue'
 import ViewUploadedFile from './ViewUploadedFile.vue'
 import ViewCodeFiles from './ViewCodeFiles.vue'
 const client = require("../js/client.ts");

 export default {
   components: {
     'Spinner': Spinner,
     'ViewUploadedFile': ViewUploadedFile,
     'ViewCodeFiles': ViewCodeFiles
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
         }
       };

       client.view(params.file, params.key, state);
     }
   }
 }
</script>
