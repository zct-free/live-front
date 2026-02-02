// 用户管理 Store
import { asyncRoutes } from "@/router/index";
import { get } from "@/utils/request";
import { defineStore } from "pinia";

export const useUserStore = defineStore("live-user", {
  state: () => ({
    token: "",
    userInfo: null,
    loading: false,
    permissions: [],
    routes: [],
  }),

  getters: {
    isLoggedIn: state => !!state.token,
    userName: state => state.userInfo?.name || "",
    userRole: state => state.userInfo?.role || "",
    hasPermission: state => permission => {
      return state.permissions.indexOf(permission) !== -1;
    },
    permissionRoutes: state => {
      return state.routes;
    },
  },
  actions: {
    async fetchUserInfo() {
      if (!this.token) return null;

      try {
        const { request } = get("/api/user/info");
        const user = await request;
        this.userInfo = user;
        return user;
      } catch (error) {
        console.error("获取用户信息失败:", error);
        throw error;
      }
    },

    async fetchPermissions() {
      if (!this.token) return [];

      try {
        const { request } = get("/api/user/permissions");
        const perms = await request;
        this.permissions = perms;
        return perms;
      } catch (error) {
        console.error("获取权限失败:", error);
        return [];
      }
    },
    async generateRoutes() {
      try {
        // const res = await getMenusApi({ menuId: "2001" });
        // const roles = getAsycMenus(res?.children || []);
        const roles = getAsycMenus(asyncRoutes);
        const accessRoutes = filterAsyncRoutes(asyncRoutes || [], roles);
        this.routes = accessRoutes; // 保存到状态中
        return accessRoutes;
      } catch (error) {
        console.error("获取菜单路由失败:", error);
        // 返回空数组而不是抛出错误，避免路由守卫重定向到登录页
        return [];
      }
    },
    // 重置状态
    $reset() {
      this.token = "";
      this.userInfo = null;
      this.loading = false;
      this.permissions = [];
      localStorage.removeItem("token");
    },
  },
});
const filterAsyncRoutes = (routes, roles) => {
  const res = [];
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
const hasPermission = (route, roles) => {
  return true;
  if (route.name && typeof route.name === "string") {
    return roles.includes(route.name) || route.name === "NotFound";
  }
  return false;
};
const getAsycMenus = list => {
  return list.reduce((acc, item) => {
    if (item?.children && item?.children?.length > 0) {
      acc.push(...getAsycMenus(item.children));
    }
    acc.push(item.path);
    return acc;
  }, []);
};
