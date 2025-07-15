<template>
  <div class="channel-settings">
    <div class="page-header">
      <h2 class="page-title">频道设置</h2>
    </div>

    <div class="settings-container">
      <!-- 最高同时在线人数修改 -->
      <div class="setting-item">
        <div class="setting-label">最高同时在线人数修改：</div>
        <a-switch v-model:checked="settings.maxOnlineModify" />
        <span class="setting-desc">关闭后，使用频道号登录时将不支持修改最高同时在线人数</span>
      </div>

      <!-- 打赏 -->
      <div class="setting-item">
        <div class="setting-label">打赏：</div>
        <a-switch v-model:checked="settings.reward" />
        <span class="setting-desc">关闭后，所有频道将无法使用打赏功能</span>
      </div>

      <!-- 重制脚件 - 自动重制 -->
      <div class="setting-item">
        <div class="setting-label">重制脚件 - 自动重制：</div>
        <a-switch v-model:checked="settings.autoRestart" />
        <span class="setting-desc">开启后，将直播备存添加到回放列表将自动开启重制任务</span>
      </div>

      <!-- 重制脚件 - PPT镜满 -->
      <div class="setting-item">
        <div class="setting-label">重制脚件 - PPT镜满：</div>
        <a-switch v-model:checked="settings.pptMirrorFull" />
        <span class="setting-desc"
          >该设置仅对视频布局三分屏生效，开启后，PPT会铺满视频画面，整体视频时比例会调整为21:9</span
        >
      </div>

      <!-- 播放器封面设置 -->
      <div class="setting-item">
        <div class="setting-label">播放器封面设置：</div>
        <div class="setting-content">
          <a-radio-group v-model:value="settings.playerCover">
            <a-radio value="auto">等比缩放</a-radio>
            <a-radio value="stretch">拉伸</a-radio>
          </a-radio-group>
          <div class="setting-desc">播放器比例变化时，播放器封面比例调整策略</div>
        </div>
      </div>

      <!-- 研讨会主持人离开结束直播 -->
      <div class="setting-item">
        <div class="setting-label">研讨会主持人离开结束直播：</div>
        <a-switch v-model:checked="settings.hostLeaveEndLive" />
        <span class="setting-desc">主持人离开直播间一段时间后，直播强制结束</span>
      </div>

      <!-- 测试模式显示 -->
      <div class="setting-item">
        <div class="setting-label">测试模式显示：</div>
        <a-switch v-model:checked="settings.testModeDisplay" />
        <span class="setting-desc">关闭后，直播监控、助教端将不再显示测试模式入口</span>
      </div>

      <!-- 现金红包发放方式 -->
      <div class="setting-item">
        <div class="setting-label">现金红包发放方式：</div>
        <div class="setting-content">
          <div>
            <a-radio value="manual">手动提现</a-radio>
            <span class="manual-desc"> 关闭后，直播监控、助教端将不再显示测试模式入口 </span>
          </div>
          <div>
            <a-radio value="auto">自动发放</a-radio>
            <span class="auto-desc"> 一轮抢红包活动结束10分钟后，红包将自动发放到用户的微信零钱 </span>
          </div>
        </div>
      </div>

      <!-- 预付现金红包 -->
      <div class="setting-item">
        <div class="setting-label">预付现金红包：</div>
        <a-switch v-model:checked="settings.prepaidCashRedPacket" />
        <span class="setting-desc">开启后，所有频道预设现金红包需先向商户号付款</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { reactive } from "vue";

// 设置数据
const settings = reactive({
  maxOnlineModify: true,
  reward: true,
  autoRestart: false,
  pptMirrorFull: false,
  playerCover: "stretch",
  hostLeaveEndLive: false,
  testModeDisplay: true,
  cashRedPacketMethod: "manual",
  prepaidCashRedPacket: true,
});

// 处理保存
const handleSave = () => {
  message.success("频道设置已保存");
};
</script>

<style lang="less" scoped>
.channel-settings {
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

  .setting-item {
    display: flex;
    margin-bottom: 20px;
    gap: 20px;
    align-items: center;

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }

    .setting-label {
      font-size: 14px;
      color: #333;
      font-weight: 500;
      min-width: 200px;
      padding-top: 6px;
      flex-shrink: 0;
      width: 150px;
      text-align: right;
    }

    .setting-content {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .setting-desc {
        font-size: 12px;
        color: #666;
        line-height: 1.5;
        margin-top: 8px;
      }

      .manual-desc,
      .auto-desc {
        font-size: 12px;
        color: #666;
        line-height: 1.5;
        margin-top: 8px;
        padding-left: 24px;
      }

      .ant-radio-group {
        display: flex;
        gap: 32px;

        .ant-radio {
          white-space: nowrap;
        }
      }

      .ant-switch {
        margin-bottom: 8px;
      }
    }
  }

  .save-section {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px solid #e8e8e8;
  }
}
</style>
