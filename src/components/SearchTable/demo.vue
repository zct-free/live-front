<!--
SearchTable 组件使用示例
演示如何使用各种表单控件和表格功能
-->
<template>
  <div class="search-table-demo">
    <h2>SearchTable 组件使用示例</h2>
    
    <!-- 基础用法 -->
    <SearchTable
      ref="searchTableRef"
      :search-form-config="searchFormConfig"
      :columns="columns"
      :data-source="dataSource"
      :loading="loading"
      :toolbar-config="toolbarConfig"
      :pagination="paginationConfig"
      :row-selection="rowSelection"
      @search="handleSearch"
      @reset="handleReset"
      @change="handleTableChange"
    >
      <!-- 自定义搜索表单插槽 -->
      <template #customInput="{ form, field, item }">
        <a-input
          v-model:value="form[field]"
          placeholder="这是自定义输入框"
          style="border: 2px solid #1890ff"
        />
      </template>
      
      <!-- 表格列插槽 -->
      <template #status="{ text, record }">
        <a-tag :color="getStatusColor(text)">
          {{ getStatusText(text) }}
        </a-tag>
      </template>
      
      <template #avatar="{ text, record }">
        <a-avatar :src="text" :alt="record.name">
          {{ record.name?.charAt(0) }}
        </a-avatar>
      </template>
      
      <template #action="{ record, index }">
        <a-space>
          <a-button type="link" size="small" @click="handleEdit(record)">
            编辑
          </a-button>
          <a-button type="link" size="small" danger @click="handleDelete(record)">
            删除
          </a-button>
          <a-dropdown>
            <a-button type="link" size="small">
              更多 <DownOutlined />
            </a-button>
            <template #overlay>
              <a-menu @click="handleMenuClick">
                <a-menu-item key="view" :data-record="record">查看详情</a-menu-item>
                <a-menu-item key="copy" :data-record="record">复制</a-menu-item>
                <a-menu-divider />
                <a-menu-item key="disable" :data-record="record">禁用</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-space>
      </template>
      
      <!-- 工具栏插槽 -->
      <template #toolbar="{ selectedRowKeys, selectedRows }">
        <a-button
          type="primary"
          :disabled="selectedRowKeys.length === 0"
          @click="handleBatchExport(selectedRowKeys, selectedRows)"
        >
          <template #icon><ExportOutlined /></template>
          批量导出 ({{ selectedRowKeys.length }})
        </a-button>
      </template>
      
      <!-- 展开行内容 -->
      <template #expandedRowRender="{ record }">
        <div style="padding: 16px; background: #fafafa;">
          <a-descriptions title="详细信息" :column="2">
            <a-descriptions-item label="创建时间">
              {{ record.createTime }}
            </a-descriptions-item>
            <a-descriptions-item label="更新时间">
              {{ record.updateTime }}
            </a-descriptions-item>
            <a-descriptions-item label="创建人">
              {{ record.creator }}
            </a-descriptions-item>
            <a-descriptions-item label="备注">
              {{ record.remark || '无' }}
            </a-descriptions-item>
          </a-descriptions>
        </div>
      </template>
    </SearchTable>
  </div>
</template>

<script setup lang="ts">
import {
    DeleteOutlined,
    DownOutlined,
    ExportOutlined,
    PlusOutlined
} from '@ant-design/icons-vue'
import { message, Modal } from 'ant-design-vue'
import { onMounted, reactive, ref } from 'vue'
import SearchTable from './index.vue'
import type { SearchFormItem, SearchTableInstance, ToolbarItem } from './types'

// 组件引用
const searchTableRef = ref<SearchTableInstance>()

// 响应式数据
const loading = ref(false)
const dataSource = ref<any[]>([])

// 搜索表单配置 - 演示所有支持的表单控件
const searchFormConfig: SearchFormItem[] = [
  {
    field: 'name',
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名',
    span: 8
  },
  {
    field: 'email',
    label: '邮箱',
    type: 'input',
    placeholder: '请输入邮箱',
    span: 8
  },
  {
    field: 'age',
    label: '年龄',
    type: 'number',
    min: 0,
    max: 150,
    span: 8
  },
  {
    field: 'status',
    label: '状态',
    type: 'select',
    options: [
      { label: '全部', value: '' },
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ],
    span: 8
  },
  {
    field: 'city',
    label: '城市',
    type: 'cascader',
    options: [
      {
        label: '北京',
        value: 'beijing',
        children: [
          { label: '朝阳区', value: 'chaoyang' },
          { label: '海淀区', value: 'haidian' }
        ]
      },
      {
        label: '上海',
        value: 'shanghai',
        children: [
          { label: '浦东新区', value: 'pudong' },
          { label: '黄浦区', value: 'huangpu' }
        ]
      }
    ],
    span: 8
  },
  {
    field: 'department',
    label: '部门',
    type: 'tree-select',
    treeData: [
      {
        title: '技术部',
        value: 'tech',
        key: 'tech',
        children: [
          { title: '前端组', value: 'frontend', key: 'frontend' },
          { title: '后端组', value: 'backend', key: 'backend' }
        ]
      },
      {
        title: '产品部',
        value: 'product',
        key: 'product',
        children: [
          { title: '产品组', value: 'pm', key: 'pm' },
          { title: '设计组', value: 'design', key: 'design' }
        ]
      }
    ],
    span: 8
  },
  {
    field: 'dateRange',
    label: '创建时间',
    type: 'date-range',
    span: 8
  },
  {
    field: 'isActive',
    label: '是否激活',
    type: 'switch',
    span: 8
  },
  {
    field: 'priority',
    label: '优先级',
    type: 'slider',
    min: 1,
    max: 10,
    marks: {
      1: '低',
      5: '中',
      10: '高'
    },
    span: 8
  },
  {
    field: 'rating',
    label: '评分',
    type: 'rate',
    allowHalf: true,
    span: 8
  },
  {
    field: 'tags',
    label: '标签',
    type: 'checkbox',
    options: [
      { label: 'VIP', value: 'vip' },
      { label: '新用户', value: 'new' },
      { label: '活跃', value: 'active' }
    ],
    span: 8
  },
  {
    field: 'customField',
    label: '自定义字段',
    type: 'slot',
    slot: 'customInput',
    span: 8
  }
]

// 表格列配置
const columns = [
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    width: 80,
    align: 'center'
  },
  {
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    width: 120
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    width: 200
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    sorter: true,
    width: 80
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    filters: [
      { text: '启用', value: 1 },
      { text: '禁用', value: 0 }
    ]
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    sorter: true,
    width: 180
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 200
  }
]

// 工具栏配置
const toolbarConfig: ToolbarItem[] = [
  {
    label: '新增用户',
    type: 'primary',
    icon: PlusOutlined,
    onClick: () => handleAdd()
  },
  {
    label: '批量删除',
    type: 'default',
    danger: true,
    icon: DeleteOutlined,
    onClick: (selectedRowKeys, selectedRows) => handleBatchDelete(selectedRowKeys, selectedRows)
  },
  {
    label: '导入数据',
    type: 'default',
    onClick: () => handleImport()
  }
]

// 分页配置
const paginationConfig = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number, range: [number, number]) => 
    `共 ${total} 条记录 第 ${range[0]}-${range[1]} 条`
})

// 行选择配置
const rowSelection = {
  type: 'checkbox',
  onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
    console.log('选中的行:', selectedRowKeys, selectedRows)
  }
}

// 事件处理函数
const handleSearch = (params: any) => {
  console.log('搜索参数:', params)
  loading.value = true
  
  // 模拟 API 请求
  setTimeout(() => {
    // 这里应该调用实际的 API
    mockApiRequest(params)
    loading.value = false
  }, 1000)
}

const handleReset = () => {
  console.log('重置搜索条件')
  message.info('搜索条件已重置')
}

const handleTableChange = (pagination: any, filters: any, sorter: any) => {
  console.log('表格变化:', { pagination, filters, sorter })
  
  const params = {
    current: pagination.current,
    pageSize: pagination.pageSize,
    ...filters,
    sortField: sorter.field,
    sortOrder: sorter.order
  }
  
  handleSearch(params)
}

const handleAdd = () => {
  message.success('点击了新增用户')
  // 这里可以打开新增用户的弹窗或跳转到新增页面
}

const handleEdit = (record: any) => {
  message.info(`编辑用户: ${record.name}`)
  // 这里可以打开编辑用户的弹窗或跳转到编辑页面
}

const handleDelete = (record: any) => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除用户 "${record.name}" 吗？`,
    onOk() {
      message.success('删除成功')
      // 刷新表格数据
      searchTableRef.value?.refresh()
    }
  })
}

const handleBatchDelete = (selectedRowKeys: any[], selectedRows: any[]) => {
  if (selectedRowKeys.length === 0) {
    message.warning('请先选择要删除的用户')
    return
  }
  
  Modal.confirm({
    title: '批量删除',
    content: `确定要删除选中的 ${selectedRowKeys.length} 个用户吗？`,
    onOk() {
      message.success(`成功删除 ${selectedRowKeys.length} 个用户`)
      // 刷新表格数据
      searchTableRef.value?.refresh()
    }
  })
}

const handleBatchExport = (selectedRowKeys: any[], selectedRows: any[]) => {
  if (selectedRowKeys.length === 0) {
    message.warning('请先选择要导出的数据')
    return
  }
  
  message.success(`导出 ${selectedRowKeys.length} 条数据`)
  // 这里可以调用导出 API
}

const handleImport = () => {
  message.info('打开导入数据弹窗')
  // 这里可以打开文件选择器或导入弹窗
}

const handleMenuClick = ({ key, item }: { key: string; item: any }) => {
  const record = item.dataRecord
  
  switch (key) {
    case 'view':
      message.info(`查看 ${record.name} 的详情`)
      break
    case 'copy':
      message.success(`复制 ${record.name} 成功`)
      break
    case 'disable':
      message.warning(`禁用 ${record.name}`)
      break
  }
}

// 工具函数
const getStatusColor = (status: number) => {
  return status === 1 ? 'green' : 'red'
}

const getStatusText = (status: number) => {
  return status === 1 ? '启用' : '禁用'
}

// 模拟 API 请求
const mockApiRequest = (params: any) => {
  // 生成模拟数据
  const mockData = Array.from({ length: params.pageSize || 10 }, (_, index) => ({
    id: (params.current - 1) * (params.pageSize || 10) + index + 1,
    name: `用户${index + 1}`,
    email: `user${index + 1}@example.com`,
    age: 20 + Math.floor(Math.random() * 40),
    status: Math.random() > 0.5 ? 1 : 0,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`,
    createTime: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toLocaleString(),
    updateTime: new Date().toLocaleString(),
    creator: `管理员${Math.floor(Math.random() * 5) + 1}`,
    remark: index % 3 === 0 ? `这是用户${index + 1}的备注信息` : ''
  }))
  
  dataSource.value = mockData
  paginationConfig.total = 100 // 模拟总数
  paginationConfig.current = params.current || 1
  paginationConfig.pageSize = params.pageSize || 10
}

// 生命周期
onMounted(() => {
  // 初始化数据
  handleSearch({ current: 1, pageSize: 10 })
})
</script>

<style scoped lang="less">
.search-table-demo {
  padding: 24px;
  background: #f0f2f5;
  min-height: 100vh;
  
  h2 {
    margin-bottom: 24px;
    color: #262626;
  }
}
</style>
