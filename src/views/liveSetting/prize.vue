<template>
  <div class="platform-prize">
    <div class="page-header">
      <h2>平台抽奖</h2>
    </div>

    <!-- 操作栏：交换 left-actions 和 right-actions 的顺序，并调整 flex 对齐 -->
    <div class="action-bar">
      <!-- 原 right-actions（搜索+状态筛选）移到左侧 -->
      <div class="right-actions">
        <a-input-search
          v-model:value="searchKeyword"
          placeholder="输入抽奖名称搜索"
          style="width: 300px"
          @search="handleSearch"
        />
        <a-select
          v-model:value="statusFilter"
          placeholder="全部"
          style="width: 120px; margin-left: 16px"
          @change="handleStatusChange"
        >
          <a-select-option value="">全部</a-select-option>
          <a-select-option value="active">进行中</a-select-option>
          <a-select-option value="finished">已结束</a-select-option>
          <a-select-option value="pending">待开始</a-select-option>
        </a-select>
      </div>

      <!-- 原 left-actions（新建抽奖）移到右侧 -->
      <div class="left-actions">
        <a-button type="primary" @click="handleCreatePrize"> 新建抽奖 </a-button>
        <!--<a-button type="link" @click="showHelp"> 帮助 </a-button> -->
      </div>
    </div>

    <!-- 抽奖列表 -->
    <div class="prize-table">
      <a-table
        :columns="columns"
        :data-source="prizeList"
        :pagination="pagination"
        :loading="loading"
        row-key="id"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="getStatusColor(record.status)">
              {{ getStatusText(record.status) }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleViewPrize(record)"> 查看 </a-button>
              <a-button type="link" size="small" @click="handleEditPrize(record)"> 编辑 </a-button>
              <a-button type="link" size="small" danger @click="handleDeletePrize(record)"> 删除 </a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>

    <!-- 新建/编辑抽奖弹窗 -->
    <a-modal
      v-model:open="prizeModalVisible"
      :title="isEdit ? '编辑抽奖' : '新建抽奖'"
      width="800px"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
    >
      <a-form :model="prizeForm" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="活动名称" required>
              <a-input v-model:value="prizeForm.activityName" placeholder="请输入活动名称" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="抽奖人次" required>
              <a-input-number
                v-model:value="prizeForm.drawCount"
                placeholder="请输入抽奖人次"
                :min="1"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="中奖人次" required>
              <a-input-number
                v-model:value="prizeForm.winnerCount"
                placeholder="请输入中奖人次"
                :min="1"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="活动状态">
              <a-select v-model:value="prizeForm.status" placeholder="请选择状态">
                <a-select-option value="pending">待开始</a-select-option>
                <a-select-option value="active">进行中</a-select-option>
                <a-select-option value="finished">已结束</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-form-item label="活动时间" required>
          <a-range-picker
            v-model:value="prizeForm.activityTime"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            style="width: 100%"
          />
        </a-form-item>

        <a-form-item label="活动描述">
          <a-textarea v-model:value="prizeForm.description" placeholder="请输入活动描述" :rows="4" />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 帮助弹窗 -->
    <a-modal v-model:open="helpModalVisible" title="抽奖活动帮助" :footer="null" width="600px">
      <div class="help-content">
        <h4>抽奖活动操作指南：</h4>
        <div class="help-section">
          <h5>1. 创建抽奖活动</h5>
          <ul>
            <li>点击"新建抽奖"按钮创建新的抽奖活动</li>
            <li>填写活动名称、抽奖人次、中奖人次等基本信息</li>
            <li>设置活动时间范围</li>
            <li>添加活动描述（可选）</li>
          </ul>
        </div>

        <div class="help-section">
          <h5>2. 管理抽奖活动</h5>
          <ul>
            <li>查看：查看活动详情和参与情况</li>
            <li>编辑：修改活动信息和设置</li>
            <li>删除：删除不需要的活动（谨慎操作）</li>
          </ul>
        </div>

        <div class="help-section">
          <h5>3. 活动状态说明</h5>
          <ul>
            <li>待开始：活动已创建但未开始</li>
            <li>进行中：活动正在进行中</li>
            <li>已结束：活动已结束</li>
          </ul>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { message, Modal } from "ant-design-vue";
import type { Dayjs } from "dayjs";
import { onMounted, reactive, ref } from "vue";

// 搜索和筛选
const searchKeyword = ref("");
const statusFilter = ref("");
const loading = ref(false);

// 抽奖列表
const prizeList = ref<any[]>([]);

// 分页
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条记录`,
});

// 表格列定义
const columns = [
  {
    title: "活动名称",
    dataIndex: "activityName",
    key: "activityName",
    width: 200,
  },
  {
    title: "活动时间",
    dataIndex: "activityTime",
    key: "activityTime",
    width: 300,
  },
  {
    title: "抽奖人次",
    dataIndex: "drawCount",
    key: "drawCount",
    width: 120,
  },
  {
    title: "中奖人次",
    dataIndex: "winnerCount",
    key: "winnerCount",
    width: 120,
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    width: 100,
  },
  {
    title: "操作",
    key: "action",
    width: 200,
    fixed: "right",
  },
];

// 弹窗状态
const prizeModalVisible = ref(false);
const helpModalVisible = ref(false);
const isEdit = ref(false);

// 表单数据
const prizeForm = reactive({
  id: "",
  activityName: "",
  drawCount: 0,
  winnerCount: 0,
  status: "pending",
  activityTime: null as [Dayjs, Dayjs] | null,
  description: "",
});

// 模拟数据
const mockData = [
 {
    id: "P001",
    activityName: "新年抽奖活动",
    activityTime: "2025-01-01 00:00:00 ~ 2025-01-10 23:59:59", // 新年对应1月
    drawCount: 1000,
    winnerCount: 100,
    status: "finished", // 1月活动已结束
    description: "新年特别抽奖活动",
  },
  {
    id: "P002",
    activityName: "春节福利抽奖",
    activityTime: "2025-01-29 00:00:00 ~ 2025-02-07 23:59:59", // 2025年春节为1月29日，对应1-2月
    drawCount: 800,
    winnerCount: 50,
    status: "finished", // 2月活动已结束
    description: "春节期间特别福利",
  },
  {
    id: "P003",
    activityName: "周年庆抽奖",
    activityTime: "2025-10-10 00:00:00 ~ 2025-11-31 23:59:59", // 周年庆时间未明确节日，保留原10月
    drawCount: 1500,
    winnerCount: 150,
    status: "active",
    description: "周年庆典特别活动",
  },
  {
    id: "P004",
    activityName: "五一劳动节抽奖",
    activityTime: "2025-05-01 00:00:00 ~ 2025-05-07 23:59:59", // 劳动节对应5月
    drawCount: 600,
    winnerCount: 30,
    status: "finished", // 5月活动已结束
    description: "五一劳动节抽奖",
  },
  {
    id: "P005",
    activityName: "端午感恩抽奖",
    activityTime: "2025-06-08 00:00:00 ~ 2025-06-14 23:59:59", // 2025年端午为6月8日，对应6月
    drawCount: 1600,
    winnerCount: 130,
    status: "finished", // 6月活动已结束
    description: "端午感恩抽奖",
  },
  {
    id: "P006",
    activityName: "暑期狂欢抽奖",
    activityTime: "2025-07-01 00:00:00 ~ 2025-08-31 23:59:59", // 暑期对应7-8月
    drawCount: 700,
    winnerCount: 40,
    status: "finished", // 8月活动已结束
    description: "暑期狂欢抽奖",
  },
  {
    id: "P007",
    activityName: "中秋团圆抽奖",
    activityTime: "2025-09-17 00:00:00 ~ 2025-09-23 23:59:59", // 2025年中秋为9月17日，对应9月
    drawCount: 900,
    winnerCount: 50,
    status: "finished", // 9月活动已结束
    description: "中秋团圆抽奖",
  },
  {
    id: "P008",
    activityName: "国庆福利抽奖",
    activityTime: "2025-10-01 00:00:00 ~ 2025-10-07 23:59:59", // 国庆对应10月，修正原活动名与描述一致
    drawCount: 1200,
    winnerCount: 130,
    status: "finished", // 10月7日活动已结束
    description: "国庆福利抽奖",
  },
  {
    id: "P009",
    activityName: "双十一预热抽奖",
    activityTime: "2025-11-01 00:00:00 ~ 2025-11-10 23:59:59", // 双十一预热对应11月初，修正11月无31日的问题
    drawCount: 1600,
    winnerCount: 230,
    status: "pending", // 11月活动未开始
    description: "双十一预热抽奖",
  },
  {
    id: "P010",
    activityName: "双十二回馈抽奖",
    activityTime: "2025-12-01 00:00:00 ~ 2025-12-12 23:59:59", // 双十二对应12月，修正11月无31日的问题
    drawCount: 500,
    winnerCount: 20,
    status: "pending", // 12月活动未开始
    description: "双十二回馈抽奖",
  },
  {
    id: "P011",
    activityName: "元旦迎新抽奖",
    activityTime: "2025-12-25 00:00:00 ~ 2025-12-31 23:59:59", // 元旦迎新对应12月底，修正11月无31日的问题
    drawCount: 1300,
    winnerCount: 100,
    status: "pending", // 12月活动未开始
    description: "元旦迎新抽奖",
  },
  {
    id: "P012",
    activityName: "春节年货抽奖",
    activityTime: "2026-01-20 00:00:00 ~ 2026-01-28 23:59:59", // 春节年货对应春节前（1月29日春节），修正11月无31日的问题
    drawCount: 1000,
    winnerCount: 100,
    status: "pending", // 1月活动已结束
    description: "春节年货抽奖",
  }
];

// 获取状态颜色
const getStatusColor = (status: string) => {
  const colors = {
    pending: "orange",
    active: "green",
    finished: "default",
  };
  return colors[status as keyof typeof colors] || "default";
};

// 获取状态文本
const getStatusText = (status: string) => {
  const texts = {
    pending: "待开始",
    active: "进行中",
    finished: "已结束",
  };
  return texts[status as keyof typeof texts] || "未知";
};

// 加载数据
const loadData = () => {
  loading.value = true;
  setTimeout(() => {
    let filteredData = mockData;

    // 搜索过滤
    if (searchKeyword.value) {
      filteredData = filteredData.filter(item => item.activityName.includes(searchKeyword.value));
    }

    // 状态过滤
    if (statusFilter.value) {
      filteredData = filteredData.filter(item => item.status === statusFilter.value);
    }

    prizeList.value = filteredData;
    pagination.total = filteredData.length;
    loading.value = false;
  }, 500);
};

// 搜索
const handleSearch = () => {
  pagination.current = 1;
  loadData();
};

// 状态变化
const handleStatusChange = () => {
  pagination.current = 1;
  loadData();
};

// 表格变化
const handleTableChange = (pag: any) => {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
  loadData();
};

// 新建抽奖
const handleCreatePrize = () => {
  isEdit.value = false;
  prizeModalVisible.value = true;
  Object.assign(prizeForm, {
    id: "",
    activityName: "",
    drawCount: 0,
    winnerCount: 0,
    status: "pending",
    activityTime: null,
    description: "",
  });
};

// 编辑抽奖
const handleEditPrize = (record: any) => {
  isEdit.value = true;
  prizeModalVisible.value = true;
  Object.assign(prizeForm, record);
};

// 查看抽奖
const handleViewPrize = (record: any) => {
  message.info(`查看抽奖活动: ${record.activityName}`);
};

// 删除抽奖
const handleDeletePrize = (record: any) => {
  Modal.confirm({
    title: "确认删除",
    content: `确定要删除抽奖活动 "${record.activityName}" 吗？`,
    onOk() {
      const index = prizeList.value.findIndex(item => item.id === record.id);
      if (index > -1) {
        prizeList.value.splice(index, 1);
        pagination.total--;
        message.success("删除成功");
      }
    },
  });
};

// 显示帮助
const showHelp = () => {
  helpModalVisible.value = true;
};

// 弹窗确认
const handleModalOk = () => {
  if (!prizeForm.activityName || !prizeForm.drawCount || !prizeForm.winnerCount) {
    message.error("请填写必填项");
    return;
  }

  if (isEdit.value) {
    const index = prizeList.value.findIndex(item => item.id === prizeForm.id);
    if (index > -1) {
      prizeList.value[index] = { ...prizeForm };
      message.success("编辑成功");
    }
  } else {
    const newItem = {
      ...prizeForm,
      id: "P" + String(Date.now()).slice(-3),
      activityTime: prizeForm.activityTime
        ? `${prizeForm.activityTime[0].format("YYYY-MM-DD HH:mm:ss")} ~ ${prizeForm.activityTime[1].format("YYYY-MM-DD HH:mm:ss")}`
        : "",
    };
    prizeList.value.unshift(newItem);
    pagination.total++;
    message.success("创建成功");
  }

  prizeModalVisible.value = false;
};

// 弹窗取消
const handleModalCancel = () => {
  prizeModalVisible.value = false;
};

// 初始化
onMounted(() => {
  loadData();
});
</script>

<style scoped lang="less">
.platform-prize {
  padding: 20px;
  background: #fff;

  .page-header {
    margin-bottom: 20px;

    h2 {
      margin: 0;
      color: #333;
      font-size: 18px;
      font-weight: 600;
    }
  }

  .action-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 16px;
    background: #fafafa;
    border-radius: 6px;

    .left-actions {
      display: flex;
      gap: 8px;
    }

    .right-actions {
      display: flex;
      align-items: center;
    }
  }

  .prize-table {
    .ant-table {
      background: #fff;
      border-radius: 6px;
    }
  }

  .help-content {
    h4 {
      margin-bottom: 20px;
      color: #333;
      font-size: 16px;
    }

    .help-section {
      margin-bottom: 20px;

      h5 {
        margin-bottom: 10px;
        color: #666;
        font-size: 14px;
      }

      ul {
        margin: 0;
        padding-left: 20px;

        li {
          margin-bottom: 8px;
          line-height: 1.5;
          color: #888;
        }
      }
    }
  }
}
</style>
