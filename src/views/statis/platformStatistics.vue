<template>
  <div class="platform-statistics-container">
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
    <a-tabs>
      <a-tab-pane key="1" tab="日期汇总">
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
            {
              date: '2025-07-14',
              viewDuration: '6分钟',
              viewCount: '2次',
              viewerCount: '2人',
              avgViewDuration: '3分钟',
              avgViewCount: '1次',
            },
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
      <a-tab-pane key="2" tab="观看终端">
        <a-radio-group v-model:value="rqhz" button-style="solid">
          <a-radio-button value="a">全部</a-radio-button>
          <a-radio-button value="b">PC端</a-radio-button>
          <a-radio-button value="c">移动端</a-radio-button>
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
          <!-- 饼图区域 -->
          <div style="flex: 1; display: flex; flex-direction: column; align-items: center">
            <div style="margin-bottom: 16px; display: flex; gap: 24px">
              <span style="display: flex; align-items: center">
                <span
                  style="
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    background: #6495fa;
                    border-radius: 50%;
                    margin-right: 6px;
                  "
                ></span>
                android-sdk
              </span>
              <span style="display: flex; align-items: center">
                <span
                  style="
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    background: #5adbb0;
                    border-radius: 50%;
                    margin-right: 6px;
                  "
                ></span>
                Chrome
              </span>
            </div>
            <!-- 简单饼图模拟 -->
            <svg width="320" height="320" viewBox="0 0 320 320">
              <circle r="160" cx="160" cy="160" fill="#5adbb0" />
              <path d="M160,160 L160,0 A160,160 0 0,1 320,160 Z" fill="#6495fa" />
            </svg>
            <div
              style="
                display: flex;
                justify-content: space-between;
                width: 320px;
                margin-top: 8px;
                font-size: 14px;
                color: #888;
              "
            >
              <span>Chrome<br />50.00%</span>
              <span>android-sdk<br />50.00%</span>
            </div>
          </div>
          <!-- 表格区域 -->
          <div style="flex: 1.2">
            <a-table
              :dataSource="[
                { terminal: 'android-sdk', viewCount: 1, percent: '50%' },
                { terminal: 'Chrome', viewCount: 1, percent: '50%' },
              ]"
              :pagination="false"
              rowKey="terminal"
              bordered
              size="small"
              style="background: #f9fafd"
            >
              <a-table-column title="观看终端" dataIndex="terminal" key="terminal" />
              <a-table-column title="观看次数" dataIndex="viewCount" key="viewCount" />
              <a-table-column title="占比" dataIndex="percent" key="percent" />
            </a-table>
          </div>
        </div>
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
          <!-- 饼图区域 -->
          <div style="flex: 1; display: flex; flex-direction: column; align-items: center">
            <img src="@/assets/images/ditu.png" alt="" style="width: 700px; height: 400px" />
          </div>
          <!-- 表格区域 -->
          <div style="flex: 1.2">
            <a-table
              :dataSource="[{ terminal: '湖北', viewCount: 1, percent: '50%' }]"
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
          </div></div
      ></a-tab-pane>
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
          <!-- 折线图区域 -->
          <div style="flex: 1; display: flex; flex-direction: column; align-items: center">
            <div style="margin-bottom: 16px">
              <span style="font-size: 16px">
                (2025-07-14) 最高在线人数为：<span style="color: #6495fa; font-weight: bold">2</span>
              </span>
            </div>
            <!-- 简单折线图模拟 -->
            <svg width="600" height="300" viewBox="0 0 600 300" style="background: #fff">
              <!-- 横线 -->
              <line x1="50" y1="50" x2="50" y2="250" stroke="#eee" stroke-width="2" />
              <line x1="50" y1="250" x2="550" y2="250" stroke="#eee" stroke-width="2" />
              <!-- Y轴刻度 -->
              <text x="20" y="255" font-size="14" fill="#888">0</text>
              <text x="20" y="205" font-size="14" fill="#888">0.5</text>
              <text x="20" y="155" font-size="14" fill="#888">1</text>
              <text x="20" y="105" font-size="14" fill="#888">1.5</text>
              <text x="20" y="55" font-size="14" fill="#888">2</text>
              <!-- 折线点和线 -->
              <circle cx="300" cy="50" r="3" fill="#6495fa" />
              <polyline points="300,50 300,250" fill="none" stroke="#6495fa" stroke-width="2" />
              <!-- Y轴标题 -->
              <text x="0" y="30" font-size="14" fill="#888" transform="rotate(-90 15,150)">人数</text>
            </svg>
          </div>
          <!-- 表格区域 -->
          <div style="flex: 1.2">
            <a-table
              :dataSource="[{ channel: '6140608', viewerCount: 2 }]"
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
    <div class="page-header">
      <h2>互动统计</h2>
    </div>
    <a-tabs>
      <a-tab-pane tab="报名观看记录" key="1">
        <a-table
          :data="[]"
          :columns="[
            { title: '频道号', dataIndex: 'channel', key: 'channel' },
            { title: '频道名称', dataIndex: 'channelName', key: 'channelName' },
            { title: '观看人数', dataIndex: 'viewerCount', key: 'viewerCount' },
            { title: '报名人数', dataIndex: 'registrationCount', key: 'registrationCount' },
            { title: '操作', dataIndex: 'registrationCount', key: 'registrationCount' },
          ]"
        ></a-table>
      </a-tab-pane>
      <a-tab-pane tab="登记观看记录" key="2">
        <a-table
          :data="[]"
          :columns="[
            { title: '最新记录时间', dataIndex: 'latestRecordTime', key: 'latestRecordTime' },
            { title: '频道号', dataIndex: 'channel', key: 'channel' },
            { title: '频道名称', dataIndex: 'viewerCount', key: 'viewerCount' },
            { title: '报名人数', dataIndex: 'registrationCount', key: 'registrationCount' },
            { title: '操作', dataIndex: 'registrationCount', key: 'registrationCount' },
          ]"
        ></a-table>
      </a-tab-pane>
      <a-tab-pane tab="预约观看记录" key="3">
        <a-radio-group style="margin: 10px 0" v-model:value="rqhz2" button-style="solid">
          <a-radio-button value="a">微信预约</a-radio-button>
          <a-radio-button value="b">短信预约</a-radio-button>
        </a-radio-group>
        <a-table
          :data="[]"
          :columns="[
            { title: '频道号', dataIndex: 'channel', key: 'channel' },
            { title: '频道名称', dataIndex: 'viewerCount', key: 'viewerCount' },
            { title: '预约人数', dataIndex: 'registrationCount', key: 'registrationCount' },
            { title: '操作', dataIndex: 'registrationCount', key: 'registrationCount' },
          ]"
        ></a-table
      ></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import type { Dayjs } from "dayjs";
import { onMounted, reactive, ref } from "vue";

// 响应式数据
const dateRange = ref<[Dayjs, Dayjs] | null>(null);
const selectedCategory = ref<string>("");
const rqhz = ref("a");
const rqhz2 = ref("a");

// 统计数据
const statisticsData = reactive({
  viewCount: 2,
  viewDuration: 6,
  viewerCount: 2,
  avgViewDuration: 3,
  avgViewCount: 1,
});

// 搜索处理
const handleSearch = () => {
  console.log("搜索条件:", {
    dateRange: dateRange.value,
    category: selectedCategory.value,
  });
  // 这里可以调用API获取统计数据
  fetchStatistics();
};

// 获取统计数据
const fetchStatistics = async () => {
  try {
    // 模拟API调用
    // const response = await api.getStatistics({
    //   dateRange: dateRange.value,
    //   category: selectedCategory.value
    // })

    // 模拟数据更新
    Object.assign(statisticsData, {
      viewCount: 2,
      viewDuration: 6,
      viewerCount: 2,
      avgViewDuration: 3,
      avgViewCount: 1,
    });
  } catch (error) {
    console.error("获取统计数据失败:", error);
  }
};

// 组件挂载时获取数据
onMounted(() => {
  fetchStatistics();
});
</script>

<style scoped lang="less">
.platform-statistics-container {
  padding: 20px;

  .page-header {
    margin: 20px 0;

    h2 {
      margin: 0;
      color: #333;
      font-size: 24px;
      font-weight: 500;
    }
  }

  .search-section {
    margin-bottom: 24px;

    .search-form {
      display: flex;
      align-items: center;
      gap: 24px;

      .form-item {
        display: flex;
        align-items: center;
        gap: 8px;

        label {
          font-weight: 500;
          color: #333;
          white-space: nowrap;
        }
      }
    }
  }

  .statistics-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 160px));
    gap: 24px;
    margin-bottom: 24px;

    .stat-card {
      background: #f9fafd;
      padding: 5px 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      .stat-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 5px;

        .stat-title {
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }

        .info-icon {
          color: #999;
          font-size: 12px;
          cursor: help;
        }
      }

      .stat-value {
        font-size: 20px;
        color: #1d2129;
      }

      .stat-unit {
        font-size: 14px;
        color: #ccc4c4;
      }
    }
  }

  .bottom-tags {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
}
.search-options {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  > div {
    &:first-child {
      display: flex;
      gap: 20px;
      align-items: center;
    }
  }
}
</style>
