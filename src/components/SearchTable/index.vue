<template>
  <div class="search-table">
    <!-- 搜索表单区域 -->
    <div class="search-form" v-if="searchFormConfig.length > 0">
      <a-card :bordered="false" class="search-card">
        <a-form
          ref="searchFormRef"
          :model="searchForm"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          class="search-form-content"
        >
          <a-row :gutter="16">
            <a-col
              v-for="(item, index) in visibleSearchForm"
              :key="item.field"
              :span="item.span || 8"
            >
              <a-form-item
                :label="item.label"
                :name="item.field"
                :rules="item.rules"
              >
                <!-- 输入框 -->
                <a-input
                  v-if="item.type === 'input'"
                  v-model:value="searchForm[item.field]"
                  :placeholder="item.placeholder || `请输入${item.label}`"
                  :disabled="item.disabled"
                  :max-length="item.maxLength"
                  :show-count="item.showCount"
                  @press-enter="handleSearch"
                />

                <!-- 密码输入框 -->
                <a-input-password
                  v-else-if="item.type === 'password'"
                  v-model:value="searchForm[item.field]"
                  :placeholder="item.placeholder || `请输入${item.label}`"
                  :disabled="item.disabled"
                />

                <!-- 数字输入框 -->
                <a-input-number
                  v-else-if="item.type === 'number'"
                  v-model:value="searchForm[item.field]"
                  :placeholder="item.placeholder || `请输入${item.label}`"
                  :disabled="item.disabled"
                  :min="item.min"
                  :max="item.max"
                  :step="item.step"
                  :precision="item.precision"
                  style="width: 100%"
                />

                <!-- 文本域 -->
                <a-textarea
                  v-else-if="item.type === 'textarea'"
                  v-model:value="searchForm[item.field]"
                  :placeholder="item.placeholder || `请输入${item.label}`"
                  :disabled="item.disabled"
                  :rows="item.rows || 4"
                  :max-length="item.maxLength"
                  :show-count="item.showCount"
                />

                <!-- 选择器 -->
                <a-select
                  v-else-if="item.type === 'select'"
                  v-model:value="searchForm[item.field]"
                  :placeholder="item.placeholder || `请选择${item.label}`"
                  :disabled="item.disabled"
                  :mode="item.mode"
                  :allow-clear="item.allowClear !== false"
                  :show-search="item.showSearch"
                  :filter-option="item.filterOption"
                  @change="item.onChange && item.onChange($event, searchForm)"
                >
                  <a-select-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :disabled="option.disabled"
                  >
                    {{ option.label }}
                  </a-select-option>
                </a-select>

                <!-- 级联选择器 -->
                <a-cascader
                  v-else-if="item.type === 'cascader'"
                  v-model:value="searchForm[item.field]"
                  :options="item.options"
                  :placeholder="item.placeholder || `请选择${item.label}`"
                  :disabled="item.disabled"
                  :expand-trigger="item.expandTrigger || 'click'"
                  :multiple="item.multiple"
                  :show-search="item.showSearch"
                  :allow-clear="item.allowClear !== false"
                  @change="item.onChange && item.onChange($event, searchForm)"
                />

                <!-- 树选择器 -->
                <a-tree-select
                  v-else-if="item.type === 'tree-select'"
                  v-model:value="searchForm[item.field]"
                  :tree-data="item.treeData"
                  :placeholder="item.placeholder || `请选择${item.label}`"
                  :disabled="item.disabled"
                  :multiple="item.multiple"
                  :show-search="item.showSearch"
                  :tree-checkable="item.treeCheckable"
                  :allow-clear="item.allowClear !== false"
                  @change="item.onChange && item.onChange($event, searchForm)"
                />

                <!-- 日期选择器 -->
                <a-date-picker
                  v-else-if="item.type === 'date'"
                  v-model:value="searchForm[item.field]"
                  :placeholder="item.placeholder || `请选择${item.label}`"
                  :disabled="item.disabled"
                  :format="item.format || 'YYYY-MM-DD'"
                  :value-format="item.valueFormat || 'YYYY-MM-DD'"
                  :show-time="item.showTime"
                  :allow-clear="item.allowClear !== false"
                  style="width: 100%"
                  @change="item.onChange && item.onChange($event, searchForm)"
                />

                <!-- 日期范围选择器 -->
                <a-range-picker
                  v-else-if="item.type === 'date-range'"
                  v-model:value="searchForm[item.field]"
                  :placeholder="item.placeholder || ['开始日期', '结束日期']"
                  :disabled="item.disabled"
                  :format="item.format || 'YYYY-MM-DD'"
                  :value-format="item.valueFormat || 'YYYY-MM-DD'"
                  :show-time="item.showTime"
                  :allow-clear="item.allowClear !== false"
                  style="width: 100%"
                  @change="item.onChange && item.onChange($event, searchForm)"
                />

                <!-- 时间选择器 -->
                <a-time-picker
                  v-else-if="item.type === 'time'"
                  v-model:value="searchForm[item.field]"
                  :placeholder="item.placeholder || `请选择${item.label}`"
                  :disabled="item.disabled"
                  :format="item.format || 'HH:mm:ss'"
                  :value-format="item.valueFormat || 'HH:mm:ss'"
                  :allow-clear="item.allowClear !== false"
                  style="width: 100%"
                  @change="item.onChange && item.onChange($event, searchForm)"
                />

                <!-- 时间范围选择器 -->
                <a-time-range-picker
                  v-else-if="item.type === 'time-range'"
                  v-model:value="searchForm[item.field]"
                  :placeholder="item.placeholder || ['开始时间', '结束时间']"
                  :disabled="item.disabled"
                  :format="item.format || 'HH:mm:ss'"
                  :value-format="item.valueFormat || 'HH:mm:ss'"
                  :allow-clear="item.allowClear !== false"
                  style="width: 100%"
                  @change="item.onChange && item.onChange($event, searchForm)"
                />

                <!-- 单选框组 -->
                <a-radio-group
                  v-else-if="item.type === 'radio'"
                  v-model:value="searchForm[item.field]"
                  :disabled="item.disabled"
                  :button-style="item.buttonStyle"
                  @change="item.onChange && item.onChange($event, searchForm)"
                >
                  <a-radio
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :disabled="option.disabled"
                  >
                    {{ option.label }}
                  </a-radio>
                </a-radio-group>                <!-- 单选按钮组 -->
                <a-radio-group
                  v-else-if="item.type === 'radio-button'"
                  v-model:value="searchForm[item.field]"
                  :disabled="item.disabled"
                  button-style="solid"
                  @change="item.onChange && item.onChange($event, searchForm)"
                >
                  <a-radio-button
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :disabled="option.disabled"
                  >
                    {{ option.label }}
                  </a-radio-button>
                </a-radio-group>

                <!-- 月份选择器 -->
                <a-date-picker
                  v-else-if="item.type === 'month'"
                  v-model:value="searchForm[item.field]"
                  picker="month"
                  :placeholder="item.placeholder || `请选择${item.label}`"
                  :disabled="item.disabled"
                  :format="item.format || 'YYYY-MM'"
                  :value-format="item.valueFormat || 'YYYY-MM'"
                  :allow-clear="item.allowClear !== false"
                  style="width: 100%"
                  @change="item.onChange && item.onChange($event, searchForm)"
                />

                <!-- 周选择器 -->
                <a-date-picker
                  v-else-if="item.type === 'week'"
                  v-model:value="searchForm[item.field]"
                  picker="week"
                  :placeholder="item.placeholder || `请选择${item.label}`"
                  :disabled="item.disabled"
                  :format="item.format || 'YYYY-wo'"
                  :value-format="item.valueFormat || 'YYYY-wo'"
                  :allow-clear="item.allowClear !== false"
                  style="width: 100%"
                  @change="item.onChange && item.onChange($event, searchForm)"
                />

                <!-- 季度选择器 -->
                <a-date-picker
                  v-else-if="item.type === 'quarter'"
                  v-model:value="searchForm[item.field]"
                  picker="quarter"
                  :placeholder="item.placeholder || `请选择${item.label}`"
                  :disabled="item.disabled"
                  :format="item.format || 'YYYY-[Q]Q'"
                  :value-format="item.valueFormat || 'YYYY-[Q]Q'"
                  :allow-clear="item.allowClear !== false"
                  style="width: 100%"
                  @change="item.onChange && item.onChange($event, searchForm)"
                />                <!-- 上传组件 -->
                <a-upload
                  v-else-if="item.type === 'upload'"
                  v-model:file-list="searchForm[item.field]"
                  :action="item.action"
                  :accept="item.accept"
                  :multiple="item.multiple"
                  :max-count="item.maxCount"
                  :before-upload="item.beforeUpload"
                  :disabled="item.disabled"
                  @change="item.onChange && item.onChange($event, searchForm)"
                >
                  <a-button>
                    <UploadOutlined />
                    {{ item.placeholder || '点击上传' }}
                  </a-button>
                </a-upload>

                <!-- 拖拽上传 -->
                <a-upload-dragger
                  v-else-if="item.type === 'dragger'"
                  v-model:file-list="searchForm[item.field]"
                  :action="item.action"
                  :accept="item.accept"
                  :multiple="item.multiple"
                  :max-count="item.maxCount"
                  :before-upload="item.beforeUpload"
                  :disabled="item.disabled"
                  @change="item.onChange && item.onChange($event, searchForm)"
                >
                  <p class="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p class="ant-upload-text">{{ item.placeholder || '点击或拖拽文件到此区域上传' }}</p>
                </a-upload-dragger>

                <!-- 输入框组合 -->
                <a-input-group
                  v-else-if="item.type === 'input-group'"
                  compact
                >
                  <a-input
                    v-model:value="searchForm[item.field]"
                    :placeholder="item.placeholder || `请输入${item.label}`"
                    :disabled="item.disabled"
                    :addon-before="item.addonBefore"
                    :addon-after="item.addonAfter"
                    :prefix="item.prefix"
                    :suffix="item.suffix"
                    @change="item.onChange && item.onChange($event, searchForm)"
                  />
                </a-input-group>

                <!-- 自动完成 -->
                <a-auto-complete
                  v-else-if="item.type === 'auto-complete'"
                  v-model:value="searchForm[item.field]"
                  :data-source="item.dataSource || []"
                  :placeholder="item.placeholder || `请输入${item.label}`"
                  :disabled="item.disabled"
                  :backfill="item.backfill"
                  @change="item.onChange && item.onChange($event, searchForm)"
                />

                <!-- 提及 -->
                <a-mentions
                  v-else-if="item.type === 'mentions'"
                  v-model:value="searchForm[item.field]"
                  :placeholder="item.placeholder || `请输入${item.label}`"
                  :disabled="item.disabled"
                  :prefix="item.prefix || '@'"
                  :split="item.split || ' '"
                  @change="item.onChange && item.onChange($event, searchForm)"
                >
                  <a-mentions-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </a-mentions-option>
                </a-mentions>

                <!-- 穿梭框 -->
                <a-transfer
                  v-else-if="item.type === 'transfer'"
                  v-model:target-keys="searchForm[item.field]"
                  :data-source="item.dataSource || []"
                  :disabled="item.disabled"
                  :titles="item.titles || ['源列表', '目标列表']"
                  :render="item.render"
                  @change="item.onChange && item.onChange($event, searchForm)"
                />

                <!-- 复选框组 -->
                <a-checkbox-group
                  v-else-if="item.type === 'checkbox'"
                  v-model:value="searchForm[item.field]"
                  :disabled="item.disabled"
                  :options="item.options"
                  @change="item.onChange && item.onChange($event, searchForm)"
                />

                <!-- 开关 -->
                <a-switch
                  v-else-if="item.type === 'switch'"
                  v-model:checked="searchForm[item.field]"
                  :disabled="item.disabled"
                  :checked-children="item.checkedChildren"
                  :un-checked-children="item.unCheckedChildren"
                  @change="item.onChange && item.onChange($event, searchForm)"
                />

                <!-- 滑动输入条 -->
                <a-slider
                  v-else-if="item.type === 'slider'"
                  v-model:value="searchForm[item.field]"
                  :disabled="item.disabled"
                  :min="item.min || 0"
                  :max="item.max || 100"
                  :step="item.step || 1"
                  :range="item.range"
                  :marks="item.marks"
                  @change="item.onChange && item.onChange($event, searchForm)"
                />

                <!-- 评分 -->
                <a-rate
                  v-else-if="item.type === 'rate'"
                  v-model:value="searchForm[item.field]"
                  :disabled="item.disabled"
                  :count="item.count || 5"
                  :allow-half="item.allowHalf"
                  :allow-clear="item.allowClear !== false"
                  @change="item.onChange && item.onChange($event, searchForm)"
                />

                <!-- 颜色选择器 -->
                <a-color-picker
                  v-else-if="item.type === 'color'"
                  v-model:value="searchForm[item.field]"
                  :disabled="item.disabled"
                  :format="item.format || 'hex'"
                  :allow-clear="item.allowClear !== false"
                  @change="item.onChange && item.onChange($event, searchForm)"
                />

                <!-- 自定义组件 -->
                <component
                  v-else-if="item.type === 'custom'"
                  :is="item.component"
                  v-model:value="searchForm[item.field]"
                  v-bind="item.props || {}"
                  @change="item.onChange && item.onChange($event, searchForm)"
                />

                <!-- 自定义插槽 -->
                <slot
                  v-else-if="item.type === 'slot'"
                  :name="item.slot"
                  :form="searchForm"
                  :field="item.field"
                  :item="item"
                ></slot>
              </a-form-item>
            </a-col>

            <!-- 操作按钮 -->
            <a-col :span="actionSpan" class="search-actions">
              <a-form-item>
                <a-space>
                  <a-button type="primary" @click="handleSearch" :loading="loading">
                    <template #icon><SearchOutlined /></template>
                    搜索
                  </a-button>
                  <a-button @click="handleReset">
                    <template #icon><ReloadOutlined /></template>
                    重置
                  </a-button>
                  <a-button 
                    v-if="canExpand && searchFormConfig.length > foldCount"
                    type="link" 
                    @click="toggleExpand"
                  >
                    {{ expanded ? '收起' : '展开' }}
                    <DownOutlined v-if="!expanded" />
                    <UpOutlined v-else />
                  </a-button>
                </a-space>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
    </div>

    <!-- 工具栏 -->
    <div class="table-toolbar" v-if="$slots.toolbar || toolbarConfig.length > 0">
      <a-card :bordered="false" class="toolbar-card">
        <a-row justify="space-between" align="middle">
          <a-col>
            <a-space>
              <template v-for="(tool, index) in toolbarConfig" :key="index">
                <a-button
                  :type="tool.type || 'default'"
                  :danger="tool.danger"
                  :disabled="tool.disabled"
                  :loading="tool.loading"
                  @click="tool.onClick && tool.onClick(selectedRowKeys, selectedRows)"
                >
                  <template #icon v-if="tool.icon">
                    <component :is="tool.icon" />
                  </template>
                  {{ tool.label }}
                </a-button>
              </template>
              <slot name="toolbar" :selectedRowKeys="selectedRowKeys" :selectedRows="selectedRows"></slot>
            </a-space>
          </a-col>
          <a-col>
            <a-space>
              <!-- 表格设置 -->
              <a-tooltip title="刷新">
                <a-button @click="handleRefresh" :loading="loading">
                  <template #icon><ReloadOutlined /></template>
                </a-button>
              </a-tooltip>
              <a-tooltip title="密度">
                <a-dropdown>
                  <a-button>
                    <template #icon><ColumnHeightOutlined /></template>
                  </a-button>
                  <template #overlay>
                    <a-menu @click="handleSizeChange">
                      <a-menu-item key="large">默认</a-menu-item>
                      <a-menu-item key="middle">中等</a-menu-item>
                      <a-menu-item key="small">紧凑</a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </a-tooltip>
              <a-tooltip title="列设置">
                <a-dropdown>
                  <a-button>
                    <template #icon><SettingOutlined /></template>
                  </a-button>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item v-for="col in columns" :key="col.dataIndex">
                        <a-checkbox 
                          :checked="!hiddenColumns.includes(col.dataIndex)"
                          @change="toggleColumn(col.dataIndex)"
                        >
                          {{ col.title }}
                        </a-checkbox>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </a-tooltip>
            </a-space>
          </a-col>
        </a-row>
      </a-card>
    </div>

    <!-- 数据表格 -->
    <div class="data-table">
      <a-card :bordered="false">
        <a-table
          :columns="visibleColumns"
          :data-source="dataSource"
          :loading="loading"
          :pagination="paginationConfig"
          :row-selection="rowSelection"
          :scroll="scroll"
          :size="tableSize"
          :row-key="rowKey"
          :expandable="tableExpandable"
          @change="handleTableChange"
        >
          <!-- 动态插槽 -->
          <template v-for="column in columns" :key="column.dataIndex" #[column.dataIndex]="{ text, record, index }">
            <slot :name="column.dataIndex" :text="text" :record="record" :index="index">
              {{ text }}
            </slot>
          </template>

          <!-- 操作列插槽 -->
          <template #action="{ record, index }">
            <slot name="action" :record="record" :index="index"></slot>
          </template>

          <!-- 展开行插槽 -->
          <template #expandedRowRender="{ record, index, indent, expanded }">
            <slot name="expandedRowRender" :record="record" :index="index" :indent="indent" :expanded="expanded"></slot>
          </template>
        </a-table>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
    ColumnHeightOutlined,
    DownOutlined,
    ReloadOutlined,
    SearchOutlined,
    SettingOutlined,
    UpOutlined
} from '@ant-design/icons-vue'
import type { FormInstance, TableColumnType, TableProps } from 'ant-design-vue'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import type { SearchFormItem, SearchParams, SearchResult, ToolbarItem } from './types'

// Props
interface Props {
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
}

const props = withDefaults(defineProps<Props>(), {
  searchFormConfig: () => [],
  dataSource: () => [],
  pagination: () => ({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number, range: [number, number]) => 
      `共 ${total} 条记录 第 ${range[0]}-${range[1]} 条`
  }),
  rowKey: 'id',
  toolbarConfig: () => [],
  loading: false,
  canExpand: true,
  foldCount: 3
})

// Emits
const emit = defineEmits<{
  search: [params: SearchParams]
  reset: []
  change: [pagination: any, filters: any, sorter: any]
  refresh: []
}>()

// 响应式数据
const searchFormRef = ref<FormInstance>()
const searchForm = reactive<Record<string, any>>({})
const expanded = ref(false)
const tableSize = ref<'large' | 'middle' | 'small'>('middle')
const hiddenColumns = ref<string[]>([])
const selectedRowKeys = ref<any[]>([])
const selectedRows = ref<any[]>([])

// 初始化搜索表单
const initSearchForm = () => {
  props.searchFormConfig.forEach(item => {
    if (searchForm[item.field] === undefined) {
      // 设置默认值
      if (item.type === 'checkbox') {
        searchForm[item.field] = []
      } else if (item.type === 'switch') {
        searchForm[item.field] = false
      } else if (['number', 'slider', 'rate'].includes(item.type)) {
        searchForm[item.field] = undefined
      } else {
        searchForm[item.field] = undefined
      }
    }
  })
  
  // 设置初始参数
  if (props.initialParams) {
    Object.assign(searchForm, props.initialParams)
  }
}

// 计算属性
const actionSpan = computed(() => {
  const formItemCount = props.searchFormConfig.length
  if (formItemCount === 0) return 0
  
  const totalSpan = props.searchFormConfig.reduce((sum, item) => sum + (item.span || 8), 0)
  const remainingSpan = 24 - (totalSpan % 24)
  return remainingSpan >= 8 ? remainingSpan : 24
})

const visibleSearchForm = computed(() => {
  if (!props.canExpand || expanded.value) {
    return props.searchFormConfig
  }
  return props.searchFormConfig.slice(0, props.foldCount)
})

const visibleColumns = computed(() => {
  return props.columns.filter(col => {
    const dataIndex = col.dataIndex as string
    return dataIndex && !hiddenColumns.value.includes(dataIndex)
  })
})

const paginationConfig = computed(() => {
  if (props.pagination === false) return false
  
  return {
    ...props.pagination,
    onChange: (page: number, pageSize: number) => {
      handleTableChange({ current: page, pageSize }, {}, {})
    },
    onShowSizeChange: (current: number, size: number) => {
      handleTableChange({ current: 1, pageSize: size }, {}, {})
    }
  }
})

const tableExpandable = computed(() => {
  // 如果有展开行插槽，则启用展开功能
  return {
    expandedRowRender: (record: any, index: number, indent: number, expanded: boolean) => {
      // 这里返回插槽内容，由模板处理
      return null
    }
  }
})

// 行选择配置
const rowSelection = computed(() => {
  if (!props.rowSelection) return undefined
  
  return {
    ...props.rowSelection,
    selectedRowKeys: selectedRowKeys.value,
    onChange: (keys: any[], rows: any[]) => {
      selectedRowKeys.value = keys
      selectedRows.value = rows
      props.rowSelection?.onChange?.(keys, rows)
    }
  }
})

// 方法
const handleSearch = () => {
  const params = { ...searchForm }
  
  // 处理日期范围
  props.searchFormConfig.forEach(item => {
    if (item.type === 'date-range' && params[item.field]) {
      const [start, end] = params[item.field]
      params[`${item.field}_start`] = start
      params[`${item.field}_end`] = end
      delete params[item.field]
    }
  })
  
  emit('search', params)
  
  // 如果有请求函数，自动请求数据
  if (props.request) {
    loadData(params)
  }
}

const handleReset = () => {
  searchFormRef.value?.resetFields()
  initSearchForm()
  emit('reset')
  handleSearch()
}

const handleRefresh = () => {
  emit('refresh')
  handleSearch()
}

const handleTableChange = (pagination: any, filters: any, sorter: any) => {
  emit('change', pagination, filters, sorter)
  
  if (props.request) {
    const params = {
      ...searchForm,
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...filters,
      ...(sorter.field ? {
        sortField: sorter.field,
        sortOrder: sorter.order
      } : {})
    }
    loadData(params)
  }
}

const toggleExpand = () => {
  expanded.value = !expanded.value
}

const handleSizeChange = ({ key }: { key: string }) => {
  tableSize.value = key as 'large' | 'middle' | 'small'
}

const toggleColumn = (dataIndex: string) => {
  const index = hiddenColumns.value.indexOf(dataIndex)
  if (index > -1) {
    hiddenColumns.value.splice(index, 1)
  } else {
    hiddenColumns.value.push(dataIndex)
  }
}

const loadData = async (params: SearchParams) => {
  if (!props.request) return
  
  try {
    const { data, total } = await props.request(params)
    // 这里需要通过 emit 或者其他方式更新父组件的数据
    // 因为这是一个展示组件，数据应该由父组件管理
  } catch (error) {
    console.error('加载数据失败:', error)
  }
}

// 生命周期
onMounted(() => {
  initSearchForm()
  if (props.request) {
    handleSearch()
  }
})

// 监听搜索配置变化
watch(() => props.searchFormConfig, () => {
  initSearchForm()
}, { deep: true })

// 暴露方法给父组件
defineExpose({
  search: handleSearch,
  reset: handleReset,
  refresh: handleRefresh,
  getSearchForm: () => searchForm,
  setSearchForm: (data: Record<string, any>) => Object.assign(searchForm, data),
  getSelectedRows: () => selectedRows.value,
  getSelectedRowKeys: () => selectedRowKeys.value,
  clearSelection: () => {
    selectedRowKeys.value = []
    selectedRows.value = []
  }
})
</script>

<style scoped lang="less">
.search-table {
  .search-card,
  .toolbar-card {
    margin-bottom: 16px;
    
    :deep(.ant-card-body) {
      padding: 16px;
    }
  }
  
  .search-form-content {
    .search-actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      
      .ant-form-item {
        margin-bottom: 0;
      }
    }
  }
  
  .table-toolbar {
    .ant-space {
      width: 100%;
    }
  }
  
  .data-table {
    :deep(.ant-table-thead > tr > th) {
      background-color: #fafafa;
    }
  }
}

// 响应式样式
@media (max-width: 768px) {
  .search-table {
    .search-form-content {
      .ant-col {
        span: 24 !important;
      }
    }
    
    .table-toolbar {
      .ant-row {
        flex-direction: column;
        gap: 12px;
      }
    }
  }
}
</style>