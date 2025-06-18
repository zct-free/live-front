<template>
	<a-layout-header class="app-header">
		<div class="header-left">
			<span class="app-title">积分系统</span>
			<BreadCrumb />
		</div>
		<div class="header-right">
			<a-dropdown>
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
			</a-dropdown>
		</div>
	</a-layout-header>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/user";
import { DownOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import BreadCrumb from "./BreadCrumb.vue";

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
	// background: #d64540;
	color: white;
	padding: 0 24px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.header-left {
	display: flex;
	align-items: center;
	gap: 24px;

	.app-title {
		font-size: 18px;
		font-weight: 600;
		color: white;
	}

	.breadcrumb {
		:deep(.ant-breadcrumb-link) {
			color: rgba(255, 255, 255, 0.65);

			&:hover {
				color: white;
			}
		}

		:deep(.ant-breadcrumb-separator) {
			color: rgba(255, 255, 255, 0.45);
		}

		:deep(.ant-breadcrumb-link a) {
			color: rgba(255, 255, 255, 0.65);
			text-decoration: none;

			&:hover {
				color: white;
			}
		}

		// 当前页面（最后一项）
		:deep(.ant-breadcrumb-link:last-child) {
			color: white;
		}

		span {
			color: white;
		}
	}
}

.header-right {
	.user-info {
		color: white;
		border: none;
		height: auto;
		padding: 8px 12px;
		display: flex;
		align-items: center;
		gap: 8px;

		&:hover {
			background-color: rgba(255, 255, 255, 0.1);
		}

		.username {
			margin: 0 4px;
			max-width: 120px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
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
