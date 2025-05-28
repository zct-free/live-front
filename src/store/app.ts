// 应用配置 Store
import { defineStore } from 'pinia';

// 类型定义
export interface BreadcrumbItem {
  title: string;
  path?: string;
  icon?: string;
}

interface AppState {
  collapsed: boolean;
  theme: 'light' | 'dark';
  primaryColor: string;
  locale: string;
  loading: boolean;
  breadcrumbs: BreadcrumbItem[];
  pageTitle: string;
  device: 'desktop' | 'tablet' | 'mobile';
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    collapsed: false, // 侧边栏折叠状态
    theme: 'light', // 主题
    primaryColor: '#1890ff', // 主色调
    locale: 'zh-CN', // 语言
    loading: false, // 全局加载状态
    breadcrumbs: [], // 面包屑
    pageTitle: '', // 页面标题
    device: 'desktop' // 设备类型
  }),

  getters: {
    isDark: (state): boolean => state.theme === 'dark',
    isMobile: (state): boolean => state.device === 'mobile',
    sidebarWidth: (state): number => state.collapsed ? 80 : 240,
  },

  actions: {
    toggleSidebar() {
      (this as any).collapsed = !(this as any).collapsed;
      localStorage.setItem('sidebar-collapsed', String((this as any).collapsed));
    },

    setSidebarCollapsed(value: boolean) {
      (this as any).collapsed = value;
      localStorage.setItem('sidebar-collapsed', String(value));
    },

    toggleTheme() {
      (this as any).theme = (this as any).theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', (this as any).theme);
      document.documentElement.setAttribute('data-theme', (this as any).theme);
    },

    setTheme(newTheme: 'light' | 'dark') {
      (this as any).theme = newTheme;
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    },

    setPrimaryColor(color: string) {
      (this as any).primaryColor = color;
      localStorage.setItem('primary-color', color);
      document.documentElement.style.setProperty('--primary-color', color);
    },

    setLocale(newLocale: string) {
      (this as any).locale = newLocale;
      localStorage.setItem('locale', newLocale);
    },

    setLoading(value: boolean) {
      (this as any).loading = value;
    },

    setBreadcrumbs(items: BreadcrumbItem[]) {
      (this as any).breadcrumbs = items;
    },

    setPageTitle(title: string) {
      (this as any).pageTitle = title;
      document.title = title ? `${title} - Vue3 Admin` : 'Vue3 Admin';
    },

    setDevice(deviceType: 'desktop' | 'tablet' | 'mobile') {
      (this as any).device = deviceType;
    },

    initializeApp() {
      // 从 localStorage 恢复配置
      const savedCollapsed = localStorage.getItem('sidebar-collapsed');
      if (savedCollapsed !== null) {
        (this as any).collapsed = savedCollapsed === 'true';
      }

      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
      if (savedTheme) {
        this.setTheme(savedTheme);
      }

      const savedColor = localStorage.getItem('primary-color');
      if (savedColor) {
        this.setPrimaryColor(savedColor);
      }

      const savedLocale = localStorage.getItem('locale');
      if (savedLocale) {
        (this as any).locale = savedLocale;
      }

      this.detectDevice();
      window.addEventListener('resize', this.detectDevice);
    },

    detectDevice() {
      const width = window.innerWidth;
      if (width < 768) {
        this.setDevice('mobile');
        this.setSidebarCollapsed(true);
      } else if (width < 1024) {
        this.setDevice('tablet');
      } else {
        this.setDevice('desktop');
      }
    },

    resetSettings() {
      (this as any).collapsed = false;
      (this as any).theme = 'light';
      (this as any).primaryColor = '#1890ff';
      (this as any).locale = 'zh-CN';
      
      localStorage.removeItem('sidebar-collapsed');
      localStorage.removeItem('theme');
      localStorage.removeItem('primary-color');
      localStorage.removeItem('locale');
      
      this.setTheme('light');
      this.setPrimaryColor('#1890ff');
    }
  },

  persist: {
    key: 'app',
    storage: localStorage,
    pick: ['collapsed', 'theme', 'primaryColor', 'locale'],
  }
});
