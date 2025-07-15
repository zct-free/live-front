<template>
  <div class="banned-users">
    <div class="page-header">
      <h2 class="page-title">全平台封禁用户</h2>
    </div>

    <div class="content-container">
      <!-- 搜索区域 -->
      <div class="search-section">
        <div class="search-form">
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
        <div class="action-buttons">
          <a-button @click="handleAddBannedUser"> 添加封禁用户 </a-button>
          <a-button @click="handleExportList"> 导出列表 </a-button>
        </div>
      </div>

      <!-- 数据表格 -->
      <div class="table-section">
        <a-table
          :dataSource="tableData"
          :columns="columns"
          :pagination="pagination"
          :loading="loading"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { message, Modal } from "ant-design-vue";
import dayjs from "dayjs";
import { onMounted, reactive, ref } from "vue";

// 搜索表单
const searchForm = reactive({
  userId: "",
  userNickname: "",
});

// 表格数据
const tableData = ref<any[]>([]);
const loading = ref(false);

// 表格列定义
const columns = [
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

// 添加封禁用户
const handleAddBannedUser = () => {
  message.info("添加封禁用户功能");
};

// 导出列表
const handleExportList = () => {
  message.info("导出列表功能");
};

// 解封用户
const handleUnban = (record: any) => {
  Modal.confirm({
    title: "确认解封",
    content: `确定要解封用户"${record.userNickname}"吗？`,
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
    content: `确定要删除用户"${record.userNickname}"的封禁记录吗？`,
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
        userId: "U001234",
        userNickname: "违规用户001",
        banMethod: "manual",
        banTime: "2024-01-15 10:30:00",
      },
      {
        id: "2",
        userId: "U002345",
        userNickname: "恶意刷屏者",
        banMethod: "auto",
        banTime: "2024-01-16 14:20:00",
      },
      {
        id: "3",
        userId: "U003456",
        userNickname: "广告发布者",
        banMethod: "manual",
        banTime: "2024-01-17 09:15:00",
      },
      {
        id: "4",
        userId: "U004567",
        userNickname: "不当言论用户",
        banMethod: "auto",
        banTime: "2024-01-18 16:45:00",
      },
      {
        id: "5",
        userId: "U005678",
        userNickname: "骚扰他人用户",
        banMethod: "manual",
        banTime: "2024-01-19 11:30:00",
      },
      {
        id: "6",
        userId: "U006789",
        userNickname: "恶意捣乱者",
        banMethod: "auto",
        banTime: "2024-01-20 13:25:00",
      },
      {
        id: "7",
        userId: "U007890",
        userNickname: "违规直播用户",
        banMethod: "manual",
        banTime: "2024-01-21 08:50:00",
      },
      {
        id: "8",
        userId: "U008901",
        userNickname: "恶意举报者",
        banMethod: "auto",
        banTime: "2024-01-22 15:10:00",
      },
      {
        id: "9",
        userId: "U009012",
        userNickname: "色情内容发布者",
        banMethod: "manual",
        banTime: "2024-01-23 12:40:00",
      },
      {
        id: "10",
        userId: "U010123",
        userNickname: "暴力言论用户",
        banMethod: "auto",
        banTime: "2024-01-24 17:20:00",
      },
      {
        id: "11",
        userId: "U011234",
        userNickname: "恶意刷礼物者",
        banMethod: "manual",
        banTime: "2024-01-25 09:30:00",
      },
      {
        id: "12",
        userId: "U012345",
        userNickname: "盗版内容传播者",
        banMethod: "auto",
        banTime: "2024-01-26 14:50:00",
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
.banned-users {
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
    padding: 24px;
  }

  .search-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid #f0f0f0;

    .search-form {
      display: flex;
      gap: 16px;
      align-items: center;

      .form-item {
        display: flex;
        align-items: center;
        gap: 8px;

        .form-label {
          font-size: 14px;
          color: #333;
          white-space: nowrap;
        }
      }
    }

    .action-buttons {
      display: flex;
      gap: 12px;
    }
  }

  .table-section {
    margin-bottom: 24px;

    .ant-table {
      .ant-table-thead > tr > th {
        background: #fafafa;
        font-weight: 600;
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
  .banned-users {
    padding: 12px;

    .content-container {
      padding: 16px;
    }

    .search-section {
      flex-direction: column;
      gap: 16px;

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

      .action-buttons {
        justify-content: flex-start;
      }
    }
  }
}
</style>
