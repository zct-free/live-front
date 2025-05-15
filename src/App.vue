<template>
  <router-view />
</template>

<script setup lang="ts">
// No script logic needed for App.vue if it's just a router-view wrapper
// defineOptions({ name: 'App' }); // Optional
</script>

<style lang="less">
/* Global styles can go here or in a separate CSS file imported in main.ts */
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
