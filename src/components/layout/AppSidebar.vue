<template>
  <a-layout-sider width="220" class="app-sidebar" v-model:collapsed="collapsed">
    <div class="logo">直播系统</div>
    <div>
      <a-menu mode="inline" v-model:selectedKeys="state.selectedKeys" theme="dark" v-if="menuRoutes.length">
        <template v-for="route in menuRoutes" :key="route.name">
          <menu-item :route="route" :icons="icons" />
        </template>
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
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
import { computed, reactive, ref } from "vue";
import { RouteRecordRaw } from "vue-router";
import MenuItem from "./MenuItem.vue";

const userStore = useUserStore();

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

const collapsed = ref<boolean>(false);

const menuRoutes = computed(() => {
  return (userStore as any).routes.filter((route: RouteRecordRaw) => {
    // 过滤掉没有标题或被隐藏的路由
    return route.meta && route.meta.title && !route.meta.hiddenFromMenu;
  });
});

const state = reactive({
  openKeys: [] as string[],
  selectedKeys: [] as string[],
  rootSubmenuKeys: [] as string[],
});
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
