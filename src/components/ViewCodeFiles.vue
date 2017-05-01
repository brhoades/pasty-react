<template>
  <div>
    <div v-for="file in files">
      <ViewCodeFile @highlightupdate="$emit('highlightupdate')" :file="file"/>
    </div>
  </div>
</template>

<script>
 import ViewCodeFile from './ViewCodeFile.vue'
 import Settings from '../js/settings.ts'

 export default {
   components: {
     'ViewCodeFile': ViewCodeFile
   },
   props: ['files'],
   data() {
     let settings = new Settings($);

     $("#hljs-theme").attr("href", `dist/assets/hljs-themes/${settings.theme}`);

     return {
     };
   }
 }
</script>
