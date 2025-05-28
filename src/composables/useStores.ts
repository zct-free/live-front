// Pinia 组合式函数
import { useAppStore } from '@/store/app';
import { useDataStore } from '@/store/data';
import { useMenuStore, type MenuItem } from '@/store/menu';
import { useNotificationStore } from '@/store/notification';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

/**
 * 用户相关组合式函数
 */
export function useUser() {
  const userStore = useUserStore();
  const { 
    token, 
    userInfo, 
    loading, 
    permissions,
    isLoggedIn,
    userName,
    userRole 
  } = storeToRefs(userStore);

  // 权限检查函数
  const hasPermission = (permission: string | string[]) => {
    if (Array.isArray(permission)) {
      return permission.some(p => permissions.value.includes(p));
    }
    return permissions.value.includes(permission);
  };

  // 角色检查函数
  const hasRole = (role: string | string[]) => {
    const currentRole = userRole.value;
    if (Array.isArray(role)) {
      return role.includes(currentRole);
    }
    return currentRole === role;
  };

  return {
    // state
    token,
    userInfo,
    loading,
    permissions,
    
    // getters
    isLoggedIn,
    userName,
    userRole,
    
    // actions
    login: userStore.login,
    logout: userStore.logout,
    fetchUserInfo: userStore.fetchUserInfo,
    fetchPermissions: userStore.fetchPermissions,
    updateUserInfo: userStore.updateUserInfo,
    checkAuth: userStore.checkAuth,
    
    // helpers
    hasPermission,
    hasRole
  };
}

/**
 * 应用设置相关组合式函数
 */
export function useApp() {
  const appStore = useAppStore();
  const {
    collapsed,
    theme,
    primaryColor,
    locale,
    device,
    loading,
    breadcrumbs,
    pageTitle
  } = storeToRefs(appStore);

  // 主题切换
  const toggleTheme = () => {
    appStore.toggleTheme();
  };

  // 侧边栏切换
  const toggleSidebar = () => {
    appStore.toggleSidebar();
  };

  // 响应式检查
  const isMobile = computed(() => device.value === 'mobile');
  const isTablet = computed(() => device.value === 'tablet');
  const isDesktop = computed(() => device.value === 'desktop');
  return {
    // state
    collapsed,
    sidebarCollapsed: collapsed, // 提供别名兼容性
    theme,
    primaryColor,
    locale,
    device,
    loading,
    breadcrumbs,
    pageTitle,
    
    // getters
    isMobile,
    isTablet,
    isDesktop,
    
    // actions
    toggleSidebar,
    setSidebarCollapsed: appStore.setSidebarCollapsed,
    toggleTheme,
    setTheme: appStore.setTheme,
    setPrimaryColor: appStore.setPrimaryColor,
    setLocale: appStore.setLocale,
    setLoading: appStore.setLoading,
    setBreadcrumbs: appStore.setBreadcrumbs,
    setPageTitle: appStore.setPageTitle,
    setDevice: appStore.setDevice,
    initializeApp: appStore.initializeApp,
    detectDevice: appStore.detectDevice,
    resetSettings: appStore.resetSettings
  };
}

/**
 * 菜单相关组合式函数
 */
export function useMenu() {
  const menuStore = useMenuStore();
  const {
    menuList,
    loading,
    openKeys,
    selectedKeys,
    breadcrumbs,
    menuCollapsed,
    visibleMenus,
    currentMenu,
    menuTree
  } = storeToRefs(menuStore);
  // 根据路径查找菜单
  const findMenuByPath = (path: string) => {
    // 使用内部逻辑查找菜单
    const findInMenus = (menus: MenuItem[], targetPath: string): MenuItem | null => {
      for (const menu of menus) {
        if (menu.path === targetPath) {
          return menu;
        }
        if (menu.children && menu.children.length > 0) {
          const found = findInMenus(menu.children, targetPath);
          if (found) return found;
        }
      }
      return null;
    };
    return findInMenus(menuList.value, path);
  };

  return {
    // state
    menuList,
    loading,
    openKeys,
    selectedKeys,
    breadcrumbs,
    menuCollapsed,
    
    // getters
    visibleMenus,
    currentMenu,
    menuTree,
    
    // actions
    fetchMenuList: menuStore.fetchMenuList,
    setSelectedKeys: menuStore.setSelectedKeys,
    setOpenKeys: menuStore.setOpenKeys,
    toggleMenuCollapsed: menuStore.toggleMenuCollapsed,
    setMenuCollapsed: menuStore.setMenuCollapsed,
    setBreadcrumbsByRoute: menuStore.setBreadcrumbsByRoute,
    setBreadcrumbs: menuStore.setBreadcrumbs,
    addMenuItem: menuStore.addMenuItem,
    updateMenuItem: menuStore.updateMenuItem,
    removeMenuItem: menuStore.removeMenuItem,
    resetMenu: menuStore.resetMenu,
    
    // helpers
    findMenuByPath
  };
}

/**
 * 通知相关组合式函数
 */
export function useNotification() {
  const notificationStore = useNotificationStore();
  const {
    notifications,
    loading,
    polling,
    lastFetchTime,
    unreadCount,
    unreadNotifications,
    readNotifications,
    notificationsByCategory,
    highPriorityNotifications,
    notificationStats
  } = storeToRefs(notificationStore);

  // 获取特定类别的未读通知数量
  const getUnreadCountByCategory = (category: string) => {
    return computed(() => {
      return unreadNotifications.value.filter(n => n.category === category).length;
    });
  };

  return {
    // state
    notifications,
    loading,
    polling,
    lastFetchTime,
    
    // getters
    unreadCount,
    unreadNotifications,
    readNotifications,
    notificationsByCategory,
    highPriorityNotifications,
    notificationStats,
    
    // actions
    fetchNotifications: notificationStore.fetchNotifications,
    markAsRead: notificationStore.markAsRead,
    markMultipleAsRead: notificationStore.markMultipleAsRead,
    markAllAsRead: notificationStore.markAllAsRead,
    deleteNotification: notificationStore.deleteNotification,
    clearReadNotifications: notificationStore.clearReadNotifications,
    executeNotificationAction: notificationStore.executeNotificationAction,
    addLocalNotification: notificationStore.addLocalNotification,
    startPolling: notificationStore.startPolling,
    stopPolling: notificationStore.stopPolling,
    filterNotifications: notificationStore.filterNotifications,
    resetNotifications: notificationStore.resetNotifications,
    
    // helpers
    getUnreadCountByCategory
  };
}

/**
 * 数据缓存相关组合式函数
 */
export function useData() {
  const dataStore = useDataStore();
  const { cache, loading, errors } = storeToRefs(dataStore);

  // 获取缓存数据
  const getCachedData = <T>(key: string): T | null => {
    const cachedItem = dataStore.getCachedData(key);
    return cachedItem ? cachedItem.data : null;
  };

  // 检查缓存是否存在且有效
  const isCacheValid = (key: string): boolean => {
    return cache.value.has(key);
  };

  return {
    // state
    cache,
    loading,
    errors,
    
    // actions
    fetchData: dataStore.fetchData,
    createData: dataStore.createData,
    updateData: dataStore.updateData,
    deleteData: dataStore.deleteData,
    setCache: dataStore.setCache,
    clearCache: dataStore.clearCache,
    setLoading: dataStore.setLoading,
    setError: dataStore.setError,
    clearRelatedCache: dataStore.clearRelatedCache,
    
    // helpers
    getCachedData,
    isCacheValid,
    isLoading: dataStore.isLoading,
    getError: dataStore.getError
  };
}

/**
 * 全局状态组合式函数 - 组合多个store
 */
export function useGlobalState() {
  const user = useUser();
  const app = useApp();
  const menu = useMenu();
  const notification = useNotification();
  const data = useData();

  // 初始化应用
  const initializeApp = async () => {
    try {
      // 初始化应用设置
      await app.initializeApp();
      
      // 如果用户已登录，获取用户信息和权限
      if (user.isLoggedIn.value) {
        await Promise.all([
          user.checkAuth(),
          menu.fetchMenuList(),
          notification.fetchNotifications({ page: 1, limit: 20 })
        ]);
        
        // 开始通知轮询
        notification.startPolling();
      }
    } catch (error) {
      console.error('应用初始化失败:', error);
    }
  };
  // 重置所有状态
  const resetAllStores = () => {
    // 重置各个存储的状态
    const userStore = useUserStore();
    const menuStore = useMenuStore();
    const notificationStore = useNotificationStore();
    const dataStore = useDataStore();
    const appStore = useAppStore();
    
    userStore.$reset();
    menuStore.resetMenu();
    notificationStore.resetNotifications();
    dataStore.$reset();
    appStore.resetSettings();
  };

  return {
    // stores
    user,
    app,
    menu,
    notification,
    data,
    
    // global actions
    initializeApp,
    resetAllStores
  };
}

/**
 * 权限相关组合式函数
 */
export function usePermission() {
  const { permissions, userRole, hasPermission, hasRole } = useUser();

  // 指令式权限检查
  const checkPermission = (permission: string | string[]): boolean => {
    return hasPermission(permission);
  };

  // 指令式角色检查
  const checkRole = (role: string | string[]): boolean => {
    return hasRole(role);
  };

  // 是否为管理员
  const isAdmin = computed(() => {
    return userRole.value === 'admin' || userRole.value === 'super-admin';
  });

  // 是否为超级管理员
  const isSuperAdmin = computed(() => {
    return userRole.value === 'super-admin';
  });

  return {
    permissions,
    userRole,
    isAdmin,
    isSuperAdmin,
    hasPermission,
    hasRole,
    checkPermission,
    checkRole
  };
}
