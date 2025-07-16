<template>
  <div class="not-found-container">
    <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
      <template #extra>
        <a-button type="primary" @click="goHome">Back Home</a-button>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts">
// Ant Design components AResult and AButton are assumed to be globally available
// or available via unplugin-vue-components.
// If not, import them: import { Result as AResult, Button as AButton } from 'ant-design-vue';

// defineOptions({ name: 'NotFound' }); // Optional
const goHome = () => {
  // Navigate to the home page, adjust the path as necessary
  window.location.href = "/"; // or use router.push({ name: 'home' }) if using Vue Router
};
</script>

<style lang="less" scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Full viewport height */
  padding: 20px;
}
</style>
