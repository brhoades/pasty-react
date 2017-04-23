<template>
  <div style="padding: 25px; max-width: 800px;">
    <h2>{{ file.name || `unnamed-file-${file.id}` }}</h2>

    <a :download=file.name :href=file.base64DownloadString()>Download</a>
    <pre v-if="!file.type || file.type == 'auto'"><code ref="code">{{ file.contents }}</code></pre>
      <pre v-else><code :class=file.type ref="code">{{ file.contents }}</code></pre>
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
