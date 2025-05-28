// 通用数据管理 Store
import { del, get, post, put } from '@/utils/request';
import { defineStore } from 'pinia';
import { computed } from 'vue';

export const useDataStore = defineStore('data', {
  // 状态
  state: () => ({
    cache: new Map<string, any>(),
    loading: new Set<string>(),
    errors: new Map<string, string>()
  }),

  // 计算属性
  getters: {
    isLoading: (state) => (key: string) => state.loading.has(key),
    getError: (state) => (key: string) => state.errors.get(key),
    getCachedData: (state) => (key: string) => state.cache.get(key)
  },

  // Actions
  actions: {
    setLoading(key: string, value: boolean) {
      if (value) {
        this.loading.add(key);
      } else {
        this.loading.delete(key);
      }
    },

    setError(key: string, error: string | null) {
      if (error) {
        this.errors.set(key, error);
      } else {
        this.errors.delete(key);
      }
    },

    setCache(key: string, data: any) {
      this.cache.set(key, data);
    },

    clearCache(key?: string) {
      if (key) {
        this.cache.delete(key);
      } else {
        this.cache.clear();
      }
    },

    // 通用的数据获取方法
    async fetchData<T = any>(
      key: string,
      url: string,
      params?: any,
      options?: {
        useCache?: boolean;
        cacheTTL?: number; // 缓存时间（毫秒）
      }
    ): Promise<T> {
      const { useCache = true, cacheTTL = 5 * 60 * 1000 } = options || {};

      // 检查缓存
      if (useCache && this.cache.has(key)) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < cacheTTL) {
          return cached.data;
        }
      }

      this.setLoading(key, true);
      this.setError(key, null);

      try {
        const { request } = get<T>(url, params);
        const data = await request;
        
        // 存储到缓存
        if (useCache) {
          this.setCache(key, {
            data,
            timestamp: Date.now()
          });
        }

        return data;
      } catch (error: any) {
        this.setError(key, error.message || '请求失败');
        throw error;
      } finally {
        this.setLoading(key, false);
      }
    },

    // 创建数据
    async createData<T = any>(
      key: string,
      url: string,
      data: any
    ): Promise<T> {
      this.setLoading(key, true);
      this.setError(key, null);

      try {
        const { request } = post<T>(url, data);
        const result = await request;
        
        // 清除相关缓存
        this.clearRelatedCache(key);
        
        return result;
      } catch (error: any) {
        this.setError(key, error.message || '创建失败');
        throw error;
      } finally {
        this.setLoading(key, false);
      }
    },

    // 更新数据
    async updateData<T = any>(
      key: string,
      url: string,
      data: any
    ): Promise<T> {
      this.setLoading(key, true);
      this.setError(key, null);

      try {
        const { request } = put<T>(url, data);
        const result = await request;
        
        // 清除相关缓存
        this.clearRelatedCache(key);
        
        return result;
      } catch (error: any) {
        this.setError(key, error.message || '更新失败');
        throw error;
      } finally {
        this.setLoading(key, false);
      }
    },

    // 删除数据
    async deleteData<T = any>(
      key: string,
      url: string
    ): Promise<T> {
      this.setLoading(key, true);
      this.setError(key, null);

      try {
        const { request } = del<T>(url);
        const result = await request;
        
        // 清除相关缓存
        this.clearRelatedCache(key);
        
        return result;
      } catch (error: any) {
        this.setError(key, error.message || '删除失败');
        throw error;
      } finally {
        this.setLoading(key, false);
      }
    },

    // 清除相关缓存
    clearRelatedCache(key: string) {
      // 根据 key 模式清除相关缓存
      const keysToDelete: string[] = [];
      this.cache.forEach((_, cacheKey) => {
        if (cacheKey.startsWith(key.split(':')[0])) {
          keysToDelete.push(cacheKey);
        }
      });
      keysToDelete.forEach(k => this.cache.delete(k));
    },

    // 重置状态
    $reset() {
      this.cache.clear();
      this.loading.clear();
      this.errors.clear();
    }
  }
});

// 便捷的 hook 函数
export const useAsyncData = <T = any>(
  key: string,
  url: string,
  params?: any,
  options?: {
    useCache?: boolean;
    cacheTTL?: number;
    immediate?: boolean;
  }
) => {
  const dataStore = useDataStore();
  const { immediate = true } = options || {};
  
  const data = computed(() => dataStore.getCachedData(key)?.data as T | undefined);
  const loading = computed(() => dataStore.isLoading(key));
  const error = computed(() => dataStore.getError(key));

  const execute = () => dataStore.fetchData<T>(key, url, params, options);
  const refresh = () => {
    dataStore.clearCache(key);
    return execute();
  };

  // 立即执行
  if (immediate) {
    execute();
  }

  return {
    data,
    loading,
    error,
    execute,
    refresh
  };
};
