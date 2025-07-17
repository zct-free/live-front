<template>
  <div class="audience-settings">
    <!-- 播放器密码 -->
    <div class="setting-item">
      <div class="setting-label">播放器密码：</div>
      <div class="setting-content">
        <a-switch v-model:checked="settings.playerPassword" />
        <span class="setting-desc">更新开关状态和密码后5分钟生效</span>
      </div>
    </div>

    <!-- 授权认证URL -->
    <div class="setting-item">
      <div class="setting-label">授权认证URL：</div>
      <div class="setting-content">
        <a-input v-model:value="settings.authUrl" placeholder="请输入地址" style="width: 400px; margin-right: 12px" />
        <a-button type="link">接口文档</a-button>
        <div class="setting-desc">设置后，用户只能够通过设置的认证URL观看直播</div>
      </div>
    </div>

    <!-- 播放网站限制 -->
    <div class="setting-item">
      <div class="setting-label">播放网站限制：</div>
      <div class="setting-content">
        <a-radio-group v-model:value="settings.websiteRestriction">
          <a-radio value="none">不设置</a-radio>
          <a-radio value="blacklist">黑名单</a-radio>
          <a-radio value="whitelist">白名单</a-radio>
        </a-radio-group>
      </div>
    </div>

    <!-- 纯视频选择屏幕方案 -->
    <div class="setting-item">
      <div class="setting-label">纯视频选择屏幕方案：</div>
      <div class="setting-content">
        <a-radio-group v-model:value="settings.screenSolution">
          <a-radio value="allow">允许播放器全屏</a-radio>
          <a-radio value="deny">不允许播放器全屏（默认）</a-radio>
        </a-radio-group>
        <div class="setting-desc">
          如允许播放器全屏，当直播或回放视频画面比例例如 > 高时，将显示全屏按钮，反之不显示
        </div>
      </div>
    </div>

    <!-- 播放器全屏辅助方案 -->
    <div class="setting-item">
      <div class="setting-label">播放器全屏辅助方案：</div>
      <div class="setting-content">
        <a-radio-group v-model:value="settings.fullscreenAssist">
          <a-radio value="webpage">网页全屏</a-radio>
          <a-radio value="system">系统全屏</a-radio>
        </a-radio-group>
        <div class="setting-desc">
          系统全屏: 是指在屏幕显示区域范围内全屏，播放器界面为系统自带的界面，此时会看不到跑马灯等功能
        </div>
      </div>
    </div>
    <div style="text-align: center">
      <img src="@/assets/images/bfsz.png" alt="" style="width: 375px; height: 174px" />
    </div>

    <!-- 播放器预览图
    <div class="player-preview">
      <div class="preview-container">
        <div class="video-player">
          <div class="video-content">
            <img src="https://via.placeholder.com/640x360" alt="视频预览" />
          </div>
          <div class="player-controls">
            <div class="control-left">
              <div class="control-btn play-btn">▶</div>
              <div class="control-btn">⏸</div>
              <div class="control-btn">⏮</div>
              <div class="time-display">0:00</div>
            </div>
            <div class="control-center">
              <div class="progress-bar">
                <div class="progress-track"></div>
                <div class="progress-fill"></div>
              </div>
            </div>
            <div class="control-right">
              <div class="control-btn volume-btn">🔊</div>
              <div class="control-btn fullscreen-btn">⛶</div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- 保存按钮 -->
    <div class="save-section">
      <a-button type="primary" size="large" @click="handleSave"> 保存 </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { reactive } from "vue";

// 设置数据
const settings = reactive({
  playerPassword: false,
  authUrl: "",
  websiteRestriction: "none",
  screenSolution: "deny",
  fullscreenAssist: "system",
});

// 处理保存
const handleSave = () => {
  message.success("观众设置已保存");
};
</script>

<style lang="less" scoped>
.audience-settings {
  padding: 24px;
  background: white;
  border-radius: 8px;

  .setting-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 32px;
    gap: 16px;

    &:last-child {
      margin-bottom: 0;
    }

    .setting-label {
      font-size: 14px;
      color: #333;
      font-weight: 500;
      min-width: 140px;
      padding-top: 6px;
    }

    .setting-content {
      flex: 1;

      .setting-desc {
        font-size: 12px;
        color: #666;
        margin-top: 8px;
        display: block;
        line-height: 1.5;
      }

      .ant-radio-group {
        display: flex;
        gap: 24px;

        .ant-radio {
          white-space: nowrap;
        }
      }
    }
  }

  .player-preview {
    margin: 40px 0;
    display: flex;
    justify-content: center;

    .preview-container {
      width: 640px;
      background: #000;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

      .video-player {
        position: relative;

        .video-content {
          width: 100%;
          height: 360px;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .player-controls {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          gap: 12px;

          .control-left {
            display: flex;
            align-items: center;
            gap: 8px;

            .control-btn {
              width: 24px;
              height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              border-radius: 4px;
              transition: background 0.2s;

              &:hover {
                background: rgba(255, 255, 255, 0.1);
              }
            }

            .time-display {
              font-size: 12px;
              color: #ccc;
              margin-left: 8px;
            }
          }

          .control-center {
            flex: 1;
            margin: 0 16px;

            .progress-bar {
              height: 4px;
              background: rgba(255, 255, 255, 0.2);
              border-radius: 2px;
              position: relative;
              cursor: pointer;

              .progress-fill {
                height: 100%;
                width: 30%;
                background: #1890ff;
                border-radius: 2px;
              }
            }
          }

          .control-right {
            display: flex;
            align-items: center;
            gap: 8px;

            .control-btn {
              width: 24px;
              height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              border-radius: 4px;
              transition: background 0.2s;

              &:hover {
                background: rgba(255, 255, 255, 0.1);
              }
            }
          }
        }
      }
    }
  }

  .save-section {
    display: flex;
    justify-content: center;
    margin: 40px;
    padding-top: 24px;
    border-top: 1px solid #e8e8e8;
  }
}
</style>
