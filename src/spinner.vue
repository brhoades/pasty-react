<template>
  <div style="width: 100%; height: 100%">
    <div id="spinner" class="sk-chasing-dots">
      <div class="sk-child sk-dot1"></div>
      <div class="sk-child sk-dot2"></div>
    </div>
    <div class="spinner-message">
      {{ message }}
    </div>
  </div>
</template>


<script>
 import Spinner from './spinner.vue'
 import css from '../node_modules/spinkit/css/spinkit.css'

 export default {
   props: [
     'message',
   ],
   data () {
     return {
     };
   }
 }
</script>

<style>
</style>
