<template>
  <div style="padding: 25px; max-width: 800px;">
    <h2>{{ file.name }}</h2>
    <a :download=file.name :href=file.base64DownloadString()>Download</a>
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
