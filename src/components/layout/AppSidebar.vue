<template>
  <a-layout-sider width="220" class="app-sidebar" v-model:collapsed="collapsed">
    <div class="logo">远程编辑</div>
    <div>
      <a-menu mode="inline" v-model:selectedKeys="state.selectedKeys" theme="dark" v-if="menuRoutes.length">
        <template v-for="route in menuRoutes" :key="route.name">
          <menu-item :route="route" :icons="icons" />
        </template>
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<script setup lang="js">
import { useUserStore } from "@/store/user";
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
import { computed, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import MenuItem from "./MenuItem.vue";

const userStore = useUserStore();
const route = useRoute();

// Icons available for dynamic rendering
const icons= {
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

const collapsed = ref(false);

const menuRoutes = computed(() => {
  const processRoutes = (routes) => {
    return routes
      .map((route) => {
        // 如果路由被隐藏或没有标题，直接过滤掉
        if (route.meta?.hiddenFromMenu || !route.meta?.title) {
          return null;
        }

        // 如果路由有children
        if (route.children && route.children.length > 0) {
          // 过滤有效的子路由
          const validChildren = route.children.filter(
            (child) => child.meta && child.meta.title && !child.meta.hiddenFromMenu
          );

          // 如果只有一个有效子菜单，优先检查 showParentMenu 设置
          if (validChildren.length === 1) {
            const child = validChildren[0];

            // 根据 showParentMenu 决定显示方式
            // 默认值为 true，只有明确设置为 false 才不显示父级菜单
            if (route.meta?.showParentMenu === false) {
              // 不显示父级菜单，只显示子菜单，但继承父级的一些属性
              return {
                ...child,
                path: route.path + "/" + child.path,
                meta: {
                  ...child.meta,
                  // 如果父级有图标而子级没有，使用父级图标
                  icon: child.meta?.icon || route.meta?.icon,
                },
              };
            } else {
              // 显示父级菜单，子菜单作为子项
              return {
                ...route,
                children: [
                  {
                    ...child,
                    path: route.path + "/" + child.path,
                  },
                ],
              };
            }
          }

          // 多个子菜单的情况，检查 alwaysShowChildren 设置
          // 默认值为 true，总是显示父级和所有子菜单
          if (route.meta?.alwaysShowChildren !== false) {
            return {
              ...route,
              children: validChildren.map((child) => ({
                ...child,
                path: route.path + "/" + child.path,
              })),
            };
          }
        }

        // 没有子菜单或其他情况，直接返回当前路由
        return route;
      })
      .filter((route) => route !== null);
  };

  return processRoutes(userStore.routes);
});
const state = reactive({
  openKeys: [] ,
  selectedKeys: [] ,
  rootSubmenuKeys: [],
});

// 根据当前路由设置菜单选中状态
const setSelectedKeys = () => {
  const currentPath = route.path;
  const currentName = route.name ;

  // 找到匹配的路由
  const findMatchedRoute = (routes, targetPath) => {
    for (const routeItem of routes) {
      if (routeItem.path === targetPath || routeItem.name === currentName) {
        return [routeItem.name ];
      }
      if (routeItem.children) {
        const childMatch = findMatchedRoute(routeItem.children, targetPath);
        if (childMatch.length > 0) {
          return childMatch;
        }
      }
    }
    return [];
  };

  const matched = findMatchedRoute(menuRoutes.value, currentPath);
  state.selectedKeys = matched;
};

// 监听路由变化，更新菜单选中状态
watch(
  () => route.path,
  () => {
    setSelectedKeys();
  },
  { immediate: true }
);
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
