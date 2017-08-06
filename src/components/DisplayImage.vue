<template>
  <div class="viewimage" v-if="canDisplay(file)">
    <img class="pure-img" :src=file.base64ViewString() />
  </div>
</template>

<script lang="ts">
 export default {
   props: ['file'],
   methods: {
     canDisplay(file) {
       return /^image/.test(file.meta.mime);
     }
   }
 };
</script>

<style>
 .viewimage {
   overflow: none;
 }

 .viewimage > img {
   margin: auto;

   max-width: 95%;
   height: auto;
   resize: both;
 }
</style>
