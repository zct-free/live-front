<template>
  <a-layout-sider width="220" class="app-sidebar" v-model:collapsed="collapsed">
    <div class="logo">直播系统</div>
    <a-menu
      mode="inline"
      v-model:selectedKeys="state.selectedKeys"
      :openKeys="state.openKeys"
      @openChange="onOpenChange"
      theme="dark"
    >
      <template v-for="route in menuRoutes" :key="route.name">
        <!-- 递归渲染菜单项 -->
        <menu-item :route="route" :icons="icons" />
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import AdminLayout from "@/layouts/AdminLayout.vue";
import {
  AppstoreOutlined,
  EditOutlined,
  FileTextOutlined,
  HomeOutlined,
  LockOutlined,
  PictureOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons-vue";
import { computed, reactive, ref } from "vue";
import { RouteRecordRaw, useRouter } from "vue-router";
import MenuItem from "./MenuItem.vue";

// Icons available for dynamic rendering
const icons: { [key: string]: any } = {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
  LockOutlined,
  FileTextOutlined,
  EditOutlined,
  AppstoreOutlined,
  PictureOutlined,
  VideoCameraOutlined,
};

const router = useRouter();
const collapsed = ref<boolean>(false);

const menuRoutes = computed(() => {
  const layoutRoute = router.options.routes.find(r => r.path === "/" && r.component === AdminLayout);
  if (layoutRoute && layoutRoute.children) {
    return layoutRoute.children
      .filter((child: RouteRecordRaw) => child.meta && child.meta.title && !child.meta.hiddenFromMenu)
      .map(child => {
        // Default icon logic
        if (child.name === "home" && !child.meta?.icon) {
          return { ...child, meta: { ...child.meta, icon: "HomeOutlined" } };
        }
        return child;
      });
  }
  return [];
});

const state = reactive({
  openKeys: [] as string[],
  selectedKeys: [] as string[],
  rootSubmenuKeys: [] as string[],
});

// 递归查找当前路由的所有父级路由
const findParentKeys = (routes: RouteRecordRaw[], targetName: string | symbol, parentKeys: string[] = []): string[] => {
  for (const route of routes) {
    if (route.name === targetName) {
      return parentKeys;
    }
    if (route.children && route.children.length > 0) {
      const found = findParentKeys(route.children, targetName, [...parentKeys, route.name as string]);
      if (found.length > parentKeys.length) {
        return found;
      }
    }
  }
  return parentKeys;
};

// 处理菜单展开变化
const onOpenChange = () => {};
</script>

<style lang="less" scoped>
.logo {
  height: 32px;
  color: #fff;
  margin: 16px;

  text-align: center;
  line-height: 30px;
  font-size: 18px;
}

.app-sidebar {
  // 侧边栏自定义样式
  // background-color: #fff;
  overflow: auto;
  // 滚动条轨道
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  // 滑块
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }

  .ant-menu {
    border-right: none;
  }

  .ant-menu-item {
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      .anticon {
        margin-right: 8px;
      }
    }
  }

  .ant-menu-submenu-title {
    .anticon {
      margin-right: 8px;
    }
  }
}
</style>
