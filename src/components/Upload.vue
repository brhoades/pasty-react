<template>
  <div id="upload">
    <div v-if="upload">
      <UploadFile/>
    </div>
    <div v-else>
      <PasteCode/>
    </div>
  </div>
</template>

<script>
 import UploadFile from "./UploadFile.vue"
 import PasteCode from "./PasteCode.vue"

 export default {
   components: {
     'UploadFile': UploadFile,
     'PasteCode': PasteCode
   },
   watch: {
     '$route': 'updateView'
   },
   data() {
     return {
       'upload': false
     }
   },
   methods: {
     updateView() {
       const params = this.$route.params;

       this.upload = params.type == "up";
     }
   },
   created() {
     this.updateView();
   }
 }
</script>

<style>
</style>
