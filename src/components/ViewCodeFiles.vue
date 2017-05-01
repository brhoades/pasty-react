<template>
  <div>
    <div v-for="file in files">
      <ViewCodeFile @highlightupdate="$emit('highlightupdate')" :file="file"/>
    </div>
  </div>
</template>

<script>
 import ViewCodeFile from './ViewCodeFile.vue'

 export default {
   components: {
     'ViewCodeFile': ViewCodeFile
   },
   props: ['files'],
   data() {
     return {
     };
   }
 }
</script>
