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
    channelNumber: "001",
    channelId: "6140608",
    channelName: "Spring 知识精讲",
    category: "教育",
    beginTime: "2025-09-26 17:26:19",
    visitCount: 50,
    viewCount: 2,
    viewDuration: "6分钟",
    viewerCount: "2人",
    maxOnlineCount: "2人",
  }, {
    id: 2,
    channelNumber: "002",
    channelId: "6140609",
    channelName: "MySQL 性能优化实战",
    category: "教育",
    beginTime: "2025-09-26 17:26:19",
    visitCount: 280,
    viewCount: 16,
    viewDuration: "23分钟",
    viewerCount: "14人",
    maxOnlineCount: "9人",
  },
  {
    id: 3,
    channelNumber: "003",
    channelId: "6140610",
    channelName: "React 组件设计模式",
    category: "教育",
    beginTime: "2025-09-26 17:26:19",
    visitCount: 402,
    viewCount: 31,
    viewDuration: "45分钟",
    viewerCount: "28人",
    maxOnlineCount: "18人",
  },
  {
    id: 4,
    channelNumber: "004",
    channelId: "6140611",
    channelName: "Docker 容器化部署",
    category: "教育",
    beginTime: "2025-09-26 17:26:19",
    visitCount: 190,
    viewCount: 12,
    viewDuration: "18分钟",
    viewerCount: "10人",
    maxOnlineCount: "7人",
  },
  {
    id: 5,
    channelNumber: "005",
    channelId: "6140612",
    channelName: "Java 并发编程深度解析",
    category: "教育",
    beginTime: "2025-09-26 17:26:19",
    visitCount: 350,
    viewCount: 24,
    viewDuration: "32分钟",
    viewerCount: "21人",
    maxOnlineCount: "15人",
  },
  {
    id: 6,
    channelNumber: "006",
    channelId: "6140613",
    channelName: "Vue3 组合式API实践",
    category: "教育",
    beginTime: "2025-09-26 17:26:19",
    visitCount: 270,
    viewCount: 19,
    viewDuration: "25分钟",
    viewerCount: "16人",
    maxOnlineCount: "11人",
  },
  {
    id: 7,
    channelNumber: "007",
    channelId: "6140614",
    channelName: "Redis 缓存策略设计",
    category: "教育",
    beginTime: "2025-09-26 17:26:19",
    visitCount: 220,
    viewCount: 15,
    viewDuration: "20分钟",
    viewerCount: "13人",
    maxOnlineCount: "8人",
  },
  {
    id: 8,
    channelNumber: "008",
    channelId: "6140615",
    channelName: "Kubernetes 集群管理",
    category: "教育",
    beginTime: "2025-09-26 17:26:19",
    visitCount: 160,
    viewCount: 9,
    viewDuration: "14分钟",
    viewerCount: "8人",
    maxOnlineCount: "5人",
  },
  {
    id: 9,
    channelNumber: "009",
    channelId: "6140616",
    channelName: "Python 数据分析入门",
    category: "教育",
    beginTime: "2025-09-26 17:26:19",
    visitCount: 380,
    viewCount: 29,
    viewDuration: "38分钟",
    viewerCount: "25人",
    maxOnlineCount: "17人",
  },
  {
    id: 10,
    channelNumber: "010",
    channelId: "6140617",
    channelName: "微服务架构设计与实践",
    category: "教育",
    beginTime: "2025-09-26 17:26:19",
    visitCount: 450,
    viewCount: 33,
    viewDuration: "42分钟",
    viewerCount: "30人",
    maxOnlineCount: "22人",
  },
  {
    id: 11,
    channelNumber: "011",
    channelId: "6140618",
    channelName: "TypeScript 类型系统详解",
    category: "教育",
    beginTime: "2025-09-26 17:26:19",
    visitCount: 240,
    viewCount: 17,
    viewDuration: "22分钟",
    viewerCount: "14人",
    maxOnlineCount: "9人",
  },
  {
    id: 12,
    channelNumber: "012",
    channelId: "6140619",
    channelName: "Elasticsearch 搜索引擎搭建",
    category: "教育",
    beginTime: "2025-09-26 17:26:19",
    visitCount: 210,
    viewCount: 13,
    viewDuration: "16分钟",
    viewerCount: "11人",
    maxOnlineCount: "6人",
  },
]);

// 表格列定义
const columns = [
  {
    title: "频道号",
    dataIndex: "channelNumber",
    key: "channelNumber",
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
    dataIndex: "beginTime",
    key: "beginTime",
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
  total: tableData.value.length,
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
