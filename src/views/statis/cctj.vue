<template>
  <div class="live-room-statistics">
    <div class="page-header">
      <h2>场次统计</h2>
    </div>

    <!-- 搜索表单 -->
    <div class="search-form">
      <div class="form-row">
        <div class="form-item">
          <label>频道号</label>
          <a-input v-model:value="searchForm.channelId" placeholder="请输入频道号" style="width: 200px" />
        </div>

        <div class="form-item">
          <label>选择日期</label>
          <a-date-picker v-model:value="searchForm.date" style="width: 200px" />
        </div>

        <a-radio>不导出无数据直播间</a-radio>
        <a-button type="primary">搜索</a-button>
        <a-button>导出数据</a-button>
      </div>
    </div>
    <div class="no-data-tip">
      <div>1.直播结束后需一小时才可生成场次报表；</div>
      <div>2.研讨会频道下，需当场次开放了“对外直播”，此处方有数据。</div>
      <div>3.勾选"不导出无数据直播间"按钮后，导出的数据不含"直播观看人数=0"的数据。</div>
    </div>

    <!-- 数据表格 -->
    <div class="data-table">
      <a-table :dataSource="tableData" :columns="columns" :pagination="pagination" :loading="loading">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-button type="link" @click="handleView(record)">查看</a-button>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Dayjs } from "dayjs";
import { onMounted, reactive, ref } from "vue";

// 搜索表单数据
const searchForm = reactive({
  category: "",
  tag: "",
  channelId: "",
  creator: "",
  dataTimeType: "month" as "month" | "day" | "year",
  dataTime: null as Dayjs | null,
  createTimeType: "month" as "month" | "day" | "year",
  createTime: null as Dayjs | null,
  anchor: "",
});

// 表格相关数据
const loading = ref(false);
const tableData = ref([
  {
    id: 1,
    createTime: "2025-07-03 17:07",
    channelId: "6140608",
    channelName: "Spring 知识精讲",
    category: "默认分类",
    anchor: "-",
    visitCount: 5,
    viewCount: 2,
    viewDuration: "6分钟",
    viewerCount: "2人",
    maxOnlineCount: "2人",
  },
]);

// 表格列定义
const columns = [
  {
    title: "频道号",
    dataIndex: "createTime",
    key: "createTime",
    width: 140,
  },
  {
    title: "场次号",
    dataIndex: "channelId",
    key: "channelId",
    width: 100,
  },
  {
    title: "场次名称",
    dataIndex: "channelName",
    key: "channelName",
    width: 150,
  },
  {
    title: "直播分类",
    dataIndex: "category",
    key: "category",
    width: 100,
  },
  {
    title: "开始时间",
    dataIndex: "anchor",
    key: "anchor",
    width: 100,
  },
  {
    title: "开播时长",
    dataIndex: "visitCount",
    key: "visitCount",
    width: 100,
  },
  {
    title: "直播观看人数",
    dataIndex: "viewCount",
    key: "viewCount",
    width: 100,
  },
  {
    title: "直播观看总时长（分）",
    dataIndex: "viewDuration",
    key: "viewDuration",
    width: 100,
  },
  {
    title: "最高同时在线",
    dataIndex: "viewerCount",
    key: "viewerCount",
    width: 100,
  },
  {
    title: "回看时长（分）",
    dataIndex: "maxOnlineCount",
    key: "maxOnlineCount",
    width: 140,
  },
  {
    title: "回看人数",
    dataIndex: "maxOnlineCount",
    key: "maxOnlineCount",
    width: 140,
  },
  {
    title: "操作",
    key: "action",
    width: 80,
    fixed: "right",
  },
];

// 分页配置
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 1,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条记录`,
});

// 搜索处理
const handleSearch = () => {
  loading.value = true;
  console.log("搜索条件:", searchForm);

  // 模拟API调用
  setTimeout(() => {
    loading.value = false;
    // 这里可以调用实际的API
    fetchTableData();
  }, 1000);
};

// 查看详情
const handleView = (record: any) => {
  console.log("查看详情:", record);
  // 这里可以跳转到详情页面或打开详情弹窗
};

// 获取表格数据
const fetchTableData = async () => {
  try {
    // 模拟API调用
    // const response = await api.getLiveRoomStatistics(searchForm)
    // tableData.value = response.data
    // pagination.total = response.total
  } catch (error) {
    console.error("获取数据失败:", error);
  }
};

// 组件挂载时获取数据
onMounted(() => {
  fetchTableData();
});
</script>

<style scoped lang="less">
.live-room-statistics {
  padding: 20px;

  .page-header {
    margin-bottom: 20px;

    h2 {
      margin: 0;
      color: #333;
      font-size: 24px;
      font-weight: 500;
    }
  }

  .search-form {
    padding: 20px 0;
    margin-bottom: 20px;

    .form-row {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }

      .form-item {
        display: flex;
        align-items: center;
        gap: 10px;

        label {
          font-weight: 500;
          color: #333;
          white-space: nowrap;
          min-width: 80px;
        }

        .input-tip {
          font-size: 12px;
          color: #999;
          margin-left: 5px;
        }
      }

      .no-data-tip {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-left: auto;

        span {
          font-size: 14px;
          color: #666;
        }
      }
    }
  }

  .data-table {
    padding: 20p 0x;

    :deep(.ant-table) {
      .ant-table-thead > tr > th {
        background: #fafafa;
        font-weight: 500;
      }

      .ant-table-tbody > tr > td {
        padding: 12px 16px;
      }
    }
  }
}
.no-data-tip {
  font-size: 12px;
  color: #999;
  margin: 10px 0;
}
</style>
