<template>
  <div class="share-settings">
    <div class="page-header">
      <div>分享：</div>
      <a-switch v-model:checked="formData.shareEnabled" />
      <span class="form-desc">关闭后，观众将无法分享以及传播中的分享功能</span>
    </div>
    <a-form
      :model="formData"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      layout="horizontal"
      class="share-form"
    >
      <!-- 分享开关 -->

      <!-- 分享类型选择 -->
      <div class="share-type-section">
        <div class="share-type-tabs">
          <a-button :type="activeTab === 'wechat' ? 'primary' : 'default'" @click="activeTab = 'wechat'">
            微信分享
          </a-button>
          <a-button :type="activeTab === 'webpage' ? 'primary' : 'default'" @click="activeTab = 'webpage'">
            网页分享
          </a-button>
        </div>

        <!-- 微信分享内容 -->
        <div v-if="activeTab === 'wechat'" class="share-content">
          <a-alert
            message="微信好友进入直播间时，分享时显示直播间简介标题和简介卡片"
            type="info"
            show-icon
            style="margin-bottom: 20px"
          />

          <div class="share-preview-section">
            <div class="form-section">
              <!-- 分享图标 -->
              <a-form-item label="分享图标：">
                <div class="share-icon-upload">
                  <div class="upload-area">
                    <div class="default-icon">
                      <div class="icon-placeholder">P</div>
                    </div>
                  </div>
                  <a-button type="primary" size="small" style="margin-left: 12px"> 上传图片 </a-button>
                </div>
              </a-form-item>

              <!-- 标题 -->
              <a-form-item label="标题：">
                <a-radio-group v-model:value="formData.titleType">
                  <a-radio value="default">直播间标题</a-radio>
                  <a-radio value="custom">自定义</a-radio>
                </a-radio-group>
              </a-form-item>

              <!-- 回放时显示标题 -->
              <a-form-item label="">
                <div class="custom-form-item">
                  <a-switch v-model:checked="formData.showReplayTitle" />
                  <span class="switch-label">回放时显示标题</span>
                  <a-tooltip title="开启后，回放时会显示相应的标题">
                    <question-circle-outlined style="margin-left: 8px; color: #999" />
                  </a-tooltip>
                </div>
              </a-form-item>

              <!-- 简介 -->
              <a-form-item label="简介：">
                <a-textarea
                  v-model:value="formData.description"
                  placeholder="正在直播，非常不错哦，快来看看吧！"
                  :rows="4"
                  :maxlength="120"
                  show-count
                />
              </a-form-item>

              <!-- 分享地址 -->
              <a-form-item label="分享地址：">
                <a-input v-model:value="formData.shareUrl" placeholder="请输入自定义分享地址" :maxlength="512" />
                <div class="url-count">{{ formData.shareUrl.length }}/512</div>
                <a-button type="link" @click="handleResetUrl">重置</a-button>
              </a-form-item>

              <!-- 分享地址说明 -->
              <a-form-item label="">
                <div class="url-description">
                  <p>
                    配置后，微信分享界面将使用自定义地址，不能直接访问原官方地址，受微信消息限制，请明白这邀请链接，可能会被过滤，请谨慎配置
                  </p>
                </div>
              </a-form-item>

              <!-- 自定义地址携带分享参数 -->
              <a-form-item label="">
                <div class="custom-form-item">
                  <span class="param-label">自定义地址携带分享参数</span>
                  <a-tooltip title="开启后，分享链接将携带额外的分享参数">
                    <question-circle-outlined style="margin-left: 8px; color: #999" />
                  </a-tooltip>
                </div>
              </a-form-item>
            </div>

            <!-- 预览区域 -->
            <div class="preview-section">
              <div class="preview-header">
                <span>微信分享预览</span>
              </div>

              <div class="preview-content">
                <div class="share-preview-item">
                  <span class="preview-label">分享给好友：</span>
                  <div class="preview-card">
                    <div class="preview-icon">
                      <div class="icon-placeholder">P</div>
                    </div>
                    <div class="preview-text">
                      <div class="preview-title">直播间标题</div>
                      <div class="preview-desc">正在直播，非常不错哦，快来看看吧！</div>
                    </div>
                  </div>
                </div>

                <div class="share-preview-item">
                  <span class="preview-label">分享到朋友圈：</span>
                  <div class="preview-card">
                    <div class="preview-avatar">
                      <div class="avatar-placeholder">🐸</div>
                    </div>
                    <div class="preview-content-right">
                      <div class="preview-name">frog</div>
                      <div class="preview-moments">
                        <div class="preview-icon">
                          <div class="icon-placeholder">P</div>
                        </div>
                        <div class="preview-title">直播间标题</div>
                      </div>
                      <div class="preview-time">1分钟前</div>
                      <div class="preview-actions">⋯</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 网页分享内容 -->
        <div v-if="activeTab === 'webpage'" class="share-content">
          <p>网页分享配置内容</p>
        </div>
      </div>

      <!-- 保存按钮 -->
      <a-form-item :wrapper-col="{ offset: 4, span: 20 }">
        <a-button type="primary" @click="handleSave">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { reactive, ref } from "vue";

// 当前活动的标签页
const activeTab = ref("wechat");

// 表单数据
const formData = reactive({
  shareEnabled: true,
  titleType: "default", // default: 直播间标题, custom: 自定义
  showReplayTitle: false,
  description: "正在直播，非常不错哦，快来看看吧！",
  shareUrl: "",
  shareIcon: "",
  customTitle: "",
});

// 重置分享地址
const handleResetUrl = () => {
  formData.shareUrl = "";
  message.success("分享地址已重置");
};

// 保存设置
const handleSave = () => {
  console.log("保存分享设置:", formData);
  message.success("分享设置已保存");
};
</script>

<style scoped lang="less">
.share-settings {
  padding: 20px;
  .page-header {
    margin-bottom: 20px;
    display: flex;
    gap: 20px;

    h2 {
      margin: 0;
      color: #333;
      font-size: 20px;
      font-weight: 600;
    }
  }

  .share-form {
    .form-desc {
      margin-left: 12px;
      font-size: 12px;
      color: #666;
    }

    .share-type-section {
      margin-bottom: 24px;

      .share-type-tabs {
        display: flex;
        gap: 12px;
        margin-bottom: 20px;
      }

      .share-content {
        .share-preview-section {
          display: flex;
          gap: 40px;

          .form-section {
            flex: 1;
            max-width: 500px;

            .share-icon-upload {
              display: flex;
              align-items: center;

              .upload-area {
                width: 60px;
                height: 60px;
                border: 2px dashed #d9d9d9;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #fafafa;

                .default-icon {
                  .icon-placeholder {
                    width: 40px;
                    height: 40px;
                    background: #1890ff;
                    color: white;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    font-weight: bold;
                  }
                }
              }
            }

            .custom-form-item {
              display: flex;
              align-items: center;
              gap: 8px;

              .switch-label {
                font-size: 14px;
                color: #333;
              }

              .param-label {
                font-size: 14px;
                color: #333;
              }
            }

            .url-count {
              font-size: 12px;
              color: #999;
              margin-top: 4px;
            }

            .url-description {
              background: #f6f8fa;
              padding: 12px;
              border-radius: 4px;
              margin-top: 8px;

              p {
                margin: 0;
                font-size: 12px;
                color: #666;
                line-height: 1.5;
              }
            }
          }

          .preview-section {
            flex: 1;
            max-width: 400px;

            .preview-header {
              padding: 12px 16px;
              background: #f0f0f0;
              border-radius: 4px 4px 0 0;
              font-size: 14px;
              font-weight: 500;
              color: #333;
            }

            .preview-content {
              border: 1px solid #e8e8e8;
              border-top: none;
              padding: 16px;
              background: white;
              border-radius: 0 0 4px 4px;

              .share-preview-item {
                margin-bottom: 20px;

                &:last-child {
                  margin-bottom: 0;
                }

                .preview-label {
                  font-size: 12px;
                  color: #666;
                  margin-bottom: 8px;
                  display: block;
                }

                .preview-card {
                  display: flex;
                  align-items: flex-start;
                  gap: 12px;
                  padding: 12px;
                  border: 1px solid #e8e8e8;
                  border-radius: 4px;
                  background: #fafafa;

                  .preview-icon {
                    .icon-placeholder {
                      width: 40px;
                      height: 40px;
                      background: #1890ff;
                      color: white;
                      border-radius: 4px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: 16px;
                      font-weight: bold;
                    }
                  }

                  .preview-avatar {
                    .avatar-placeholder {
                      width: 40px;
                      height: 40px;
                      border-radius: 50%;
                      background: #52c41a;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: 20px;
                    }
                  }

                  .preview-text {
                    flex: 1;

                    .preview-title {
                      font-size: 14px;
                      color: #333;
                      margin-bottom: 4px;
                      font-weight: 500;
                    }

                    .preview-desc {
                      font-size: 12px;
                      color: #666;
                      line-height: 1.4;
                    }
                  }

                  .preview-content-right {
                    flex: 1;

                    .preview-name {
                      font-size: 14px;
                      color: #333;
                      margin-bottom: 8px;
                    }

                    .preview-moments {
                      display: flex;
                      align-items: center;
                      gap: 8px;
                      margin-bottom: 8px;

                      .preview-icon {
                        .icon-placeholder {
                          width: 30px;
                          height: 30px;
                          background: #1890ff;
                          color: white;
                          border-radius: 3px;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          font-size: 12px;
                          font-weight: bold;
                        }
                      }

                      .preview-title {
                        font-size: 12px;
                        color: #333;
                      }
                    }

                    .preview-time {
                      font-size: 11px;
                      color: #999;
                      margin-bottom: 4px;
                    }

                    .preview-actions {
                      font-size: 16px;
                      color: #999;
                      text-align: right;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .share-settings {
    padding: 12px;

    .share-form {
      padding: 16px;

      .share-type-section {
        margin-left: 0;

        .share-content {
          .share-preview-section {
            flex-direction: column;
            gap: 20px;

            .form-section {
              max-width: none;
            }

            .preview-section {
              max-width: none;
            }
          }
        }
      }
    }
  }
}
</style>
