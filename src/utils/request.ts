import { message } from "ant-design-vue";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

// 扩展 AxiosRequestConfig 类型
declare module "axios" {
	interface InternalAxiosRequestConfig {
		metadata?: {
			requestId?: string;
		};
	}
}

// 响应数据类型定义
export interface ApiResponse<T = any> {
	code: number;
	data: T;
	message: string;
	success: boolean;
}

// 请求管理器，用于管理正在进行的请求
class RequestManager {
	private pendingRequests = new Map<string, AbortController>();

	// 创建一个新的请求控制器
	createRequest(requestId: string): AbortController {
		const controller = new AbortController();
		this.pendingRequests.set(requestId, controller);
		return controller;
	}

	// 中断指定请求
	abortRequest(requestId: string): boolean {
		const controller = this.pendingRequests.get(requestId);
		if (controller) {
			controller.abort();
			this.pendingRequests.delete(requestId);
			return true;
		}
		return false;
	}

	// 中断所有请求
	abortAllRequests(): void {
		this.pendingRequests.forEach((controller) => {
			controller.abort();
		});
		this.pendingRequests.clear();
	}

	// 完成请求时清理
	completeRequest(requestId: string): void {
		this.pendingRequests.delete(requestId);
	}

	// 获取待处理请求数量
	getPendingRequestsCount(): number {
		return this.pendingRequests.size;
	}
}

// 创建全局请求管理器实例
export const requestManager = new RequestManager();

// 生成唯一请求ID
const generateRequestId = (): string => {
	return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// 创建 axios 实例
const service = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL || "/api",
	timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use(
	(config) => {
		// 生成请求ID并设置 AbortController
		const requestId = generateRequestId();
		const controller = requestManager.createRequest(requestId);
		
		// 设置 AbortController 信号
		config.signal = controller.signal;
		
		// 保存请求ID到metadata
		config.metadata = {
			requestId: requestId,
		};

		// 在请求头中添加 token
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		// 添加时间戳防止缓存
		if (config.method === "get") {
			config.params = {
				...config.params,
				_t: Date.now(),
			};
		}

		return config;
	},
	(error) => {
		console.error("请求错误:", error);
		return Promise.reject(error);
	}
);

// 响应拦截器
service.interceptors.response.use(
	(response: AxiosResponse<ApiResponse>) => {
		const { data, config } = response;
		
		// 请求完成时清理请求管理器中的记录
		if (config.metadata?.requestId) {
			requestManager.completeRequest(config.metadata.requestId);
		}

		// 根据业务状态码判断 ,判断是否是二进制或者array buffer 如果是二进制则直接返回
		if (data instanceof Blob || data instanceof ArrayBuffer) {
			return data;
		}
		if (data.code === 200 || data.success) {
			return data.data;
		}

		// 业务错误处理
		switch (data.code) {
			case 401:
				message.error("登录已过期，请重新登录");
				localStorage.removeItem("token");
				// 跳转到登录页
				window.location.href = "/login";
				break;
			case 403:
				message.error("没有权限访问该资源");
				break;
			case 404:
				message.error("请求的资源不存在");
				break;
			case 500:
				message.error("服务器内部错误");
				break;
			default:
				// message.error(data.message || "请求失败");
				break;
		}

		return Promise.reject(new Error(data.message || "请求失败"));
	},
	(error) => {

		// 清理请求管理器中的记录（如果有requestId）
		if (error.config?.metadata?.requestId) {
			requestManager.completeRequest(error.config.metadata.requestId);
		}

		// 处理请求被中断的情况
		if (axios.isCancel(error)) {
			console.log("请求已被取消:", error.message);
			return Promise.reject(error);
		}

		// 网络错误处理
		if (error.response) {
			const { status, data } = error.response;

			switch (status) {
				case 400:
					message.error(data?.message || "请求参数错误");
					break;
				case 401:
					message.error("登录已过期，请重新登录");
					localStorage.removeItem("token");
					window.location.href = "/login";
					break;
				case 403:
					message.error("没有权限访问该资源");
					break;
				case 404:
					message.error("请求的接口不存在");
					break;
				case 408:
					message.error("请求超时");
					break;
				case 500:
					message.error("服务器内部错误");
					break;
				case 502:
					message.error("网关错误");
					break;
				case 503:
					message.error("服务暂不可用");
					break;
				case 504:
					message.error("网关超时");
					break;
				default:
					message.error(`连接错误${status}`);
			}
		} else if (error.request) {
			// 请求已发出但没有收到响应
			message.error("网络连接异常，请检查网络");
		} else {
			// 其他错误
			message.error("请求配置错误");
		}

		return Promise.reject(error);
	}
);

// 扩展的 AxiosRequestConfig 类型，支持 requestId
export interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
	requestId?: string;
}

// 创建一个带有请求取消功能的请求方法
export const createCancellableRequest = <T = any>(config: ExtendedAxiosRequestConfig) => {
	const requestId = config.requestId || generateRequestId();
	const controller = requestManager.createRequest(requestId);
	
	// 创建新的配置对象，包含 AbortController 信号
	const requestConfig = {
		...config,
		signal: controller.signal,
	};

	// 手动设置 metadata
	(requestConfig as any).metadata = {
		requestId,
	};

	const request = service(requestConfig) as Promise<T>;

	return {
		request,
		cancel: () => requestManager.abortRequest(requestId),
		requestId,
	};
};

// 便捷方法：GET 请求
export const get = <T = any>(url: string, params?: any, config?: ExtendedAxiosRequestConfig) => {
	return createCancellableRequest<T>({
		...config,
		method: 'get',
		url,
		params,
	});
};

// 便捷方法：POST 请求
export const post = <T = any>(url: string, data?: any, config?: ExtendedAxiosRequestConfig) => {
	return createCancellableRequest<T>({
		...config,
		method: 'post',
		url,
		data,
	});
};

// 便捷方法：PUT 请求
export const put = <T = any>(url: string, data?: any, config?: ExtendedAxiosRequestConfig) => {
	return createCancellableRequest<T>({
		...config,
		method: 'put',
		url,
		data,
	});
};

// 便捷方法：DELETE 请求
export const del = <T = any>(url: string, config?: ExtendedAxiosRequestConfig) => {
	return createCancellableRequest<T>({
		...config,
		method: 'delete',
		url,
	});
};

export default service;
