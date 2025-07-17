<template>
  <div class="compliance-settings">
    <!-- 观众合规设置 -->
    <div class="section">
      <h2 class="section-title">观众合规设置</h2>

      <div class="card-grid">
        <!-- 防录屏 -->
        <div class="setting-card">
          <div class="card-icon purple">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
          </div>
          <div class="card-content">
            <h3 class="card-title">防录屏</h3>
            <p class="card-desc">添加跑马灯、水印、如内容涉黄可快速追踪录屏出处</p>
          </div>
        </div>

        <!-- 风险等级测评 -->
        <div class="setting-card">
          <div class="card-icon yellow">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="currentColor"
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
          </div>
          <div class="card-content">
            <h3 class="card-title">风险等级测评</h3>
            <p class="card-desc">观众风险评估，限制观众观看直播</p>
          </div>
        </div>

        <!-- 投诉反馈 -->
        <div class="setting-card">
          <div class="card-icon blue">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM13 17h-2v-6h2v6zm0-8h-2V7h2v2z"
              />
            </svg>
          </div>
          <div class="card-content">
            <h3 class="card-title">投诉反馈</h3>
            <p class="card-desc">观众在直播间进行投诉的设置</p>
          </div>
        </div>

        <!-- 严禁词屏蔽 -->
        <div class="setting-card active">
          <div class="card-icon orange">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              />
            </svg>
          </div>
          <div class="card-content">
            <h3 class="card-title">严禁词屏蔽</h3>
            <p class="card-desc">自动拦截直播违规词汇，保障内容合规</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 宣传合规设置 -->
    <div class="section">
      <h2 class="section-title">宣传合规设置</h2>

      <div class="card-grid">
        <!-- 直播内容风险识别 -->
        <div class="setting-card">
          <div class="card-icon green">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="currentColor"
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
          </div>
          <div class="card-content">
            <h3 class="card-title">直播内容风险识别</h3>
            <p class="card-desc">识别视频画面中的敏感违规内容，构建合规直播</p>
            <div class="card-tag">未开通</div>
          </div>
        </div>

        <!-- 音频风险识别 -->
        <div class="setting-card">
          <div class="card-icon orange">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="currentColor"
                d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"
              />
            </svg>
          </div>
          <div class="card-content">
            <h3 class="card-title">音频风险识别</h3>
            <p class="card-desc">对直播音频内容精准检测识别，降低内容违规风险</p>
            <div class="card-tag">未开通</div>
          </div>
        </div>

        <!-- 主播嘉宾合规提醒 -->
        <div class="setting-card">
          <div class="card-icon yellow">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 19c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"
              />
            </svg>
          </div>
          <div class="card-content">
            <h3 class="card-title">主播嘉宾合规提醒</h3>
            <p class="card-desc">开播前对主播嘉宾进行必要的风险告知，合规教育</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面逻辑
</script>

<style lang="less" scoped>
.compliance-settings {
  padding: 20px;
  padding-bottom: 60px; // 增加底部内边距
  min-height: calc(100vh - 60px); // 调整最小高度，留出底部空间
  box-sizing: border-box;

  .section {
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .section-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 20px;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
    margin-bottom: 20px; // 为最后一个网格添加底部边距
  }

  .setting-card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    position: relative;

    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }

    &.active {
      border-color: #1890ff;
      background: #f6f9ff;
    }

    .card-icon {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      color: white;

      &.purple {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }

      &.yellow {
        background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%);
      }

      &.blue {
        background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
      }

      &.orange {
        background: linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%);
      }

      &.green {
        background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
      }

      svg {
        width: 24px;
        height: 24px;
      }
    }

    .card-content {
      .card-title {
        font-size: 16px;
        font-weight: 600;
        color: #333;
        margin-bottom: 8px;
      }

      .card-desc {
        font-size: 14px;
        color: #666;
        line-height: 1.5;
        margin-bottom: 12px;
      }

      .card-tag {
        display: inline-block;
        background: #f0f0f0;
        color: #999;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 12px;
        position: absolute;
        top: 16px;
        right: 16px;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .compliance-settings {
    padding: 12px;
    padding-bottom: 80px; // 移动端增加更多底部空间

    .card-grid {
      grid-template-columns: 1fr;
      gap: 12px;
      margin-bottom: 20px;
    }

    .setting-card {
      padding: 16px;

      .card-icon {
        width: 40px;
        height: 40px;
        margin-bottom: 12px;

        svg {
          width: 20px;
          height: 20px;
        }
      }

      .card-content {
        .card-title {
          font-size: 14px;
        }

        .card-desc {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
