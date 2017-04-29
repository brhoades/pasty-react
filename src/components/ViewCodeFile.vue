<template>
  <div>
    <h2>{{ file.name || `unnamed-file-${file.id}` }}</h2>

    <a :download=file.name :href=file.base64DownloadString()>Download</a>
    <pre v-if="!file.type || file.type == 'auto'"><code ref="code">{{ file.contents }}</code></pre>
      <pre v-else><code :class=file.type ref="code">{{ file.contents }}</code></pre>
  </div>
</template>

<script>
 import {splitWithLineNumbers, registerClickHandlers} from '../js/code-helpers.ts'
 export default {
   props: ['file'],
   mounted() {
     hljs.highlightBlock(this.$refs.code);
     this.$refs.code.innerHTML = splitWithLineNumbers(this.$refs.code.innerHTML);
     let bgcolor = $('.hljs').css('background-color');
     console.log(`bgcolor: ${bgcolor}`);
     $(this.$refs.code).find('tr').css('background', bgcolor);
     $(this.$refs.code).css('background', 'transparent');

     registerClickHandlers(this.file.id, this.$refs.code);
   },
   data () {
     return {
     };
   },
 }
</script>

<style>
  pre code {
    font-family: "Sans Mono", "Consolas", "Courier", monospace;

    min-height: 300px;

    overflow: hidden;
    white-space: pre-wrap;       /* css-3 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
  }

 .cv--line-number {
   padding-right: 0.5em;
   padding-left: 1em;
   cursor: pointer;

    user-select: none; /* CSS3 (little to no support) */
    -ms-user-select: none; /* IE 10+ */
    -moz-user-select: none; /* Gecko (Firefox) */
    -webkit-user-select: none; /* Webkit (Safari, Chrome) */
 }

 .cv--code {
   padding-left: 1em;
   border-style: solid;
   border-width: 0px 0px 0px 1px;
   border-color: #525252;
   padding-right: 1em;
 }

 @keyframes highlight {
   0% {
     filter: grayscale(0) opacity(1) saturate(0);
   }
   100% {
     filter: grayscale(0.3) opacity(0.9) saturate(9);
   }
 }

 .cv--highlighted {
   animation-name: highlight;
   animation-duration: 0.25s;
   animation-iteration-count: 1;
   animation-direction: alternate;
   animation-timing-function: ease-out;
   animation-fill-mode: forwards;
   animation-delay: 0s;
 }

 .cv--row {
    padding-top: 0.5em !important;
    padding-bottom: 0.25em !important;
 }

 .cv--table, .cv--row {
   width: 100%;
 }
</style>
