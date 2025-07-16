<template>
  <div class="share-settings">
    <div class="page-header">
      <div>入口文案：</div>
      <a-input v-model:value="formData.customTitle" maxlength="8" style="width: 320px" placeholder="+关注" />
      <span class="form-desc">{{ formData.customTitle.length }}/8</span>
    </div>
    <div style="display: flex; justify-content: space-between">
      <div class="share-form">
        <div class="custom-form-item" style="margin-bottom: 24px; display: flex">
          <span class="switch-label" style="width: 80px">二维码：</span>
          <div class="share-icon-upload ewm-icon">
            <div class="upload-area">
              <div class="default-icon">
                <span class="icon-placeholder">+</span>
              </div>
            </div>
          </div>
        </div>

        <div class="custom-form-item" style="margin-bottom: 16px">
          <span class="param-label" style="width: 120px">移动端-弹窗文案：</span>
          <a-input
            v-model:value="formData.mobileText"
            maxlength="30"
            style="width: 320px"
            placeholder="长按关注公众号"
          />
          <span class="form-desc">{{ (formData.mobileText || "").length }}/30</span>
        </div>

        <div class="custom-form-item" style="margin-bottom: 16px">
          <span class="param-label" style="width: 120px">PC-弹窗文案：</span>
          <a-input v-model:value="formData.pcText" maxlength="30" style="width: 320px" placeholder="扫码关注公众号" />
          <span class="form-desc">{{ (formData.pcText || "").length }}/30</span>
        </div>

        <div class="custom-form-item" style="margin-bottom: 24px">
          <span class="switch-label" style="width: 80px">主动弹窗：</span>
          <a-switch v-model:checked="formData.activePopup" />
          <span class="form-desc">开启后，打开观看页会主动弹窗显示二维码</span>
        </div>

        <a-button type="primary" @click="handleSave">确定保存</a-button>
      </div>

      <div class="pre-box">
        <div class="top-box">
          <span style="margin-right: 8px">手机</span>
          <span style="color: #999">电脑</span>
        </div>
        <img src="" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { reactive } from "vue";

// 当前活动的标签页

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
    padding-bottom: 20px;
    border-bottom: 1px dashed #e8e8e8;

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
.ewm-icon {
  width: 80px;
  height: 80px;
  background-color: #f2f3f5;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pre-box {
  .top-box {
    display: flex;
    padding: 5px 10px;
    gap: 20px;
    justify-content: center;
  }
}
</style>
