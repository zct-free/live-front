<template>
  <div class="channel-ban-users">
    <div class="page-header">
      <h2 class="page-title">频道封禁用户</h2>
    </div>

    <div class="content-container">
      <!-- 搜索区域 -->
      <div class="search-section">
        <div class="search-form">
          <div class="form-item">
            <label class="form-label">频道号</label>
            <a-input v-model:value="searchForm.channelId" placeholder="请输入频道" style="width: 200px">
              <template #suffix>
                <span class="input-suffix">0/9</span>
              </template>
            </a-input>
          </div>
          <div class="form-item">
            <label class="form-label">用户ID</label>
            <a-input v-model:value="searchForm.userId" placeholder="请输入用户ID" style="width: 200px" />
          </div>
          <div class="form-item">
            <label class="form-label">用户昵称</label>
            <a-input v-model:value="searchForm.userNickname" placeholder="请输入用户昵称" style="width: 200px" />
          </div>
          <div class="form-item">
            <a-button type="primary" @click="handleSearch"> 搜索 </a-button>
          </div>
        </div>
      </div>

      <!-- 操作按钮区域 -->
      <div class="action-section">
        <div class="action-buttons">
          <a-button @click="handleBatchOperation"> 批量操作 </a-button>
          <a-button @click="handleExportList"> 导出列表 </a-button>
          <a-button type="primary" @click="handleAddBannedUser"> 添加封禁用户 </a-button>
        </div>
      </div>

      <!-- 数据表格 -->
      <div class="table-section">
        <a-table
          :dataSource="tableData"
          :columns="columns"
          :pagination="pagination"
          :loading="loading"
          :row-selection="rowSelection"
          row-key="id"
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <a-space>
                <a-button type="link" size="small" @click="handleUnban(record)"> 解封 </a-button>
                <a-button type="link" size="small" danger @click="handleDelete(record)"> 删除 </a-button>
              </a-space>
            </template>
            <template v-else-if="column.key === 'banMethod'">
              <a-tag v-if="record.banMethod === 'manual'" color="orange">手动封禁</a-tag>
              <a-tag v-else-if="record.banMethod === 'auto'" color="red">自动封禁</a-tag>
              <a-tag v-else color="blue">{{ record.banMethod }}</a-tag>
            </template>
            <template v-else-if="column.key === 'banTime'">
              {{ formatTime(record.banTime) }}
            </template>
          </template>
        </a-table>
      </div>

      <!-- 空状态 -->
      <div v-if="!loading && tableData.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg viewBox="0 0 64 64" width="64" height="64">
            <path
              fill="#f0f0f0"
              d="M32 2C15.432 2 2 15.432 2 32s13.432 30 30 30 30-13.432 30-30S48.568 2 32 2zm0 54C17.641 56 6 44.359 6 32S17.641 8 32 8s26 11.641 26 24-11.641 24-26 24z"
            />
            <path
              fill="#d9d9d9"
              d="M32 16c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zm0 28c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12z"
            />
          </svg>
        </div>
        <div class="empty-text">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { message, Modal } from "ant-design-vue";
import dayjs from "dayjs";
import { onMounted, reactive, ref } from "vue";

// 搜索表单
const searchForm = reactive({
  channelId: "",
  userId: "",
  userNickname: "",
});

// 表格数据
const tableData = ref<any[]>([]);
const loading = ref(false);
const selectedRowKeys = ref<string[]>([]);

// 表格列定义
const columns = [
  {
    title: "频道号",
    dataIndex: "channelId",
    key: "channelId",
    width: 120,
  },
  {
    title: "用户ID",
    dataIndex: "userId",
    key: "userId",
    width: 120,
  },
  {
    title: "用户昵称",
    dataIndex: "userNickname",
    key: "userNickname",
    width: 150,
  },
  {
    title: "封禁方式",
    dataIndex: "banMethod",
    key: "banMethod",
    width: 120,
  },
  {
    title: "封禁时间",
    dataIndex: "banTime",
    key: "banTime",
    width: 180,
  },
  {
    title: "操作",
    key: "action",
    width: 150,
    fixed: "right",
  },
];

// 行选择配置
const rowSelection = {
  selectedRowKeys: selectedRowKeys,
  onChange: (keys: string[]) => {
    selectedRowKeys.value = keys;
  },
  onSelectAll: (selected: boolean, selectedRows: any[], changeRows: any[]) => {
    console.log("onSelectAll", selected, selectedRows, changeRows);
  },
};

// 分页配置
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条`,
});

// 搜索处理
const handleSearch = () => {
  pagination.current = 1;
  loadData();
};

// 批量操作
const handleBatchOperation = () => {
  if (selectedRowKeys.value.length === 0) {
    message.warning("请选择要操作的数据");
    return;
  }
  message.info(`批量操作 ${selectedRowKeys.value.length} 条数据`);
};

// 导出列表
const handleExportList = () => {
  message.info("导出列表功能");
};

// 添加封禁用户
const handleAddBannedUser = () => {
  message.info("添加封禁用户功能");
};

// 解封用户
const handleUnban = (record: any) => {
  Modal.confirm({
    title: "确认解封",
    content: `确定要解封频道${record.channelId}的用户"${record.userNickname}"吗？`,
    onOk: () => {
      message.success("用户已解封");
      loadData();
    },
  });
};

// 删除用户
const handleDelete = (record: any) => {
  Modal.confirm({
    title: "确认删除",
    content: `确定要删除频道${record.channelId}的用户"${record.userNickname}"的封禁记录吗？`,
    onOk: () => {
      message.success("封禁记录已删除");
      loadData();
    },
  });
};

// 表格变化处理
const handleTableChange = (pag: any) => {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
  loadData();
};

// 格式化时间
const formatTime = (time: string) => {
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
};

// 加载数据
const loadData = async () => {
  loading.value = true;
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 500));

    // 模拟数据
    const mockData: any[] = [
      {
        id: "1",
        channelId: "3390220",
        userId: "U123456",
        userNickname: "张三",
        banMethod: "manual",
        banTime: "2025-10-15 10:30:00",
      },
      {
        id: "2",
        channelId: "3387148",
        userId: "U234567",
        userNickname: "李四",
        banMethod: "auto",
        banTime: "2025-10-16 14:20:00",
      },
      {
        id: "3",
        channelId: "3386428",
        userId: "U345678",
        userNickname: "王五",
        banMethod: "manual",
        banTime: "2025-10-17 09:15:00",
      },
      {
        id: "4",
        channelId: "3385843",
        userId: "U456789",
        userNickname: "赵六",
        banMethod: "auto",
        banTime: "2025-10-18 16:45:00",
      },
      {
        id: "5",
        channelId: "3385674",
        userId: "U567890",
        userNickname: "钱七",
        banMethod: "manual",
        banTime: "2025-10-19 11:30:00",
      },
      {
        id: "6",
        channelId: "3379988",
        userId: "U678901",
        userNickname: "孙八",
        banMethod: "auto",
        banTime: "2025-10-20 13:25:00",
      },
      {
        id: "7",
        channelId: "3365921",
        userId: "U789012",
        userNickname: "周九",
        banMethod: "manual",
        banTime: "2025-10-21 08:50:00",
      },
      {
        id: "8",
        channelId: "3365259",
        userId: "U890123",
        userNickname: "吴十",
        banMethod: "auto",
        banTime: "2025-10-22 15:10:00",
      },
      {
        id: "9",
        channelId: "3364223",
        userId: "U901234",
        userNickname: "郑十一",
        banMethod: "manual",
        banTime: "2025-10-23 12:40:00",
      },
      {
        id: "10",
        channelId: "3353683",
        userId: "U012345",
        userNickname: "陈十二",
        banMethod: "auto",
        banTime: "2025-10-24 17:20:00",
      },
      {
        id: "11",
        channelId: "3390220",
        userId: "U012345",
        userNickname: "陈十三",
        banMethod: "auto",
        banTime: "2025-10-24 17:20:00",
      },
      {
        id: "12",
        channelId: "3348835",
        userId: "U012345",
        userNickname: "陈十四",
        banMethod: "auto",
        banTime: "2025-10-24 17:20:00",
      },
    ];

    tableData.value = mockData;
    pagination.total = mockData.length;
  } catch (error) {
    message.error("加载数据失败");
  } finally {
    loading.value = false;
  }
};

// 初始化
onMounted(() => {
  loadData();
});
</script>

<style lang="less" scoped>
.channel-ban-users {
  padding: 20px;
  min-height: 100vh;

  .page-header {
    margin-bottom: 24px;

    .page-title {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin: 0;
    }
  }

  .content-container {
    border-radius: 8px;
  }

  .search-section {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f0f0f0;

    .search-form {
      display: flex;
      gap: 16px;
      align-items: center;
      flex-wrap: wrap;

      .form-item {
        display: flex;
        align-items: center;
        gap: 8px;

        .form-label {
          font-size: 14px;
          color: #333;
          white-space: nowrap;
        }

        .input-suffix {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }

  .action-section {
    margin-bottom: 24px;

    .action-buttons {
      display: flex;
      gap: 12px;

      .ant-btn {
        &:first-child {
          border-color: #1890ff;
          color: #1890ff;

          &:hover {
            background: #f0f8ff;
          }
        }

        &:nth-child(2) {
          border-color: #1890ff;
          color: #1890ff;

          &:hover {
            background: #f0f8ff;
          }
        }
      }
    }
  }

  .table-section {
    margin-bottom: 24px;

    .ant-table {
      .ant-table-thead > tr > th {
        background: #fafafa;
        font-weight: 600;
      }

      .ant-table-tbody > tr > td {
        vertical-align: middle;
      }
    }
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;

    .empty-icon {
      margin-bottom: 16px;
      opacity: 0.6;
    }

    .empty-text {
      font-size: 16px;
      color: #999;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .channel-ban-users {
    padding: 12px;

    .content-container {
      padding: 16px;
    }

    .search-section {
      .search-form {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;

        .form-item {
          flex-direction: column;
          align-items: stretch;
          gap: 4px;

          .form-label {
            align-self: flex-start;
          }
        }
      }
    }

    .action-section {
      .action-buttons {
        flex-direction: column;
        align-items: stretch;
      }
    }
  }
}
</style>
