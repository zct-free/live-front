<template>
  <a-layout-header class="app-header">
    Admin Header
    <div style="float: right;">
      <a-button type="link" @click="handleLogout">Logout</a-button>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
// ALayoutHeader, AButton are globally available from Ant Design Vue
import { useRouter } from 'vue-router';
import { logout } from '@/services/authService'; // Assuming authService handles logout and redirect

const router = useRouter();

const handleLogout = () => {
  logout();
  // logout() in authService should handle redirecting to login
  // If not, you can add: router.push({ name: 'login' });
};

// defineOptions({ name: 'AppHeader' }); // Optional
</script>

<style lang="less" scoped>
.app-header {
  background: #001529; // Ant Design default dark header color
  color: white;
  padding: 0 24px; // Adjusted padding
  text-align: center;
  display: flex; /* Use flex to align items */
  justify-content: space-between; /* Pushes Admin Header left and Logout button right */
  align-items: center; /* Vertically center items */
}

/* If you need to style the logout button specifically */
.app-header .ant-btn-link {
  color: white; /* Ensure link button is visible on dark background */
}
</style> 