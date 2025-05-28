<!-- Vue 组件中使用 AbortController 的示例 -->
<template>
	<div>
		<h3>用户列表</h3>
		<button @click="loadUsers" :disabled="loading">
			{{ loading ? "加载中..." : "加载用户" }}
		</button>
		<button @click="cancelRequest" :disabled="!loading">取消请求</button>
		<button @click="cancelAllRequests">取消所有请求</button>

		<div>待处理请求数量: {{ pendingCount }}</div>

		<ul v-if="users.length">
			<li v-for="user in users" :key="user.id">
				{{ user.name }}
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { get, requestManager } from "@/utils/request";
import { onMounted, onUnmounted, ref } from "vue";

interface User {
	id: number;
	name: string;
	email: string;
}

const users = ref<User[]>([]);
const loading = ref(false);
const pendingCount = ref(0);

// 保存当前请求的取消函数
let currentRequest: { cancel: () => void; requestId: string } | null = null;

// 加载用户数据
const loadUsers = async () => {
	// 如果有正在进行的请求，先取消它
	if (currentRequest) {
		currentRequest.cancel();
	}

	loading.value = true;

	try {
		// 创建可取消的请求
		const { request, cancel, requestId } = get<User[]>("/api/users");
		currentRequest = { cancel, requestId };

		const data = await request;
		users.value = data;
		console.log("用户数据加载成功:", data);
	} catch (error: any) {
		if (error.name === "CanceledError" || error.message?.includes("canceled")) {
			console.log("请求被取消");
		} else {
			console.error("加载用户数据失败:", error);
		}
	} finally {
		loading.value = false;
		currentRequest = null;
		updatePendingCount();
	}
};

// 取消当前请求
const cancelRequest = () => {
	if (currentRequest) {
		currentRequest.cancel();
		currentRequest = null;
		loading.value = false;
		console.log("请求已取消");
		updatePendingCount();
	}
};

// 取消所有请求
const cancelAllRequests = () => {
	requestManager.abortAllRequests();
	loading.value = false;
	currentRequest = null;
	console.log("所有请求已取消");
	updatePendingCount();
};

// 更新待处理请求数量
const updatePendingCount = () => {
	pendingCount.value = requestManager.getPendingRequestsCount();
};

// 定期更新待处理请求数量
let timer: NodeJS.Timeout;

onMounted(() => {
	updatePendingCount();
	timer = setInterval(updatePendingCount, 1000);
});

onUnmounted(() => {
	// 组件卸载时取消当前请求
	if (currentRequest) {
		currentRequest.cancel();
	}
	if (timer) {
		clearInterval(timer);
	}
});
</script>

<style scoped>
button {
	margin: 5px;
	padding: 8px 16px;
	background: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

button:disabled {
	background: #6c757d;
	cursor: not-allowed;
}

ul {
	margin-top: 20px;
}

li {
	padding: 5px 0;
	border-bottom: 1px solid #eee;
}
</style>
