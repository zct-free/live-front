<template>
  <a-layout-header class="app-header">
    <div class="header-right">
      <BreadCrumb />

      <div class="user-info">
        <div>你好，{{ (userStore as any).userInfo?.name || "" }}</div>
        <div @click="handleLogout" class="logout"><LogoutOutlined class="logout-icon" />安全退出</div>
      </div>

      <!-- <a-dropdown>
				<template #overlay>
					<a-menu>
						<a-menu-item key="profile">
							<UserOutlined />
							个人资料
						</a-menu-item>
						<a-menu-item key="settings">
							<SettingOutlined />
							设置
						</a-menu-item>
						<a-menu-divider />
						<a-menu-item key="logout" @click="handleLogout">
							<LogoutOutlined />
							退出登录
						</a-menu-item>
					</a-menu>
				</template>
				<a-button type="text" class="user-info">
					<a-avatar :size="32" :src="(userStore as any).userInfo?.avatar">
						<template #icon><UserOutlined /></template>
					</a-avatar>
					<span class="username">{{ (userStore as any).userInfo?.name || "用户" }}</span>
					<DownOutlined />
				</a-button>
			</a-dropdown> -->
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import BreadCrumb from "@/components/layout/BreadCrumb.vue";
import { useUserStore } from "@/store/user";
import { LogoutOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

const handleLogout = async () => {
  try {
    await (userStore as any).logout();
    message.success("已成功退出登录");
    router.push({ name: "login" });
  } catch (error) {
    console.error("退出登录失败:", error);
    message.error("退出登录失败");
  }
};
</script>

<style lang="less" scoped>
.app-header {
  color: white;
  padding-right: 24px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  // background-color: @primary-color; // 使用主题色
}

.header-right {
  display: flex;
  justify-content: space-between;
  .user-info {
    color: #fff;
    display: flex;
    align-items: center;
    gap: 20px;
    .logout {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      .logout-icon {
        font-size: 20px;
      }
    }
  }
}

:deep(.ant-dropdown-menu) {
  .ant-menu-item {
    &:hover {
      background-color: #f5f5f5;
    }
  }
}
</style>
