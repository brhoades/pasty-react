<template>
  <div>
    CODE FILE!
    {{ file.name }}
    <pre>
      <code ref="code">
        {{ file.contents }}
      </code>
    </pre>
  </div>
</template>


<script>
 export default {
   props: ['file'],
   mounted() {
     hljs.highlightBlock(this.$refs.code);
   },
   data () {
     return {
     };
   },
 }
</script>

<style>
</style>
