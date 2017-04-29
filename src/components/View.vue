<template>
  <div>
    <div class="action-box">
      <a
          class="icon--link icon--action"
          :data-clipboard-text=getShortURL(params)
          alt="Copy shortened link to this page"
          title="Copy shortened link to this page">
        <i class="icon-clipboard icon--scaling"></i>
      </a><br />
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
       message: "Initializing...",
       getShortURL: client.getShortURL,
       params: this.$route.params
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
  // border-style: solid;
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
