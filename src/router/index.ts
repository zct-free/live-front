import AdminLayout from "@/layouts/AdminLayout.vue"; // Import the main layout
import { useUserStore } from "@/store/user"; // Import user store
import Cookies from "js-cookie"; // Import js-cookie for cookie management
import type { RouteRecordRaw } from "vue-router"; // Type import
import { createRouter, createWebHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/", // Parent route for all authenticated views
    component: AdminLayout, // Use AdminLayout as the component for this route
    redirect: "/live-home",
    children: [
      {
        path: "live-home",
        name: "live-home",

        component: () => import("@/views/Home/HomeView.vue"), // Ensure this view exists
        meta: {
          title: "直播首页",
          icon: "HomeOutlined",
          hiddenFromMenu: true,
        },
      },
    ],
  },
];
export const asyncRoutes = [
  {
    path: "/live-pd", // Default child for root, effectively makes '/' the home path
    name: "live-pd",
    redirect: "/live-pd/list",
    component: AdminLayout, // Use AdminLayout as the component for this route
    meta: {
      title: "直播频道",
      icon: "HomeOutlined", // Keep existing icon for sidebar
    },
    children: [
      {
        path: "list",
        name: "live-list",
        component: () => import("@/views/live/liveList/index2.vue"), // Ensure this view exists
        meta: {
          title: "直播列表",
          icon: "UserOutlined",
        },
      },
      // {
      //   path: "list-course",
      //   name: "list-course",
      //   component: () => import("@/views/live/liveList/index3.vue"), // Ensure this view exists
      //   meta: {
      //     title: "直播课程表",
      //     icon: "UserOutlined",
      //   },
      // },
      // {
      //   path: "list-sensitivewords",
      //   name: "list-sensitivewords",
      //   component: () => import("@/views/live/liveList/index4.vue"), // Ensure this view exists
      //   meta: {
      //     title: "直播敏感词",
      //     icon: "UserOutlined",
      //   },
      // },
      {
        path: "live-channel",
        name: "live-channel",
        meta: {
          title: "直播频道",
          icon: "UserOutlined",
        },
        redirect: "live-channel/live-room",
        children: [
          {
            path: "live-room",
            name: "live-room",
            component: () => import("@/views/live/template/c1.vue"),
            meta: {
              title: "聊天室设置",
              icon: "UserOutlined",
            },
          },
          {
            path: "live-gky",
            name: "live-gky",
            component: () => import("@/views/live/template/c2.vue"),
            meta: {
              title: "观看页设置",
              icon: "UserOutlined",
            },
          },
          {
            path: "live-hgfk",
            name: "live-hgfk",
            component: () => import("@/views/live/template/c3.vue"),
            meta: {
              title: "合规风控",
              icon: "UserOutlined",
            },
          },
          {
            path: "live-zbhd",
            name: "live-zbhd",
            component: () => import("@/views/live/template/c4.vue"),
            meta: {
              title: "直播互动",
              icon: "UserOutlined",
            },
          },
          {
            path: "live-bfqsz",
            name: "live-bfqsz",
            component: () => import("@/views/live/template/c5.vue"),
            meta: {
              title: "播放器设置",
              icon: "UserOutlined",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/live-settings", // Default child for root, effectively makes '/' the home path
    name: "live-settings",
    redirect: "/live-settings/list",
    component: AdminLayout, // Use AdminLayout as the component for this route

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
    path: "/live-statistics",
    redirect: "/live-statistics/platform-statistics",
    name: "live-statis",
    component: AdminLayout, // Use AdminLayout as the component for this route

    children: [
      {
        path: "platform-statistics",
        name: "platform-statis",
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
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
    meta: {
      hiddenFromMenu: true, // Hide from menu
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes, // Combine static and async routes
});

let hasAddedRoutes = false;

// 导出重置路由状态的函数
export const resetRouterState = () => {
  hasAddedRoutes = false;
};

router.beforeEach(async (to, _from, next) => {
  // // 如果启用了CAS认证，使用CAS路由守卫
  // if (import.meta.env.VITE_CASE_ENABLED !== "false") {
  //   await casRouterGuard(to, _from, next);
  //   return;
  // }

  const hasToken = Cookies.get("Admin-Token");
  if (hasToken) {
    const userStore = useUserStore();
    try {
      if (!hasAddedRoutes) {
        const accessRoutes = await (userStore as any).generateRoutes();
        addAsyncRoutes(accessRoutes);
        await new Promise(resolve => setTimeout(resolve, 100));
        hasAddedRoutes = true;
        // 处理动态路由后，判断目标路由是否存在
        const matched = router.resolve(to).matched;
        if (!matched.length) {
          next({ name: "NotFound" });
        } else {
          next({ ...to, replace: true });
        }
      } else {
        // 处理目标路由不存在的情况
        const matched = router.resolve(to).matched;
        if (!matched.length) {
          next({ name: "NotFound" });
        } else {
          next();
        }
      }
    } catch (error) {
      hasAddedRoutes = false; // 重置标记
      next();
    }
  } else {
    hasAddedRoutes = false; // 重置标记
    // 404 页面或其他未授权页面
    if (to.path === "/:pathMatch(.*)*") {
      next({ name: "NotFound" });
    } else {
      next({ path: "/login" });
    }
  }
});

export default router;
const addAsyncRoutes = (routes: RouteRecordRaw[]) => {
  routes.forEach(route => {
    router.addRoute(route);
  });
};
