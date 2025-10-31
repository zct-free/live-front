<template>
  <div class="user-statistics">
    <div class="page-header">
      <h2>用户统计</h2>
    </div>

    <div class="search-form">
      <a-form :form="searchForm" layout="inline" :colon="false">
        <a-form-item label="">
          <a-input v-model:value="searchForm.userId" placeholder="请输入用户ID" style="width: 200px" />
        </a-form-item>

        <a-form-item label="">
          <a-date-picker v-model:value="searchForm.date" style="width: 200px" />
        </a-form-item>

        <a-form-item>
          <a-space>
            <a-button type="primary">搜索</a-button>
            <a-button>导出数据</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>

    <!-- 数据表格 -->
    <div class="data-table">
      <a-table :dataSource="tableData" :columns="columns" :loading="loading" :pagination="pagination" @change="handleTableChange">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-button type="link">查看</a-button>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Dayjs } from "dayjs";
import { reactive, ref } from "vue";

const handleTableChange = (pag: any) => {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
};

const searchForm = reactive({
  userId: "",
  date: null as Dayjs | null,
});
const loading = ref(false);
const columns = [
  { title: "用户ID", dataIndex: "userId", key: "userId" },
  { title: "用户昵称", dataIndex: "username", key: "username" },
  { title: "观看次数", dataIndex: "viewCount", key: "viewCount" },
  { title: "观看总时长", dataIndex: "viewDuration", key: "viewDuration" },
  { title: "平均观看时长", dataIndex: "viewDuration", key: "viewDuration" },
  { title: "操作", key: "action", scopedSlots: { customRender: "action" } },
];
const tableData = ref([
  {
    userId: "123456",
    username: "用户A",
    viewCount: 10,
    viewDuration: 120,
  },
  {
    userId: "789012",
    username: "用户B",
    viewCount: 5,
    viewDuration: 60,
  },
    {
    userId: "789013",
    username: "张三",
    viewCount: 10,
    viewDuration: 80,
  },
    {
    userId: "789014",
    username: "李四",
    viewCount: 6,
    viewDuration: 70,
  },
    {
    userId: "789014",
    username: "王五",
    viewCount: 8,
    viewDuration: 90,
  },
    {
    userId: "789015",
    username: "赵六",
    viewCount: 5,
    viewDuration: 50,
  },
    {
    userId: "789016",
    username: "孙七",
    viewCount: 9,
    viewDuration: 100,
  },
    {
    userId: "789017",
    username: "小李",
    viewCount: 3,
    viewDuration: 60,
  },
    {
    userId: "789018",
    username: "小孙",
    viewCount: 5,
    viewDuration: 60,
  },
    {
    userId: "789019",
    username: "小花",
    viewCount: 4,
    viewDuration: 60,
  },
    {
    userId: "789022",
    username: "用户B",
    viewCount: 5,
    viewDuration: 60,
  },
    {
    userId: "789010",
    username: "李华",
    viewCount: 5,
    viewDuration: 60,
  },
]);

// 分页配置
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: tableData.value.length,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条记录`,
});
</script>
<style scoped lang="less">
.user-statistics {
  padding: 24px;
}

.page-header {
  margin-bottom: 16px;
}

.search-form {
  margin-bottom: 24px;
}

.data-table {
  margin-top: 24px;
}

</style>
