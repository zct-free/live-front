// 用户管理 Store
import { asyncRoutes, resetRouterState } from "@/router/index";
import type { LoginParams, UserInfo } from "@/types/user";
import { get } from "@/utils/request";
import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";


// 定义状态类型
interface UserState {
  token: string;
  userInfo: UserInfo | null;
  loading: boolean;
  permissions: string[];
  routes: RouteRecordRaw[];
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    token: "",
    userInfo: null,
    loading: false,
    permissions: [],
    routes: [],
  }),

  getters: {
    isLoggedIn: (state: any) => !!state.token,
    userName: (state: any) => state.userInfo?.name || "",
    userRole: (state: any) => state.userInfo?.role || "",
    hasPermission: (state: any) => (permission: string) => {
      return state.permissions.indexOf(permission) !== -1;
    },
    permissionRoutes: (state: any) => {
      return state.routes;
    },
  },
  actions: {
    async login(params: LoginParams): Promise<{ token: string; user: UserInfo }> {
      (this as any).loading = true;
      try {
        const mockResponse = {
          token: "mock-jwt-token-" + Date.now(),
          user: {
            id: 1,
            name: "Admin User",
            username: "admin",
            email: "admin@example.com",
            avatar: "",
            role: "admin",
            status: "active" as const,
            lastLoginTime: new Date().toISOString(),
          },
        };

        // 保存 token
        (this as any).token = mockResponse.token;
        localStorage.setItem("token", mockResponse.token);

        // 保存用户信息
        (this as any).userInfo = mockResponse.user;
        // 设置模拟权限
        (this as any).permissions = ["read", "write", "admin"];

        return mockResponse;
      } catch (error) {
        console.error("登录失败:", error);
        throw error;
      } finally {
        (this as any).loading = false;
      }
    },

    async logout(): Promise<void> {
      try {
        // 可选：调用后端登出接口
        // const { request } = post("/api/auth/logout");
        // await request;
      } catch (error) {
        console.error("登出请求失败:", error);
      } finally {
        // 清除本地数据
        (this as any).token = "";
        (this as any).userInfo = null;
        (this as any).permissions = [];
        localStorage.clear();
        // 重置路由状态
        resetRouterState();
      }
    },

    async fetchUserInfo(): Promise<UserInfo | null> {
      if (!(this as any).token) return null;

      try {
        const { request } = get<UserInfo>("/api/user/info");
        const user = await request;
        (this as any).userInfo = user;
        return user;
      } catch (error) {
        console.error("获取用户信息失败:", error);
        throw error;
      }
    },

    async fetchPermissions(): Promise<string[]> {
      if (!(this as any).token) return [];

      try {
        const { request } = get<string[]>("/api/user/permissions");
        const perms = await request;
        (this as any).permissions = perms;
        return perms;
      } catch (error) {
        console.error("获取权限失败:", error);
        return [];
      }
    },
    async generateRoutes(): Promise<any> {
      try {
        // const res = await getMenusApi({ menuId: "2001" });
        // const roles = getAsycMenus(res?.children || []);
        const roles = getAsycMenus(asyncRoutes);
        const accessRoutes = filterAsyncRoutes(asyncRoutes || [], roles);
        (this as any).routes = accessRoutes; // 保存到状态中
        return accessRoutes;
      } catch (error) {
        console.error("获取菜单路由失败:", error);
        // 返回空数组而不是抛出错误，避免路由守卫重定向到登录页
        return [];
      }
    },
    // 重置状态
    $reset(): void {
      (this as any).token = "";
      (this as any).userInfo = null;
      (this as any).loading = false;
      (this as any).permissions = [];
      localStorage.removeItem("token");
    },
  },
} as any);
const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]): RouteRecordRaw[] => {
  const res: RouteRecordRaw[] = [];
  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(tmp, roles)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });
  return res;
};
const hasPermission = (route: RouteRecordRaw, roles: string[]): boolean => {
  return true;
  if (route.name && typeof route.name === "string") {
    return roles.includes(route.name) || route.name === "NotFound";
  }
  return false;
};
const getAsycMenus = (list: Array<any>) => {
  return list.reduce((acc: any[], item: any) => {
    if (item?.children && item?.children?.length > 0) {
      acc.push(...getAsycMenus(item.children));
    }
    acc.push(item.path);
    return acc;
  }, []) as any[];
};
