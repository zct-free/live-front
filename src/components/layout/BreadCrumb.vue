<template>
	<a-breadcrumb class="breadcrumb">
		<a-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index">
			<router-link v-if="item.path && index < breadcrumbItems.length - 1" :to="item.path">
				<component v-if="item.icon" :is="item.icon" />
				{{ item.title }}
			</router-link>
			<span v-else>
				<component v-if="item.icon" :is="item.icon" />
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
	const matched = route.matched.filter((item) => item.meta && item.meta.title);
	const items: Array<{
		title: string;
		path?: string;
		icon?: any;
	}> = [];

	// 添加首页
	if (route.name !== "home") {
		items.push({
			title: "首页",
			path: "/home",
			icon: HomeOutlined,
		});
	}

	// 添加当前路由路径
	matched.forEach((match, index) => {
		const isLast = index === matched.length - 1;
		items.push({
			title: match.meta.title as string,
			path: isLast ? undefined : match.path,
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
