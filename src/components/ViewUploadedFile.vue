<template>
  <div>
    <h1>{{ file.getName() }}</h1>
    <a
        class="icon--link"
        alt="Download this file"
        title="Download this file"
        :download=file.name
        :href=file.base64DownloadString()
    >
      <i class="icon-download-cloud icon--scaling"></i>
    </a>
    <br />
    <a :href=file.base64ViewString()>View Directly</a>

    <DisplayImage :file="file" />
  </div>
</template>

<script lang="ts">
 import DisplayImage from './DisplayImage.vue'

 export default {
   components: {
     'DisplayImage': DisplayImage
   },
   props: ['file']
 }
</script>

<style>
 h1 {
   display: inline-block;
   margin-top: 0;
 }
</style>
