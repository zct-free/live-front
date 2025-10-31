<template>
  <div class="platform-statistics-container">
    <!-- 平台统计模块（原有代码不变） -->
    <div class="page-header">
      <h2>平台统计</h2>
    </div>
    <!-- 搜索区域 -->
    <div class="search-section">
      <div class="search-form">
        <div class="form-item">
          <label>选择日期</label>
          <a-range-picker
            v-model:value="dateRange"
            :placeholder="['开始时间', '结束时间']"
            format="YYYY-MM-DD"
            style="width: 280px"
          />
        </div>
        <div class="form-item">
          <label>直播分类</label>
          <a-select v-model:value="selectedCategory" placeholder="全部" style="width: 150px">
            <a-select-option value="">全部</a-select-option>
            <a-select-option value="entertainment">娱乐</a-select-option>
            <a-select-option value="education">教育</a-select-option>
            <a-select-option value="sports">体育</a-select-option>
            <a-select-option value="music">音乐</a-select-option>
          </a-select>
        </div>
        <a-button type="primary" @click="handleSearch">搜索</a-button>
      </div>
    </div>
    <!-- 统计卡片区域 -->
    <div class="statistics-cards">
      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-title">观看次数</span>
          <a-tooltip title="统计期间内的总观看次数">
            <question-circle-outlined class="info-icon" />
          </a-tooltip>
        </div>
        <div class="stat-value">{{ statisticsData.viewCount }} <span class="stat-unit">次</span></div>
      </div>
      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-title">观看时长</span>
          <a-tooltip title="统计期间内的总观看时长">
            <question-circle-outlined class="info-icon" />
          </a-tooltip>
        </div>
        <div class="stat-value">
          {{ statisticsData.viewDuration }}
          <span class="stat-unit">分钟</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-title">观看人数</span>
          <a-tooltip title="统计期间内的观看人数">
            <question-circle-outlined class="info-icon" />
          </a-tooltip>
        </div>
        <div class="stat-value">
          {{ statisticsData.viewerCount }}
          <span class="stat-unit">人</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-title">人均观看时长</span>
        </div>
        <div class="stat-value">
          {{ statisticsData.avgViewDuration }}
          <span class="stat-unit">分钟</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-title">人均观看次数</span>
        </div>
        <div class="stat-value">
          {{ statisticsData.avgViewCount }}
          <span class="stat-unit">次</span>
        </div>
      </div>
    </div>
    <!-- 平台统计标签页（原有代码不变） -->
    <a-tabs>
      <a-tab-pane key="11" tab="日期汇总">
        <a-radio-group v-model:value="rqhz" button-style="solid">
          <a-radio-button value="a">列表</a-radio-button>
          <a-radio-button value="b">图表</a-radio-button>
        </a-radio-group>
        <div class="search-options">
          <div>
            <label>选择日期</label>
            <a-range-picker
              v-model:value="dateRange"
              :placeholder="['开始时间', '结束时间']"
              format="YYYY-MM-DD"
              style="width: 280px"
            />
            <a-button type="primary" @click="handleSearch">搜索</a-button>
          </div>
          <a-button>导出列表</a-button>
        </div>
        <a-table
          :dataSource="[
            { date: '2025-10-14', viewDuration: '6000分钟', viewCount: '2000次', viewerCount: '200人', avgViewDuration: '30分钟', avgViewCount: '10次' },
            { date: '2025-10-15', viewDuration: '24000分钟', viewCount: '3000次', viewerCount: '300人', avgViewDuration: '40分钟', avgViewCount: '10次' },
            { date: '2025-10-16', viewDuration: '20000分钟', viewCount: '8000次', viewerCount: '400人', avgViewDuration: '50分钟', avgViewCount: '20次' },
            { date: '2025-10-17', viewDuration: '9000分钟', viewCount: '3000次', viewerCount: '300人', avgViewDuration: '30分钟', avgViewCount: '10次' },
            { date: '2025-10-18', viewDuration: '30000分钟', viewCount: '1000次', viewerCount: '500人', avgViewDuration: '60分钟', avgViewCount: '20次' },
            { date: '2025-10-19', viewDuration: '6000分钟', viewCount: '2000', viewerCount: '200人', avgViewDuration: '30分钟', avgViewCount: '10次' },
            { date: '2025-10-20', viewDuration: '16000分钟', viewCount: '4000次', viewerCount: '400人', avgViewDuration: '40分钟', avgViewCount: '10次' },
            { date: '2025-10-21', viewDuration: '25000分钟', viewCount: '1000次', viewerCount: '500人', avgViewDuration: '50分钟', avgViewCount: '20次' },
            { date: '2025-10-22', viewDuration: '9000分钟', viewCount: '3000次', viewerCount: '300人', avgViewDuration: '30分钟', avgViewCount: '10次' },
            { date: '2025-10-23', viewDuration: '16000分钟', viewCount: '4000次', viewerCount: '400人', avgViewDuration: '40分钟', avgViewCount: '10次' },
            { date: '2025-10-24', viewDuration: '25000分钟', viewCount: '1000次', viewerCount: '500人', avgViewDuration: '50分钟', avgViewCount: '20次' }
          ]"
          :pagination="false"
          rowKey="date"
          bordered
        >
          <a-table-column title="日期" dataIndex="date" key="date" />
          <a-table-column title="观看时长" dataIndex="viewDuration" key="viewDuration" />
          <a-table-column title="观看次数" dataIndex="viewCount" key="viewCount" />
          <a-table-column title="观看人数" dataIndex="viewerCount" key="viewerCount" />
          <a-table-column title="人均观看时长" dataIndex="avgViewDuration" key="avgViewDuration" />
          <a-table-column title="人均观看次数" dataIndex="avgViewCount" key="avgViewCount" />
        </a-table>
      </a-tab-pane>

      <a-tab-pane key="3" tab="地域分布">
        <a-radio-group v-model:value="rqhz" button-style="solid">
          <a-radio-button value="a">中国地区</a-radio-button>
          <a-radio-button value="b">全区分布</a-radio-button>
        </a-radio-group>
        <div class="search-options">
          <div>
            <label>选择日期</label>
            <a-range-picker
              v-model:value="dateRange"
              :placeholder="['开始时间', '结束时间']"
              format="YYYY-MM-DD"
              style="width: 280px"
            />
            <a-button type="primary" @click="handleSearch">搜索</a-button>
          </div>
          <a-button>导出列表</a-button>
        </div>
        <div style="display: flex; gap: 40px; align-items: flex-start">
          <div style="flex: 1; display: flex; flex-direction: column; align-items: center">
            <img src="@/assets/images/ditu.png" alt="" style="width: 700px; height: 400px" />
          </div>
          <div style="flex: 1.2">
            <a-table
              :dataSource="[
                { terminal: '湖北', viewCount: 100, percent: '50%' },
                { terminal: '广东', viewCount: 50, percent: '25%' },
                { terminal: '浙江', viewCount: 50, percent: '25%' }
              ]"
              :pagination="false"
              rowKey="terminal"
              bordered
              size="small"
              style="background: #f9fafd"
            >
              <a-table-column title="省份直辖市" dataIndex="terminal" key="terminal" />
              <a-table-column title="观看次数" dataIndex="viewCount" key="viewCount" />
              <a-table-column title="占比" dataIndex="percent" key="percent" />
            </a-table>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="4" tab="最高在线人数">
        <div class="search-options">
          <div>
            <label>选择日期</label>
            <a-range-picker
              v-model:value="dateRange"
              :placeholder="['开始时间', '结束时间']"
              format="YYYY-MM-DD"
              style="width: 280px"
            />
            <a-button type="primary" @click="handleSearch">搜索</a-button>
          </div>
          <a-button>导出列表</a-button>
        </div>
        <div style="display: flex; gap: 40px; align-items: flex-start">
          <div style="flex: 1; display: flex; flex-direction: column; align-items: center">
            <div style="margin-bottom: 16px">
              <span style="font-size: 16px">
                (2025-07-14) 最高在线人数为：<span style="color: #6495fa; font-weight: bold">2</span>
              </span>
            </div>
            <svg width="600" height="300" viewBox="0 0 600 300" style="background: #fff">
              <line x1="50" y1="50" x2="50" y2="250" stroke="#eee" stroke-width="2" />
              <line x1="50" y1="250" x2="550" y2="250" stroke="#eee" stroke-width="2" />
              <text x="20" y="255" font-size="14" fill="#888">0</text>
              <text x="20" y="205" font-size="14" fill="#888">0.5</text>
              <text x="20" y="155" font-size="14" fill="#888">1</text>
              <text x="20" y="105" font-size="14" fill="#888">1.5</text>
              <text x="20" y="55" font-size="14" fill="#888">2</text>
              <circle cx="300" cy="50" r="3" fill="#6495fa" />
              <polyline points="300,50 300,250" fill="none" stroke="#6495fa" stroke-width="2" />
              <text x="0" y="30" font-size="14" fill="#888" transform="rotate(-90 15,150)">人数</text>
            </svg>
          </div>
          <div style="flex: 1.2">
            <a-table
              :dataSource="[
                { channel: '3390220', viewerCount: 2 },
                { channel: '3387148', viewerCount: 5 },
                { channel: '3386428', viewerCount: 8 }
              ]"
              :pagination="false"
              rowKey="channel"
              bordered
              size="small"
              style="background: #f9fafd"
            >
              <a-table-column title="频道号" dataIndex="channel" key="channel" />
              <a-table-column title="观看人数" dataIndex="viewerCount" key="viewerCount" />
            </a-table>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>

    <!-- 互动统计模块 -->
    <div class="page-header">
      <h2>互动统计</h2>
    </div>
    <a-tabs>
      <!-- 1. 报名观看记录 -->
      <a-tab-pane tab="报名观看记录" key="1">
        <div class="data-table">
          <a-table
            :dataSource="registrationTableData"
            :columns="registrationColumns"
            :pagination="registrationPagination"
            :loading="registrationLoading"
            rowKey="id"
            @change="handleTableChange"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'action'">
                <a-button type="link" @click="handleRegistrationView(record)">查看</a-button>
              </template>
            </template>
          </a-table>
        </div>
      </a-tab-pane>

      <!-- 2. 登记观看记录（修改后，与问题2对齐） -->
      <a-tab-pane tab="登记观看记录" key="2">
        <div class="data-table">
          <a-table
            :dataSource="recordTableData"
            :columns="recordColumns"
            :pagination="recordPagination"
            :loading="recordLoading"
            rowKey="id"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'action'">
                <a-button type="link" @click="handleRecordView(record)">详情</a-button>
              </template>
            </template>
          </a-table>
        </div>
      </a-tab-pane>

      <!-- 3. 预约观看记录（修改后，与问题2对齐） -->
      <a-tab-pane tab="预约观看记录" key="3">
        <a-radio-group style="margin: 10px 0" v-model:value="rqhz2" button-style="solid">
          <a-radio-button value="a">微信预约</a-radio-button>
          <a-radio-button value="b">短信预约</a-radio-button>
        </a-radio-group>
        <div class="data-table">
          <a-table
            :dataSource="reservationTableData"
            :columns="reservationColumns"
            :pagination="reservationPagination"
            :loading="reservationLoading"
            rowKey="id"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'action'">
                <a-button type="link" @click="handleReservationExport(record)">导出</a-button>
              </template>
            </template>
          </a-table>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import type { Dayjs } from "dayjs";
import { onMounted, reactive, ref } from "vue";

// ---------------------- 原有平台统计相关数据（不变） ----------------------
const dateRange = ref<[Dayjs, Dayjs] | null>(null);
const selectedCategory = ref<string>("");
const rqhz = ref("a");
const rqhz2 = ref("a");
const statisticsData = reactive({
  viewCount: 32000,
  viewDuration: 186000,
  viewerCount: 3900,
  avgViewDuration: 47,
  avgViewCount: 8,
});
const handleTableChange = (pag: any) => {
  registrationPagination.current = pag.current;
  registrationPagination.pageSize = pag.pageSize;
};
const handleSearch = () => {
  console.log("搜索条件:", { dateRange: dateRange.value, category: selectedCategory.value });
  fetchStatistics();
};
const fetchStatistics = async () => {
  try {
    Object.assign(statisticsData, { viewCount: 32000, viewDuration: 186000, viewerCount: 3900, avgViewDuration: 47, avgViewCount: 8 });
  } catch (error) {
    console.error("获取统计数据失败:", error);
  }
};
onMounted(() => {
  fetchStatistics();
});

// ---------------------- 1. 报名观看记录（修改后） ----------------------
// 表格数据：补充id、createTime，channel→channelId
const registrationTableData = ref([
 { id: 1, createTime: "2025-10-30 10:00", channelId: "3390220", channelName: "音乐", viewerCount: "120人", registrationCount: "300人" },
  { id: 2, createTime: "2025-10-30 10:30", channelId: "3387148", channelName: "原创", viewerCount: "89人", registrationCount: "100人" },
  { id: 3, createTime: "2025-10-30 11:00", channelId: "3386428", channelName: "游戏", viewerCount: "205人", registrationCount: "300人" },
  { id: 4, createTime: "2025-10-30 11:30", channelId: "3385843", channelName: "教育", viewerCount: "310人", registrationCount: "500人" },
  { id: 5, createTime: "2025-10-30 14:00", channelId: "3385674", channelName: "社会课堂", viewerCount: "420人", registrationCount: "500人" },
  { id: 6, createTime: "2025-10-30 14:30", channelId: "3379988", channelName: "中秋直播", viewerCount: "78人", registrationCount: "150人" },
  { id: 7, createTime: "2025-10-30 15:00", channelId: "3365921", channelName: "游戏", viewerCount: "156人", registrationCount: "180人" },
  { id: 8, createTime: "2025-10-30 15:30", channelId: "3365259", channelName: "原创舞蹈", viewerCount: "92人", registrationCount: "150人" },
  { id: 9, createTime: "2025-10-30 16:00", channelId: "3364223", channelName: "原创时尚", viewerCount: "189人", registrationCount: "210人" },
  { id: 10, createTime: "2025-10-30 16:30", channelId: "3353683", channelName: "原创", viewerCount: "135人", registrationCount: "160人" },
  { id: 11, createTime: "2025-10-30 17:00", channelId: "3349723", channelName: "教育", viewerCount: "68人", registrationCount: "120人" },
  { id: 12, createTime: "2025-10-30 17:30", channelId: "3348835", channelName: "电影", viewerCount: "105人", registrationCount: "190人" }
]);
// 表格列：新增创建时间，操作列用bodyCell
const registrationColumns = [
  { title: "创建时间", dataIndex: "createTime", key: "createTime", width: 140 },
  { title: "频道号", dataIndex: "channelId", key: "channelId", width: 100 },
  { title: "频道名称", dataIndex: "channelName", key: "channelName", width: 150 },
  { title: "报名人数", dataIndex: "registrationCount", key: "registrationCount", width: 100 },
  { title: "观看人数", dataIndex: "viewerCount", key: "viewerCount", width: 100 },
  { title: "操作", key: "action", width: 80, fixed: "right" }
];
// 分页配置
const registrationPagination = reactive({
  current: 1,
  pageSize: 10,
  total: registrationTableData.value.length,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条记录`
});
// 加载状态
const registrationLoading = ref(false);
// 查看事件
const handleRegistrationView = (record: any) => {
  console.log("查看报名详情:", record);
};

// ---------------------- 2. 登记观看记录（修改后） ----------------------
// 表格数据：补充id、createTime，channel→channelId，latestRecordTime保留
const recordTableData = ref([
 { id: 1, createTime: "2025-10-03 09:00", latestRecordTime: "2025-10-28 09:15", channelId: "3390220", channelName: "音乐", registrationCount: "120人" },
  { id: 2, createTime: "2025-10-03 09:30", latestRecordTime: "2025-10-28 10:30", channelId: "3387148", channelName: "原创", registrationCount: "89人" },
  { id: 3, createTime: "2025-10-03 10:00", latestRecordTime: "2025-10-28 11:45", channelId: "3386428", channelName: "游戏", registrationCount: "205人" },
  { id: 4, createTime: "2025-10-03 10:30", latestRecordTime: "2025-10-28 13:00", channelId: "3385843", channelName: "教育", registrationCount: "310人" },
  { id: 5, createTime: "2025-10-03 11:00", latestRecordTime: "2025-10-28 14:20", channelId: "3385674", channelName: "社会课堂", registrationCount: "420人" },
  { id: 6, createTime: "2025-10-03 11:30", latestRecordTime: "2025-10-28 15:10", channelId: "3379988", channelName: "中秋直播", registrationCount: "78人" },
  { id: 7, createTime: "2025-10-03 14:00", latestRecordTime: "2025-10-28 16:30", channelId: "3365921", channelName: "游戏", registrationCount: "156人" },
  { id: 8, createTime: "2025-10-03 14:30", latestRecordTime: "2025-10-28 17:45", channelId: "3365259", channelName: "原创舞蹈", registrationCount: "92人" },
  { id: 9, createTime: "2025-10-03 15:00", latestRecordTime: "2025-10-28 18:20", channelId: "3364223", channelName: "原创时尚", registrationCount: "189人" },
  { id: 10, createTime: "2025-10-03 15:30", latestRecordTime: "2025-10-28 19:50", channelId: "3353683", channelName: "原创", registrationCount: "135人" },
  { id: 11, createTime: "2025-10-03 16:00", latestRecordTime: "2025-10-28 20:10", channelId: "3349723", channelName: "教育", registrationCount: "68人" },
  { id: 12, createTime: "2025-10-03 16:30", latestRecordTime: "2025-10-28 20:30", channelId: "3348835", channelName: "电影", registrationCount: "105人" }
]);
// 表格列：保留最新记录时间，新增创建时间，操作列用bodyCell
const recordColumns = [
  { title: "创建时间", dataIndex: "createTime", key: "createTime", width: 140 },
  { title: "最新记录时间", dataIndex: "latestRecordTime", key: "latestRecordTime", width: 160 },
  { title: "频道号", dataIndex: "channelId", key: "channelId", width: 100 },
  { title: "频道名称", dataIndex: "channelName", key: "channelName", width: 150 },
  { title: "登记人数", dataIndex: "registrationCount", key: "registrationCount", width: 100 },
  { title: "操作", key: "action", width: 80, fixed: "right" }
];
// 分页配置
const recordPagination = reactive({
  current: 1,
  pageSize: 10,
  total: recordTableData.value.length,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条记录`
});
// 加载状态
const recordLoading = ref(false);
// 详情事件
const handleRecordView = (record: any) => {
  console.log("查看登记详情:", record);
};

// ---------------------- 3. 预约观看记录（修改后） ----------------------
// 表格数据：补充id、createTime，channel→channelId
const reservationTableData = ref([
 { id: 1, createTime: "2025-10-03 08:00", channelId: "3390220", channelName: "音乐", reservationCount: "180人" },
  { id: 2, createTime: "2025-10-03 08:30", channelId: "3387148", channelName: "原创", reservationCount: "150人" },
  { id: 3, createTime: "2025-10-03 09:00", channelId: "3386428", channelName: "游戏", reservationCount: "220人" },
  { id: 4, createTime: "2025-10-03 09:30", channelId: "3385843", channelName: "教育", reservationCount: "380人" },
  { id: 5, createTime: "2025-10-03 10:00", channelId: "3385674", channelName: "社会课堂", reservationCount: "450人" },
  { id: 6, createTime: "2025-10-03 10:30", channelId: "3379988", channelName: "中秋直播", reservationCount: "120人" },
  { id: 7, createTime: "2025-10-03 11:00", channelId: "3365921", channelName: "游戏", reservationCount: "210人" },
  { id: 8, createTime: "2025-10-03 11:30", channelId: "3365259", channelName: "原创舞蹈", reservationCount: "160人" },
  { id: 9, createTime: "2025-10-03 14:00", channelId: "3364223", channelName: "原创时尚", reservationCount: "250人" },
  { id: 10, createTime: "2025-10-03 14:30", channelId: "3353683", channelName: "原创", reservationCount: "190人" },
  { id: 11, createTime: "2025-10-03 15:00", channelId: "3349723", channelName: "教育", reservationCount: "95人" },
  { id: 12, createTime: "2025-10-03 15:30", channelId: "3348835", channelName: "电影", reservationCount: "140人" }
]);
// 表格列：新增创建时间，操作列用bodyCell
const reservationColumns = [
  { title: "创建时间", dataIndex: "createTime", key: "createTime", width: 140 },
  { title: "频道号", dataIndex: "channelId", key: "channelId", width: 100 },
  { title: "频道名称", dataIndex: "channelName", key: "channelName", width: 150 },
  { title: "预约人数", dataIndex: "reservationCount", key: "reservationCount", width: 100 },
  { title: "操作", key: "action", width: 80, fixed: "right" }
];
// 分页配置
const reservationPagination = reactive({
  current: 1,
  pageSize: 10,
  total: reservationTableData.value.length,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条记录`
});
// 加载状态
const reservationLoading = ref(false);
// 导出事件
const handleReservationExport = (record: any) => {
  console.log("导出预约数据:", record);
};
</script>

<style scoped lang="less">
.platform-statistics-container {
  padding: 20px;
  .page-header {
    margin: 20px 0;
    h2 { margin: 0; color: #333; font-size: 24px; font-weight: 500; }
  }
  .search-section {
    margin-bottom: 24px;
    .search-form {
      display: flex; align-items: center; gap: 24px;
      .form-item {
        display: flex; align-items: center; gap: 8px;
        label { font-weight: 500; color: #333; white-space: nowrap; }
      }
    }
  }
  .statistics-cards {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 160px)); gap: 24px; margin-bottom: 24px;
    .stat-card {
      background: #f9fafd; padding: 5px 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      .stat-header { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
      .stat-title { font-size: 14px; color: #666; font-weight: 500; }
      .info-icon { color: #999; font-size: 12px; cursor: help; }
      .stat-value { font-size: 20px; color: #1d2129; }
      .stat-unit { font-size: 14px; color: #ccc4c4; }
    }
  }
  .bottom-tags { display: flex; gap: 12px; flex-wrap: wrap; }
}
.search-options {
  display: flex; justify-content: space-between; margin: 20px 0;
  > div {
    &:first-child { display: flex; gap: 20px; align-items: center; }
  }
}
/* 统一表格样式（与问题2一致） */
.data-table {
  padding: 20px;
  :deep(.ant-table) {
    .ant-table-thead > tr > th { background: #fafafa; font-weight: 500; }
    .ant-table-tbody > tr > td { padding: 12px 16px; }
  }
}
</style>