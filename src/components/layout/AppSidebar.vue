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

// // 监听路由变化，智能处理菜单展开状态
// watch(
// 	() => route.name,
// 	(routeName) => {
// 		// 设置选中的菜单项
// 		// state.selectedKeys = routeName ? [routeName.toString()] : [];

// 		// // 智能展开父级菜单：只展开当前路由的父级菜单，关闭其他所有菜单
// 		// if (routeName) {
// 		// 	const parentKeys = findParentKeys(menuRoutes.value, routeName);
// 		// 	// 只设置当前路由需要的父级菜单，这样会自动关闭其他不相关的菜单
// 		// 	state.openKeys = [...parentKeys];
// 		// } else {
// 		// 	// 没有路由时清空所有展开状态
// 		// 	state.openKeys = [];
// 		// }
// 	},
// 	{ immediate: true }
// );

// 处理菜单展开变化
const onOpenChange = () => {
  // // 获取所有一级菜单的 key
  // if (state.rootSubmenuKeys.length === 0) {
  // 	state.rootSubmenuKeys = menuRoutes.value.filter((route) => route.children && route.children.length > 0).map((route) => route.name as string);
  // }
  // // 找到最新点击的菜单key（新展开的）
  // const latestOpenKey = openKeys.find((key) => !state.openKeys.includes(key));
  // if (latestOpenKey && state.rootSubmenuKeys.includes(latestOpenKey)) {
  // 	// 如果点击展开一级菜单，只保留这一个展开的菜单
  // 	state.openKeys = [latestOpenKey];
  // } else {
  // 	// 其他情况（收起菜单、多级菜单等），直接使用传入的openKeys
  // 	state.openKeys = openKeys;
  // }
};

// defineOptions({ name: 'AppSidebar' }); // Optional: if you need to explicitly set the component name
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
