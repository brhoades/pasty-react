<template>
  <div>
    <Card @delete="$emit('delete')" :file="file" :locked="!/^image/.test(file.meta.mime)">
      <DisplayImage :file="file" />
    </Card>
  </div>
</template>

<script lang="ts">
 import DisplayImage from './DisplayImage.vue'
 import Card from './Card.vue';

 export default {
   components: {
     DisplayImage,
     Card,
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
