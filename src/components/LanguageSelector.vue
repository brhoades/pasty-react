<template>
  <select id="filetype" v-model="selection" @change="$emit('change', selection)">
    <option value="auto" selected="">--auto--</option>
    <option value="plain">--plain--</option>
    <option v-for="option in languages" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script lang="ts">
 declare var hljs: any;
 import Card from './Card.vue';

 export default {
   data() {

     return {
       selection: this.highlight,
     }
   },
   watch: {
     highlight() {
       if (this.highlight != this.selection) {
         this.selection = this.highlight;
       }
     }
   },
   props: ['highlight', 'languages'],
 }
</script>

<style>
</style>
