<template>
  <div class="live-room-statistics">
    <div class="page-header">
      <h2>直播间统计</h2>
    </div>

    <!-- 搜索表单 -->
    <div class="search-form">
      <div class="form-row">
        <div class="form-item">
          <label>直播分类</label>
          <a-select v-model:value="searchForm.category" placeholder="全部" style="width: 200px">
            <a-select-option value="">全部</a-select-option>
            <a-select-option value="entertainment">娱乐</a-select-option>
            <a-select-option value="education">教育</a-select-option>
            <a-select-option value="sports">体育</a-select-option>
            <a-select-option value="music">音乐</a-select-option>
          </a-select>
        </div>

        <div class="form-item">
          <label>直播标签</label>
          <a-select v-model:value="searchForm.tag" placeholder="全部" style="width: 200px">
            <a-select-option value="">全部</a-select-option>
            <a-select-option value="hot">热门</a-select-option>
            <a-select-option value="new">新人</a-select-option>
            <a-select-option value="recommend">推荐</a-select-option>
          </a-select>
        </div>

        <div class="form-item">
          <label>频道号</label>
          <a-input v-model:value="searchForm.channelId" placeholder="请输入频道号" style="width: 200px" />
          <span class="input-tip">0/9</span>
        </div>

        <a-button type="primary" style="margin-left: 20px">导出列表</a-button>
      </div>

      <div class="form-row">
        <div class="form-item">
          <label>创建人</label>
          <a-select v-model:value="searchForm.creator" placeholder="全部" style="width: 200px">
            <a-select-option value="">全部</a-select-option>
            <a-select-option value="admin">管理员</a-select-option>
            <a-select-option value="user">用户</a-select-option>
          </a-select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-item">
          <label>数据时间范围</label>
          <a-select v-model:value="searchForm.dataTimeType" style="width: 100px">
            <a-select-option value="month">按月</a-select-option>
            <a-select-option value="day">按日</a-select-option>
            <a-select-option value="year">按年</a-select-option>
          </a-select>
          <a-date-picker
            v-model:value="searchForm.dataTime"
            :picker="searchForm.dataTimeType"
            placeholder="请选择日期"
            style="width: 200px; margin-left: 10px"
          />
        </div>

        <div class="form-item">
          <label>创建时间</label>
          <a-select v-model:value="searchForm.createTimeType" style="width: 100px">
            <a-select-option value="month">按月</a-select-option>
            <a-select-option value="day">按日</a-select-option>
            <a-select-option value="year">按年</a-select-option>
          </a-select>
          <a-date-picker
            v-model:value="searchForm.createTime"
            :picker="searchForm.createTimeType"
            placeholder="请选择日期"
            style="width: 200px; margin-left: 10px"
          />
        </div>

        <div class="no-data-tip">
          <span>不导出无数据直播间</span>
          <a-tooltip title="勾选后将不会导出没有观看数据的直播间">
            <question-circle-outlined />
          </a-tooltip>
        </div>
      </div>

      <div class="form-row">
        <div class="form-item">
          <label>频道号</label>
          <a-input v-model:value="searchForm.anchor" placeholder="请输入频道号名称" style="width: 200px" />
        </div>
        <a-button type="primary" @click="handleSearch">搜索</a-button>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="data-table">
      <a-table :dataSource="tableData" :columns="columns" :pagination="pagination" :loading="loading" @change="handleTableChange">
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
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
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

const handleTableChange = (pag: any) => {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
};

// 表格相关数据
const loading = ref(false);
const tableData = ref([
  {
    id: 1,
    createTime: "2025-07-03 17:07",
    channelId: "6140608",
    channelName: "Spring 知识精讲",
    category: "默认分类",
    anchor: "张三",
    visitCount: 10,
    viewCount: 5,
    viewDuration: "10分钟",
    viewerCount: "10人",
    maxOnlineCount: "5人",
  },
    {
    id: 2,
    createTime: "2025-07-03 17:07",
    channelId: "6140609",
    channelName: "Java 进阶实战",
    category: "默认分类",
    anchor: "张三",
    visitCount: 50,
    viewCount: 12,
    viewDuration: "20分钟",
    viewerCount: "150人",
    maxOnlineCount: "22人",
  },
    {
    id: 3,
    createTime: "2025-07-03 17:07",
    channelId: "6140610",
    channelName: "前端 Vue3 精讲",
    category: "默认分类",
    anchor: "张三",
    visitCount: 5,
    viewCount: 2,
    viewDuration: "6分钟",
    viewerCount: "20人",
    maxOnlineCount: "12人",
  },
    {
    id: 4,
    createTime: "2025-07-03 17:07",
    channelId: "6140611",
    channelName: "美食烹饪技巧",
    category: "默认分类",
    anchor: "张三",
    visitCount: 5,
    viewCount: 12,
    viewDuration: "6分钟",
    viewerCount: "20人",
    maxOnlineCount: "20人",
  },
    {
    id: 5,
    createTime: "2025-07-03 17:07",
    channelId: "6140612",
    channelName: "健身塑形指南",
    category: "默认分类",
    anchor: "张三",
    visitCount: 2,
    viewCount: 3,
    viewDuration: "10分钟",
    viewerCount: "5人",
    maxOnlineCount: "7人",
  },
    {
    id: 6,
    createTime: "2025-07-03 17:07",
    channelId: "6140613",
    channelName: "摄影构图教学",
    category: "默认分类",
    anchor: "张三",
    visitCount: 15,
    viewCount: 12,
    viewDuration: "9分钟",
    viewerCount: "20人",
    maxOnlineCount: "22人",
  },
    {
    id: 7,
    createTime: "2025-07-03 17:07",
    channelId: "6140614",
    channelName: "职场沟通技巧",
    category: "默认分类",
    anchor: "张三",
    visitCount: 5,
    viewCount: 12,
    viewDuration: "8分钟",
    viewerCount: "20人",
    maxOnlineCount: "20人",
  },
    {
    id: 8,
    createTime: "2025-07-03 17:07",
    channelId: "6140615",
    channelName: "亲子教育分享",
    category: "默认分类",
    anchor: "张三",
    visitCount: 5,
    viewCount: 12,
    viewDuration: "60分钟",
    viewerCount: "12人",
    maxOnlineCount: "20人",
  },
    {
    id: 9,
    createTime: "2025-07-03 17:07",
    channelId: "6140616",
    channelName: "户外徒步攻略",
    category: "默认分类",
    anchor: "张三",
    visitCount: 15,
    viewCount: 12,
    viewDuration: "15分钟",
    viewerCount: "20人",
    maxOnlineCount: "12人",
  },
    {
    id: 10,
    createTime: "2025-07-03 17:07",
    channelId: "6140617",
    channelName: "书法入门教程",
    category: "默认分类",
    anchor: "张三",
    visitCount: 15,
    viewCount: 12,
    viewDuration: "60分钟",
    viewerCount: "50人",
    maxOnlineCount: "20人",
  },
    {
    id: 11,
    createTime: "2025-07-03 17:07",
    channelId: "6140618",
    channelName: "宠物养护知识",
    category: "默认分类",
    anchor: "张三",
    visitCount: 5,
    viewCount: 2,
    viewDuration: "12分钟",
    viewerCount: "2人",
    maxOnlineCount: "2人",
  },
    {
    id: 12,
    createTime: "2025-07-03 17:07",
    channelId: "6140619",
    channelName: "理财投资入门",
    category: "默认分类",
    anchor: "张三",
    visitCount: 5,
    viewCount: 2,
    viewDuration: "60分钟",
    viewerCount: "2人",
    maxOnlineCount: "2人",
  },

]);

// 表格列定义
const columns = [
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
    width: 140,
  },
  {
    title: "频道号",
    dataIndex: "channelId",
    key: "channelId",
    width: 100,
  },
  {
    title: "频道名称",
    dataIndex: "channelName",
    key: "channelName",
    width: 150,
  },
  {
    title: "频道分类",
    dataIndex: "category",
    key: "category",
    width: 100,
  },
  {
    title: "频道主播",
    dataIndex: "anchor",
    key: "anchor",
    width: 100,
  },
  {
    title: "访问人数",
    dataIndex: "visitCount",
    key: "visitCount",
    width: 100,
  },
  {
    title: "观看次数",
    dataIndex: "viewCount",
    key: "viewCount",
    width: 100,
  },
  {
    title: "观看时长",
    dataIndex: "viewDuration",
    key: "viewDuration",
    width: 100,
  },
  {
    title: "观看人数",
    dataIndex: "viewerCount",
    key: "viewerCount",
    width: 100,
  },
  {
    title: "最高同时在线人数",
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
    padding: 20px;
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
    padding: 20px;

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
</style>
