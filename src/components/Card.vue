<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title">
        <div v-if="!locked" v-on:click="expanded = !expanded" class="icon icon--pr">
          <span v-if="expanded" class="chevron bottom"></span>
          <span v-else class="chevron right"></span>
        </div>
        {{ file.getName().substr(0, 75) }}
      </div>
      <div class="card-action">
        <div v-on:click="$emit('delete')" class="icon icon-delete">
          <i class="icon-trash"></i>
        </div>
      </div>
    </div>
    <div class="card-content" v-if="expanded && !locked">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
 export default {
   props: {
     'file': {
       required: true
     },
     'locked': {
       default: false,
       required: false
     },
     'expand': {
       required: false,
       default: true
     }
   },
   data() {
     return {
       expanded: this.expanded != undefined ? this.expanded : this.expand,
     };
   }
 }
</script>

<style>
 .icon {
   display: inline;
   padding: 2px;
   cursor: pointer;
   font-size: normal;
   color: black;
   font-weight: normal;
 }

 .icon--pr {
   padding-right: 10px;
 }

 .icon-delete:hover {
   color: darkred;
 }

 .card {
   border-style: solid;
   border-radius: 5px;
   border-color: darkgray;
   border-width: 2px;

   margin-bottom: 1em;
 }

 .card-title {
   display: inline;
   font-weight: bold;
   font-size: huge;
   padding-top: 5px;
   padding-bottom: 10px;
 }

 .card-header {
   width: auto;
   background-color: #c6c6c6;

   padding: 10px;
 }

 .card-content {
   padding: 10px;
 }

 .card-action {
   float: right;
 }

 /* https://codepen.io/jonneal/pen/kptBs */
 .chevron::before {
   border-style: solid;
   border-width: 0.25em 0.25em 0 0;
   content: '';
   display: inline-block;
   height: 0.45em;
   left: 0.15em;
   position: relative;
   top: 0.15em;
   transform: rotate(-45deg);
   vertical-align: top;
   width: 0.45em;
 }

 .chevron.right:before {
   left: 0;
   transform: rotate(45deg);
 }

 .chevron.bottom:before {
   top: 0;
   transform: rotate(135deg);
 }
</style>
