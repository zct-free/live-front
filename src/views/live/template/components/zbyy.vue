<template>
  <div class="live-reservation-container">
    <!-- 左侧设置区域 -->
    <div class="settings-section">
      <!-- 功能说明 -->
      <div class="description">
        <div class="desc-title">为新建频道开启开播提醒功能:</div>
        <ul class="desc-list">
          <li>观众可提前预约直播</li>
          <li>开播前系统将自动提醒已预约的观众，帮助积累初始流量，提升直播热度</li>
          <li>注意：使用此功能需提前设置开播时间</li>
        </ul>
      </div>

      <!-- 开关设置 -->
      <div class="switch-settings">
        <div class="switch-item">
          <span class="switch-label">短信预约提醒:</span>
          <a-switch v-model:checked="smsEnabled" size="small" />
          <span class="switch-desc">开启后，用户需要输入手机号进行预约 示例</span>
        </div>

        <div class="switch-item">
          <span class="switch-label">微信预约提醒:</span>
          <a-switch v-model:checked="wechatEnabled" size="small" />
          <span class="switch-desc">开启后，用户需关注公众号，预约后直播前25分钟会收到直播提醒 示例</span>
        </div>
      </div>

      <!-- 预约条文设置 -->
      <div class="terms-section">
        <div class="terms-header">
          <span class="terms-label">预约提示文案</span>
          <a-input
            maxlength="30"
            v-model:value="termsText"
            placeholder="填写预约弹窗中的引导文案"
            style="width: 300px"
          />
          <a href="#" class="example-link">示例</a>
        </div>
      </div>

      <!-- 微信人数显示设置 -->
      <div class="wechat-display">
        <div class="display-label">预约人数</div>
        <div class="display-options">
          <a-radio-group v-model:value="showWechatCount">
            <a-radio value="show">显示</a-radio>
            <a-radio value="hide">不显示</a-radio>
          </a-radio-group>
        </div>
        <div class="display-desc">观看页将显示预约人数的数量</div>
      </div>
      <div class="preview-section">
        <div class="phone-mockup">
          <div class="phone-frame">
            <div class="phone-header">
              <div class="status-bar">
                <span class="time">9:41</span>
                <div class="signal-battery">
                  <span class="signal">📶</span>
                  <span class="wifi">📶</span>
                  <span class="battery">🔋</span>
                </div>
              </div>
              <div class="nav-bar">
                <span class="back-btn">✕</span>
                <span class="title">Live streaming</span>
                <span class="more-btn">⋯</span>
              </div>
            </div>

            <div class="phone-content">
              <!-- 直播预览区域 -->
              <div class="live-preview">
                <div class="live-info">
                  <div class="live-time">
                    <span class="time-label">02</span>
                    <span class="time-label">15</span>
                    <span class="time-label">26</span>
                    <span class="time-label">09</span>
                  </div>
                  <div class="live-status">
                    <a-button type="primary" class="reserve-btn">预约直播</a-button>
                  </div>
                </div>
              </div>

              <!-- 聊天区域 -->
              <div class="chat-area">
                <div class="chat-placeholder">
                  <!-- 聊天内容占位 -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 保存按钮 -->
      <div class="save-section">
        <a-button type="primary" @click="saveSettings">保存</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { ref } from "vue";

// 响应式数据
const smsEnabled = ref(false);
const wechatEnabled = ref(true);
const termsText = ref("");
const showWechatCount = ref("show");

// 保存设置
const saveSettings = () => {
  // 这里可以添加保存逻辑
  message.success("设置保存成功");
  console.log("保存设置:", {
    smsEnabled: smsEnabled.value,
    wechatEnabled: wechatEnabled.value,
    termsText: termsText.value,
    showWechatCount: showWechatCount.value,
  });
};
</script>

<style scoped lang="less">
.settings-section {
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.description {
  margin-bottom: 24px;

  padding: 10px;
  background-color: #eee;
  width: max-content;
  border-radius: 4px;
  .desc-title {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
  }

  .desc-list {
    margin: 0;
    padding-left: 16px;

    li {
      font-size: 13px;
      color: #888;
      line-height: 1.5;
      margin-bottom: 4px;
    }
  }
}

.switch-settings {
  margin-bottom: 24px;

  .switch-item {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    gap: 8px;

    .switch-label {
      font-size: 14px;
      color: #333;
      min-width: 100px;
    }

    .switch-desc {
      font-size: 12px;
      color: #666;
      margin-left: 8px;
    }
  }
}

.terms-section {
  margin-bottom: 24px;

  .terms-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    gap: 12px;

    .terms-label {
      font-size: 14px;
      color: #333;
    }

    .terms-count {
      font-size: 12px;
      color: #999;
    }

    .example-link {
      font-size: 12px;
      color: #1890ff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.wechat-display {
  margin-bottom: 32px;
  display: flex;
  gap: 20px;

  .display-label {
    font-size: 14px;
    color: #333;
    margin-bottom: 8px;
  }

  .display-options {
    margin-bottom: 8px;
  }

  .display-desc {
    font-size: 12px;
    color: #666;
  }
}

.save-section {
  border-top: 1px solid #f0f0f0;
  padding-top: 20px;
  margin-left: 100px;
}

.preview-section {
  width: 320px;
  margin-left: 100px;
  flex-shrink: 0;
}

.phone-mockup {
  position: sticky;
  top: 20px;
}

.phone-frame {
  width: 280px;
  height: 560px;
  background: #000;
  border-radius: 25px;
  padding: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  .phone-header {
    background: #000;
    color: white;
    border-radius: 17px 17px 0 0;

    .status-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px 4px;
      font-size: 14px;
      font-weight: 600;

      .signal-battery {
        display: flex;
        gap: 4px;
        font-size: 12px;
      }
    }

    .nav-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px 12px;

      .title {
        font-size: 16px;
        font-weight: 500;
      }

      .back-btn,
      .more-btn {
        font-size: 18px;
        cursor: pointer;
      }
    }
  }

  .phone-content {
    background: #f0f0f0;
    height: calc(100% - 80px);
    border-radius: 0 0 17px 17px;
    overflow: hidden;
  }
}

.live-preview {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 200px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .live-info {
    text-align: center;
    color: white;

    .live-time {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
      justify-content: center;

      .time-label {
        background: rgba(255, 255, 255, 0.2);
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 16px;
        font-weight: bold;
        min-width: 32px;
      }
    }

    .reserve-btn {
      background: #1890ff;
      border: none;
      border-radius: 20px;
      padding: 8px 24px;
      font-size: 14px;

      &:hover {
        background: #40a9ff;
      }
    }
  }
}

.chat-area {
  height: calc(100% - 200px);
  background: white;

  .chat-placeholder {
    height: 100%;
    background: linear-gradient(to bottom, #e3f2fd, #bbdefb);
  }
}
</style>
