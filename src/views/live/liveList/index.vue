<template>
  <div class="live-list-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">直播列表</h1>
    </div>

    <!-- 操作按钮区域 -->
    <div class="action-buttons">
      <a-button type="primary" @click="handleCreateLive">
        <template #icon>
          <PlusOutlined />
        </template>
        新建直播
      </a-button>
      <a-button @click="handleBatchCreate">批量新建</a-button>
      <a-button @click="handleClassifyManage">分类标签</a-button>
    </div>

    <!-- 搜索表单区域 -->
    <div class="search-form">
      <a-card :bordered="false">
        <a-form ref="searchFormRef" :model="searchForm" class="search-form-content">
          <!-- 第一行 -->
          <a-row :gutter="24" class="search-row">
            <a-col :span="6">
              <a-form-item label="频道名称" name="channelName">
                <a-input
                  v-model:value="searchForm.channelName"
                  placeholder="输入直播名称或频道号"
                  @press-enter="handleSearch"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="直播状态" name="status">
                <a-select v-model:value="searchForm.status" placeholder="全部" @change="handleSearch">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="live">直播中</a-select-option>
                  <a-select-option value="waiting">等待中</a-select-option>
                  <a-select-option value="ended">已结束</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="开播时间" name="dateRange">
                <a-range-picker
                  v-model:value="searchForm.dateRange"
                  placeholder="开始时间 - 结束时间"
                  @change="handleSearch"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <div class="search-actions">
                <a-button type="primary" @click="handleSearch">查询</a-button>
                <a-button @click="handleReset">重置</a-button>
              </div>
            </a-col>
          </a-row>

          <!-- 第二行 -->
          <a-row :gutter="24" class="search-row" v-show="expandSearch">
            <a-col :span="6">
              <a-form-item label="直播方式" name="liveType">
                <a-select v-model:value="searchForm.liveType" placeholder="全部" @change="handleSearch">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="live">直播</a-select-option>
                  <a-select-option value="record">录制</a-select-option>
                  <a-select-option value="rtmp">RTMP</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="创建时间" name="createDateRange">
                <a-range-picker
                  v-model:value="searchForm.createDateRange"
                  placeholder="开始时间 - 结束时间"
                  @change="handleSearch"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="直播分类" name="category">
                <a-select v-model:value="searchForm.category" placeholder="全部" @change="handleSearch">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="education">教育</a-select-option>
                  <a-select-option value="entertainment">娱乐</a-select-option>
                  <a-select-option value="business">商务</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="直播标签" name="tags">
                <a-select
                  v-model:value="searchForm.tags"
                  placeholder="全部/全部"
                  mode="multiple"
                  @change="handleSearch"
                >
                  <a-select-option value="hot">热门</a-select-option>
                  <a-select-option value="new">新品</a-select-option>
                  <a-select-option value="recommended">推荐</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

          <!-- 第三行 -->
          <a-row :gutter="24" class="search-row" v-show="expandSearch">
            <a-col :span="6">
              <a-form-item label="直播标签" name="extraTags">
                <a-select v-model:value="searchForm.extraTags" placeholder="全部" @change="handleSearch">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="featured">精选</a-select-option>
                  <a-select-option value="trending">趋势</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="直播延迟" name="delay">
                <a-select v-model:value="searchForm.delay" placeholder="全部" @change="handleSearch">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="low">低延迟</a-select-option>
                  <a-select-option value="normal">正常</a-select-option>
                  <a-select-option value="high">高延迟</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="观看条件" name="viewCondition">
                <a-select v-model:value="searchForm.viewCondition" placeholder="全部" @change="handleSearch">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="free">免费</a-select-option>
                  <a-select-option value="paid">付费</a-select-option>
                  <a-select-option value="member">会员</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="直播延迟" name="liveDelay">
                <a-select v-model:value="searchForm.liveDelay" placeholder="全部" @change="handleSearch">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="ultra-low">超低延迟</a-select-option>
                  <a-select-option value="low">低延迟</a-select-option>
                  <a-select-option value="normal">正常延迟</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

          <!-- 展开/收起按钮 -->
          <div class="expand-toggle">
            <a-button type="link" @click="toggleExpand">
              {{ expandSearch ? "收起" : "展开" }}
              <DownOutlined :class="{ 'rotate-180': expandSearch }" />
            </a-button>
          </div>
        </a-form>
      </a-card>
    </div>

    <!-- 视图切换和统计信息 -->
    <div class="view-control">
      <div class="view-switch">
        <a-button-group>
          <a-button :type="viewMode === 'list' ? 'primary' : 'default'" @click="setViewMode('list')">
            <template #icon>
              <BarsOutlined />
            </template>
            列表
          </a-button>
          <a-button :type="viewMode === 'card' ? 'primary' : 'default'" @click="setViewMode('card')">
            <template #icon>
              <AppstoreOutlined />
            </template>
            卡片
          </a-button>
        </a-button-group>
      </div>

      <div class="statistics">
        <span>频道数: {{ total }}/100</span>
        <a-tooltip title="说明">
          <QuestionCircleOutlined style="margin-left: 4px" />
        </a-tooltip>
      </div>

      <div class="custom-columns">
        <a-button @click="showColumnSettings = true">
          <template #icon>
            <SettingOutlined />
          </template>
          自定义列表
        </a-button>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="table-container">
      <a-table
        :columns="columns"
        :data-source="liveData"
        :pagination="pagination"
        :loading="loading"
        row-key="id"
        @change="handleTableChange"
      >
        <!-- 直播信息列 -->
        <template #liveInfo="{ record }">
          <div class="live-info">
            <div class="live-cover">
              <img :src="record.cover" :alt="record.title" />
              <div class="live-status" :class="record.status">
                {{ getStatusText(record.status) }}
              </div>
            </div>
            <div class="live-details">
              <div class="live-title">{{ record.title }}</div>
              <div class="live-subtitle">{{ record.subtitle }}</div>
            </div>
          </div>
        </template>

        <!-- 频道号列 -->
        <template #channelId="{ record }">
          <div class="channel-id">
            <span>{{ record.channelId }}</span>
            <a-button type="text" size="small" @click="copyChannelId(record.channelId)">
              <template #icon>
                <CopyOutlined />
              </template>
            </a-button>
          </div>
        </template>

        <!-- 开播时间列 -->
        <template #startTime="{ record }">
          <div class="time-info">
            <div>{{ formatDate(record.startTime) }}</div>
            <div class="time-detail">{{ formatTime(record.startTime) }}</div>
          </div>
        </template>

        <!-- 创建时间列 -->
        <template #createTime="{ record }">
          <div class="time-info">
            <div>{{ formatDate(record.createTime) }}</div>
            <div class="time-detail">{{ formatTime(record.createTime) }}</div>
          </div>
        </template>

        <!-- 主播信息列 -->
        <template #streamer="{ record }">
          <div class="streamer-info">
            <span>{{ record.streamer || "-" }}</span>
          </div>
        </template>

        <!-- 直播方式列 -->
        <template #liveType="{ record }">
          <a-tag :color="getLiveTypeColor(record.liveType)">
            {{ getLiveTypeText(record.liveType) }}
          </a-tag>
        </template>

        <!-- 操作列 -->
        <template #actions="{ record }">
          <div class="action-buttons">
            <a-button type="link" @click="handleStart(record)">开播</a-button>
            <a-button type="link" @click="handleShare(record)">分享</a-button>
            <a-button type="link" @click="handleDetail(record)">详情</a-button>
            <a-dropdown>
              <a-button type="link">
                更多
                <DownOutlined />
              </a-button>
              <template #overlay>
                <a-menu @click="handleMoreAction($event, record)">
                  <a-menu-item key="edit">编辑</a-menu-item>
                  <a-menu-item key="copy">复制</a-menu-item>
                  <a-menu-item key="delete" danger>删除</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </template>
      </a-table>
    </div>

    <!-- 批量操作区域 -->
    <div class="batch-actions" v-if="selectedRowKeys.length > 0">
      <div class="batch-info">
        <span>已选 {{ selectedRowKeys.length }} 项</span>
      </div>
      <div class="batch-buttons">
        <a-button @click="handleBatchEdit">改分类</a-button>
        <a-button @click="handleBatchExport">贴标签</a-button>
        <a-button danger @click="handleBatchDelete">删除</a-button>
      </div>
    </div>

    <!-- 列设置弹窗 -->
    <a-modal v-model:open="showColumnSettings" title="自定义列表" @ok="handleColumnSettingsOk">
      <a-checkbox-group v-model:value="selectedColumns">
        <div class="column-settings">
          <a-checkbox v-for="column in allColumns" :key="column.key" :value="column.key" :disabled="column.required">
            {{ column.title }}
          </a-checkbox>
        </div>
      </a-checkbox-group>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import {
  AppstoreOutlined,
  BarsOutlined,
  CopyOutlined,
  DownOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import dayjs from "dayjs";
import { computed, onMounted, reactive, ref } from "vue";

// 类型定义
interface LiveData {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  channelId: string;
  status: "live" | "waiting" | "ended";
  startTime: string;
  createTime: string;
  streamer: string;
  liveType: "live" | "record" | "rtmp";
}

type ColumnKey = "liveInfo" | "channelId" | "startTime" | "streamer" | "createTime" | "liveType" | "actions";

// 响应式数据
const loading = ref(false);
const viewMode = ref("list");
const showColumnSettings = ref(false);
const selectedRowKeys = ref<string[]>([]);
const total = ref(1);
const expandSearch = ref(false);

// 搜索表单
const searchFormRef = ref();
const searchForm = reactive({
  channelName: "",
  status: "",
  dateRange: [],
  liveType: "",
  createDateRange: [],
  category: "",
  tags: [],
  extraTags: "",
  delay: "",
  viewCondition: "",
  liveDelay: "",
});

// 分页配置
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条数据`,
});

// 列配置
const allColumns = [
  { key: "liveInfo", title: "直播信息", required: true },
  { key: "channelId", title: "频道号", required: true },
  { key: "startTime", title: "开播时间", required: false },
  { key: "streamer", title: "创建人", required: false },
  { key: "createTime", title: "创建时间", required: false },
  { key: "liveType", title: "直播方式", required: false },
  { key: "actions", title: "操作", required: true },
];

const selectedColumns = ref<ColumnKey[]>([
  "liveInfo",
  "channelId",
  "startTime",
  "streamer",
  "createTime",
  "liveType",
  "actions",
]);

// 计算属性 - 当前显示的列
const columns = computed(() => {
  const columnMap: Record<ColumnKey, any> = {
    liveInfo: {
      title: "直播信息",
      dataIndex: "liveInfo",
      key: "liveInfo",
      width: 280,
      slots: { customRender: "liveInfo" },
    },
    channelId: {
      title: "频道号",
      dataIndex: "channelId",
      key: "channelId",
      width: 150,
      slots: { customRender: "channelId" },
    },
    startTime: {
      title: "开播时间",
      dataIndex: "startTime",
      key: "startTime",
      width: 150,
      sorter: true,
      slots: { customRender: "startTime" },
    },
    streamer: {
      title: "创建人",
      dataIndex: "streamer",
      key: "streamer",
      width: 100,
      slots: { customRender: "streamer" },
    },
    createTime: {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 150,
      sorter: true,
      slots: { customRender: "createTime" },
    },
    liveType: {
      title: "直播方式",
      dataIndex: "liveType",
      key: "liveType",
      width: 100,
      slots: { customRender: "liveType" },
    },
    actions: {
      title: "操作",
      key: "actions",
      width: 200,
      fixed: "right",
      slots: { customRender: "actions" },
    },
  };

  return selectedColumns.value.map(key => columnMap[key]);
});

// 模拟数据
const liveData = ref<LiveData[]>([
  {
    id: "1",
    title: "Spring 知识精讲",
    subtitle: "未开始",
    cover: "https://via.placeholder.com/120x80?text=Spring",
    channelId: "6140608",
    status: "waiting",
    startTime: "2025/07/11 15:06",
    createTime: "2025/07/03 17:07",
    streamer: "王张号",
    liveType: "live",
  },
]);

// 方法
const handleSearch = () => {
  loading.value = true;
  // 模拟搜索请求
  setTimeout(() => {
    loading.value = false;
    message.success("搜索完成");
  }, 1000);
};

const handleReset = () => {
  searchFormRef.value?.resetFields();
  handleSearch();
};

const toggleExpand = () => {
  expandSearch.value = !expandSearch.value;
};

const handleCreateLive = () => {
  message.info("新建直播");
};

const handleBatchCreate = () => {
  message.info("批量新建");
};

const handleClassifyManage = () => {
  message.info("分类标签");
};

const setViewMode = (mode: string) => {
  viewMode.value = mode;
};

const handleTableChange = (pag: any) => {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
  handleSearch();
};

const copyChannelId = (channelId: string) => {
  navigator.clipboard.writeText(channelId);
  message.success("频道号已复制");
};

const handleStart = (record: any) => {
  message.info(`开播: ${record.title}`);
};

const handleShare = (record: any) => {
  message.info(`分享: ${record.title}`);
};

const handleDetail = (record: any) => {
  message.info(`查看详情: ${record.title}`);
};

const handleMoreAction = (event: any, record: any) => {
  const action = event.key;
  message.info(`${action}: ${record.title}`);
};

const handleBatchEdit = () => {
  message.info("批量改分类");
};

const handleBatchExport = () => {
  message.info("批量贴标签");
};

const handleBatchDelete = () => {
  message.info("批量删除");
};

const handleColumnSettingsOk = () => {
  showColumnSettings.value = false;
  message.success("列设置已保存");
};

// 格式化方法
const formatDate = (dateStr: string) => {
  return dayjs(dateStr).format("YYYY/MM/DD");
};

const formatTime = (dateStr: string) => {
  return dayjs(dateStr).format("HH:mm");
};

const getStatusText = (status: LiveData["status"]) => {
  const statusMap: Record<LiveData["status"], string> = {
    live: "直播中",
    waiting: "未开始",
    ended: "已结束",
  };
  return statusMap[status] || status;
};

const getLiveTypeColor = (type: LiveData["liveType"]) => {
  const colorMap: Record<LiveData["liveType"], string> = {
    live: "blue",
    record: "green",
    rtmp: "orange",
  };
  return colorMap[type] || "default";
};

const getLiveTypeText = (type: LiveData["liveType"]) => {
  const typeMap: Record<LiveData["liveType"], string> = {
    live: "直播",
    record: "录制",
    rtmp: "RTMP",
  };
  return typeMap[type] || type;
};

// 初始化数据
onMounted(() => {
  handleSearch();
});
</script>

<style lang="less" scoped>
.live-list-container {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;

  .page-header {
    margin-bottom: 20px;

    .page-title {
      font-size: 24px;
      font-weight: 600;
      color: #333;
      margin: 0;
    }
  }

  .action-buttons {
    margin-bottom: 20px;

    .ant-btn {
      margin-right: 12px;
    }
  }

  .search-form {
    margin-bottom: 20px;

    .ant-card {
      border-radius: 8px;
    }

    .search-form-content {
      .search-row {
        margin-bottom: 16px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .ant-form-item {
        margin-bottom: 16px;

        .ant-form-item-label {
          width: 80px;
          text-align: right;
        }

        .ant-input,
        .ant-select,
        .ant-picker {
          width: 100%;
        }
      }

      .search-actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        align-items: center;
        height: 32px;
      }
    }

    .expand-toggle {
      text-align: center;
      border-top: 1px solid #f0f0f0;
      padding-top: 16px;
      margin-top: 16px;

      .ant-btn-link {
        color: #1890ff;
        padding: 0;
        height: auto;
        display: flex;
        align-items: center;
        gap: 4px;

        .anticon {
          transition: transform 0.3s ease;

          &.rotate-180 {
            transform: rotate(180deg);
          }
        }
      }
    }
  }

  .view-control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 16px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .view-switch {
      .ant-btn-group {
        .ant-btn {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
    }

    .statistics {
      display: flex;
      align-items: center;
      color: #666;
      font-size: 14px;
    }

    .custom-columns {
      .ant-btn {
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }
  }

  .table-container {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .live-info {
      display: flex;
      align-items: center;
      gap: 12px;

      .live-cover {
        position: relative;
        width: 120px;
        height: 80px;
        border-radius: 4px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .live-status {
          position: absolute;
          top: 4px;
          left: 4px;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 12px;
          color: white;
          background: rgba(0, 0, 0, 0.7);

          &.live {
            background: #ff4d4f;
          }

          &.waiting {
            background: #faad14;
          }

          &.ended {
            background: #d9d9d9;
          }
        }
      }

      .live-details {
        flex: 1;

        .live-title {
          font-size: 16px;
          font-weight: 500;
          color: #333;
          margin-bottom: 4px;
        }

        .live-subtitle {
          font-size: 12px;
          color: #999;
        }
      }
    }

    .channel-id {
      display: flex;
      align-items: center;
      gap: 8px;

      span {
        font-family: monospace;
        font-size: 14px;
      }
    }

    .time-info {
      .time-detail {
        font-size: 12px;
        color: #999;
        margin-top: 2px;
      }
    }

    .streamer-info {
      color: #666;
    }

    .action-buttons {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;

      .ant-btn-link {
        padding: 0;
        height: auto;
        font-size: 14px;
      }
    }
  }

  .batch-actions {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 24px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    z-index: 1000;

    .batch-info {
      color: #666;
      font-size: 14px;
    }

    .batch-buttons {
      display: flex;
      gap: 8px;
    }
  }

  .column-settings {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;

    .ant-checkbox-wrapper {
      margin: 0;
    }
  }
}

// 全局样式
.rotate-180 {
  transform: rotate(180deg);
}
</style>
