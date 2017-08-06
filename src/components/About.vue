<template>
  <div class="about">
    <h1>Pasty</h1>
    <h4 class="subheading">HTTP Client</h4>
    <p>
      Pasty is an anonymous, small file and code storage system written in Javascript. All
      pastes are encrypted client-side before transmission for storage. Submitter pastes are
      solely tied to a server-provided identifier and are hosted from a public S3 bucket. The
      corresponding AES key to each paste never leaves the client, rendering server knowledge
      of the paste's existence useless. No identifying information about the paste's origin is
      retained.
    </p>

    <span class="icon-github"></span>
    <a href="https://github.com/brhoades/pasty-core">Pasty Core</a><br />
    <span class="icon-github"></span>
    <a href="https://github.com/brhoades/pasty-http-client">Pasty HTTP Client</a><br />
    <span class="icon-github"></span>
    <a href="https://github.com/brhoades/pasty-cli">Pasty CLI</a><br />
    <span class="icon-github"></span>
    <a href="https://github.com/brhoades/pasty-server">Pasty Server</a><br />
  </div>
</template>


<script lang="ts">
 export default {
   data () {
     return {
     };
   }
 }
</script>

<style>
 .about {
   height: 100%;
   width: 100%;
 }

 .about h4 {
   margin-top: 0;
   margin-left: 0.5em;
   display: inline;
 }

 .about h1 {
   margin-top: 0;
   display: inline;
   margin-bottom: 0.2em;
 }
</style>
