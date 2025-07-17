<template>
  <div class="live-list-container">
    <iframe :src="url" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</template>
<script setup>
import { computed } from "vue";

const url = computed(() => {
  return `http://140.210.90.103:39847/course-system/publish/list`;
});
</script>
<style scoped>
.live-list-container {
  width: 100%;
  height: 100%;
}
</style>
