<template>
  <div class="data-analysis-dashboard">
    <!-- 时间选择器 -->
    <a-card class="time-selector-card" :bordered="false">
      <div class="time-selector">
        <div class="date-range">
          <div>选择日期：</div>
          <a-range-picker v-model:value="dateRange" format="YYYY-MM-DD" />
        </div>
        <div class="date-range">
          <div>直播分类：</div>
          <a-select v-model:value="liveCategory" style="width: 200px">
            <a-select-option value="全部">全部</a-select-option>
          </a-select>
        </div>
        <a-button type="primary" @click="handleQuery">搜索</a-button>
      </div>
    </a-card>

    <!-- 统计卡片 -->
    <a-row :gutter="[16, 16]" class="stats-row">
      <a-card class="stat-card" :bordered="false" v-for="(stat, index) in statsData" :key="index">
        <a-statistic
          :title="stat.title"
          :value="stat.value"
          :suffix="stat.suffix"
          :value-style="{ fontSize: '24px', fontWeight: 'bold' }"
        >
          <template #suffix>
            <span class="trend-indicator" :class="stat.trend">
              {{ stat.trendIcon }}
            </span>
          </template>
        </a-statistic>
      </a-card>
    </a-row>

    <!-- 图表网格 -->
    <a-row :gutter="[16, 16]" class="charts-grid">
      <!-- 平台活跃度趋势分析 -->
      <a-col :span="24">
        <a-card title="平台统计趋势分析" :bordered="false">
          <div style="display: flex; gap: 20px">
            <div ref="trendChartRef" style="height: 350px; flex: 2"></div>
            <div class="status-stats">
              <div v-for="(item, index) in statusData" :key="index" class="status-item">
                <div class="status-name">{{ item.name }}</div>
                <div class="status-value">{{ item.value }}</div>
                <div class="status-text">{{ item.text }}</div>
              </div>
            </div>
          </div>
        </a-card>
      </a-col>

      <!-- 观看用户地域分布 -->
      <a-col :span="12">
        <a-card title="观看用户地域分布" :bordered="false">
          <div ref="educationTypeChartRef" style="height: 300px"></div>
        </a-card>
      </a-col>

      <!-- 观看终端分布 -->
      <a-col :span="12">
        <a-card title="观看终端分布" :bordered="false">
          <div ref="categoryChartRef" style="height: 300px"></div>
        </a-card>
      </a-col>

      <!-- 直播观看时长 -->
      <a-col :span="12">
        <a-card title="直播观看时长(TOP5)" :bordered="false">
          <div ref="provinceChartRef" style="height: 300px"></div>
        </a-card>
      </a-col>

      <!-- 近七天直播场次统计 -->
      <a-col :span="12">
        <a-card title="近七天直播场次统计" :bordered="false">
          <div ref="usageChartRef" style="height: 300px"></div>
        </a-card>
      </a-col>

      <!-- 封禁用户原因分布 -->
      <a-col :span="12">
        <a-card title="封禁用户原因分布" :bordered="false">
          <div ref="dialogueChartRef" style="height: 300px"></div>
        </a-card>
      </a-col>

      <!-- 平台内容库素材类型占比 -->
      <a-col :span="12">
        <a-card title="平台内容库素材类型占比" :bordered="false">
          <div ref="effectChartRef" style="height: 300px"></div>
        </a-card>
      </a-col>

      <!-- 近期抽奖活动参与数据 -->
      <a-col :span="24">
        <a-card title="近期抽奖活动参与数据" :bordered="false">
          <div ref="aiTrendChartRef" style="height: 250px"></div>
        </a-card>
      </a-col>

      <!-- 主播核心画像指标 -->
      <a-col :span="24">
        <a-card title="主播核心画像指标" :bordered="false">
          <div ref="radarChartRef" style="height: 350px"></div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import dayjs, { Dayjs } from "dayjs";
import * as echarts from "echarts";
import { nextTick, onMounted, ref } from "vue";
const dateRange = ref<[Dayjs, Dayjs]>([dayjs("2025-07-08"), dayjs("2025-07-14")]);
const liveCategory = ref("全部");
// 统计数据
const statsData = ref([
  { title: "观看次数", value: 2, suffix: "次", trend: "down", trendIcon: "▼" },
  { title: "观看时长", value: 6, suffix: "分钟", trend: "down", trendIcon: "▼" },
  { title: "观看人数", value: 2, suffix: "人", trend: "down", trendIcon: "▼" },
  { title: "人均观看时长", value: 3, suffix: "分钟", trend: "down", trendIcon: "▼" },
  { title: "人均观看次数", value: 1, suffix: "次", trend: "down", trendIcon: "▼" },
]);

// 状态数据
const statusData = ref([
  { name: "日环比", value: "+12%", color: "#52c41a", text: "较昨日增长" },
  { name: "周同比", value: "+0%", color: "#faad14", text: "较上周同期增长" },
  { name: "转化率", value: "-8%", color: "#ff4d4f", text: "观看-互动转化率" },
]);

// ECharts 实例引用
const trendChartRef = ref();
const educationTypeChartRef = ref();
const categoryChartRef = ref();
const provinceChartRef = ref();
const usageChartRef = ref();
const dialogueChartRef = ref();
const effectChartRef = ref();
const aiTrendChartRef = ref();
const radarChartRef = ref();

// 查询处理
const handleQuery = () => {
  console.log("查询时间范围:", dateRange.value);
  // 刷新图表数据
  initAllCharts();
};

// 初始化平台活跃度趋势图
const initTrendChart = () => {
  const chart = echarts.init(trendChartRef.value);
  const option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["活跃用户", "新增用户"],
    },
    grid: {
      left: "3%",
      right: "4%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["2025-07-08", "2025-07-09", "2025-07-10", "2025-07-11", "2025-07-12", "2025-07-13", "2025-07-14"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "活跃用户",
        type: "line",
        stack: "Total",
        data: [1, 2, 1.5, 1.8, 3.5, 2.5, 2.2],
        smooth: true,
        lineStyle: {
          color: "#1890ff",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(24, 144, 255, 0.3)" },
            { offset: 1, color: "rgba(24, 144, 255, 0.1)" },
          ]),
        },
      },
      {
        name: "新增用户",
        type: "line",
        stack: "Total",
        data: [1.2, 1.8, 1.2, 1.5, 3.2, 2.8, 2.5],
        smooth: true,
        lineStyle: {
          color: "#52c41a",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(82, 196, 26, 0.3)" },
            { offset: 1, color: "rgba(82, 196, 26, 0.1)" },
          ]),
        },
      },
    ],
  };
  chart.setOption(option);
};

const initEducationTypeChart = () => {
  const chart = echarts.init(educationTypeChartRef.value);
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["北京", "上海", "广州", "深圳", "杭州"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [5, 3, 3, 2, 1],
        type: "bar",
        itemStyle: {
          color: "#1890ff",
        },
      },
    ],
  };
  chart.setOption(option);
};

const initCategoryChart = () => {
  const chart = echarts.init(categoryChartRef.value);
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "对象类别",
        type: "pie",
        radius: "50%",
        data: [
          { value: 50, name: "平板", itemStyle: { color: "#ff4d4f" } },
          { value: 30, name: "移动端", itemStyle: { color: "#1890ff" } },
          { value: 20, name: "pc端", itemStyle: { color: "#52c41a" } },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  chart.setOption(option);
};

// 初始化各省用户分布图
const initProvinceChart = () => {
  const chart = echarts.init(provinceChartRef.value);
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      data: ["直播间A", "直播间B", "直播间C", "直播间D", "直播间E"],
    },
    series: [
      {
        data: [30, 45, 60, 75, 90],
        type: "bar",
        itemStyle: {
          color: "#1890ff",
        },
      },
    ],
  };
  chart.setOption(option);
};

const initUsageChart = () => {
  const chart = echarts.init(usageChartRef.value);
  const option = {
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [2, 1, 3, 2, 4, 5, 3],
        type: "bar",
        itemStyle: {
          color: "#1890ff",
        },
      },
    ],
  };
  chart.setOption(option);
};

const initDialogueChart = () => {
  const chart = echarts.init(dialogueChartRef.value);
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "对话分析",
        type: "pie",
        radius: ["40%", "70%"],
        data: [
          { value: 40, name: "恶意刷屏", itemStyle: { color: "#52c41a" } },
          { value: 35, name: "广告发布", itemStyle: { color: "#faad14" } },
          { value: 20, name: "不当言论", itemStyle: { color: "#ff4d4f" } },
          { value: 5, name: "其他", itemStyle: { color: "#d9d9d9" } },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  chart.setOption(option);
};

const initEffectChart = () => {
  const chart = echarts.init(effectChartRef.value);
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      max: 100,
    },
    yAxis: {
      type: "category",
      data: ["数字组", "好评剧本", "热场副本", "开场互动剧本"],
    },
    series: [
      {
        data: [85, 70, 90, 95],
        type: "bar",
        itemStyle: {
          color: "#52c41a",
        },
      },
    ],
  };
  chart.setOption(option);
};

const initAITrendChart = () => {
  const chart = echarts.init(aiTrendChartRef.value);
  const option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["参与人次", "抽奖人次"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["新年抽奖", "春节福利", "周年庆", "五一抽奖"],
    },
    yAxis: {
      type: "value",
      name: "人次",
      nameLocation: "end",
      nameTextStyle: {
        fontSize: 12,
        color: "#666",
      },
    },
    series: [
      {
        type: "line",
        data: [85, 88, 92, 95],
        smooth: true,
        lineStyle: {
          color: "#1890ff",
        },
      },
      {
        type: "line",
        data: [75, 80, 85, 88],
        smooth: true,
        lineStyle: {
          color: "#52c41a",
        },
      },
    ],
  };
  chart.setOption(option);
};

// 初始化雷达图
const initRadarChart = () => {
  const chart = echarts.init(radarChartRef.value);
  const option = {
    tooltip: {},
    legend: {
      data: ["运营指标"],
    },
    radar: {
      indicator: [
        { name: "开播场次", max: 100 },
        { name: "观看人数", max: 100 },
        { name: "粉丝数", max: 100 },
        { name: "复播率", max: 100 },
        { name: "平均观看时长", max: 100 },
        { name: "互动率", max: 100 },
      ],
    },
    series: [
      {
        name: "运营指标",
        type: "radar",
        data: [
          {
            value: [80, 60, 90, 70, 50, 80],
            name: "运营指标",
            areaStyle: {
              color: "rgba(24, 144, 255, 0.3)",
            },
          },
        ],
      },
    ],
  };
  chart.setOption(option);
};

// 初始化所有图表
const initAllCharts = () => {
  nextTick(() => {
    initTrendChart();
    initEducationTypeChart();
    initCategoryChart();
    initProvinceChart();
    initUsageChart();
    initDialogueChart();
    initEffectChart();
    initAITrendChart();
    initRadarChart();
  });
};

// 页面挂载后初始化图表
onMounted(() => {
  initAllCharts();

  // 监听窗口大小变化，自动调整图表大小
  window.addEventListener("resize", () => {
    const charts = [
      trendChartRef,
      educationTypeChartRef,
      categoryChartRef,
      provinceChartRef,
      usageChartRef,
      dialogueChartRef,
      effectChartRef,
      aiTrendChartRef,
      radarChartRef,
    ];

    charts.forEach(chartRef => {
      if (chartRef.value) {
        const chart = echarts.getInstanceByDom(chartRef.value);
        if (chart) {
          chart.resize();
        }
      }
    });
  });
});
</script>

<style scoped lang="less">
.data-analysis-dashboard {
  padding: 24px;
  background-color: #f0f2f5;
  min-height: 100vh;

  .time-selector-card {
    margin-bottom: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .time-selector {
      display: flex;
      align-items: center;
      gap: 20px;
      .date-range {
        display: flex;
        gap: 20px;
        align-items: center;
      }
    }
  }

  .stats-row {
    margin-bottom: 24px;
    display: flex;
    gap: 20px;
    .stat-card {
      flex: 1;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      }

      .trend-indicator {
        margin-left: 8px;
        font-size: 12px;

        &.down {
          color: #ff4d4f;
        }

        &.up {
          color: #52c41a;
        }
      }
    }
  }

  .charts-grid {
    .ant-card {
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;

      &:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      }
    }

    .status-stats {
      flex: 0.6;
      display: flex;
      gap: 20px;
      flex-direction: column;
      .status-item {
        display: flex;
        flex-direction: column;
        gap: 14x;
        justify-content: space-between;
        padding: 12px 20px;
        background-color: rgba(249, 250, 251, 1);

        .status-name {
          font-size: 14px;
          color: #666;
        }

        .status-value {
          font-size: 14px;
          font-weight: 500;
          color: #b2e897;
        }
        .status-text {
          font-size: 12px;
          color: #504f4f;
        }
      }
    }
  }
}
</style>
