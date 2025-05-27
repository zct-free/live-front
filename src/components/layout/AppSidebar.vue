<template>
  <a-layout-sider width="220" class="app-sidebar" v-model:collapsed="collapsed" collapsible>
    <div class="logo" /> <!-- Optional: for a logo -->
    <a-menu theme="dark" mode="inline" :selectedKeys="selectedKeys" :openKeys="openKeys" @openChange="onOpenChange">
      <template v-for="route in menuRoutes" :key="route.name">
        <!-- Simple Menu Item -->
        <a-menu-item v-if="!route.children || route.children.length === 0" :key="route.name?.toString() || route.path">
          <router-link :to="{ name: route.name }">
            <component v-if="route.meta?.icon" :is="icons[route.meta.icon as string] || HomeOutlined" />
            <span>{{ route.meta?.title || route.name }}</span>
          </router-link>
        </a-menu-item>
        <!-- TODO: Add Submenu handling if routes have children -->
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute, RouteRecordRaw } from 'vue-router';
import { HomeOutlined } from '@ant-design/icons-vue'; // Default icon
import AdminLayout from "@/layouts/AdminLayout.vue"; // Import AdminLayout here

// Define a type for icon components for better type safety if needed
// type IconComponent = typeof HomeOutlined;

// Icons available for dynamic rendering
// Ant Design icons are components, so we map string names from meta to actual imported components.
const icons: { [key: string]: any } = {
  HomeOutlined,
  // Add other icons used in your route meta here, e.g.:
  // UserOutlined, (after importing it)
};

const router = useRouter();
const currentRoute = useRoute();
const collapsed = ref<boolean>(false);

const menuRoutes = computed(() => {
  const layoutRoute = router.options.routes.find(r => r.path === '/' && r.component === AdminLayout);
  if (layoutRoute && layoutRoute.children) {
    return layoutRoute.children.filter(
      (child: RouteRecordRaw) => child.meta && child.meta.title && !child.meta.hiddenFromMenu
    ).map(child => {
      // Default icon logic (optional: can also ensure meta.icon is always set in router)
      if (child.name === 'home' && !child.meta?.icon) {
        return { ...child, meta: { ...child.meta, icon: 'HomeOutlined' } };
      }
      return child;
    });
  }
  return [];
});

const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);

// Watch for route changes to update selected keys
watch(
  () => currentRoute.name,
  (routeName) => {
    selectedKeys.value = routeName ? [routeName.toString()] : [];
    // Basic open key handling for non-nested routes; needs improvement for submenus
    if (routeName) {
      const current = menuRoutes.value.find(r => r.name === routeName);
      if (current && current.meta?.parentName) { // Assuming parentName for submenus if you implement them
         openKeys.value = [current.meta.parentName as string];
      } else if (!collapsed.value) {
        // openKeys.value = []; // Closes other menus - adjust if needed
      }
    }
  },
  { immediate: true }
);
    
const onOpenChange = (keys: string[]) => {
  // Logic to handle only one submenu open at a time if not collapsed
  if (!collapsed.value) {
    const latestOpenKey = keys.find(key => openKeys.value.indexOf(key) === -1);
    // Check if the key belongs to a top-level menu item that is part of menuRoutes
    const isTopLevelKey = menuRoutes.value.some(route => (route.name || route.path) === latestOpenKey);
    if (isTopLevelKey) {
      openKeys.value = latestOpenKey ? [latestOpenKey] : [];
    } else {
      openKeys.value = keys; // For nested submenus (if any)
    }
  } else {
    openKeys.value = keys; // Allow multiple open when collapsed (Antd default behavior)
  }
};

// defineOptions({ name: 'AppSidebar' }); // Optional: if you need to explicitly set the component name
</script>

<style lang="less" scoped>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

// Menu item styling is largely handled by Ant Design themes
// You can add overrides here if needed
</style> 