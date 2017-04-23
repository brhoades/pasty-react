<template>
  <div class="viewimage" v-if="canDisplay(paste)">
    <img :src=paste.base64String() />
  </div>
</template>

<script>
 export default {
   data() {
     return {
     };
   },
   props: ['paste'],
   methods: {
     canDisplay(paste) {
       console.log(paste.mime);
       return /^image/.test(paste.mime);
     }
   }
 };
</script>
