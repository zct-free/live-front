// 数据存储单元测试
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useDataStore } from '../data';

// Mock request utility
vi.mock('@/utils/request', () => ({
  get: vi.fn(() => ({ request: Promise.resolve({ data: 'test-data' }) })),
  post: vi.fn(() => ({ request: Promise.resolve({ id: 1 }) })),
  put: vi.fn(() => ({ request: Promise.resolve({ success: true }) })),
  del: vi.fn(() => ({ request: Promise.resolve({ success: true }) }))
}));

describe('Data Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should initialize with empty state', () => {
    const dataStore = useDataStore();
    
    expect(dataStore.cache.size).toBe(0);
    expect(dataStore.loading.size).toBe(0);
    expect(dataStore.errors.size).toBe(0);
  });

  it('should manage loading state', () => {
    const dataStore = useDataStore();
    
    expect(dataStore.isLoading('test-key')).toBe(false);
    
    dataStore.setLoading('test-key', true);
    
    expect(dataStore.isLoading('test-key')).toBe(true);
    expect(dataStore.loading.has('test-key')).toBe(true);
    
    dataStore.setLoading('test-key', false);
    
    expect(dataStore.isLoading('test-key')).toBe(false);
    expect(dataStore.loading.has('test-key')).toBe(false);
  });

  it('should manage error state', () => {
    const dataStore = useDataStore();
    
    expect(dataStore.getError('test-key')).toBeUndefined();
    
    dataStore.setError('test-key', 'Test error');
    
    expect(dataStore.getError('test-key')).toBe('Test error');
    
    dataStore.setError('test-key', null);
    
    expect(dataStore.getError('test-key')).toBeUndefined();
  });

  it('should manage cache', () => {
    const dataStore = useDataStore();
    
    const testData = { id: 1, name: 'Test' };
    
    dataStore.setCache('test-key', testData);
    
    expect(dataStore.getCachedData('test-key')).toEqual(testData);
    expect(dataStore.cache.has('test-key')).toBe(true);
    
    dataStore.clearCache('test-key');
    
    expect(dataStore.getCachedData('test-key')).toBeUndefined();
    expect(dataStore.cache.has('test-key')).toBe(false);
  });

  it('should clear all cache', () => {
    const dataStore = useDataStore();
    
    dataStore.setCache('key1', 'data1');
    dataStore.setCache('key2', 'data2');
    
    expect(dataStore.cache.size).toBe(2);
    
    dataStore.clearCache();
    
    expect(dataStore.cache.size).toBe(0);
  });

  it('should fetch data with caching', async () => {
    const dataStore = useDataStore();
    
    const result = await dataStore.fetchData('test-key', '/api/test');
    
    expect(result).toEqual({ data: 'test-data' });
    expect(dataStore.getCachedData('test-key')).toBeDefined();
    expect(dataStore.isLoading('test-key')).toBe(false);
  });

  it('should return cached data when available', async () => {
    const dataStore = useDataStore();
    
    // 先设置缓存
    const cachedData = { data: 'cached-test-data', timestamp: Date.now() };
    dataStore.setCache('test-key', cachedData);
    
    const result = await dataStore.fetchData('test-key', '/api/test');
    
    expect(result).toEqual('cached-test-data');
  });

  it('should handle fetch error', async () => {
    const { get } = await import('@/utils/request');
    vi.mocked(get).mockImplementationOnce(() => ({ 
      request: Promise.reject(new Error('Network error')) 
    }));
    
    const dataStore = useDataStore();
    
    await expect(dataStore.fetchData('test-key', '/api/test')).rejects.toThrow('Network error');
    expect(dataStore.getError('test-key')).toBe('Network error');
    expect(dataStore.isLoading('test-key')).toBe(false);
  });

  it('should create data', async () => {
    const dataStore = useDataStore();
    
    const createData = { name: 'New Item' };
    const result = await dataStore.createData('create-key', '/api/items', createData);
    
    expect(result).toEqual({ id: 1 });
    expect(dataStore.isLoading('create-key')).toBe(false);
  });

  it('should update data', async () => {
    const dataStore = useDataStore();
    
    const updateData = { id: 1, name: 'Updated Item' };
    const result = await dataStore.updateData('update-key', '/api/items/1', updateData);
    
    expect(result).toEqual({ success: true });
    expect(dataStore.isLoading('update-key')).toBe(false);
  });

  it('should delete data', async () => {
    const dataStore = useDataStore();
    
    const result = await dataStore.deleteData('delete-key', '/api/items/1');
    
    expect(result).toEqual({ success: true });
    expect(dataStore.isLoading('delete-key')).toBe(false);
  });

  it('should clear related cache', () => {
    const dataStore = useDataStore();
    
    dataStore.setCache('users:list', 'users data');
    dataStore.setCache('users:detail:1', 'user 1 data');
    dataStore.setCache('posts:list', 'posts data');
    
    dataStore.clearRelatedCache('users');
    
    expect(dataStore.cache.has('users:list')).toBe(false);
    expect(dataStore.cache.has('users:detail:1')).toBe(false);
    expect(dataStore.cache.has('posts:list')).toBe(true);
  });

  it('should reset all state', () => {
    const dataStore = useDataStore();
    
    dataStore.setCache('test', 'data');
    dataStore.setLoading('test', true);
    dataStore.setError('test', 'error');
    
    dataStore.$reset();
    
    expect(dataStore.cache.size).toBe(0);
    expect(dataStore.loading.size).toBe(0);
    expect(dataStore.errors.size).toBe(0);
  });
});
