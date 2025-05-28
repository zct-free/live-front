// 应用存储单元测试
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { useAppStore } from '../app';

describe('App Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('should initialize with default state', () => {
    const appStore = useAppStore();
    
    expect(appStore.collapsed).toBe(false);
    expect(appStore.theme).toBe('light');
    expect(appStore.primaryColor).toBe('#1890ff');
    expect(appStore.locale).toBe('zh-CN');
    expect(appStore.loading).toBe(false);
    expect(appStore.device).toBe('desktop');
  });

  it('should toggle sidebar', () => {
    const appStore = useAppStore();
    
    expect(appStore.collapsed).toBe(false);
    
    appStore.toggleSidebar();
    
    expect(appStore.collapsed).toBe(true);
    expect(localStorage.getItem('sidebar-collapsed')).toBe('true');
    
    appStore.toggleSidebar();
    
    expect(appStore.collapsed).toBe(false);
    expect(localStorage.getItem('sidebar-collapsed')).toBe('false');
  });

  it('should toggle theme', () => {
    const appStore = useAppStore();
    
    expect(appStore.theme).toBe('light');
    expect(appStore.isDark).toBe(false);
    
    appStore.toggleTheme();
    
    expect(appStore.theme).toBe('dark');
    expect(appStore.isDark).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('should set primary color', () => {
    const appStore = useAppStore();
    
    const newColor = '#ff6b35';
    appStore.setPrimaryColor(newColor);
    
    expect(appStore.primaryColor).toBe(newColor);
    expect(localStorage.getItem('primary-color')).toBe(newColor);
  });

  it('should set locale', () => {
    const appStore = useAppStore();
    
    appStore.setLocale('en-US');
    
    expect(appStore.locale).toBe('en-US');
    expect(localStorage.getItem('locale')).toBe('en-US');
  });

  it('should manage breadcrumbs', () => {
    const appStore = useAppStore();
    
    const breadcrumbs = [
      { title: 'Home', path: '/' },
      { title: 'Dashboard', path: '/dashboard' }
    ];
    
    appStore.setBreadcrumbs(breadcrumbs);
    
    expect(appStore.breadcrumbs).toEqual(breadcrumbs);
  });

  it('should set page title', () => {
    const appStore = useAppStore();
    
    appStore.setPageTitle('Test Page');
    
    expect(appStore.pageTitle).toBe('Test Page');
    expect(document.title).toBe('Test Page - Vue3 Admin');
  });

  it('should detect device type', () => {
    const appStore = useAppStore();
    
    // 模拟移动端
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });
    
    appStore.detectDevice();
    expect(appStore.device).toBe('mobile');
    expect(appStore.isMobile).toBe(true);
    
    // 模拟桌面端
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });
    
    appStore.detectDevice();
    expect(appStore.device).toBe('desktop');
    expect(appStore.isMobile).toBe(false);
  });

  it('should calculate sidebar width correctly', () => {
    const appStore = useAppStore();
    
    expect(appStore.sidebarWidth).toBe(240);
    
    appStore.setSidebarCollapsed(true);
    
    expect(appStore.sidebarWidth).toBe(80);
  });

  it('should initialize from localStorage', () => {
    // 预设 localStorage 值
    localStorage.setItem('sidebar-collapsed', 'true');
    localStorage.setItem('theme', 'dark');
    localStorage.setItem('primary-color', '#ff0000');
    localStorage.setItem('locale', 'en-US');
    
    const appStore = useAppStore();
    appStore.initializeApp();
    
    expect(appStore.collapsed).toBe(true);
    expect(appStore.theme).toBe('dark');
    expect(appStore.primaryColor).toBe('#ff0000');
    expect(appStore.locale).toBe('en-US');
  });
});
