<template>
  <div>
    <h1>{{ file.name }}</h1>
    <div v-on:click="$emit('delete')" class="icon-delete">
      <i class="icon-minus"></i>
    </div>
    <br />

    <DisplayImage :file="file" />
  </div>
</template>

<script lang="ts">
 import DisplayImage from './DisplayImage.vue'

 export default {
   components: {
     DisplayImage,
   },
   props: ['file']
 }
</script>

<style>
 h1 {
   display: inline-block;
   margin-top: 0;
 }
 .icon-delete {
   color: red;
   display: inline;
   padding: 2px;
   cursor: pointer;
 }

</style>
