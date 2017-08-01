<template>
  <div class="viewimage" v-if="canDisplay(paste)">
    <img class="pure-img" :src=paste.base64String() />
  </div>
</template>

<script lang="ts">
 export default {
   props: ['paste'],
   methods: {
     canDisplay(paste) {
       return /^image/.test(paste.mime);
     }
   }
 };
</script>

<style>
 .viewimage {
   overflow: none;
 }

 .viewimage > img {
   padding-top: 25px;
   margin: auto;

   max-width: 95%;
   height: auto;
   resize: both;
 }
</style>
