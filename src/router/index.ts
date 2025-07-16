import AdminLayout from "@/layouts/AdminLayout.vue"; // Import the main layout
import { useUserStore } from "@/store/user"; // Import user store
import type { RouteRecordRaw } from "vue-router"; // Type import
import { createRouter, createWebHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/login",
  //   name: "login",
  //   component: () => import("@/views/Login/LoginView.vue"),
  //   meta: { requiresAuth: false }, // Simplified meta
  // },
  {
    path: "/", // Parent route for all authenticated views
    component: AdminLayout, // Use AdminLayout as the component for this route
    meta: { requiresAuth: false },
    redirect: "live-pd",
    children: [
      {
        path: "live-pd", // Default child for root, effectively makes '/' the home path
        name: "live-pd",
        redirect: "live-pd/list",
        meta: {
          title: "直播频道",
          icon: "HomeOutlined", // Keep existing icon for sidebar
        },
        children: [
          {
            path: "list",
            name: "list",
            component: () => import("@/views/live/liveList/index2.vue"), // Ensure this view exists
            meta: {
              title: "直播列表",
              icon: "UserOutlined",
            },
          },
          {
            path: "list-course",
            name: "list-course",
            component: () => import("@/views/live/liveList/index3.vue"), // Ensure this view exists
            meta: {
              title: "直播课程表",
              icon: "UserOutlined",
            },
          },
          {
            path: "list-sensitivewords",
            name: "list-sensitivewords",
            component: () => import("@/views/live/liveList/index4.vue"), // Ensure this view exists
            meta: {
              title: "直播敏感词",
              icon: "UserOutlined",
            },
          },
          {
            path: "template",
            name: "template",
            component: () => import("@/views/live/template/index.vue"), // Ensure this view exists
            meta: {
              title: "直播频道",
              icon: "UserOutlined",
            },
          },
        ],
      },
      {
        path: "live-settings", // Default child for root, effectively makes '/' the home path
        name: "live-settings",
        redirect: "live-settings/list",
        meta: {
          title: "直播设置",
          icon: "HomeOutlined", // Keep existing icon for sidebar
        },
        children: [
          {
            path: "list",
            name: "live-settings-list",
            component: () => import("@/views/liveSetting/channel.vue"), // Ensure this view exists
            meta: {
              title: "频道设置",
              icon: "UserOutlined",
            },
          },
          {
            path: "banned-users",
            name: "banned-users",
            component: () => import("@/views/liveSetting/bannedUsers.vue"), // Ensure this view exists
            meta: {
              title: "全平台封禁用户",
              icon: "UserOutlined",
            },
          },
          {
            path: "channel-ban-users",
            name: "channel-ban-users",
            component: () => import("@/views/liveSetting/channelBanUsers.vue"), // Ensure this view exists
            meta: {
              title: "频道封禁用户",
              icon: "UserOutlined",
            },
          },
          {
            path: "channel-sensitive-words",
            name: "channel-sensitive-words",
            component: () => import("@/views/liveSetting/channelSensitiveWord.vue"), // Ensure this view exists
            meta: {
              title: "平台内容库",
              icon: "UserOutlined",
            },
          },
          {
            path: "channel-prize",
            name: "channel-prize",
            component: () => import("@/views/liveSetting/prize.vue"), // Ensure this view exists
            meta: {
              title: "平台抽奖",
              icon: "UserOutlined",
            },
          },
          {
            path: "anchor-management",
            name: "anchor-management",
            component: () => import("@/views/liveSetting/anchorManagement.vue"), // Ensure this view exists
            meta: {
              title: "主播管理",
              icon: "UserOutlined",
            },
          },
        ],
      },
      {
        path: "liveStatis",
        redirect: "platform-statistics",
        children: [
          {
            path: "platform-statistics",
            name: "live-statis",
            component: () => import("@/views/statis/platformStatistics.vue"), // Ensure this view exists
            meta: {
              title: "平台统计",
            },
          },
          {
            path: "zbjtj",
            name: "live-statis-zbjtj",
            component: () => import("@/views/statis/zbjtj.vue"), // Ensure this view exists
            meta: {
              title: "直播间统计",
            },
          },
          {
            path: "cctj",
            name: "live-statis-cctj",
            component: () => import("@/views/statis/cctj.vue"), // Ensure this view exists
            meta: {
              title: "场次统计",
            },
          },
          {
            path: "yhtj",
            name: "live-statis-yhtj",
            component: () => import("@/views/statis/yhtj.vue"), // Ensure this view exists
            meta: {
              title: "用户统计",
            },
          },
        ],
        meta: {
          title: "直播统计",
        },
      },
    ],
  },
  // Fallback route for 404
  { path: "/:pathMatch(.*)*", name: "NotFound", component: () => import("@/views/NotFound.vue") },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore();
  const isLoggedIn = (userStore as any).isLoggedIn;

  // Check if any matched route record requires authentication
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isLoggedIn) {
    // If auth is required and user is not logged in, redirect to login
    next({ name: "login", query: { redirect: to.fullPath } });
  } else if (to.name === "login" && isLoggedIn) {
    // If user is logged in and tries to access login page, redirect to home
    next({ name: "home" });
  } else if (isLoggedIn && !(userStore as any).userInfo) {
    // If user is logged in but userInfo is not loaded, try to load it
    try {
      await (userStore as any).checkAuth();
      next(); // Proceed to the requested route
    } catch (error) {
      // If auth check fails, logout and redirect to login
      await userStore.logout();
      next({ name: "login", query: { redirect: to.fullPath } });
    }
  } else {
    // Otherwise, allow navigation
    next();
  }
});

export default router;
