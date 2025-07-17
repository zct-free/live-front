<template>
  <div class="chat-settings">
    <!-- 聊天室 -->
    <div class="section">
      <h2 class="section-title">聊天室</h2>

      <!-- 观众发言与互动 -->
      <div class="subsection">
        <h3 class="subsection-title">观众发言与互动</h3>

        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">观众发言：</span>
            <a-switch v-model:checked="settings.audienceSpeak" />
          </div>
          <div class="setting-desc">开启后，观众可以在聊天室发言</div>
        </div>

        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">引用回复：</span>
            <a-switch v-model:checked="settings.quoteReply" />
          </div>
          <div class="setting-desc">开启后，观众可以引用其他消息进行回复</div>
        </div>

        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">公聊发送图片：</span>
            <a-switch v-model:checked="settings.publicChatImage" />
          </div>
          <div class="setting-desc">开启后，观众可以在公聊中发送图片</div>
        </div>

        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">提问：</span>
            <a-switch v-model:checked="settings.question" />
          </div>
          <div class="setting-desc">开启后，观众可以在聊天室提问</div>
        </div>

        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">提问发送图片：</span>
            <a-switch v-model:checked="settings.questionImage" />
          </div>
          <div class="setting-desc">开启后，观众可以在提问时发送图片</div>
        </div>

        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">问答：</span>
            <a-switch v-model:checked="settings.qa" />
          </div>
          <div class="setting-desc">开启后，观众可以在聊天室提问，您可以回答相关问题</div>
        </div>

        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">点赞：</span>
            <a-switch v-model:checked="settings.like" />
          </div>
          <div class="setting-desc">开启后，观众可以对直播进行点赞</div>
        </div>

        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">只看主播/助教嘉宾：</span>
            <a-switch v-model:checked="settings.onlyStreamerGuest" />
          </div>
          <div class="setting-desc">开启后，观众只能看到主播和助教嘉宾的消息</div>
        </div>

        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">观众端在线人数显示：</span>
            <a-switch v-model:checked="settings.onlineUserCount" />
          </div>
          <div class="setting-desc">开启后，观众可以看到在线人数</div>
        </div>
      </div>

      <!-- 消息特效 -->
      <div class="subsection subsection-2">
        <h3 class="subsection-title">消息特效</h3>

        <!-- 访问特效 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">访问特效：</span>
            <a-switch v-model:checked="settings.visitEffect" />
          </div>
          <div class="setting-content">
            <div class="setting-sub-item">
              <span class="sub-label">用户访问提醒间隔：</span>
              <a-link>示例</a-link>
            </div>
            <div class="visit-settings">
              <div class="visit-option">
                <span class="visit-label">欢迎</span>
                <a-tag color="blue">用户昵称</a-tag>
                <span class="visit-text">加入</span>
                <span class="visit-count">4/10</span>
              </div>
              <div class="visit-actions">
                <a-button size="small">+ 用户昵称</a-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 购买转化特效 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">购买转化特效：</span>
            <a-switch v-model:checked="settings.purchaseEffect" />
          </div>
          <div class="setting-content">
            <div class="setting-sub-item">
              <span class="sub-label">用户点击商品：</span>
              <a-link>示例</a-link>
            </div>

            <div class="purchase-settings">
              <div class="purchase-option">
                <span class="purchase-label">普通商品</span>
                <a-tag color="blue">用户昵称</a-tag>
                <span class="purchase-text">正在购买</span>
                <a-tag color="green">产品名称</a-tag>
                <span class="purchase-count">4/10</span>
              </div>
              <div class="purchase-actions">
                <a-button size="small">+ 用户昵称</a-button>
                <a-button size="small">+ 产品名称</a-button>
              </div>
            </div>

            <div class="purchase-settings">
              <div class="purchase-option">
                <span class="purchase-label">金融商品</span>
                <a-tag color="blue">用户昵称</a-tag>
                <span class="purchase-text">正在选购</span>
                <a-tag color="green">产品名称</a-tag>
                <span class="purchase-count">4/10</span>
              </div>
              <div class="purchase-actions">
                <a-button size="small">+ 用户昵称</a-button>
                <a-button size="small">+ 产品名称</a-button>
              </div>
            </div>

            <div class="purchase-settings">
              <div class="purchase-option">
                <span class="purchase-label">即时商品</span>
                <a-tag color="blue">用户昵称</a-tag>
                <span class="purchase-text">正在抢购</span>
                <a-tag color="green">产品名称</a-tag>
                <span class="purchase-count">4/10</span>
              </div>
              <div class="purchase-actions">
                <a-button size="small">+ 用户昵称</a-button>
                <a-button size="small">+ 产品名称</a-button>
              </div>
            </div>

            <div class="setting-sub-item">
              <span class="sub-label">用户下单成功：</span>
              <QuestionCircleOutlined style="margin-right: 4px; color: #999" />
              <a-link>示例</a-link>
            </div>

            <div class="purchase-settings">
              <div class="purchase-option">
                <span class="purchase-label">普通商品</span>
                <a-tag color="blue">用户昵称</a-tag>
                <span class="purchase-text">下单了</span>
                <a-tag color="green">产品名称</a-tag>
                <span class="purchase-count">3/10</span>
              </div>
              <div class="purchase-actions">
                <a-button size="small">+ 用户昵称</a-button>
                <a-button size="small">+ 产品名称</a-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 互动庆祝特效 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">互动庆祝特效：</span>
            <a-switch v-model:checked="settings.interactionEffect" />
          </div>
          <div class="setting-content">
            <div class="setting-sub-item">
              <span class="sub-label">用户受到成功：</span>
              <a-link>示例</a-link>
            </div>

            <div class="interaction-settings">
              <div class="interaction-option">
                <a-tag color="blue">用户昵称</a-tag>
                <span class="interaction-text">签到成功</span>
                <span class="interaction-count">4/10</span>
              </div>
              <div class="interaction-actions">
                <a-button size="small">+ 用户昵称</a-button>
              </div>
            </div>

            <div class="setting-sub-item">
              <span class="sub-label">用户打赏成功：</span>
              <span class="sub-desc">暂不支持自定义文案</span>
              <a-link>示例</a-link>
            </div>
          </div>
        </div>
      </div>

      <!-- 主播助教管理权限 -->
      <div class="subsection subsection-3">
        <h3 class="subsection-title">主讲/主教/嘉宾管理</h3>

        <div class="setting-item">
          <div class="setting-label">消息上墙：</div>
          <a-switch v-model:checked="settings.muteLimit" />
          <div class="setting-desc">开启后，支持将聊天消息弹窗展示在直播画面中</div>
        </div>

        <div class="setting-item">
          <div class="setting-label">提醒</div>
          <a-switch v-model:checked="settings.kick" />
          <div class="setting-desc">开启后，主讲，嘉宾，助教支持相互提醒(该功能仅支持客户端开播和网页开播)</div>
        </div>

        <div class="setting-item">
          <div class="setting-label">课堂激励：</div>
          <a-switch v-model:checked="settings.muteAssistant" />
          <div class="setting-desc">
            开启后，主讲，嘉宾，助教可给学员在连麦，聊天中点赞，用于触发学员直播关注力和趣味性
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-label">点赞语提示</div>
          <a-switch v-model:checked="settings.contentReview" />
          <div class="setting-desc">开启后，观众点赞时，聊天室增加提示：“XX观众觉得主持人讲得好棒”</div>
        </div>

        <div class="setting-item">
          <div class="setting-label">到勤名单</div>
          <a-switch v-model:checked="settings.resolve" />
          <div class="setting-desc">开启后，在"观看限制"页面配置白名单后，即可在直播间查看到勤名单和缺勤名单</div>
        </div>

        <div class="setting-item">
          <span class="setting-label">主讲端在线人数显示</span>
          <a-switch v-model:checked="settings.streamerBackendPermission" />
          <span class="setting-desc">开启后，主讲端将显示在线人数 </span>
        </div>

        <div class="setting-item">
          <span class="setting-label">助教页聊天室显示虚拟人标识</span>
          <a-switch v-model:checked="settings.contentManager" />
          <span class="setting-desc">开启后，助教可在聊天区看到气氛助手的互动发言的虚拟人标识 </span>
        </div>
      </div>

      <!-- 其他 -->
      <div class="subsection subsection-3">
        <h3 class="subsection-title">其他</h3>

        <div class="setting-item">
          <span class="setting-label">自定义消息</span>
          <a-switch v-model:checked="settings.chatHabit" />
          <span class="setting-desc">开启后，可以自定义聊天消息发送样式，只支持SDK接入，主讲端暂不支持</span>
        </div>

        <div class="setting-item">
          <span class="setting-label">直播结束回收问卷： </span>
          <a-switch v-model:checked="settings.audienceQuickMessage" />
          <span class="setting-desc">开启后，在直播结束时会自动回收问卷 </span>
        </div>

        <div class="setting-item">
          <span class="setting-label">直播结束停止答题卡： </span>
          <a-switch v-model:checked="settings.publicChatWordLimit" />
          <span class="setting-desc">开启后，在直播结束时会自动停止答题卡互动 </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { reactive } from "vue";

// 设置数据
const settings = reactive({
  // 观众发言与互动
  audienceSpeak: true,
  quoteReply: false,
  publicChatImage: false,
  question: true,
  questionImage: false,
  qa: false,
  like: true,
  onlyStreamerGuest: false,
  onlineUserCount: true,

  // 消息特效
  visitEffect: true,
  purchaseEffect: true,
  interactionEffect: true,

  // 主播助教管理权限
  muteLimit: true,
  kick: false,
  muteAssistant: false,
  contentReview: true,
  resolve: false,
  streamerBackendPermission: true,
  contentManager: true,

  // 其他
  chatHabit: true,
  audienceQuickMessage: false,
  publicChatWordLimit: false,
});

// 保存设置
const handleSave = () => {
  message.success("设置保存成功");
  console.log("保存的设置:", settings);
};
</script>

<style lang="less" scoped>
.chat-settings {
  padding: 20px;
  min-height: 100vh;

  .section {
    background: white;
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 24px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;
  }

  .subsection {
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .subsection-title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    margin-bottom: 20px;
    padding-left: 8px;
    border-left: 3px solid #1890ff;
  }

  .setting-item {
    display: flex;
    margin-bottom: 16px;

    &:last-child {
      border-bottom: none;
    }

    .setting-main {
      display: flex;
      align-items: center;
      margin-bottom: 12px;

      .setting-label {
        min-width: 120px;
        width: 150px;
        font-size: 14px;
        color: #333;
        margin-right: 12px;
        line-height: 32px;
        text-align: right;
      }

      .ant-switch {
        margin-right: 12px;
      }
    }

    .setting-content {
      padding-left: 0;
    }

    .setting-desc {
      font-size: 13px;
      color: #666;
    }

    .setting-sub-item {
      display: flex;
      align-items: center;
      margin-bottom: 8px;

      .sub-label {
        font-size: 13px;
        color: #666;
        margin-right: 8px;
      }

      .sub-desc {
        font-size: 13px;
        color: #999;
        margin-right: 8px;
      }
    }

    .barrage-input {
      margin-top: 8px;
      margin-left: 32px;
      width: 300px;
    }

    .barrage-options {
      margin-top: 8px;
      margin-left: 32px;
      padding: 8px;
      background: #fafafa;
      border-radius: 4px;
      margin-bottom: 8px;

      .option-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;

        .option-text {
          font-size: 13px;
          color: #666;
        }

        .option-desc {
          font-size: 13px;
          color: #999;
        }
      }

      .option-actions {
        display: flex;
        gap: 8px;
      }
    }

    // 新增样式 - 访问特效
    .visit-settings {
      margin-top: 8px;
      padding: 8px;
      border-radius: 4px;
      margin-bottom: 8px;

      .visit-option {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        border: 1px solid #e0e0e0;
        padding: 5px;
        width: 500px;

        .visit-label {
          font-size: 13px;
          color: #333;
        }

        .visit-text {
          font-size: 13px;
          color: #666;
        }

        .visit-count {
          font-size: 13px;
          color: #999;
        }
      }

      .visit-actions {
        display: flex;
        gap: 8px;
      }
    }

    // 新增样式 - 购买转化特效
    .purchase-settings {
      margin-top: 8px;
      padding: 8px;
      border-radius: 4px;
      margin-bottom: 8px;

      .purchase-option {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        border: 1px solid #e0e0e0;
        width: 500px;
        padding: 5px;

        .purchase-label {
          font-size: 13px;
          color: #333;
        }

        .purchase-text {
          font-size: 13px;
          color: #666;
        }

        .purchase-count {
          font-size: 13px;
          color: #999;
        }
      }

      .purchase-actions {
        display: flex;
        gap: 8px;
      }
    }

    // 新增样式 - 互动庆祝特效
    .interaction-settings {
      margin-top: 8px;
      padding: 8px;
      border-radius: 4px;
      margin-bottom: 8px;

      .interaction-option {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        border: 1px solid #e0e0e0;
        padding: 5px;
        width: 500px;

        .interaction-text {
          font-size: 13px;
          color: #666;
        }

        .interaction-count {
          font-size: 13px;
          color: #999;
        }
      }

      .interaction-actions {
        display: flex;
        gap: 8px;
      }
    }
  }

  .save-section {
    text-align: center;
    padding: 24px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .chat-settings {
    padding: 12px;

    .section {
      padding: 16px;
    }

    .setting-item {
      flex-direction: column;
      align-items: flex-start;

      .setting-label {
        margin-bottom: 8px;
        line-height: 1.5;
      }

      .ant-switch {
        margin-bottom: 8px;
      }

      .setting-desc {
        line-height: 1.5;
      }

      .setting-sub-item {
        margin-left: 0;
      }

      .barrage-input {
        margin-left: 0;
        width: 100%;
      }

      .barrage-options {
        margin-left: 0;
      }
    }
  }
}
.subsection-2 {
  .setting-item {
    display: flex;
    flex-direction: column;
    .setting-content {
      margin-left: 150px;
    }
  }
}
.subsection-3 {
  .setting-item {
    text-align: right;
    margin-left: 30px;
    gap: 5px;
    align-items: center;
    .setting-label {
      width: 150px;
      text-align: right;
    }
  }
}
</style>
