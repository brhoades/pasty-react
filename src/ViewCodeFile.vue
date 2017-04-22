<template>
  <div style="padding: 25px; max-width: 800px;">
    <h2>{{ file.name }}</h2>
    <pre><code ref="code">{{ file.contents }}</code></pre>
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
 pre code {
   padding-left: 1em !important;
   padding-right: 1em !important;
   padding-top: 2em !important;
   padding-bottom: 2em !important;
 }
</style>
