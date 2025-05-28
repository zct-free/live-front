<!-- Pinia 全功能状态管理示例 -->
<template>
  <div class="pinia-demo">
    <a-card title="Pinia 状态管理完整示例" class="demo-card">
      
      <!-- 用户状态管理 -->
      <a-card type="inner" title="用户状态管理" class="mb-4">
        <div v-if="!user.isLoggedIn.value" class="login-section">
          <a-form layout="inline" @finish="handleLogin">
            <a-form-item label="用户名">
              <a-input v-model:value="loginForm.username" placeholder="请输入用户名" />
            </a-form-item>
            <a-form-item label="密码">
              <a-input-password v-model:value="loginForm.password" placeholder="请输入密码" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" :loading="user.loading.value">
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </div>
        
        <div v-else class="user-info">
          <a-space direction="vertical" size="large" style="width: 100%">
            <a-alert
              :message="`欢迎，${user.userName.value}！`"
              type="success"
              show-icon
            />
            
            <a-descriptions title="用户信息" bordered>
              <a-descriptions-item label="用户名">{{ user.userInfo.value?.username }}</a-descriptions-item>
              <a-descriptions-item label="姓名">{{ user.userInfo.value?.name }}</a-descriptions-item>
              <a-descriptions-item label="邮箱">{{ user.userInfo.value?.email }}</a-descriptions-item>
              <a-descriptions-item label="角色">{{ user.userInfo.value?.role }}</a-descriptions-item>
              <a-descriptions-item label="状态">
                <a-tag :color="user.userInfo.value?.status === 'active' ? 'green' : 'red'">
                  {{ user.userInfo.value?.status }}
                </a-tag>
              </a-descriptions-item>
            </a-descriptions>
            
            <a-space>
              <a-button @click="updateUserInfo">更新用户信息</a-button>
              <a-button @click="user.fetchPermissions">获取权限</a-button>
              <a-button type="danger" @click="logout">退出登录</a-button>
            </a-space>
            
            <div v-if="user.permissions.value.length">
              <strong>用户权限：</strong>
              <a-tag v-for="perm in user.permissions.value" :key="perm" color="blue">
                {{ perm }}
              </a-tag>
            </div>
          </a-space>
        </div>
      </a-card>

      <!-- 应用设置管理 -->
      <a-card type="inner" title="应用设置管理" class="mb-4">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-space direction="vertical" style="width: 100%">
              <div>
                <strong>主题设置</strong>
                <br>
                <a-radio-group v-model:value="selectedTheme" @change="changeTheme">
                  <a-radio value="light">浅色主题</a-radio>
                  <a-radio value="dark">深色主题</a-radio>
                </a-radio-group>
              </div>
              
              <div>
                <strong>设备类型: </strong>
                <a-tag :color="getDeviceColor(app.device.value)">
                  {{ app.device.value }}
                </a-tag>
                <a-button size="small" @click="app.detectDevice()">重新检测</a-button>
              </div>
            </a-space>
          </a-col>
          
          <a-col :span="8">
            <a-space direction="vertical" style="width: 100%">
              <div>
                <strong>侧边栏控制</strong>
                <br>
                <a-switch 
                  v-model:checked="sidebarCollapsedModel" 
                  checked-children="折叠" 
                  un-checked-children="展开" 
                />
              </div>
              
              <div>
                <strong>语言设置</strong>
                <br>
                <a-select v-model:value="selectedLocale" @change="changeLocale" style="width: 120px">
                  <a-select-option value="zh-CN">简体中文</a-select-option>
                  <a-select-option value="en-US">English</a-select-option>
                </a-select>
              </div>
            </a-space>
          </a-col>
          
          <a-col :span="8">
            <a-space direction="vertical" style="width: 100%">
              <div>
                <strong>主色调</strong>
                <br>
                <input 
                  type="color" 
                  :value="app.primaryColor.value" 
                  @change="changePrimaryColor"
                  style="width: 50px; height: 30px; border: none; border-radius: 4px;"
                />
              </div>
              
              <a-button @click="app.resetSettings()" type="dashed">
                重置所有设置
              </a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-card>

      <!-- 菜单管理 -->
      <a-card type="inner" title="菜单管理" class="mb-4">
        <a-row :gutter="16">
          <a-col :span="12">
            <div class="menu-controls">
              <a-space>
                <a-button @click="menu.fetchMenuList()" :loading="menu.loading.value">
                  获取菜单
                </a-button>
                <a-button @click="menu.toggleMenuCollapsed()">
                  {{ menu.menuCollapsed.value ? '展开菜单' : '折叠菜单' }}
                </a-button>
                <a-button @click="addSampleMenu">添加示例菜单</a-button>
              </a-space>
            </div>
            
            <div class="mt-4">
              <strong>菜单列表 ({{ menu.menuList.value.length }} 项):</strong>
              <a-list
                :data-source="menu.visibleMenus.value"
                size="small"
                :locale="{ emptyText: '暂无菜单' }"
              >
                <template #renderItem="{ item }">
                  <a-list-item>
                    <template #actions>
                      <a @click="selectMenu(item.id)">选择</a>
                      <a style="color: red" @click="menu.removeMenuItem(item.id)">删除</a>
                    </template>
                    <a-list-item-meta
                      :title="item.title"
                      :description="item.path"
                    >
                      <template #avatar v-if="item.icon">
                        <a-avatar :style="{ backgroundColor: '#1890ff' }">
                          {{ item.icon }}
                        </a-avatar>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                </template>
              </a-list>
            </div>
          </a-col>
          
          <a-col :span="12">
            <div>
              <strong>菜单状态:</strong>
              <ul>
                <li>当前选中: {{ menu.selectedKeys.value.join(', ') || '无' }}</li>
                <li>展开项: {{ menu.openKeys.value.join(', ') || '无' }}</li>
                <li>折叠状态: {{ menu.menuCollapsed.value ? '是' : '否' }}</li>
              </ul>
            </div>
            
            <div class="mt-4">
              <strong>面包屑:</strong>
              <a-breadcrumb>
                <a-breadcrumb-item v-for="crumb in menu.breadcrumbs.value" :key="crumb.path">
                  {{ crumb.title }}
                </a-breadcrumb-item>
              </a-breadcrumb>
            </div>
          </a-col>
        </a-row>
      </a-card>

      <!-- 通知管理 -->
      <a-card type="inner" title="通知管理" class="mb-4">
        <a-row :gutter="16">
          <a-col :span="12">
            <div class="notification-controls">
              <a-space>
                <a-button @click="notification.fetchNotifications()" :loading="notification.loading.value">
                  获取通知
                </a-button>
                <a-button @click="addSampleNotification">添加示例通知</a-button>
                <a-button @click="notification.markAllAsRead()" :disabled="notification.unreadCount.value === 0">
                  全部已读
                </a-button>
                <a-button @click="notification.clearReadNotifications()">
                  清空已读
                </a-button>
              </a-space>
            </div>
            
            <div class="mt-4">
              <a-statistic-group>
                <a-statistic title="总通知" :value="notification.notifications.value.length" />
                <a-statistic title="未读" :value="notification.unreadCount.value" />
                <a-statistic title="高优先级" :value="notification.highPriorityNotifications.value.length" />
              </a-statistic-group>
            </div>
          </a-col>
          
          <a-col :span="12">
            <div>
              <strong>轮询状态:</strong>
              <a-tag :color="notification.polling.value ? 'green' : 'red'">
                {{ notification.polling.value ? '运行中' : '已停止' }}
              </a-tag>
              <a-space class="ml-2">
                <a-button size="small" @click="notification.startPolling()" :disabled="notification.polling.value">
                  开始轮询
                </a-button>
                <a-button size="small" @click="notification.stopPolling()" :disabled="!notification.polling.value">
                  停止轮询
                </a-button>
              </a-space>
            </div>
            
            <div class="mt-4">
              <strong>通知列表:</strong>
              <a-list
                :data-source="notification.notifications.value.slice(0, 5)"
                size="small"
                :locale="{ emptyText: '暂无通知' }"
              >
                <template #renderItem="{ item }">
                  <a-list-item>
                    <template #actions>
                      <a @click="notification.markAsRead(item.id)" v-if="item.status === 'unread'">
                        标记已读
                      </a>
                      <a style="color: red" @click="notification.deleteNotification(item.id)">删除</a>
                    </template>
                    <a-list-item-meta
                      :title="item.title"
                      :description="item.content"
                    >
                      <template #avatar>
                        <a-badge :color="getNotificationColor(item.type)" />
                      </template>
                    </a-list-item-meta>
                    <template #extra>
                      <a-tag v-if="item.status === 'unread'" color="orange">未读</a-tag>
                      <a-tag :color="getPriorityColor(item.priority)">{{ item.priority }}</a-tag>
                    </template>
                  </a-list-item>
                </template>
              </a-list>
            </div>
          </a-col>
        </a-row>
      </a-card>

      <!-- 数据缓存管理 -->
      <a-card type="inner" title="数据缓存管理" class="mb-4">
        <a-row :gutter="16">
          <a-col :span="12">
            <div class="cache-controls">
              <a-space direction="vertical" style="width: 100%">
                <a-input-group compact>
                  <a-input 
                    v-model:value="cacheKey" 
                    placeholder="缓存键名" 
                    style="width: 60%"
                  />
                  <a-input 
                    v-model:value="cacheValue" 
                    placeholder="缓存值" 
                    style="width: 40%"
                  />
                </a-input-group>
                
                <a-space>
                  <a-button @click="setCacheData">设置缓存</a-button>
                  <a-button @click="getCacheData">获取缓存</a-button>
                  <a-button @click="removeCacheData">删除缓存</a-button>
                  <a-button @click="data.clear()" type="danger">清空所有</a-button>
                </a-space>
                
                <div v-if="cacheResult">
                  <strong>缓存结果:</strong>
                  <a-typography-paragraph copyable>
                    {{ cacheResult }}
                  </a-typography-paragraph>
                </div>
              </a-space>
            </div>
          </a-col>
          
          <a-col :span="12">
            <div>
              <strong>缓存统计:</strong>
              <ul>
                <li>缓存项数量: {{ Object.keys(data.cache.value).length }}</li>
                <li>加载状态: {{ data.loading.value ? '加载中' : '空闲' }}</li>
                <li>错误数量: {{ Object.keys(data.errors.value).length }}</li>
              </ul>
              
              <div class="mt-4">
                <strong>缓存键列表:</strong>
                <a-tag 
                  v-for="key in Object.keys(data.cache.value)" 
                  :key="key" 
                  @click="cacheKey = key"
                  style="cursor: pointer; margin: 2px;"
                >
                  {{ key }}
                </a-tag>
              </div>
            </div>
          </a-col>
        </a-row>
      </a-card>

      <!-- 权限检查 -->
      <a-card type="inner" title="权限检查" class="mb-4" v-if="user.isLoggedIn.value">
        <a-space direction="vertical" style="width: 100%">
          <div>
            <strong>权限测试:</strong>
            <a-input-group compact style="width: 300px; margin-left: 10px;">
              <a-input v-model:value="testPermission" placeholder="输入权限名称" />
              <a-button @click="checkPermission">检查权限</a-button>
            </a-input-group>
            <span v-if="permissionResult !== null" class="ml-2">
              结果: 
              <a-tag :color="permissionResult ? 'green' : 'red'">
                {{ permissionResult ? '有权限' : '无权限' }}
              </a-tag>
            </span>
          </div>
          
          <div>
            <strong>角色测试:</strong>
            <a-input-group compact style="width: 300px; margin-left: 10px;">
              <a-input v-model:value="testRole" placeholder="输入角色名称" />
              <a-button @click="checkRole">检查角色</a-button>
            </a-input-group>
            <span v-if="roleResult !== null" class="ml-2">
              结果: 
              <a-tag :color="roleResult ? 'green' : 'red'">
                {{ roleResult ? '匹配' : '不匹配' }}
              </a-tag>
            </span>
          </div>
          
          <div>
            <strong>快速权限检查:</strong>
            <a-space>
              <a-tag :color="permission.isAdmin.value ? 'green' : 'red'">
                管理员: {{ permission.isAdmin.value ? '是' : '否' }}
              </a-tag>
              <a-tag :color="permission.isSuperAdmin.value ? 'green' : 'red'">
                超级管理员: {{ permission.isSuperAdmin.value ? '是' : '否' }}
              </a-tag>
            </a-space>
          </div>
        </a-space>
      </a-card>

      <!-- 全局操作 -->
      <a-card type="inner" title="全局操作">
        <a-space>
          <a-button @click="globalState.initializeApp()" type="primary">
            初始化应用
          </a-button>
          <a-button @click="globalState.resetAllStores()" type="danger">
            重置所有状态
          </a-button>
          <a-button @click="exportStoreData">导出状态数据</a-button>
          <a-button @click="showStoreInConsole">在控制台显示状态</a-button>
        </a-space>
      </a-card>
    </a-card>
  </div>
</template>
                {{ perm }}
              </a-tag>
            </div>
          </a-space>
        </div>
      </a-card>

      <!-- 应用配置管理 -->
      <a-card type="inner" title="应用配置管理" class="mb-4">
        <a-space direction="vertical" size="large" style="width: 100%">
          <a-row :gutter="16">
            <a-col :span="8">
              <a-card size="small" title="侧边栏设置">
                <a-space direction="vertical">
                  <div>
                    <strong>折叠状态：</strong>
                    <a-switch 
                      v-model:checked="appStore.collapsed" 
                      @change="appStore.toggleSidebar"
                    />
                  </div>
                  <div>
                    <strong>宽度：</strong>{{ appStore.sidebarWidth }}px
                  </div>
                </a-space>
              </a-card>
            </a-col>
            
            <a-col :span="8">
              <a-card size="small" title="主题设置">
                <a-space direction="vertical">
                  <div>
                    <strong>主题模式：</strong>
                    <a-switch 
                      v-model:checked="appStore.isDark" 
                      @change="appStore.toggleTheme"
                      checked-children="暗黑"
                      un-checked-children="明亮"
                    />
                  </div>
                  <div>
                    <strong>主色调：</strong>
                    <input 
                      type="color" 
                      :value="appStore.primaryColor" 
                      @input="changePrimaryColor"
                    />
                  </div>
                </a-space>
              </a-card>
            </a-col>
            
            <a-col :span="8">
              <a-card size="small" title="设备信息">
                <a-space direction="vertical">
                  <div><strong>设备类型：</strong>{{ appStore.device }}</div>
                  <div><strong>是否移动端：</strong>{{ appStore.isMobile ? '是' : '否' }}</div>
                  <div><strong>语言：</strong>{{ appStore.locale }}</div>
                </a-space>
              </a-card>
            </a-col>
          </a-row>
          
          <a-space>
            <a-button @click="setBreadcrumbs">设置面包屑</a-button>
            <a-button @click="setPageTitle">设置页面标题</a-button>
            <a-button @click="toggleLoading">切换加载状态</a-button>
            <a-button type="danger" @click="resetSettings">重置设置</a-button>
          </a-space>
          
          <div v-if="appStore.breadcrumbs.length">
            <strong>面包屑：</strong>
            <a-breadcrumb>
              <a-breadcrumb-item v-for="item in appStore.breadcrumbs" :key="item.title">
                {{ item.title }}
              </a-breadcrumb-item>
            </a-breadcrumb>
          </div>
        </a-space>
      </a-card>

      <!-- 数据管理 -->
      <a-card type="inner" title="数据管理">
        <a-space direction="vertical" size="large" style="width: 100%">
          <a-space>
            <a-button @click="fetchUsers" :loading="isUsersLoading">获取用户列表</a-button>
            <a-button @click="fetchPosts" :loading="isPostsLoading">获取文章列表</a-button>
            <a-button @click="refreshUsers">刷新用户数据</a-button>
            <a-button @click="clearAllCache">清除所有缓存</a-button>
          </a-space>
          
          <!-- 用户列表 -->
          <div v-if="usersData">
            <h4>用户列表 (缓存数据)</h4>
            <a-table 
              :columns="userColumns" 
              :data-source="usersData" 
              :pagination="false"
              size="small"
            />
          </div>
          
          <!-- 文章列表 -->
          <div v-if="postsData">
            <h4>文章列表 (缓存数据)</h4>
            <a-list
              :data-source="postsData.slice(0, 5)"
              size="small"
            >
              <template #renderItem="{ item }">
                <a-list-item>
                  <a-list-item-meta
                    :title="item.title"
                    :description="item.body"
                  />
                </a-list-item>
              </template>
            </a-list>
          </div>
          
          <!-- 错误信息 -->
          <div v-if="usersError || postsError">
            <a-alert
              message="数据加载错误"
              :description="usersError || postsError"
              type="error"
              show-icon
            />
          </div>
        </a-space>
      </a-card>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import {
    useApp,
    useData,
    useGlobalState,
    useMenu,
    useNotification,
    usePermission,
    useUser
} from '@/composables/useStores';
import { message } from 'ant-design-vue';
import { computed, ref } from 'vue';

// 使用组合式函数
const user = useUser();
const app = useApp();
const menu = useMenu();
const notification = useNotification();
const data = useData();
const permission = usePermission();
const globalState = useGlobalState();

// 登录表单
const loginForm = ref({
  username: 'admin',
  password: '123456'
});

// 应用设置相关
const selectedTheme = ref(app.theme.value);
const selectedLocale = ref(app.locale.value);
const sidebarCollapsedModel = computed({
  get: () => app.sidebarCollapsed.value,
  set: (value: boolean) => app.setSidebarCollapsed(value)
});

// 缓存管理相关
const cacheKey = ref('');
const cacheValue = ref('');
const cacheResult = ref('');

// 权限测试相关
const testPermission = ref('');
const testRole = ref('');
const permissionResult = ref<boolean | null>(null);
const roleResult = ref<boolean | null>(null);

// 方法定义
const handleLogin = async () => {
  try {
    await user.login(loginForm.value);
    message.success('登录成功！');
  } catch (error: any) {
    message.error(error.message || '登录失败');
  }
};

const logout = async () => {
  await user.logout();
  message.success('已退出登录');
};

const updateUserInfo = async () => {
  try {
    await user.updateUserInfo({ name: '更新的姓名' });
    message.success('用户信息更新成功');
  } catch (error: any) {
    message.error('更新失败：' + error.message);
  }
};

// 应用设置方法
const changeTheme = () => {
  app.setTheme(selectedTheme.value);
  message.success(`主题已切换为${selectedTheme.value}`);
};

const changeLocale = () => {
  app.setLocale(selectedLocale.value);
  message.success(`语言已切换为${selectedLocale.value}`);
};

const changePrimaryColor = (event: Event) => {
  const color = (event.target as HTMLInputElement).value;
  app.setPrimaryColor(color);
  message.success('主色调已更新');
};

const getDeviceColor = (device: string) => {
  const colors = {
    mobile: 'green',
    tablet: 'orange',
    desktop: 'blue'
  };
  return colors[device as keyof typeof colors] || 'default';
};

// 菜单管理方法
const selectMenu = (menuId: string) => {
  menu.setSelectedKeys([menuId]);
  menu.setOpenKeys([menuId]);
  message.success(`已选择菜单: ${menuId}`);
};

const addSampleMenu = () => {
  const newMenu = {
    id: `menu-${Date.now()}`,
    title: '示例菜单',
    path: `/sample-${Date.now()}`,
    icon: 'ExperimentOutlined',
    meta: {
      title: '示例菜单',
      requiresAuth: true
    }
  };
  menu.addMenuItem(newMenu);
  message.success('示例菜单已添加');
};

// 通知管理方法
const addSampleNotification = () => {
  const types = ['info', 'success', 'warning', 'error'] as const;
  const priorities = ['low', 'medium', 'high', 'urgent'] as const;
  const categories = ['system', 'message', 'task', 'announcement'] as const;
  
  const randomType = types[Math.floor(Math.random() * types.length)];
  const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  
  notification.addLocalNotification({
    title: `示例通知 ${Date.now()}`,
    content: `这是一个${randomType}类型的示例通知`,
    type: randomType,
    status: 'unread',
    category: randomCategory,
    priority: randomPriority
  });
  message.success('示例通知已添加');
};

const getNotificationColor = (type: string) => {
  const colors = {
    info: 'blue',
    success: 'green',
    warning: 'orange',
    error: 'red'
  };
  return colors[type as keyof typeof colors] || 'default';
};

const getPriorityColor = (priority: string) => {
  const colors = {
    low: 'green',
    medium: 'blue',
    high: 'orange',
    urgent: 'red'
  };
  return colors[priority as keyof typeof colors] || 'default';
};

// 缓存管理方法
const setCacheData = () => {
  if (!cacheKey.value || !cacheValue.value) {
    message.error('请输入缓存键名和值');
    return;
  }
  
  try {
    const value = JSON.parse(cacheValue.value);
    data.set(cacheKey.value, value);
    message.success('缓存设置成功');
  } catch {
    // 如果不是JSON，直接存储字符串
    data.set(cacheKey.value, cacheValue.value);
    message.success('缓存设置成功');
  }
};

const getCacheData = () => {
  if (!cacheKey.value) {
    message.error('请输入缓存键名');
    return;
  }
  
  const result = data.get(cacheKey.value);
  if (result !== null) {
    cacheResult.value = JSON.stringify(result, null, 2);
    message.success('缓存获取成功');
  } else {
    cacheResult.value = '缓存不存在或已过期';
    message.warning('缓存不存在或已过期');
  }
};

const removeCacheData = () => {
  if (!cacheKey.value) {
    message.error('请输入缓存键名');
    return;
  }
  
  data.remove(cacheKey.value);
  message.success('缓存删除成功');
  cacheResult.value = '';
};

// 权限检查方法
const checkPermission = () => {
  if (!testPermission.value) {
    message.error('请输入权限名称');
    return;
  }
  
  permissionResult.value = permission.checkPermission(testPermission.value);
  message.info(`权限检查完成: ${permissionResult.value ? '有权限' : '无权限'}`);
};

const checkRole = () => {
  if (!testRole.value) {
    message.error('请输入角色名称');
    return;
  }
  
  roleResult.value = permission.checkRole(testRole.value);
  message.info(`角色检查完成: ${roleResult.value ? '匹配' : '不匹配'}`);
};

// 全局操作方法
const exportStoreData = () => {
  const storeData = {
    user: {
      token: user.token.value,
      userInfo: user.userInfo.value,
      permissions: user.permissions.value
    },
    app: {
      theme: app.theme.value,
      primaryColor: app.primaryColor.value,
      locale: app.locale.value,
      sidebarCollapsed: app.sidebarCollapsed.value
    },
    menu: {
      menuList: menu.menuList.value,
      selectedKeys: menu.selectedKeys.value,
      openKeys: menu.openKeys.value
    },
    notification: {
      notifications: notification.notifications.value,
      unreadCount: notification.unreadCount.value
    },
    cache: data.cache.value
  };
  
  const dataStr = JSON.stringify(storeData, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'store-data.json';
  a.click();
  URL.revokeObjectURL(url);
  message.success('状态数据已导出');
};

const showStoreInConsole = () => {
  console.group('🔄 Pinia Store 状态');
  console.log('👤 User Store:', user);
  console.log('⚙️ App Store:', app);
  console.log('📋 Menu Store:', menu);
  console.log('🔔 Notification Store:', notification);
  console.log('💾 Data Store:', data);
  console.log('🔐 Permission:', permission);
  console.groupEnd();
  message.success('状态数据已输出到控制台');
};

// 初始化
globalState.initializeApp();
</script>

<style scoped>
.pinia-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-card {
  margin-bottom: 16px;
}

.mb-4 {
  margin-bottom: 16px;
}

.login-section {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.user-info {
  padding: 20px;
}
</style>
