// 用户存储单元测试
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useUserStore } from '../user';

// Mock request utility
vi.mock('@/utils/request', () => ({
  post: vi.fn(() => ({ request: Promise.resolve({ token: 'mock-token', user: { id: 1, name: 'Test User' } }) })),
  get: vi.fn(() => ({ request: Promise.resolve({ id: 1, name: 'Test User', role: 'admin' }) })),
  put: vi.fn(() => ({ request: Promise.resolve({ success: true }) }))
}));

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    // 清除 localStorage
    localStorage.clear();
  });

  it('should initialize with default state', () => {
    const userStore = useUserStore();
    
    expect(userStore.token).toBe('');
    expect(userStore.userInfo).toBeNull();
    expect(userStore.loading).toBe(false);
    expect(userStore.permissions).toEqual([]);
    expect(userStore.isLoggedIn).toBe(false);
  });

  it('should handle login successfully', async () => {
    const userStore = useUserStore();
    
    const result = await userStore.login('testuser', 'password');
    
    expect(userStore.token).toBe('mock-token');
    expect(userStore.userInfo).toEqual({ id: 1, name: 'Test User' });
    expect(userStore.isLoggedIn).toBe(true);
  });

  it('should handle logout', () => {
    const userStore = useUserStore();
    
    // 设置初始状态
    userStore.token = 'test-token';
    userStore.userInfo = { id: 1, name: 'Test User', username: 'test', email: 'test@test.com', role: 'admin', status: 'active' };
    
    userStore.logout();
    
    expect(userStore.token).toBe('');
    expect(userStore.userInfo).toBeNull();
    expect(userStore.isLoggedIn).toBe(false);
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should check permissions correctly', () => {
    const userStore = useUserStore();
    
    userStore.permissions = ['read', 'write', 'admin'];
    
    expect(userStore.hasPermission('read')).toBe(true);
    expect(userStore.hasPermission('delete')).toBe(false);
    expect(userStore.hasPermission(['read', 'write'])).toBe(true);
    expect(userStore.hasPermission(['delete', 'admin'])).toBe(true);
  });

  it('should check roles correctly', () => {
    const userStore = useUserStore();
    
    userStore.userInfo = { 
      id: 1, 
      name: 'Test User', 
      username: 'test', 
      email: 'test@test.com', 
      role: 'admin', 
      status: 'active' 
    };
    
    expect(userStore.hasRole('admin')).toBe(true);
    expect(userStore.hasRole('user')).toBe(false);
    expect(userStore.hasRole(['admin', 'moderator'])).toBe(true);
  });

  it('should update user info', async () => {
    const userStore = useUserStore();
    
    const newInfo = { name: 'Updated Name', email: 'updated@test.com' };
    await userStore.updateUserInfo(newInfo);
    
    expect(userStore.userInfo?.name).toBe('Updated Name');
    expect(userStore.userInfo?.email).toBe('updated@test.com');
  });
});
