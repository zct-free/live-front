<template>
  <div class="role-settings">
    <!-- 角色设置标题 -->
    <div class="page-header">
      <h2 class="page-title">角色设置</h2>
    </div>

    <!-- 标签页导航 -->
    <div class="tab-navigation">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-item"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </div>
    </div>

    <!-- 主讲设置内容 -->
    <div class="content-section" v-if="activeTab === 'host'">
      <div class="settings-description">
        <span class="desc-label">主讲：</span>
        <span class="desc-text">同一个直播频道仅支持设置1位主讲，负责开播和直播管理。</span>
      </div>

      <!-- 角色表格 -->
      <div class="role-table">
        <div class="table-header">
          <div class="header-cell info-col">信息</div>
          <div class="header-cell permission-col">入员权限</div>
          <div class="header-cell action-col">操作</div>
        </div>

        <div class="table-row">
          <div class="info-cell">
            <div class="user-info">
              <div class="user-avatar">
                <img src="https://via.placeholder.com/40x40" alt="用户头像" />
              </div>
              <div class="user-details">
                <div class="user-name">讲师</div>
                <div class="user-tag">讲师</div>
              </div>
            </div>
          </div>
          <div class="permission-cell">
            <div class="permission-list">
              <span class="permission-item">登录后台</span>
              <span class="permission-separator">、</span>
              <span class="permission-item">开播管理录象</span>
              <span class="permission-separator">、</span>
              <span class="permission-item">连麦</span>
            </div>
          </div>
          <div class="action-cell">
            <div class="action-buttons">
              <a-button type="link" @click="handleContactHost">关联主播</a-button>
              <a-button type="link" @click="handleSettings">设置</a-button>
              <a-button type="link" @click="handleRolePermission">角色权限</a-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 助教设置内容 -->
    <div class="content-section" v-if="activeTab === 'assistant'">
      <div class="assistant-header">
        <div class="settings-description">
          <span class="desc-label">助教：</span>
          <span class="desc-text">
            助教：可通过助教页面维护直播间秩序，监控直播动态。在评论区参与互动，回复评论，为观众答疑解惑，并配合主讲提升观众参与度。
          </span>
        </div>
        <div class="add-assistant-btn">
          <a-button type="primary" @click="handleAddAssistant">添加助教</a-button>
        </div>
      </div>

      <!-- 助教表格 -->
      <div class="role-table">
        <div class="table-header">
          <div class="header-cell info-col">信息</div>
          <div class="header-cell permission-col">入员权限</div>
          <div class="header-cell action-col">操作</div>
        </div>

        <div class="table-row">
          <div class="info-cell">
            <div class="user-info">
              <div class="user-avatar">
                <img src="https://via.placeholder.com/40x40" alt="助教头像" />
              </div>
              <div class="user-details">
                <div class="user-name">助教</div>
                <div class="user-tag assistant-tag">助教</div>
              </div>
            </div>
          </div>
          <div class="permission-cell">
            <div class="permission-list">
              <span class="permission-item">在线列表</span>
            </div>
          </div>
          <div class="action-cell">
            <div class="action-buttons">
              <a-button type="link" @click="handleAssistantSettings">设置</a-button>
              <a-button type="link" danger @click="handleDeleteAssistant">删除</a-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 嘉宾设置内容 -->
    <div class="content-section" v-if="activeTab === 'guest'">
      <div class="guest-header">
        <div class="settings-description">
          <span class="desc-label">嘉宾设置</span>
          <span class="desc-text"
            >适用于大班、双师、培训、活动营销、带货直播场景。嘉宾：讲师和嘉宾可同时讲一堂课，支持连麦互动，需要使用最新开播端登录</span
          >
        </div>
        <div class="guest-actions">
          <a-dropdown>
            <a-button> 角色权限 <DownOutlined /> </a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1">批量添加</a-menu-item>
                <a-menu-item key="2">权限设置</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <a-button type="primary" @click="handleAddGuest">添加嘉宾</a-button>
        </div>
      </div>

      <!-- 嘉宾表格 -->
      <div class="role-table">
        <div class="table-header">
          <div class="header-cell info-col">信息</div>
          <div class="header-cell permission-col">入员权限</div>
          <div class="header-cell action-col">操作</div>
        </div>

        <div class="table-row">
          <div class="info-cell">
            <div class="user-info">
              <div class="user-avatar">
                <img src="https://via.placeholder.com/40x40" alt="嘉宾头像" />
              </div>
              <div class="user-details">
                <div class="user-name">嘉宾</div>
                <div class="user-tag guest-tag">嘉宾</div>
              </div>
            </div>
          </div>
          <div class="permission-cell">
            <div class="permission-list">
              <span class="permission-item">开播端登录</span>
              <span class="permission-separator">、</span>
              <span class="permission-item">连麦</span>
              <span class="permission-separator">、</span>
              <span class="permission-item">禁言时可发言</span>
            </div>
          </div>
          <div class="action-cell">
            <div class="action-buttons">
              <a-button type="link" @click="handleGuestSettings">设置</a-button>
              <a-button type="link" danger @click="handleDeleteGuest">删除</a-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 观众设置内容 -->
    <div class="content-section" v-if="activeTab === 'audience'">
      <div class="empty-state">
        <div class="empty-text">暂无观众设置</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DownOutlined } from "@ant-design/icons-vue";
import { message, Modal } from "ant-design-vue";
import { ref } from "vue";

const tabs = ref([
  { key: "host", label: "主讲设置" },
  { key: "assistant", label: "助教设置" },
  { key: "guest", label: "嘉宾设置" },
  { key: "audience", label: "观众设置" },
]);

const activeTab = ref("host");

// 处理关联主讲
const handleContactHost = () => {
  message.info("关联主讲");
};

// 处理设置
const handleSettings = () => {
  message.info("打开设置");
};

// 处理角色权限
const handleRolePermission = () => {
  message.info("角色权限设置");
};

// 处理添加助教
const handleAddAssistant = () => {
  message.info("添加助教");
};

// 处理助教设置
const handleAssistantSettings = () => {
  message.info("助教设置");
};

// 处理删除助教
const handleDeleteAssistant = () => {
  Modal.confirm({
    title: "确认删除",
    content: "确定要删除这个助教吗？",
    onOk: () => {
      message.success("助教已删除");
    },
  });
};

// 处理添加嘉宾
const handleAddGuest = () => {
  message.info("添加嘉宾");
};

// 处理嘉宾设置
const handleGuestSettings = () => {
  message.info("嘉宾设置");
};

// 处理删除嘉宾
const handleDeleteGuest = () => {
  Modal.confirm({
    title: "确认删除",
    content: "确定要删除这个嘉宾吗？",
    onOk: () => {
      message.success("嘉宾已删除");
    },
  });
};
</script>

<style lang="less" scoped>
.role-settings {
  padding: 20px;

  .page-header {
    margin-bottom: 24px;

    .page-title {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin: 0;
    }
  }

  .tab-navigation {
    display: flex;
    border-bottom: 2px solid #e8e8e8;
    margin-bottom: 24px;
    gap: 32px;

    .tab-item {
      padding: 12px 0;
      color: #666;
      cursor: pointer;
      font-size: 14px;
      position: relative;
      transition: color 0.3s ease;

      &:hover {
        color: #1890ff;
      }

      &.active {
        color: #1890ff;
        font-weight: 600;

        &::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: #1890ff;
        }
      }
    }
  }

  .content-section {
    background: white;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .settings-description {
    margin-bottom: 24px;
    padding: 16px;
    background: #f6f8fa;
    border-radius: 6px;

    .desc-label {
      font-weight: 600;
      color: #333;
    }

    .desc-text {
      color: #666;
      font-size: 14px;
    }
  }

  .assistant-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;

    .settings-description {
      flex: 1;
      margin-bottom: 0;
      margin-right: 20px;
    }

    .add-assistant-btn {
      flex-shrink: 0;
    }
  }

  .guest-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;

    .settings-description {
      flex: 1;
      margin-bottom: 0;
      margin-right: 20px;
    }

    .guest-actions {
      display: flex;
      gap: 12px;
      flex-shrink: 0;
    }
  }

  .role-table {
    border: 1px solid #e8e8e8;
    border-radius: 6px;
    overflow: hidden;

    .table-header {
      display: flex;
      background: #f5f5f5;
      border-bottom: 1px solid #e8e8e8;

      .header-cell {
        padding: 12px 16px;
        font-weight: 600;
        color: #333;
        font-size: 14px;

        &.info-col {
          width: 200px;
        }

        &.permission-col {
          flex: 1;
        }

        &.action-col {
          width: 250px;
        }
      }
    }

    .table-row {
      display: flex;
      align-items: center;
      min-height: 80px;

      .info-cell {
        width: 200px;
        padding: 16px;

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;

          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            background: #f0f0f0;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .user-details {
            .user-name {
              font-size: 14px;
              font-weight: 500;
              color: #333;
              margin-bottom: 4px;
            }

            .user-tag {
              background: #1890ff;
              color: white;
              padding: 2px 8px;
              border-radius: 12px;
              font-size: 12px;
              display: inline-block;

              &.assistant-tag {
                background: #52c41a;
              }

              &.guest-tag {
                background: #fa8c16;
              }
            }
          }
        }
      }

      .permission-cell {
        flex: 1;
        padding: 16px;

        .permission-list {
          font-size: 14px;
          color: #666;
          line-height: 1.5;

          .permission-item {
            color: #333;
          }

          .permission-separator {
            color: #666;
          }
        }
      }

      .action-cell {
        width: 250px;
        padding: 16px;

        .action-buttons {
          display: flex;
          gap: 8px;

          .ant-btn-link {
            padding: 4px 8px;
            height: auto;
            font-size: 13px;
          }
        }
      }
    }
  }

  .empty-state {
    text-align: center;
    padding: 60px 20px;

    .empty-text {
      font-size: 16px;
      color: #999;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .role-settings {
    padding: 12px;

    .tab-navigation {
      flex-wrap: wrap;
      gap: 16px;

      .tab-item {
        font-size: 13px;
      }
    }

    .content-section {
      padding: 16px;
    }

    .role-table {
      .table-header,
      .table-row {
        flex-direction: column;
      }

      .header-cell,
      .info-cell,
      .permission-cell,
      .action-cell {
        width: 100% !important;
        border-bottom: 1px solid #e8e8e8;

        &:last-child {
          border-bottom: none;
        }
      }

      .action-buttons {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }
}
</style>
