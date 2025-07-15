<template>
  <a-breadcrumb class="breadcrumb" separator="/">
    <a-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index">
      <router-link v-if="item.path && index < breadcrumbItems.length - 1" :to="item.path">
        <!-- <component v-if="item.icon" :is="item.icon" /> -->
        {{ item.title }}
      </router-link>
      <span v-else>
        <!-- <component v-if="item.icon" :is="item.icon" /> -->
        {{ item.title }}
      </span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { HomeOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons-vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// 面包屑数据
const breadcrumbItems = computed(() => {
  const matched = route.matched.filter(item => item.meta && item.meta.title);
  const items: Array<{
    title: string;
    path?: string;
    icon?: any;
  }> = [];

  // 添加当前路由路径
  matched.forEach((match, index) => {
    const isLast = index === matched.length - 1;
    items.push({
      title: isLast ? (route?.query?.title ?? (match.meta.title as string)) : (match.meta.title as string),
      path: isLast || index === 0 ? undefined : match.path,
      icon: match.meta.icon ? getIconComponent(match.meta.icon as string) : undefined,
    });
  });
  return items;
});

// 获取图标组件
const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, any> = {
    HomeOutlined,
    UserOutlined,
    SettingOutlined,
  };
  return iconMap[iconName] || null;
};
</script>

<style lang="less" scoped>
.breadcrumb {
  line-height: 64px;
  :deep(.ant-breadcrumb-link) {
    color: #fff !important;
  }
  :deep(.ant-breadcrumb-separator) {
    color: #807d7d;
  }
}
</style>
