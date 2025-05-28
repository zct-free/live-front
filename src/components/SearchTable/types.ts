// SearchTable 组件的类型定义
import type { TableProps, TableColumnType } from 'ant-design-vue'
import type { Component } from 'vue'

// 搜索表单项配置
export interface SearchFormItem {
  field: string
  label: string
  type: FormItemType
  span?: number
  placeholder?: string | string[]
  disabled?: boolean
  rules?: any[]
  
  // 通用配置
  allowClear?: boolean
  onChange?: (value: any, form: Record<string, any>) => void
  
  // 输入框相关
  maxLength?: number
  showCount?: boolean
  
  // 数字输入框相关
  min?: number
  max?: number
  step?: number
  precision?: number
  
  // 文本域相关
  rows?: number
  
  // 选择器相关
  options?: OptionItem[]
  mode?: 'multiple' | 'tags'
  showSearch?: boolean
  filterOption?: boolean | ((inputValue: string, option: any) => boolean)
  
  // 级联选择器相关
  expandTrigger?: 'click' | 'hover'
  multiple?: boolean
  
  // 树选择器相关
  treeData?: TreeNode[]
  treeCheckable?: boolean
  
  // 日期相关
  format?: string
  valueFormat?: string
  showTime?: boolean
  
  // 单选按钮相关
  buttonStyle?: 'outline' | 'solid'
  
  // 开关相关
  checkedChildren?: string
  unCheckedChildren?: string
  
  // 滑动条相关
  range?: boolean
  marks?: Record<number, string>
  
  // 评分相关
  count?: number
  allowHalf?: boolean
    // 颜色选择器相关
  format?: 'hex' | 'hsb' | 'rgb'
  
  // 自定义组件
  component?: Component
  props?: Record<string, any>
  slot?: string
  
  // 上传相关
  action?: string
  accept?: string
  maxCount?: number
  beforeUpload?: (file: File) => boolean | Promise<boolean>
  
  // 输入组相关
  addonBefore?: string
  addonAfter?: string
  prefix?: string
  suffix?: string
  
  // 自动完成相关
  dataSource?: any[]
  backfill?: boolean
  
  // 提及相关
  split?: string
  
  // 穿梭框相关
  titles?: [string, string]
  render?: (item: any) => string
}
}

// 表单项类型
export type FormItemType =
  | 'input'
  | 'password'
  | 'number'
  | 'textarea'
  | 'select'
  | 'cascader'
  | 'tree-select'
  | 'date'
  | 'date-range'
  | 'time'
  | 'time-range'
  | 'month'
  | 'week'
  | 'quarter'
  | 'year'
  | 'radio'
  | 'radio-button'
  | 'checkbox'
  | 'switch'
  | 'slider'
  | 'rate'
  | 'color'
  | 'upload'
  | 'dragger'
  | 'input-group'
  | 'auto-complete'
  | 'mentions'
  | 'transfer'
  | 'custom'
  | 'slot'

// 选项配置
export interface OptionItem {
  label: string
  value: any
  disabled?: boolean
  children?: OptionItem[]
}

// 树节点配置
export interface TreeNode {
  title: string
  value: any
  key: string
  disabled?: boolean
  disableCheckbox?: boolean
  selectable?: boolean
  children?: TreeNode[]
}

// 工具栏按钮配置
export interface ToolbarItem {
  label: string
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text'
  icon?: Component
  danger?: boolean
  disabled?: boolean
  loading?: boolean
  permission?: string
  onClick?: (selectedRowKeys: any[], selectedRows: any[]) => void
}

// 组件 Props 接口
export interface SearchTableProps {
  // 搜索表单配置
  searchFormConfig?: SearchFormItem[]
  // 表格列配置
  columns: TableColumnType[]
  // 数据源
  dataSource?: any[]
  // 分页配置
  pagination?: false | TableProps['pagination']
  // 行选择配置
  rowSelection?: TableProps['rowSelection']
  // 滚动配置
  scroll?: TableProps['scroll']
  // 行键
  rowKey?: string | ((record: any) => string)
  // 展开配置
  expandable?: TableProps['expandable']
  // 工具栏配置
  toolbarConfig?: ToolbarItem[]
  // 加载状态
  loading?: boolean
  // 是否可展开搜索表单
  canExpand?: boolean
  // 默认折叠显示的表单项数量
  foldCount?: number
  // 请求函数
  request?: (params: SearchParams) => Promise<SearchResult>
  // 初始搜索参数
  initialParams?: Record<string, any>
  // 是否显示搜索表单
  showSearch?: boolean
  // 是否显示工具栏
  showToolbar?: boolean
  // 表格大小
  size?: 'large' | 'middle' | 'small'
  // 是否显示边框
  bordered?: boolean
}

// 搜索参数接口
export interface SearchParams {
  current?: number
  pageSize?: number
  sortField?: string
  sortOrder?: 'ascend' | 'descend'
  [key: string]: any
}

// 搜索结果接口
export interface SearchResult {
  data: any[]
  total: number
  success?: boolean
  message?: string
}

// 组件实例方法接口
export interface SearchTableInstance {
  search: () => void
  reset: () => void
  refresh: () => void
  getSearchForm: () => Record<string, any>
  setSearchForm: (data: Record<string, any>) => void
  getSelectedRows: () => any[]
  getSelectedRowKeys: () => any[]
  clearSelection: () => void
}

// 事件接口
export interface SearchTableEmits {
  search: [params: SearchParams]
  reset: []
  change: [pagination: any, filters: any, sorter: any]
  refresh: []
  'selection-change': [selectedRowKeys: any[], selectedRows: any[]]
}
