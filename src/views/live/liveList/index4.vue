<template>
  <div class="live-list-container">
    <iframe :src="url" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</template>
<script setup>
import { computed } from "vue";

const url = computed(() => {
  if (import.meta.env.VITE_NODE_ENV === "development") {
    return `http://192.168.0.2:6003/live/sensitivewords`;
  }
  return `${location.origin}/live/sensitivewords`;
});
</script>
<style scoped>
.live-list-container {
  width: 100%;
  height: 100%;
}
</style>
