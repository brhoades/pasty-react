<template>
  <div>
    <h1>Pasty - {{ paste.real_filename }}</h1>

    <a :href=paste.base64String()>View Raw</a>
    <a class="clipboard" :data-clipboard-text=paste.getRawURL()>[clip]</a><br />
    <a :download=paste.real_filename :href=paste.base64DownloadString()>Download</a>

    <DisplayImage :paste=paste />
  </div>
</template>

<script>
 import DisplayImage from './DisplayImage'
 import Clipboard from "clipboard"
 new Clipboard('.clipboard');

 export default {
   data() {
     return {
     };
   },
   components: {
     'DisplayImage': DisplayImage
   },
   watch: {
     '$route': 'fetchData'
   },
   created() {
     const params = this.$route.params;

     if(params.options && params.options == "raw") {
       // go to the primary URL so if back is hit, we don't redirect to raw
       window.location.href = this.paste.getURL();
       window.location.href = this.paste.base64String();
     }
   },
   props: ['paste']
 }
</script>
