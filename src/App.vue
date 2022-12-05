<template>
  <div id="app">
    <router-view />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Footer from "@/components/Footer/index.vue";

@Component({
  components: {
    Footer,
  },
})
export default class App extends Vue {}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
