<template>
  <a-layout class="admin-layout">
    <AppSidebar />
    <a-layout>
      <AppHeader />
      <a-layout-content class="content-area">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import AppHeader from "@/components/layout/AppHeader.vue";
import AppSidebar from "@/components/layout/AppSidebar.vue";
</script>

<style lang="less" scoped>
.admin-layout {
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  width: 100%;
}

.fixed-sider {
  position: fixed;
  top: 64px; // 假设header高度为64px
  left: 0;
  bottom: 0;
  z-index: 99;
  height: calc(100vh - 64px);
}

.content-area {
  height: calc(100vh - 64px);
  overflow-y: auto;
  padding: 20px;
  background: #fff;
  min-height: 100%;
  width: 100%;
}
</style>
