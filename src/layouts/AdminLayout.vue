<template>
  <a-layout class="admin-layout">
    <AppHeader />
    <a-layout>
      <AppSidebar />
      <a-layout-content class="content-area">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';
import AppSidebar from '@/components/layout/AppSidebar.vue';
// ALayout, ALayoutContent are globally available from Ant Design Vue

// defineOptions({ name: 'AdminLayout' }); // Optional
</script>

<style lang="less" scoped>
.admin-layout {
  min-height: 100vh; // Use min-height for ALayout
}

.content-area {
  padding: 24px; // Standard Ant Design padding
  background: #fff; // Common background for content area
  margin: 16px; // Add some margin around the content area
  overflow-y: auto;
}
</style> 