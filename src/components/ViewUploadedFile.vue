<template>
  <div>
    <h1>{{ paste.real_filename }}</h1>

    <br />
    <a :href=paste.base64String()>View Directly</a>
    <a class="clipboard" :data-clipboard-text=paste.getRawURL()>[clip]</a><br />

    <DisplayImage :paste=paste />
  </div>
</template>

<script lang="ts">
 import DisplayImage from './DisplayImage.vue'

 export default {
   components: {
     'DisplayImage': DisplayImage
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

<style>
 h1 {
   display: inline-block;
   margin-top: 0;
 }
</style>
