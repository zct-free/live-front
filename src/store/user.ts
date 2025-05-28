// 用户管理 Store
import type { LoginParams, UserInfo } from "@/types/user";
import { get, post } from "@/utils/request";
import { defineStore } from "pinia";

// 定义状态类型
interface UserState {
	token: string;
	userInfo: UserInfo | null;
	loading: boolean;
	permissions: string[];
}

export const useUserStore = defineStore("user", {
	state: (): UserState => ({
		token: localStorage.getItem("token") || "",
		userInfo: null,
		loading: false,
		permissions: [],
	}),

	getters: {
		isLoggedIn: (state: any) => !!state.token,
		userName: (state: any) => state.userInfo?.name || "",
		userRole: (state: any) => state.userInfo?.role || "guest",
		hasPermission: (state: any) => (permission: string) => {
			return state.permissions.indexOf(permission) !== -1;
		},
	},
	actions: {
		async login(params: LoginParams): Promise<{ token: string; user: UserInfo }> {
			(this as any).loading = true;
			try {
				// 演示用的本地验证
				if (params.username === "admin" && params.password === "password") {
					const mockResponse = {
						token: "mock-jwt-token-" + Date.now(),
						user: {
							id: 1,
							name: "Admin User",
							username: "admin",
							email: "admin@example.com",
							avatar: "",
							role: "admin",
							status: "active" as const,
							lastLoginTime: new Date().toISOString(),
						},
					};

					// 保存 token
					(this as any).token = mockResponse.token;
					localStorage.setItem("token", mockResponse.token);

					// 保存用户信息
					(this as any).userInfo = mockResponse.user;
					// 设置模拟权限
					(this as any).permissions = ["read", "write", "admin"];

					return mockResponse;
				} else {
					throw new Error("用户名或密码错误");
				}

				// 以下是真实API调用的代码（当有后端API时使用）
				/*
        const { request } = post<{ token: string; user: UserInfo }>('/api/auth/login', params);
        const response = await request;
        
        // 保存 token
        (this as any).token = response.token;
        localStorage.setItem('token', response.token);
        
        // 保存用户信息
        (this as any).userInfo = response.user;
        
        // 获取权限
        await this.fetchPermissions();
        
        return response;
        */
			} catch (error) {
				console.error("登录失败:", error);
				throw error;
			} finally {
				(this as any).loading = false;
			}
		},

		async logout(): Promise<void> {
			try {
				// 可选：调用后端登出接口
				// const { request } = post("/api/auth/logout");
				// await request;
			} catch (error) {
				console.error("登出请求失败:", error);
			} finally {
				// 清除本地数据
				(this as any).token = "";
				(this as any).userInfo = null;
				(this as any).permissions = [];
        localStorage.clear()
			}
		},

		async fetchUserInfo(): Promise<UserInfo | null> {
			if (!(this as any).token) return null;

			try {
				const { request } = get<UserInfo>("/api/user/info");
				const user = await request;
				(this as any).userInfo = user;
				return user;
			} catch (error) {
				console.error("获取用户信息失败:", error);
				throw error;
			}
		},

		async fetchPermissions(): Promise<string[]> {
			if (!(this as any).token) return [];

			try {
				const { request } = get<string[]>("/api/user/permissions");
				const perms = await request;
				(this as any).permissions = perms;
				return perms;
			} catch (error) {
				console.error("获取权限失败:", error);
				return [];
			}
		},

		async updateUserInfo(data: Partial<UserInfo>): Promise<UserInfo> {
			try {
				const { request } = post<UserInfo>("/api/user/update", data);
				const updatedUser = await request;
				(this as any).userInfo = { ...(this as any).userInfo, ...updatedUser };
				return updatedUser;
			} catch (error) {
				console.error("更新用户信息失败:", error);
				throw error;
			}
		},

		async checkAuth(): Promise<boolean> {
			if (!(this as any).token) return false;

			try {
				await this.fetchUserInfo();
				await this.fetchPermissions();
				return true;
			} catch (error) {
				// token 无效，清除登录状态
				await this.logout();
				return false;
			}
		},

		// 重置状态
		$reset(): void {
			(this as any).token = "";
			(this as any).userInfo = null;
			(this as any).loading = false;
			(this as any).permissions = [];
			localStorage.removeItem("token");
		},
	},
} as any);
