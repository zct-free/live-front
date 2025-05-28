// 用户相关类型定义
export interface LoginParams {
  username: string;
  password: string;
  remember?: boolean;
}

export interface UserInfo {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  role: string;
  status: 'active' | 'inactive';
  lastLoginTime?: string;
}

export interface LoginResponse {
  token: string;
  user: UserInfo;
}

// 应用配置相关类型
export interface BreadcrumbItem {
  title: string;
  path?: string;
  icon?: string;
}

export type ThemeType = 'light' | 'dark';
export type DeviceType = 'desktop' | 'tablet' | 'mobile';

// 通用响应类型
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

// 分页相关类型
export interface PaginationParams {
  page: number;
  size: number;
  total?: number;
}

export interface PaginatedResponse<T = any> {
  items: T[];
  pagination: {
    page: number;
    size: number;
    total: number;
    totalPages: number;
  };
}

// 表格相关类型
export interface TableColumn {
  key: string;
  title: string;
  dataIndex?: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
  sorter?: boolean;
  filters?: Array<{ text: string; value: any }>;
}

// 菜单相关类型
export interface MenuItem {
  id: string;
  title: string;
  icon?: string;
  path?: string;
  children?: MenuItem[];
  permission?: string;
  hidden?: boolean;
  order?: number;
}

// 权限相关类型
export interface Permission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
}
