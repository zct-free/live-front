<template>
  <div class="platform-content-library">
    <div class="page-header">
      <h2>平台内容库</h2>
    </div>

    <div class="content-layout">
      <!-- 右侧内容区域 -->
      <div class="main-content">
        <!-- 标签切换 -->
        <div class="tab-section">
          <a-tabs v-model:activeKey="activeTab" @change="handleTabChange">
            <a-tab-pane key="content" tab="内容库" />
            <a-tab-pane key="members" tab="成员库" />
          </a-tabs>
        </div>
        <div class="content-area">
          <!-- 内容库视图 -->
          <div v-if="activeTab === 'content'" class="content-view">
            <div class="sidebar">
              <div class="category-list">
                <div class="no-category">系统素材</div>
                <div
                  v-for="category in categories"
                  :key="category.id"
                  :class="['category-item', { active: selectedCategory === category.id }]"
                  @click="selectCategory(category.id)"
                >
                  {{ category.name }}
                </div>
              </div>

              <div class="no-category">个人素材</div>
              <div class="create-category-btn">
                <a-button type="primary" ghost @click="handleCreateCategory"> 创建分类 </a-button>
              </div>
            </div>

            <div class="content-table">
              <div class="search-bar">
                <a-input v-model:value="searchKeyword" placeholder="请输入要搜索的标题" @pressEnter="handleSearch">
                  <template #suffix>
                    <SearchOutlined @click="handleSearch" />
                  </template>
                </a-input>
                <a-button type="link" @click="showOperationGuide">操作指引</a-button>
                <a-button type="danger" @click="showOperationGuide">批量删除</a-button>

                <a-button type="primary" @click="handleAddContent"> 新增内容 </a-button>
              </div>
              <a-table
                :columns="contentColumns"
                :data-source="contentList"
                :pagination="pagination"
                :loading="loading"
                row-key="id"
                @change="handleTableChange"
              >
                <template #bodyCell="{ column, record }">
                  <template v-if="column.key === 'action'">
                    <a-button type="link" @click="handleViewContent(record)"> 查看 </a-button>
                  </template>
                </template>
              </a-table>
            </div>
          </div>

          <!-- 成员库视图 -->
          <div v-if="activeTab === 'members'" class="members-view">
            <div class="sidebar">
              <div class="category-list">
                <div class="no-category">系统素材</div>
                <div
                  v-for="category in categories"
                  :key="category.id"
                  :class="['category-item', { active: selectedCategory === category.id }]"
                  @click="selectCategory(category.id)"
                >
                  {{ category.name }}
                </div>
              </div>

              <div class="no-category">个人素材</div>
              <div class="create-category-btn">
                <a-button type="primary" ghost @click="handleCreateCategory"> 创建分类 </a-button>
              </div>
            </div>
            <div style="flex: 1">
              <div class="search-bar">
                <a-input
                  v-model:value="memberSearchKeyword"
                  placeholder="输入关键词搜索"
                  @pressEnter="handleMemberSearch"
                >
                  <template #suffix>
                    <SearchOutlined @click="handleMemberSearch" />
                  </template>
                </a-input>
                <a-button type="default" @click="handleExportMembers"> 导出 </a-button>
                <a-button type="text" @click="showAttentionTips"> <InfoCircleOutlined /> 注意事项 </a-button>
              </div>

              <div class="members-grid">
                <div
                  v-for="member in membersList"
                  :key="member.id"
                  class="member-card"
                  @click="handleSelectMember(member)"
                >
                  <div class="member-avatar">
                    <a-avatar :src="member.avatar" :size="40">
                      {{ member.name.charAt(0) }}
                    </a-avatar>
                  </div>
                  <div class="member-name">{{ member.name }}</div>
                </div>
              </div>

              <div class="members-pagination">
                <a-pagination
                  v-model:current="membersPagination.current"
                  :total="membersPagination.total"
                  :pageSize="membersPagination.pageSize"
                  :showTotal="(total: number) => `共 ${total} 条`"
                  show-quick-jumper
                  @change="handleMemberPageChange"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InfoCircleOutlined, SearchOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { onMounted, reactive, ref } from "vue";

// 选中的分类
const selectedCategory = ref("system");
const activeTab = ref("content");
const searchKeyword = ref("");
const memberSearchKeyword = ref("");
const loading = ref(false);
const operationGuideVisible = ref(false);
const attentionTipsVisible = ref(false);

// 分类数据
const categories = ref([
  { id: "open", name: "开场互动剧本" },
  { id: "hot", name: "热场剧本" },
  { id: "good", name: "好评剧本" },
  { id: "data", name: "数字组" },
  { id: "personal", name: "个人素材" },
]);

// 内容列表数据
const contentList = ref<any[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条记录`,
});

// 内容表格列定义
const contentColumns = [
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    width: 300,
  },
  {
    title: "内容数量",
    dataIndex: "contentCount",
    key: "contentCount",
    width: 120,
  },
  {
    title: "创建者",
    dataIndex: "creator",
    key: "creator",
    width: 120,
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    key: "updateTime",
    width: 180,
  },
  {
    title: "操作",
    key: "action",
    width: 100,
    fixed: "right",
  },
];

// 成员列表数据
const membersList = ref<any[]>([]);
const membersPagination = reactive({
  current: 1,
  pageSize: 100,
  total: 100,
});

// 模拟内容数据
const mockContentData = [
  {
    id: 1,
    title: "开场互动100条",
    contentCount: 100,
    creator: "系统",
    updateTime: "2025-05-09 14:34:26",
  },
  {
    id: 2,
    title: "热场话术合集",
    contentCount: 50,
    creator: "系统",
    updateTime: "2025-05-08 16:20:15",
  },
  {
    id: 3,
    title: "好评引导模板",
    contentCount: 30,
    creator: "系统",
    updateTime: "2025-05-07 10:45:30",
  },
];

// 模拟成员数据
const mockMembersData = [
  { id: 1, name: "徐喜夕阳装", avatar: "" },
  { id: 2, name: "天台阁楼", avatar: "" },
  { id: 3, name: "如果的事", avatar: "" },
  { id: 4, name: "欢乐颂", avatar: "" },
  { id: 5, name: "怀念", avatar: "" },
  { id: 6, name: "幸运萌", avatar: "" },
  { id: 7, name: "天长地久", avatar: "" },
  { id: 8, name: "情歌", avatar: "" },
  { id: 9, name: "默写前奏", avatar: "" },
  { id: 10, name: "好心情", avatar: "" },
  { id: 11, name: "浪花", avatar: "" },
  { id: 12, name: "幸福瞬", avatar: "" },
  { id: 13, name: "萌趣多", avatar: "" },
  { id: 14, name: "乐开怀", avatar: "" },
  { id: 15, name: "长璀头", avatar: "" },
  { id: 16, name: "甜好情", avatar: "" },
  { id: 17, name: "阳光语", avatar: "" },
  { id: 18, name: "断断温柔", avatar: "" },
  { id: 19, name: "清风谣", avatar: "" },
  { id: 20, name: "悟动作", avatar: "" },
  { id: 21, name: "向日葵", avatar: "" },
  { id: 22, name: "好运连连", avatar: "" },
  { id: 23, name: "萤蝶璃", avatar: "" },
  { id: 24, name: "喜乐多", avatar: "" },
  { id: 25, name: "暖心光", avatar: "" },
  { id: 26, name: "开心果", avatar: "" },
];

// 选择分类
const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId;
  loadContentData();
};

// 切换标签
const handleTabChange = (key: string) => {
  activeTab.value = key;
  if (key === "content") {
    loadContentData();
  } else {
    loadMembersData();
  }
};

// 加载内容数据
const loadContentData = () => {
  loading.value = true;
  setTimeout(() => {
    contentList.value = mockContentData;
    pagination.total = mockContentData.length;
    loading.value = false;
  }, 500);
};

// 加载成员数据
const loadMembersData = () => {
  membersList.value = mockMembersData;
};

// 搜索内容
const handleSearch = () => {
  loadContentData();
  message.success("搜索完成");
};

// 搜索成员
const handleMemberSearch = () => {
  loadMembersData();
  message.success("搜索完成");
};

// 表格变化
const handleTableChange = (pag: any) => {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
  loadContentData();
};

// 成员分页变化
const handleMemberPageChange = (page: number) => {
  membersPagination.current = page;
  loadMembersData();
};

// 创建分类
const handleCreateCategory = () => {
  message.info("创建分类功能");
};

// 新增内容
const handleAddContent = () => {
  message.info("新增内容功能");
};

// 查看内容
const handleViewContent = (record: any) => {
  message.info(`查看内容: ${record.title}`);
};

// 选择成员
const handleSelectMember = (member: any) => {
  message.info(`选择成员: ${member.name}`);
};

// 导出成员
const handleExportMembers = () => {
  message.success("导出成员列表");
};

// 显示操作指引
const showOperationGuide = () => {
  operationGuideVisible.value = true;
};

// 显示注意事项
const showAttentionTips = () => {
  attentionTipsVisible.value = true;
};

// 初始化
onMounted(() => {
  loadContentData();
  loadMembersData();
});
</script>

<style scoped lang="less">
.platform-content-library {
  padding: 20px;
  background: #fff;
  height: 100vh;

  .page-header {
    margin-bottom: 20px;

    h2 {
      margin: 0;
      color: #333;
      font-size: 18px;
      font-weight: 600;
    }
  }

  .content-layout {
    display: flex;
    height: calc(100vh - 80px);

    .sidebar {
      width: 250px;
      background: #f5f5f5;
      padding: 20px;
      margin-right: 20px;
      border-radius: 8px;

      .category-list {
        margin-bottom: 20px;

        .category-item {
          padding: 12px 16px;
          cursor: pointer;
          border-radius: 6px;
          margin-bottom: 8px;
          transition: all 0.3s;

          &:hover {
            background: #e6f7ff;
          }

          &.active {
            background: #1890ff;
            color: #fff;
          }
        }
      }

      .create-category-btn {
        text-align: center;

        .ant-btn {
          width: 100%;
        }
      }
    }

    .main-content {
      flex: 1;

      .tab-section {
        margin-bottom: 20px;

        .ant-tabs {
          .ant-tabs-tab {
            font-size: 16px;
            padding: 12px 24px;
          }
        }
      }

      .content-view,
      .members-view {
        display: flex;
        width: 100%;
        .search-bar {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;

          .ant-input {
            max-width: 300px;
          }
        }
      }

      .content-table {
        flex: 1;
        .ant-table {
          background: #fff;
          border-radius: 8px;
        }
      }

      .members-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 16px;
        margin-bottom: 20px;

        .member-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px;
          background: #fafafa;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;

          &:hover {
            background: #e6f7ff;
            transform: translateY(-2px);
          }

          .member-avatar {
            margin-bottom: 8px;
          }

          .member-name {
            font-size: 12px;
            color: #666;
            text-align: center;
            word-break: break-all;
          }
        }
      }

      .members-pagination {
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }
    }
  }

  .operation-guide,
  .attention-tips {
    h4 {
      margin-bottom: 16px;
      color: #333;
    }

    ul {
      margin: 0;
      padding-left: 20px;

      li {
        margin-bottom: 8px;
        line-height: 1.6;
      }
    }
  }
}

.no-category {
  color: rgb(150, 155, 165);
  padding: 12px 16px;
}
</style>
