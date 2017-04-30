<template>
  <div>
    <div v-for="file in files">
      <ViewCodeFile @highlightupdate="update()" :file="file"/>
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
   },
   methods: {
     update() {
       this.$emit("highlightupdate");
     }
   }
 }
</script>
