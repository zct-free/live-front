// 组合函数单元测试
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useApp, useData, useGlobalState, usePermission, useUser } from '../useStores';

// Mock stores
vi.mock('@/store/user');
vi.mock('@/store/app');
vi.mock('@/store/data');
vi.mock('@/store/menu');
vi.mock('@/store/notification');

describe('Composable Functions', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('useUser', () => {
    it('should expose user store state and actions', () => {
      const user = useUser();
      
      expect(user).toHaveProperty('token');
      expect(user).toHaveProperty('userInfo');
      expect(user).toHaveProperty('loading');
      expect(user).toHaveProperty('permissions');
      expect(user).toHaveProperty('isLoggedIn');
      expect(user).toHaveProperty('userName');
      expect(user).toHaveProperty('userRole');
      expect(user).toHaveProperty('login');
      expect(user).toHaveProperty('logout');
      expect(user).toHaveProperty('hasPermission');
      expect(user).toHaveProperty('hasRole');
    });

    it('should check permissions correctly', () => {
      const user = useUser();
      
      // Mock permissions
      user.permissions.value = ['read', 'write'];
      
      expect(user.hasPermission('read')).toBe(true);
      expect(user.hasPermission('delete')).toBe(false);
      expect(user.hasPermission(['read', 'write'])).toBe(true);
      expect(user.hasPermission(['delete', 'admin'])).toBe(false);
    });

    it('should check roles correctly', () => {
      const user = useUser();
      
      // Mock user role
      user.userRole.value = 'admin';
      
      expect(user.hasRole('admin')).toBe(true);
      expect(user.hasRole('user')).toBe(false);
      expect(user.hasRole(['admin', 'moderator'])).toBe(true);
      expect(user.hasRole(['user', 'guest'])).toBe(false);
    });
  });

  describe('useApp', () => {
    it('should expose app store state and actions', () => {
      const app = useApp();
      
      expect(app).toHaveProperty('collapsed');
      expect(app).toHaveProperty('sidebarCollapsed');
      expect(app).toHaveProperty('theme');
      expect(app).toHaveProperty('primaryColor');
      expect(app).toHaveProperty('locale');
      expect(app).toHaveProperty('device');
      expect(app).toHaveProperty('loading');
      expect(app).toHaveProperty('isMobile');
      expect(app).toHaveProperty('isTablet');
      expect(app).toHaveProperty('isDesktop');
      expect(app).toHaveProperty('toggleSidebar');
      expect(app).toHaveProperty('toggleTheme');
    });

    it('should provide device type computed properties', () => {
      const app = useApp();
      
      // Mock device
      app.device.value = 'mobile';
      
      expect(app.isMobile.value).toBe(true);
      expect(app.isTablet.value).toBe(false);
      expect(app.isDesktop.value).toBe(false);
      
      app.device.value = 'desktop';
      
      expect(app.isMobile.value).toBe(false);
      expect(app.isTablet.value).toBe(false);
      expect(app.isDesktop.value).toBe(true);
    });
  });

  describe('useData', () => {
    it('should expose data store state and actions', () => {
      const data = useData();
      
      expect(data).toHaveProperty('cache');
      expect(data).toHaveProperty('loading');
      expect(data).toHaveProperty('errors');
      expect(data).toHaveProperty('fetchData');
      expect(data).toHaveProperty('createData');
      expect(data).toHaveProperty('updateData');
      expect(data).toHaveProperty('deleteData');
      expect(data).toHaveProperty('getCachedData');
      expect(data).toHaveProperty('isCacheValid');
    });
  });

  describe('usePermission', () => {
    it('should provide permission checking utilities', () => {
      const permission = usePermission();
      
      expect(permission).toHaveProperty('permissions');
      expect(permission).toHaveProperty('userRole');
      expect(permission).toHaveProperty('isAdmin');
      expect(permission).toHaveProperty('isSuperAdmin');
      expect(permission).toHaveProperty('hasPermission');
      expect(permission).toHaveProperty('hasRole');
      expect(permission).toHaveProperty('checkPermission');
      expect(permission).toHaveProperty('checkRole');
    });

    it('should identify admin users correctly', () => {
      const permission = usePermission();
      
      // Mock admin role
      permission.userRole.value = 'admin';
      
      expect(permission.isAdmin.value).toBe(true);
      expect(permission.isSuperAdmin.value).toBe(false);
      
      // Mock super admin role
      permission.userRole.value = 'super-admin';
      
      expect(permission.isAdmin.value).toBe(true);
      expect(permission.isSuperAdmin.value).toBe(true);
      
      // Mock regular user
      permission.userRole.value = 'user';
      
      expect(permission.isAdmin.value).toBe(false);
      expect(permission.isSuperAdmin.value).toBe(false);
    });
  });

  describe('useGlobalState', () => {
    it('should combine all stores', () => {
      const globalState = useGlobalState();
      
      expect(globalState).toHaveProperty('user');
      expect(globalState).toHaveProperty('app');
      expect(globalState).toHaveProperty('menu');
      expect(globalState).toHaveProperty('notification');
      expect(globalState).toHaveProperty('data');
      expect(globalState).toHaveProperty('initializeApp');
      expect(globalState).toHaveProperty('resetAllStores');
    });

    it('should initialize app correctly', async () => {
      const globalState = useGlobalState();
      
      // Mock logged in user
      globalState.user.isLoggedIn.value = true;
      
      // Should not throw error
      await expect(globalState.initializeApp()).resolves.toBeUndefined();
    });

    it('should reset all stores', () => {
      const globalState = useGlobalState();
      
      // Should not throw error
      expect(() => globalState.resetAllStores()).not.toThrow();
    });
  });
});
