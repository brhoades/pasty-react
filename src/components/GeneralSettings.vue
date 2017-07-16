<template>
  <form class="pure-form pure-form-stacked">
    <fieldset>
      <legend>General Settings</legend>
      <div class="pure-g">
        <div class="pure-u-md-2-5 pure-u-1">
          <label for="hljs-theme">Code Theme</label>
          <select id="hljs-theme" v-model="settings.theme" @input="updateTheme();">
            <option value="agate.css">agate</option>
            <option value="androidstudio.css">androidstudio</option>
            <option value="arduino-light.css">arduino-light</option>
            <option value="arta.css">arta</option>
            <option value="ascetic.css">ascetic</option>
            <option value="atelier-cave-dark.css">atelier-cave-dark</option>
            <option value="atelier-cave-light.css">atelier-cave-light</option>
            <option value="atelier-dune-dark.css">atelier-dune-dark</option>
            <option value="atelier-dune-light.css">atelier-dune-light</option>
            <option value="atelier-estuary-dark.css">atelier-estuary-dark</option>
            <option value="atelier-estuary-light.css">atelier-estuary-light</option>
            <option value="atelier-forest-dark.css">atelier-forest-dark</option>
            <option value="atelier-forest-light.css">atelier-forest-light</option>
            <option value="atelier-heath-dark.css">atelier-heath-dark</option>
            <option value="atelier-heath-light.css">atelier-heath-light</option>
            <option value="atelier-lakeside-dark.css">atelier-lakeside-dark</option>
            <option value="atelier-lakeside-light.css">atelier-lakeside-light</option>
            <option value="atelier-plateau-dark.css">atelier-plateau-dark</option>
            <option value="atelier-plateau-light.css">atelier-plateau-light</option>
            <option value="atelier-savanna-dark.css">atelier-savanna-dark</option>
            <option value="atelier-savanna-light.css">atelier-savanna-light</option>
            <option value="atelier-seaside-dark.css">atelier-seaside-dark</option>
            <option value="atelier-seaside-light.css">atelier-seaside-light</option>
            <option value="atelier-sulphurpool-dark.css">atelier-sulphurpool-dark</option>
            <option value="atelier-sulphurpool-light.css">atelier-sulphurpool-light</option>
            <option value="atom-one-dark.css">atom-one-dark</option>
            <option value="atom-one-light.css">atom-one-light</option>
            <option value="brown-paper.css">brown-paper</option>
            <option value="codepen-embed.css">codepen-embed</option>
            <option value="color-brewer.css">color-brewer</option>
            <option value="darcula.css">darcula</option>
            <option value="dark.css">dark</option>
            <option value="darkula.css">darkula</option>
            <option value="default.css">default</option>
            <option value="docco.css">docco</option>
            <option value="dracula.css">dracula</option>
            <option value="far.css">far</option>
            <option value="foundation.css">foundation</option>
            <option value="github.css">github</option>
            <option value="github-gist.css">github-gist</option>
            <option value="googlecode.css">googlecode</option>
            <option value="grayscale.css">grayscale</option>
            <option value="gruvbox-dark.css">gruvbox-dark</option>
            <option value="gruvbox-light.css">gruvbox-light</option>
            <option value="hopscotch.css">hopscotch</option>
            <option value="hybrid.css">hybrid</option>
            <option value="idea.css">idea</option>
            <option value="ir-black.css">ir-black</option>
            <option value="kimbie.css">kimbie</option>.dark
            <option value="kimbie.css">kimbie</option>.light
            <option value="magula.css">magula</option>
            <option value="mono-blue.css">mono-blue</option>
            <option value="monokai.css">monokai</option>
            <option value="monokai-sublime.css">monokai-sublime</option>
            <option value="obsidian.css">obsidian</option>
            <option value="ocean.css">ocean</option>
            <option value="paraiso-dark.css">paraiso-dark</option>
            <option value="paraiso-light.css">paraiso-light</option>
            <option value="pojoaque.css">pojoaque</option>
            <option value="purebasic.css">purebasic</option>
            <option value="qtcreator.css">qtcreator</option>_dark
            <option value="qtcreator.css">qtcreator</option>_light
            <option value="railscasts.css">railscasts</option>
            <option value="rainbow.css">rainbow</option>
            <option value="school-book.css">school-book</option>
            <option value="solarized-dark.css">solarized-dark</option>
            <option value="solarized-light.css">solarized-light</option>
            <option value="sunburst.css">sunburst</option>
            <option value="tomorrow.css">tomorrow</option>
            <option value="tomorrow-night-blue.css">tomorrow-night-blue</option>
            <option value="tomorrow-night-bright.css">tomorrow-night-bright</option>
            <option value="tomorrow-night.css">tomorrow-night</option>
            <option value="tomorrow-night-eighties.css">tomorrow-night-eighties</option>
            <option value="vs.css">vs</option>
            <option value="xcode.css">xcode</option>
            <option value="xt.css">xt</option>256
            <option value="zenburn.css">zenburn</option>
          </select>
        </div>
        <div class="pure-u-md-3-5 pure-u-1">
          <label for="preview">Preview theme</label>
          <pre id="preview"><code ref="code" class="hljs python">import json


def helloworld(words):
    return words.join(" ")

if __name__ == "__main__":
    print(helloworld(["Hello", "World"]))</code></pre>
          </div>
      </div>
    </fieldset>
  </form>
</template>

<script lang="ts">
 declare var $: any;
 declare var hljs: any;

 export default {
   props: ['settings'],
   data() {
     return {
     }
   },
   mounted() {
     hljs.highlightBlock(this.$refs.code);
   },
   methods: {
     updateTheme() {
       $("#hljs-theme").attr("href", `assets/hljs-themes/${this.settings.theme}`);
     }
   }
 }
</script>
