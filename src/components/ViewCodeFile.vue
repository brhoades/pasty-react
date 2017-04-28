<template>
  <div>
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

<style>
  pre code {
    padding-left: 1em !important;
    padding-right: 1em !important;
    padding-top: 0.5em !important;
    padding-bottom: 2em !important;
    font-family: "Sans Mono", "Consolas", "Courier", monospace;

    overflow: hidden;
    white-space: pre-wrap;       /* css-3 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
  }
</style>
