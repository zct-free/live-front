<template>
  <div class="not-found-container">
    <a-result
      status="404"
      title="404"
      sub-title="Sorry, the page you visited does not exist."
    >
      <template #extra>
        <router-link to="/">
          <a-button type="primary">Back Home</a-button>
        </router-link>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts">
// Ant Design components AResult and AButton are assumed to be globally available
// or available via unplugin-vue-components.
// If not, import them: import { Result as AResult, Button as AButton } from 'ant-design-vue';

// defineOptions({ name: 'NotFound' }); // Optional
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