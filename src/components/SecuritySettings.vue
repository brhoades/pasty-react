<template>
  <form class="pure-form pure-form-stacked">
    <fieldset>
      <legend>Security Settings</legend>

      <label for="keysize">Key seed size</label>
      <input id="keysize" type="range" min="2" max="128"
             v-model="settings.keysize" step="2">
      <output for="keysize">{{ settings.keysize }} characters</output>
      <span class="pure-form-message">Larger is better; used for
        <a href="https://en.wikipedia.org/wiki/PBKDF2">PBKDF2</a>.</span>
    </fieldset>
  </form>
</template>

<script lang="ts">
 export default {
   props: ['settings'],
   data() {
     return {
     }
   }
 }
</script>
