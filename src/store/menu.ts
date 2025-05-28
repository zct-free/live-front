// 菜单管理 Store
import { get } from '@/utils/request';
import { defineStore } from 'pinia';
import type { RouteLocationNormalized } from 'vue-router';

// 菜单项类型定义
export interface MenuItem {
  id: string;
  title: string;
  path: string;
  icon?: string;
  component?: string;
  children?: MenuItem[];
  meta?: {
    title?: string;
    icon?: string;
    requiresAuth?: boolean;
    roles?: string[];
    hidden?: boolean;
    keepAlive?: boolean;
    breadcrumb?: boolean;
  };
  external?: boolean; // 是否外链
  target?: '_blank' | '_self'; // 外链打开方式
}

// 面包屑项类型
export interface BreadcrumbItem {
  title: string;
  path?: string;
  icon?: string;
}

export const useMenuStore = (defineStore as any)('menu', {
  state: () => ({
    menuList: [] as MenuItem[],
    loading: false,
    openKeys: [] as string[],
    selectedKeys: [] as string[],
    breadcrumbs: [] as BreadcrumbItem[],
    menuCollapsed: false
  }),
  // 计算属性
  getters: {
    visibleMenus: (state: any) => {
      return state.menuList.filter((menu: any) => !menu.meta?.hidden);
    },

    currentMenu: (state: any) => {
      const findMenuByPath = (menus: MenuItem[], path: string): MenuItem | null => {
        for (const menu of menus) {
          if (menu.path === path) {
            return menu;
          }
          if (menu.children) {
            const found = findMenuByPath(menu.children, path);
            if (found) return found;
          }
        }
        return null;
      };
      
      return findMenuByPath(state.menuList, state.selectedKeys[0]);
    },

    menuTree: (state: any) => {
      const buildMenuTree = (menus: MenuItem[]): MenuItem[] => {
        const tree: MenuItem[] = [];
        const menuMap = new Map<string, MenuItem>();

        // 创建菜单映射
        menus.forEach(menu => {
          menuMap.set(menu.id, { ...menu, children: [] });
        });

        // 构建树结构
        menus.forEach(menu => {
          const menuItem = menuMap.get(menu.id)!;
          if (menu.children && menu.children.length > 0) {
            menuItem.children = menu.children;
            tree.push(menuItem);
          } else {
            tree.push(menuItem);
          }
        });

        return tree;
      };
      
      return buildMenuTree(state.menuList);
    }
  },
  // Actions
  actions: {
    // 根据路径查找菜单
    findMenuByPath(menus: MenuItem[], path: string): MenuItem | null {
      for (const menu of menus) {
        if (menu.path === path) {
          return menu;
        }
        if (menu.children) {
          const found = this.findMenuByPath(menu.children, path);
          if (found) return found;
        }
      }
      return null;
    },

    async fetchMenuList(): Promise<MenuItem[]> {
      try {
        (this as any).loading = true;
        const { request } = get<MenuItem[]>('/api/menu/list');
        const menus = await request;
        (this as any).menuList = menus;
        return menus;
      } catch (error) {
        console.error('获取菜单列表失败:', error);
        // 返回默认菜单
        const defaultMenus: MenuItem[] = [
          {
            id: 'home',
            title: '首页',
            path: '/',
            icon: 'HomeOutlined',
            meta: {
              title: '首页',
              icon: 'HomeOutlined',
              requiresAuth: true
            }
          },
          {
            id: 'sub-page',
            title: '子页面',
            path: '/sub-page',
            icon: 'UserOutlined',
            meta: {
              title: '子页面',
              icon: 'UserOutlined',
              requiresAuth: true
            }
          }
        ];
        (this as any).menuList = defaultMenus;
        return defaultMenus;
      } finally {
        (this as any).loading = false;
      }
    },

    // 设置选中的菜单
    setSelectedKeys(keys: string[]) {
      (this as any).selectedKeys = keys;
    },

    // 设置展开的菜单
    setOpenKeys(keys: string[]) {
      (this as any).openKeys = keys;
    },

    // 切换菜单折叠状态
    toggleMenuCollapsed() {
      (this as any).menuCollapsed = !(this as any).menuCollapsed;
    },

    // 设置菜单折叠状态
    setMenuCollapsed(collapsed: boolean) {
      (this as any).menuCollapsed = collapsed;
    },

    // 根据路由设置面包屑
    setBreadcrumbsByRoute(route: RouteLocationNormalized) {
      const crumbs: BreadcrumbItem[] = [];
      const pathArray = route.path.split('/').filter(Boolean);
      
      let currentPath = '';
      pathArray.forEach(segment => {
        currentPath += `/${segment}`;
        const menu = this.findMenuByPath((this as any).menuList, currentPath);
        if (menu) {
          crumbs.push({
            title: menu.title,
            path: menu.path,
            icon: menu.icon
          });
        }
      });

      // 如果没有找到菜单，至少添加当前页面
      if (crumbs.length === 0 && route.meta?.title) {
        crumbs.push({
          title: route.meta.title as string,
          path: route.path
        });
      }

      (this as any).breadcrumbs = crumbs;
    },

    // 手动设置面包屑
    setBreadcrumbs(crumbs: BreadcrumbItem[]) {
      (this as any).breadcrumbs = crumbs;
    },

    // 添加菜单项
    addMenuItem(menu: MenuItem) {
      (this as any).menuList.push(menu);
    },

    // 更新菜单项
    updateMenuItem(id: string, updates: Partial<MenuItem>) {
      const index = (this as any).menuList.findIndex((menu: any) => menu.id === id);
      if (index !== -1) {
        (this as any).menuList[index] = { ...(this as any).menuList[index], ...updates };
      }
    },

    // 删除菜单项
    removeMenuItem(id: string) {
      const index = (this as any).menuList.findIndex((menu: any) => menu.id === id);
      if (index !== -1) {
        (this as any).menuList.splice(index, 1);
      }
    },

    // 重置菜单状态
    resetMenu() {
      (this as any).menuList = [];
      (this as any).openKeys = [];
      (this as any).selectedKeys = [];
      (this as any).breadcrumbs = [];
      (this as any).menuCollapsed = false;
    }
  }
}, {
  persist: {
    key: 'menu',
    storage: localStorage,
    pick: ['openKeys', 'menuCollapsed'], // 只持久化展开状态和折叠状态
  }
} as any);
