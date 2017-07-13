<template>
  <div class="pc-tab">
    <input checked="checked" id="tab1" type="radio" name="pct" />
    <input id="tab2" type="radio" name="pct" />
    <nav>
      <ul>
        <li class="tab1">
          <label for="tab1">General</label>
        </li>
        <li class="tab2">
          <label for="tab2">Security</label>
        </li>
      </ul>
    </nav>
    <section>
      <div class="tab1 tab">
        <GeneralSettings :settings="settings" />
      </div>
      <div class="tab2 tab">
        <SecuritySettings :settings="settings.security" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
 import SecuritySettings from './SecuritySettings.vue'
 import GeneralSettings from './GeneralSettings.vue'
 import Settings from '../ts/settings'
 declare var $: any;

 export default {
   components: {
     'GeneralSettings': GeneralSettings,
     'SecuritySettings': SecuritySettings
   },
   data() {
     let settings = new Settings($);

     return {
       settings: settings
     }
   }
 }
</script>

<style>
 .pc-tab > input,
 .pc-tab section > div {
   display: none;
 }

 #tab1:checked ~ section .tab1,
 #tab2:checked ~ section .tab2,
 #tab3:checked ~ section .tab3 {
   display: block;
 }

 #tab1:checked ~ nav .tab1,
 #tab2:checked ~ nav .tab2,
 #tab3:checked ~ nav .tab3 {
   color: red;
 }

 /* Visual Styles */

 $activeColor: #ffffff;
 $unactiveColor: #eeeeee;
 $unactiveHoverColor: #dddddd;

 h1 {
   text-align: center;
   font-weight: 100;
   font-size: 60px;
   color: #e74c3c;
 }

 .pc-tab {
   width: 100%;
   width: 100%;

   margin: 0 auto;
   ul {
     list-style: none;
     margin: 0;
     padding: 0;
     li {
       label {
         font-family: "Raleway";
         float: left;
         padding: 15px 25px;
         border: 1px solid #ddd;
         border-bottom: 0;
         background: $unactiveColor;
         color: #444;
         &:hover {
           background: $unactiveHoverColor;
         }
         &:active {
           background: $activeColor;
         }
       }
       &:not(:last-child) label {
         border-right-width: 0;
       }
     }
   }
   section {
     font-family: "Droid Serif";
     clear: both;
     div {
       padding: 20px;
       width: 100%;
       border: 1px solid #ddd;
       background: #fff;
       line-height: 1.5em;
       letter-spacing: 0.3px;
       color: #444;
       h2 {
         margin: 0;
         font-family: "Raleway";
         letter-spacing: 1px;
         color: #34495e;
       }
     }
   }
 }

 #tab1:checked ~ nav .tab1,
 #tab2:checked ~ nav .tab2,
 #tab3:checked ~ nav .tab3 {
   label {
     background: white;
     color: #111;
     position: relative;
     &:after {
       content: '';
       display: block;
       position: absolute;
       height: 2px;
       width: 100%;
       background: $activeColor;
       left: 0;
       bottom: -1px;
     }
   }
 }

 footer {
   margin-top: 50px;
   font-size: 14px;
   color: #CCC;
   text-align: center;
   a {
     color: #AAA;
     text-decoration: none;
   }
 }

 .tab {
   padding-top: 2em;
 }
</style>
