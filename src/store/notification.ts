// 通知管理 Store
import { get, post, put } from '@/utils/request';
import { defineStore } from 'pinia';

// 通知类型定义
export interface NotificationItem {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'success' | 'warning' | 'error';
  status: 'unread' | 'read';
  category: 'system' | 'message' | 'task' | 'announcement';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt?: string;
  actions?: NotificationAction[];
  metadata?: Record<string, any>;
}

// 通知操作
export interface NotificationAction {
  id: string;
  label: string;
  type: 'primary' | 'default' | 'danger';
  action: string;
  params?: Record<string, any>;
}

// 通知统计
export interface NotificationStats {
  total: number;
  unread: number;
  byCategory: Record<string, number>;
  byPriority: Record<string, number>;
}

export const useNotificationStore = defineStore('notification', {
  // 状态
  state: () => ({
    notifications: [] as NotificationItem[],
    loading: false,
    polling: false,
    pollingInterval: null as number | null,
    lastFetchTime: ''
  }),

  // 计算属性
  getters: {
    unreadCount: (state) => {
      return state.notifications.filter(n => n.status === 'unread').length;
    },

    unreadNotifications: (state) => {
      return state.notifications.filter(n => n.status === 'unread');
    },

    readNotifications: (state) => {
      return state.notifications.filter(n => n.status === 'read');
    },

    notificationsByCategory: (state) => {
      const categories: Record<string, NotificationItem[]> = {};
      state.notifications.forEach(notification => {
        if (!categories[notification.category]) {
          categories[notification.category] = [];
        }
        categories[notification.category].push(notification);
      });
      return categories;
    },

    highPriorityNotifications: (state) => {
      return state.notifications.filter(n => 
        n.priority === 'high' || n.priority === 'urgent'
      ).sort((a, b) => {
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
    },

    notificationStats: (state): NotificationStats => {
      const stats: NotificationStats = {
        total: state.notifications.length,
        unread: state.notifications.filter(n => n.status === 'unread').length,
        byCategory: {},
        byPriority: {}
      };

      state.notifications.forEach(n => {
        // 按分类统计
        if (!stats.byCategory[n.category]) {
          stats.byCategory[n.category] = 0;
        }
        stats.byCategory[n.category]++;

        // 按优先级统计
        if (!stats.byPriority[n.priority]) {
          stats.byPriority[n.priority] = 0;
        }
        stats.byPriority[n.priority]++;
      });

      return stats;
    }
  },

  // Actions
  actions: {
    async fetchNotifications(params?: {
      page?: number;
      limit?: number;
      category?: string;
      status?: string;
    }): Promise<NotificationItem[]> {
      try {
        this.loading = true;
        const { request } = get<{
          list: NotificationItem[];
          total: number;
        }>('/api/notifications', params);
        
        const response = await request;
        
        if (params?.page === 1 || !params?.page) {
          // 如果是第一页或没有分页参数，替换所有通知
          this.notifications = response.list;
        } else {
          // 否则追加到现有通知
          this.notifications.push(...response.list);
        }
        
        this.lastFetchTime = new Date().toISOString();
        return response.list;
      } catch (error) {
        console.error('获取通知失败:', error);
        return [];
      } finally {
        this.loading = false;
      }
    },

    // 标记通知为已读
    async markAsRead(notificationId: string): Promise<boolean> {
      try {
        const { request } = put(`/api/notifications/${notificationId}/read`);
        await request;
        
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
          notification.status = 'read';
          notification.updatedAt = new Date().toISOString();
        }
        
        return true;
      } catch (error) {
        console.error('标记通知已读失败:', error);
        return false;
      }
    },

    // 批量标记为已读
    async markMultipleAsRead(notificationIds: string[]): Promise<boolean> {
      try {
        const { request } = put('/api/notifications/batch-read', { ids: notificationIds });
        await request;
        
        this.notifications.forEach(notification => {
          if (notificationIds.includes(notification.id)) {
            notification.status = 'read';
            notification.updatedAt = new Date().toISOString();
          }
        });
        
        return true;
      } catch (error) {
        console.error('批量标记已读失败:', error);
        return false;
      }
    },

    // 全部标记为已读
    async markAllAsRead(): Promise<boolean> {
      const unreadIds = this.unreadNotifications.map(n => n.id);
      if (unreadIds.length === 0) return true;
      
      return await this.markMultipleAsRead(unreadIds);
    },

    // 删除通知
    async deleteNotification(notificationId: string): Promise<boolean> {
      try {
        const { request } = post(`/api/notifications/${notificationId}/delete`);
        await request;
        
        const index = this.notifications.findIndex(n => n.id === notificationId);
        if (index !== -1) {
          this.notifications.splice(index, 1);
        }
        
        return true;
      } catch (error) {
        console.error('删除通知失败:', error);
        return false;
      }
    },

    // 清空已读通知
    async clearReadNotifications(): Promise<boolean> {
      try {
        const { request } = post('/api/notifications/clear-read');
        await request;
        
        this.notifications = this.notifications.filter(n => n.status === 'unread');
        return true;
      } catch (error) {
        console.error('清空已读通知失败:', error);
        return false;
      }
    },

    // 执行通知操作
    async executeNotificationAction(
      notificationId: string, 
      actionId: string
    ): Promise<boolean> {
      try {
        const notification = this.notifications.find(n => n.id === notificationId);
        const action = notification?.actions?.find(a => a.id === actionId);
        
        if (!action) {
          throw new Error('Action not found');
        }
        
        const { request } = post(`/api/notifications/${notificationId}/actions/${actionId}`, {
          params: action.params
        });
        
        await request;
        
        // 执行操作后自动标记为已读
        await this.markAsRead(notificationId);
        
        return true;
      } catch (error) {
        console.error('执行通知操作失败:', error);
        return false;
      }
    },

    // 添加本地通知（用于模拟实时通知）
    addLocalNotification(notification: Omit<NotificationItem, 'id' | 'createdAt'>) {
      const newNotification: NotificationItem = {
        ...notification,
        id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
      };
      
      this.notifications.unshift(newNotification);
    },

    // 开始轮询
    startPolling(intervalMs: number = 30000) {
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval);
      }
      
      this.polling = true;
      this.pollingInterval = setInterval(() => {
        this.fetchNotifications({ page: 1, limit: 20 });
      }, intervalMs);
    },

    // 停止轮询
    stopPolling() {
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval);
        this.pollingInterval = null;
      }
      this.polling = false;
    },

    // 过滤通知
    filterNotifications(filters: {
      category?: string;
      status?: string;
      priority?: string;
      startDate?: string;
      endDate?: string;
    }) {
      return this.notifications.filter(notification => {
        if (filters.category && notification.category !== filters.category) {
          return false;
        }
        
        if (filters.status && notification.status !== filters.status) {
          return false;
        }
        
        if (filters.priority && notification.priority !== filters.priority) {
          return false;
        }
        
        if (filters.startDate && notification.createdAt < filters.startDate) {
          return false;
        }
        
        if (filters.endDate && notification.createdAt > filters.endDate) {
          return false;
        }
        
        return true;
      });
    },

    // 重置通知状态
    resetNotifications() {
      this.notifications = [];
      this.stopPolling();
      this.lastFetchTime = '';
    }
  }
});
