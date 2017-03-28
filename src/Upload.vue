<template>
  <div id="app">
    <h2>Pasty</h2>

    <vue-clip :options="options">
      <template slot="clip-uploader-action">
        <div>
          <div class="dz-message"><h2> Click or Drag and Drop files here upload </h2></div>
        </div>
      </template>

      <template slot="clip-uploader-body" scope="props">
        <div v-for="file in props.files">
          {{ file.name }} {{ file.errorMessage }}
        </div>
      </template>
    </vue-clip>
  </div>
</template>


<script>
const client = require('./js/client');

module.exports = {
  data: () => {
    return {
      options: {
        url: '/bad-url',
        accept: client.uploadHook,
        uploadMultiple: false
      }
    }
  }
}
</script>

<style>
</style>
