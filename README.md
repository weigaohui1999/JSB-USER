# user-jsb

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

<template>
  <div class="index-main"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Storage from "@/libs/storage";
@Component
export default class HomeView extends Vue {}
</script>

<style scoped lang="less"></style>
