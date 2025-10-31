<template>
  <div class="anchor-management">
    <div class="page-header">
      <h2>主播管理</h2>
    </div>

    <!-- 标签栏 -->
    <div class="tab-section">
      <a-tabs v-model:activeKey="activeTab" @change="handleTabChange">
        <a-tab-pane key="list" tab="主播列表" />
      </a-tabs>
    </div>

    <!-- 搜索筛选区域 -->
    <div class="search-section">
      <a-form layout="inline" :model="searchForm">
        <a-form-item label="主播昵称">
          <a-input v-model:value="searchForm.nickname" placeholder="输入主播昵称搜索" style="width: 300px">
            <template #prefix>
              <SearchOutlined />
            </template>
          </a-input>
        </a-form-item>
        <!-- <a-form-item label="场次开播时间">
          <a-range-picker
            v-model:value="searchForm.broadcastTime"
            format="YYYY-MM-DD"
            placeholder="['开始时间', '结束时间']"
            style="width: 300px"
          />
        </a-form-item>-->
       

        <a-form-item>
          <a-button type="primary" @click="handleSearch">筛选</a-button>
        </a-form-item>

        <a-form-item>
          <a-button @click="handleReset">重置</a-button>
        </a-form-item>
      </a-form>

      <div class="action-buttons">
        <a-button type="primary" @click="handleAddAnchor"> 新增主播 </a-button>
      </div>
    </div>

    <!-- 主播列表 -->
    <div class="anchor-table">
      <a-table
        :columns="columns"
        :data-source="anchorList"
        :pagination="pagination"
        :loading="loading"
        row-key="id"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'anchor'">
            <div class="anchor-info">
              <a-avatar :src="record.avatar" :size="40">
                {{ record.nickname.charAt(0) }}
              </a-avatar>
              <div class="anchor-details">
                <div class="nickname">{{ record.nickname }}</div>
                <div class="id">ID: {{ record.id }}</div>
              </div>
            </div>
          </template>
          <template v-else-if="column.key === 'gender'">
            <a-tag :color="record.gender === '男' ? 'blue' : 'pink'">
              {{ record.gender }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'currentFollowers'">
            <div class="followers-info">
              <div class="count">{{ record.currentFollowers }}</div>
              <a-tooltip title="关注人数统计">
                <InfoCircleOutlined style="color: #999; margin-left: 4px" />
              </a-tooltip>
            </div>
          </template>
          <template v-else-if="column.key === 'liveCount'">
            <div class="live-count-info">
              <div class="count">{{ record.liveCount }}</div>
              <a-tooltip title="开播次数统计">
                <InfoCircleOutlined style="color: #999; margin-left: 4px" />
              </a-tooltip>
            </div>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleViewAnchor(record)"> 查看 </a-button>
              <a-button type="link" size="small" @click="handleEditAnchor(record)"> 编辑 </a-button>
              <a-button type="link" size="small" danger @click="handleDeleteAnchor(record)"> 删除 </a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>

    <!-- 新增/编辑主播弹窗 -->
    <a-modal
      v-model:visible="anchorModalVisible"
      :title="isEdit ? '编辑主播' : '新增主播'"
      width="700px"
      :footer="null"
      @cancel="handleModalCancel"
    >
      <a-form :model="anchorForm" layout="vertical">
        <!-- 主播头像上传 -->
        <a-form-item label="主播头像：">
          <div class="avatar-upload-container">
            <a-upload
              v-model:file-list="avatarFileList"
              :before-upload="beforeAvatarUpload"
              :show-upload-list="false"
              accept="image/*"
            >
              <div class="avatar-upload-area">
                <img v-if="anchorForm.avatar" :src="anchorForm.avatar" class="avatar-preview" />
                <div v-else class="upload-placeholder">
                  <PlusOutlined style="font-size: 24px; color: #999" />
                </div>
              </div>
            </a-upload>
            <div class="upload-tip">支持 jpg / png 格式，文件大小不超过 2MB</div>
          </div>
        </a-form-item>

        <!-- 主播昵称 -->
        <a-form-item label="主播昵称：" required>
          <a-input v-model:value="anchorForm.nickname" placeholder="请输入主播昵称" maxlength="15" show-count />
        </a-form-item>

        <!-- 性别选择 -->
        <a-form-item label="主播性别：" required>
          <a-radio-group v-model:value="anchorForm.gender">
            <a-radio value="男">男</a-radio>
            <a-radio value="女">女</a-radio>
          </a-radio-group>
        </a-form-item>

        <!-- 主播简介 -->
        <a-form-item label="主播简介：">
          <a-textarea
            v-model:value="anchorForm.description"
            placeholder="请输入主播简介"
            :rows="4"
            maxlength="200"
            show-count
          />
        </a-form-item>

        <!-- 主页封面 -->
        <a-form-item label="主页封面">
          <div class="cover-upload-container">
            <a-upload
              v-model:file-list="coverFileList"
              :before-upload="beforeCoverUpload"
              :show-upload-list="false"
              accept="image/*"
            >
              <div class="cover-upload-area">
                <img v-if="anchorForm.coverImage" :src="anchorForm.coverImage" class="cover-preview" />
                <div v-else class="upload-placeholder">
                  <PlusOutlined style="font-size: 36px; color: #999" />
                  <div class="upload-text">点击上传图片</div>
                </div>
              </div>
            </a-upload>
            <div class="upload-tip">支持 jpg / png 格式，文件大小不超过 2MB</div>
          </div>
        </a-form-item>

        <!-- 按钮组 -->
        <div class="modal-footer">
          <a-button @click="handleModalCancel" style="margin-right: 12px"> 取消 </a-button>
          <a-button type="primary" @click="handleModalOk"> 确认 </a-button>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { InfoCircleOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons-vue";
import { message, Modal } from "ant-design-vue";
import type { Dayjs } from "dayjs";
import { onMounted, reactive, ref } from "vue";

// 活动标签
const activeTab = ref("list");

// 搜索表单
const searchForm = reactive({
  nickname: "",
  broadcastTime: null as [Dayjs, Dayjs] | null,
});

// 主播列表
const anchorList = ref<any[]>([]);
const loading = ref(false);

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
    title: "主播",
    key: "anchor",
    width: 200,
  },
  {
    title: "性别",
    dataIndex: "gender",
    key: "gender",
    width: 80,
  },
  {
    title: "当前关注粉丝数",
    key: "currentFollowers",
    width: 150,
  },
  {
    title: "开播场次数",
    key: "liveCount",
    width: 120,
  },
  {
    title: "累计观看人数",
    dataIndex: "totalViewers",
    key: "totalViewers",
    width: 130,
  },
  {
    title: "累计观看时长（分钟）",
    dataIndex: "totalViewTime",
    key: "totalViewTime",
    width: 160,
  },
  {
    title: "操作",
    key: "action",
    width: 200,
    fixed: "right",
  },
];

// 弹窗状态
const anchorModalVisible = ref(false);
const isEdit = ref(false);

// 表单数据
const anchorForm = reactive({
  id: "",
  nickname: "",
  gender: "",
  currentFollowers: 0,
  liveCount: 0,
  totalViewers: 0,
  totalViewTime: 0,
  avatar: "",
  description: "",
  coverImage: "",
});

// 文件上传相关
const avatarFileList = ref([]);
const coverFileList = ref([]);

// 头像上传处理
const beforeAvatarUpload = (file: any) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("只能上传 JPG/PNG 格式的图片!");
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("图片大小不能超过 2MB!");
    return false;
  }

  // 模拟上传成功，实际项目中需要真实的上传逻辑
  const reader = new FileReader();
  reader.onload = e => {
    anchorForm.avatar = e.target?.result as string;
  };
  reader.readAsDataURL(file);

  return false; // 阻止默认上传
};

// 封面上传处理
const beforeCoverUpload = (file: any) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("只能上传 JPG/PNG 格式的图片!");
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("图片大小不能超过 2MB!");
    return false;
  }

  // 模拟上传成功，实际项目中需要真实的上传逻辑
  const reader = new FileReader();
  reader.onload = e => {
    anchorForm.coverImage = e.target?.result as string;
  };
  reader.readAsDataURL(file);

  return false; // 阻止默认上传
};

// 模拟数据
const mockData = [
  {
    id: "A001",
    nickname: "小美直播",
    gender: "女",
    currentFollowers: 12500,
    liveCount: 68,
    totalViewers: 45800,
    totalViewTime: 3260,
    avatar: "",
    description: "美妆达人，分享美妆心得",
  },
  {
    id: "A002",
    nickname: "游戏王者",
    gender: "男",
    currentFollowers: 25600,
    liveCount: 156,
    totalViewers: 89200,
    totalViewTime: 7850,
    avatar: "",
    description: "游戏主播，专注王者荣耀",
  },
  {
    id: "A003",
    nickname: "美食探索",
    gender: "女",
    currentFollowers: 8900,
    liveCount: 42,
    totalViewers: 28600,
    totalViewTime: 1980,
    avatar: "",
    description: "美食博主，分享各地美食",
  },
  {
    id: "A004",
    nickname: "健身达人",
    gender: "男",
    currentFollowers: 18200,
    liveCount: 89,
    totalViewers: 52400,
    totalViewTime: 4320,
    avatar: "",
    description: "健身教练，分享健身知识",
  },
  {
    id: "A005",
    nickname: "音乐天使",
    gender: "女",
    currentFollowers: 32100,
    liveCount: 203,
    totalViewers: 128600,
    totalViewTime: 9540,
    avatar: "",
    description: "音乐主播，唱歌直播",
  },
  {
    id: "A006",
    nickname: "科技前沿",
    gender: "男",
    currentFollowers: 15800,
    liveCount: 76,
    totalViewers: 36900,
    totalViewTime: 2890,
    avatar: "",
    description: "科技博主，分享最新科技",
  },
  {
    id: "A007",
    nickname: "萌宠乐园",
    gender: "女",
    currentFollowers: 22400,
    liveCount: 134,
    totalViewers: 67200,
    totalViewTime: 5460,
    avatar: "",
    description: "宠物主播，分享萌宠日常",
  },
  {
    id: "A008",
    nickname: "旅行日记",
    gender: "男",
    currentFollowers: 11600,
    liveCount: 58,
    totalViewers: 31800,
    totalViewTime: 2540,
    avatar: "",
    description: "旅行博主，分享旅行见闻",
  },
    {
    id: "A009",
    nickname: "时尚穿搭",
    gender: "女",
    currentFollowers: 19500,
    liveCount: 102,
    totalViewers: 48700,
    totalViewTime: 6230,
    avatar: "",
    description: "穿搭博主，分享时尚穿搭",
  },
    {
    id: "A010",
    nickname: "读书分享",
    gender: "男",
    currentFollowers: 14200,
    liveCount: 	65,
    totalViewers: 32500,
    totalViewTime: 3890,
    avatar: "",
    description: "读书博主，分享最新读书",
  },
    {
    id: "A011",
    nickname: "手工制作",
    gender: "男",
    currentFollowers: 16800,
    liveCount: 38,
    totalViewers: 38800,
    totalViewTime: 1540,
    avatar: "",
    description: "手工博主，分享手工制作",
  },
    {
    id: "A012",
    nickname: "汽车测评",
    gender: "男",
    currentFollowers: 26800,
    liveCount: 100,
    totalViewers: 881200,
    totalViewTime: 13540,
    avatar: "",
    description: "测评博主，分享汽车测评",
  },
];

// 标签切换
const handleTabChange = (key: string) => {
  activeTab.value = key;
  loadData();
};

// 加载数据
const loadData = () => {
  loading.value = true;
  setTimeout(() => {
    let filteredData = mockData;

    // 昵称搜索
    if (searchForm.nickname) {
      filteredData = filteredData.filter(item => item.nickname.includes(searchForm.nickname));
    }

    anchorList.value = filteredData;
    pagination.total = filteredData.length;
    loading.value = false;
  }, 500);
};

// 搜索
const handleSearch = () => {
  pagination.current = 1;
  loadData();
};

// 重置
const handleReset = () => {
  searchForm.nickname = "";
  searchForm.broadcastTime = null;
  pagination.current = 1;
  loadData();
};

// 表格变化
const handleTableChange = (pag: any) => {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
  loadData();
};

// 新增主播
const handleAddAnchor = () => {
  isEdit.value = false;
  anchorModalVisible.value = true;
  Object.assign(anchorForm, {
    id: "",
    nickname: "",
    gender: "",
    currentFollowers: 0,
    liveCount: 0,
    totalViewers: 0,
    totalViewTime: 0,
    avatar: "",
    description: "",
    coverImage: "",
  });
  avatarFileList.value = [];
  coverFileList.value = [];
};

// 编辑主播
const handleEditAnchor = (record: any) => {
  isEdit.value = true;
  anchorModalVisible.value = true;
  Object.assign(anchorForm, record);
};

// 查看主播
const handleViewAnchor = (record: any) => {
  message.info(`查看主播: ${record.nickname}`);
};

// 删除主播
const handleDeleteAnchor = (record: any) => {
  Modal.confirm({
    title: "确认删除",
    content: `确定要删除主播 "${record.nickname}" 吗？`,
    onOk() {
      const index = anchorList.value.findIndex(item => item.id === record.id);
      if (index > -1) {
        anchorList.value.splice(index, 1);
        pagination.total--;
        message.success("删除成功");
      }
    },
  });
};

// 弹窗确认
const handleModalOk = () => {
  if (!anchorForm.nickname || !anchorForm.gender) {
    message.error("请填写必填项");
    return;
  }

  if (isEdit.value) {
    const index = anchorList.value.findIndex(item => item.id === anchorForm.id);
    if (index > -1) {
      anchorList.value[index] = { ...anchorForm };
      message.success("编辑成功");
    }
  } else {
    const newItem = {
      ...anchorForm,
      id: "A" + String(Date.now()).slice(-3),
    };
    anchorList.value.unshift(newItem);
    pagination.total++;
    message.success("新增成功");
  }

  anchorModalVisible.value = false;
};

// 弹窗取消
const handleModalCancel = () => {
  anchorModalVisible.value = false;
};

// 初始化
onMounted(() => {
  loadData();
});
</script>

<style scoped lang="less">
.anchor-management {
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

  .tab-section {
    margin-bottom: 20px;

    .ant-tabs {
      .ant-tabs-tab {
        font-size: 14px;
        padding: 12px 20px;
      }
    }
  }

  .search-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 16px;
    background: #fafafa;
    border-radius: 6px;

    .action-buttons {
      display: flex;
      gap: 8px;
    }
  }

  .anchor-table {
    .ant-table {
      background: #fff;
      border-radius: 6px;

      .anchor-info {
        display: flex;
        align-items: center;
        gap: 12px;

        .anchor-details {
          .nickname {
            font-weight: 500;
            color: #333;
            margin-bottom: 4px;
          }

          .id {
            font-size: 12px;
            color: #999;
          }
        }
      }

      .followers-info,
      .live-count-info {
        display: flex;
        align-items: center;

        .count {
          font-weight: 500;
          color: #333;
        }
      }
    }
  }

  // 弹窗样式
  :deep(.ant-modal-body) {
    padding: 24px;
  }

  .avatar-upload-container {
    .avatar-upload-area {
      width: 100px;
      height: 100px;
      border: 2px dashed #d9d9d9;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fafafa;
      transition: all 0.3s;

      &:hover {
        border-color: #1890ff;
      }

      .avatar-preview {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 6px;
      }

      .upload-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #999;
      }
    }

    .upload-tip {
      margin-top: 8px;
      font-size: 12px;
      color: #999;
    }
  }

  .cover-upload-container {
    .cover-upload-area {
      width: 320px;
      height: 180px;
      border: 2px dashed #d9d9d9;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fafafa;
      transition: all 0.3s;

      &:hover {
        border-color: #1890ff;
      }

      .cover-preview {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 6px;
      }

      .upload-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #999;

        .upload-text {
          margin-top: 8px;
          font-size: 14px;
        }
      }
    }

    .upload-tip {
      margin-top: 8px;
      font-size: 12px;
      color: #999;
    }
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid #f0f0f0;
  }
}
</style>
