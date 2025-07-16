<template>
  <div class="marketing-interaction">
    <!-- 营销互动标题 -->
    <div class="page-header">
      <h2 class="page-title">营销互动</h2>
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

    <!-- 打赏内容 -->
    <div class="content-section" v-if="activeTab === 'reward'">
      <!-- 现金打赏 -->
      <div class="reward-section">
        <div class="section-header">
          <div class="section-info">
            <span class="section-label">现金打赏：</span>
            <a-switch v-model:checked="settings.cashReward" />
          </div>
          <a-button type="primary" @click="handleCashSettings">设置</a-button>
        </div>

        <div class="reward-config" v-if="settings.cashReward">
          <div class="config-item">
            <span class="config-label">最低打赏金额：</span>
            <a-input-number
              v-model:value="settings.minRewardAmount"
              :min="0.01"
              :step="0.01"
              :precision="2"
              addon-before="¥"
            />
          </div>

          <div class="preset-amounts">
            <span class="config-label">预设：</span>
            <div class="amount-grid">
              <div v-for="(amount, index) in settings.presetAmounts" :key="index" class="amount-item">
                <div class="gift-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path
                      fill="#ff6b6b"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                </div>
                <div class="amount-text">¥{{ amount }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 礼物打赏 -->
      <div class="reward-section">
        <div class="section-header">
          <div class="section-info">
            <span class="section-label">礼物打赏：</span>
            <a-switch v-model:checked="settings.giftReward" />
          </div>
          <a-button type="primary" @click="handleGiftSettings">设置</a-button>
        </div>

        <div class="gift-config" v-if="settings.giftReward">
          <div class="config-item">
            <span class="config-label">支付方式：</span>
            <div class="payment-methods">
              <a-button
                :type="settings.paymentMethod === 'balance' ? 'primary' : 'default'"
                @click="settings.paymentMethod = 'balance'"
              >
                现金支付
              </a-button>
              <a-button
                :type="settings.paymentMethod === 'points' ? 'primary' : 'default'"
                @click="settings.paymentMethod = 'points'"
              >
                积分支付
              </a-button>
            </div>
          </div>

          <!-- 提示信息 -->
          <div class="warning-notice">
            <a-alert
              message="暂未绑定公众号，观众将看不到现金赞>的礼物，如需设置付费礼物，请绑定公众号后使用"
              type="warning"
              show-icon
              banner
            />
          </div>

          <!-- 礼物列表 -->
          <div class="gift-grid">
            <div
              v-for="(gift, index) in giftList"
              :key="index"
              class="gift-item"
              :class="{ selected: selectedGifts.includes(gift.id) }"
              @click="toggleGift(gift.id)"
            >
              <div class="gift-emoji">{{ gift.emoji }}</div>
              <div class="gift-name">{{ gift.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 报名观看内容 -->
    <div class="content-section" v-if="activeTab === 'registration'">
      <!-- 报名高级 -->
      <div class="registration-section">
        <div class="section-header">
          <div class="section-info">
            <span class="section-label">报名观看：</span>
            <a-switch v-model:checked="registrationSettings.advancedRegistration" />
            <span class="section-desc">观众需要填写以下问题才能收看直播，关联观看数据需要直播前添加</span>
          </div>
        </div>
      </div>

      <!-- 审核机制 -->
      <div class="registration-section">
        <div class="section-header">
          <span class="section-label">填写时机：</span>
          <a-radio-group v-model:value="registrationSettings.auditMechanism" class="audit-radio-group">
            <a-radio value="auto">进入直播间</a-radio>
            <a-radio value="manual">全与后台时</a-radio>
          </a-radio-group>
        </div>
        <div class="audit-description">
          <p>
            报名签约时观众需要观看指定观看内容完整开播，且需要确认可供绑定的观众，同时成功入会观看，实际完成并获得观看权限，观看直播
          </p>
        </div>
      </div>

      <!-- 入门文本 -->
      <div class="registration-section">
        <div class="config-item">
          <span class="config-label">入门文本：</span>
          <a-input v-model:value="registrationSettings.entryText" placeholder="输入文本内容" style="width: 300px" />
          <span class="char-count">{{ registrationSettings.entryText.length }}/50</span>
        </div>
      </div>

      <!-- 报名音质 -->
      <div class="registration-section">
        <div class="section-header">
          <div class="section-info">
            <span class="section-label">报名审核：</span>
            <a-switch v-model:checked="registrationSettings.audioQuality" />
            <span class="section-desc">开启后，通过审核的用户才可以进入直播间</span>
          </div>
        </div>
      </div>

      <!-- 访问问题 -->
      <div class="registration-section reg-2">
        <div class="section-title">设置问题</div>

        <!-- 报名反馈 -->
        <div class="config-item">
          <span class="config-label">报名反馈：</span>
          <span class="config-desc">欢迎观看本地直播</span>
        </div>

        <!-- 报名来源大数据 -->
        <div class="config-item">
          <span class="config-label">报名表单头部图</span>
        </div>

        <!-- 上传图片区域 -->
        <div class="upload-section">
          <div class="upload-area">
            <div class="upload-placeholder">
              <div class="upload-icon">+</div>
              <div class="upload-text">点击上传统一</div>
            </div>
          </div>
          <div class="upload-tips">
            为保持显示效果，建议上传7cm*10和5cm大小的图片，支持png、jpeg、jpg格式，文件大小不超过2M
          </div>
        </div>

        <!-- 手机号码 -->
        <div class="config-item">
          <span class="config-label">手机号码</span>
        </div>

        <!-- 请输入手机号码 -->
        <div class="config-item">
          <a-input v-model:value="registrationSettings.phoneNumber" placeholder="请输入手机号码" style="width: 300px" />
        </div>

        <!-- 添加问题按钮 -->
        <div class="add-question-section">
          <div>添加问题</div>
          <div class="question-buttons">
            <a-button>姓名</a-button>
            <a-button>填空题</a-button>
            <a-button>选择题</a-button>
            <a-button>邮箱</a-button>
            <a-button>更多选型</a-button>
          </div>
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="footer-buttons">
        <a-button type="primary" size="large" @click="handleConfirmRegistration"> 确认保存 </a-button>
        <a-button size="large" @click="handlePreview"> 预览 </a-button>
      </div>
    </div>

    <!-- 商品库内容 -->
    <div class="content-section" v-if="activeTab === 'productLibrary'">
      <div class="registration-section">
        <div class="section-header">
          <div class="section-info">
            <span class="section-label">商品讲解：</span>
            <a-switch v-model:checked="registrationSettings.advancedRegistration" />
            <span class="section-desc">开启后，助教页可设置商品讲解状态，观众可查看已讲解的商品片段 </span>
          </div>
        </div>
        <div style="margin-left: 114px">
          <a-checkbox>讲解中自动推动页面</a-checkbox>
          <div>开始讲解会同时推送商品卡片并在商品列表置顶商品，结束讲解会同时取消推送和取消置顶</div>
        </div>
      </div>
      <div class="registration-section">
        <div class="section-header">
          <div class="section-info">
            <span class="section-label">推送规则：</span>
            <a-radio>进推送小卡片</a-radio>
            <a-radio>进推送大卡片</a-radio>
            <a-radio checked>推送时选择</a-radio>
          </div>
        </div>
      </div>
      <div class="registration-section">
        <div class="section-header">
          <div class="section-info">
            <span class="section-label">商品序号规则：</span>
            <a-radio checked>由大到小</a-radio>
            <a-radio>由小到大</a-radio>
          </div>
        </div>
      </div>
      <div class="registration-section">
        <div class="section-header">
          <div class="section-info">
            <span class="section-label">商品热卖特效：</span>
            <a-switch v-model:checked="registrationSettings.advancedRegistration" />
            <span class="section-desc">开启后，统计推送中的商品在各终端的点击次数，并展示“自定义文案xN” 示例 </span>
          </div>
        </div>
      </div>
      <div class="registration-section">
        <div class="section-header">
          <div class="section-info">
            <span class="section-label">外链购买：</span>
            <a-radio>直接跳转</a-radio>
            <a-radio checked>查看商品详情</a-radio>
          </div>
        </div>
        <div style="margin-left: 100px">
          观众从商品列表、大/小卡片点击“外链购买”商品的封面/标题区域先进商品详情，以便观众不跳出直播间半屏浏览商品信息
          示例
        </div>
      </div>
      <div class="registration-section">
        <div class="section-header">
          <div class="section-info">
            <span class="section-label">点击数据上报：</span>
            <a-button type="link">去设置></a-button>
          </div>
        </div>
        <div style="margin-left: 100px">
          开启「观看页埋点」和「互动事件上报」，可统计商品点击、下单按钮点击数据 示例
        </div>
      </div>
    </div>

    <!-- 广告内容 -->
    <div class="content-section" v-if="activeTab === 'advertisement'">
      <!-- 广告类型选择 -->
      <div class="ad-type-tabs">
        <div
          v-for="adType in adTypes"
          :key="adType.key"
          class="ad-type-tab"
          :class="{ active: activeAdType === adType.key }"
          @click="activeAdType = adType.key"
        >
          {{ adType.label }}
        </div>
      </div>
      <div class="gg-type">
        <div>横幅广告：</div>
        <a-switch v-model:checked="adSettings.banner.enabled" />
        <div>每5秒，页面将会自动切换广告</div>
      </div>
      <div class="gg-type">
        <div>允许关闭广告：</div>
        <a-switch v-model:checked="adSettings.banner.allowClose" />
        <div>关闭后，观众页面广告将不允许自行关闭</div>
      </div>
      <a-button type="primary" style="margin: 10px 0">设置广告</a-button>
      <a-table>
        <a-table-column title="广告内容" dataIndex="adPosition" />
        <a-table-column title="广告类型" dataIndex="adContent" />
        <a-table-column title="跳转链接" dataIndex="action" />
      </a-table>
    </div>
    <!-- 邀请海报内容 -->
    <yqhb v-if="activeTab === 'shareSettings'" />
    <!-- 引导关注内容 -->
    <ydgz v-if="activeTab === 'followGuide'" />
  </div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { reactive, ref } from "vue";
import ydgz from "./ydgz.vue";
import yqhb from "./yqhb.vue";
const tabs = ref([
  { key: "reward", label: "打赏" },
  { key: "registration", label: "报名观看" },
  { key: "productLibrary", label: "商品库" },
  { key: "advertisement", label: "广告" },
  { key: "invitationPoster", label: "邀请海报" },
  { key: "shareSettings", label: "分享设置" },
  { key: "followGuide", label: "引导关注" },
  { key: "liveReservation", label: "直播预约" },
  { key: "redPacketStyle", label: "红包样式" },
]);
const activeTab = ref("reward");

// 广告类型
const adTypes = ref([
  { key: "banner", label: "横幅广告" },
  { key: "image", label: "图标广告" },
  { key: "video", label: "片头广告" },
  { key: "popup", label: "弹窗广告" },
]);
const activeAdType = ref("banner");

// 广告设置
const adSettings = reactive({
  banner: {
    enabled: true,
    allowClose: true,
    interval: 5, // 刷新间隔（秒）
    content: "",
    linkUrl: "",
  },
  image: {
    enabled: false,
    content: "",
    linkUrl: "",
  },
  video: {
    enabled: false,
    content: "",
    linkUrl: "",
  },
  popup: {
    enabled: false,
    content: "",
    linkUrl: "",
  },
});

// 设置数据
const settings = reactive({
  cashReward: true,
  minRewardAmount: 0.01,
  presetAmounts: [0.88, 6.66, 8.88, 18.88, 66.6, 88.8],
  giftReward: true,
  paymentMethod: "balance", // balance: 现金支付, points: 积分支付
});

// 报名观看设置
const registrationSettings = reactive({
  advancedRegistration: false,
  auditMechanism: "auto", // auto: 进入直播间, manual: 全与后台时
  entryText: "报名观看",
  audioQuality: false,
  phoneNumber: "",
});

// 选中的礼物
const selectedGifts = ref<number[]>([]);

// 礼物列表
const giftList = ref([
  { id: 1, name: "鲜花", emoji: "🌹" },
  { id: 2, name: "咖啡", emoji: "☕" },
  { id: 3, name: "点赞", emoji: "👍" },
  { id: 4, name: "掌声", emoji: "👏" },
  { id: 5, name: "666", emoji: "🎉" },
  { id: 6, name: "小黄鸭", emoji: "🦆" },
  { id: 7, name: "钻石", emoji: "💎" },
  { id: 8, name: "烟火", emoji: "🎆" },
  { id: 9, name: "麦克风", emoji: "🎤" },
]);

// 切换礼物选择
const toggleGift = (giftId: number) => {
  const index = selectedGifts.value.indexOf(giftId);
  if (index > -1) {
    selectedGifts.value.splice(index, 1);
  } else {
    selectedGifts.value.push(giftId);
  }
};

// 处理现金设置
const handleCashSettings = () => {
  message.info("打开现金打赏设置");
};

// 处理礼物设置
const handleGiftSettings = () => {
  message.info("打开礼物打赏设置");
};

// 处理报名确认
const handleConfirmRegistration = () => {
  message.success("报名观看设置已保存");
};

// 处理预览
const handlePreview = () => {
  message.info("预览报名观看页面");
};

// 处理设置广告
const handleSetAd = () => {
  message.info("打开广告设置页面");
};

// 显示示例
const showExample = () => {
  message.info("查看广告示例");
};
</script>

<style lang="less" scoped>
.marketing-interaction {
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
    padding: 20px 0;
  }

  // 广告页面样式
  .ad-type-tabs {
    display: flex;
    margin-bottom: 24px;
    gap: 24px;

    .ad-type-tab {
      padding: 8px 16px;
      color: #666;
      cursor: pointer;
      font-size: 14px;
      border-radius: 4px;
      transition: all 0.3s ease;

      &:hover {
        color: #1890ff;
        background: #f0f8ff;
      }

      &.active {
        color: #1890ff;
        background: #e6f7ff;
        font-weight: 500;
      }
    }
  }

  .ad-content {
    .ad-setting-section {
      margin-bottom: 24px;

      .setting-row {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        gap: 12px;

        .setting-label {
          font-size: 14px;
          color: #333;
          font-weight: 500;
          min-width: 100px;
        }

        .setting-desc {
          font-size: 12px;
          color: #666;
        }
      }
    }

    .ad-action-section {
      margin-bottom: 24px;
    }

    .ad-content-area {
      .ad-content-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;

        .ad-content-item {
          border: 1px solid #e8e8e8;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;

          .ad-content-header {
            padding: 16px;
            background: #f5f5f5;
            font-size: 14px;
            font-weight: 500;
            color: #333;
            border-bottom: 1px solid #e8e8e8;
          }

          .ad-content-body {
            padding: 32px 16px;
            min-height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;

            .empty-state {
              text-align: center;

              .empty-icon {
                margin-bottom: 16px;
              }

              .empty-text {
                font-size: 14px;
                color: #999;
              }
            }
          }
        }
      }
    }
  }

  .reward-section {
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .section-info {
        display: flex;
        align-items: center;
        gap: 12px;
      }
    }

    .reward-config,
    .gift-config {
      padding-top: 20px;
      border-top: 1px solid #f0f0f0;

      .config-item {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        gap: 12px;

        .config-label {
          font-size: 14px;
          color: #333;
          min-width: 100px;
        }
      }

      .preset-amounts {
        display: flex;
        align-items: flex-start;
        gap: 12px;

        .config-label {
          font-size: 14px;
          color: #333;
          min-width: 100px;
          margin-top: 8px;
        }

        .amount-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
          flex: 1;

          .amount-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            padding: 12px;
            border: 1px solid #e8e8e8;
            border-radius: 6px;
            background: #fff;

            .gift-icon {
              width: 40px;
              height: 40px;
              background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;

              svg {
                width: 24px;
                height: 24px;
              }
            }

            .amount-text {
              font-size: 14px;
              color: #333;
              font-weight: 500;
            }
          }
        }
      }

      .payment-methods {
        display: flex;
        gap: 12px;
      }

      .warning-notice {
        margin: 16px 0;
      }

      .gift-grid {
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        gap: 16px;
        margin-top: 20px;

        .gift-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px;
          border: 2px solid #e8e8e8;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #fff;

          &:hover {
            border-color: #1890ff;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(24, 144, 255, 0.2);
          }

          &.selected {
            border-color: #1890ff;
            background: #f6f9ff;
          }

          .gift-emoji {
            font-size: 32px;
            line-height: 1;
          }

          .gift-name {
            font-size: 12px;
            color: #666;
            text-align: center;
          }
        }
      }
    }
  }

  // 报名观看样式
  .registration-section {
    margin-bottom: 32px;
    .section-label {
      min-width: 100px;
      text-align: right;
      font-size: 14px;
      color: #333;
      font-weight: 500;
    }

    &:last-child {
      margin-bottom: 0;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;

      .section-info {
        display: flex;
        align-items: center;
        gap: 12px;

        .section-desc {
          font-size: 12px;
          color: #666;
        }
      }

      .audit-radio-group {
        margin-left: 12px;
      }
    }

    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 20px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e8e8e8;
    }

    .audit-description {
      background: #f6f8fa;
      padding: 16px;
      border-radius: 6px;
      margin-top: 12px;

      p {
        margin: 0;
        font-size: 13px;
        color: #666;
        line-height: 1.5;
      }
    }

    .config-item {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      gap: 12px;

      .config-label {
        font-size: 14px;
        color: #333;
        min-width: 120px;
      }

      .config-desc {
        font-size: 12px;
        color: #666;
        margin-left: 8px;
      }

      .char-count {
        font-size: 12px;
        color: #999;
        margin-left: 8px;
      }
    }

    .upload-section {
      margin: 20px 0;

      .upload-area {
        border: 2px dashed #d9d9d9;
        border-radius: 6px;
        padding: 40px;
        text-align: center;
        background: #fafafa;
        transition: border-color 0.3s ease;

        &:hover {
          border-color: #1890ff;
        }

        .upload-placeholder {
          .upload-icon {
            font-size: 24px;
            color: #999;
            margin-bottom: 8px;
          }

          .upload-text {
            font-size: 14px;
            color: #666;
          }
        }
      }

      .upload-tips {
        font-size: 12px;
        color: #999;
        margin-top: 8px;
        line-height: 1.5;
      }
    }

    .add-question-section {
      margin: 20px 0;
      display: flex;
      align-items: center;
      margin-left: 200px;
      gap: 20px;
      font-size: 14px;
      color: #333;
      min-width: 120px;

      .question-buttons {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;

        .ant-btn {
          font-size: 12px;
          height: 32px;
          padding: 4px 12px;
          border-color: #1890ff;
        }
      }
    }
  }

  .footer-buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-top: 32px;
    padding-top: 20px;
    border-top: 1px solid #e8e8e8;
    padding-bottom: 20px;
  }
}

// 响应式设计
@media (max-width: 1200px) {
  .marketing-interaction {
    .reward-config {
      .preset-amounts {
        .amount-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
    }

    .gift-config {
      .gift-grid {
        grid-template-columns: repeat(6, 1fr);
      }
    }

    .ad-content {
      .ad-content-area {
        .ad-content-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .marketing-interaction {
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

    .reward-section {
      .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }

      .reward-config,
      .gift-config {
        .config-item {
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
        }

        .preset-amounts {
          flex-direction: column;
          align-items: flex-start;

          .amount-grid {
            grid-template-columns: repeat(2, 1fr);
            width: 100%;
          }
        }

        .gift-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
    }
  }
}
.reg-2 {
  .config-item {
    padding-left: 200px;
  }
}
.gg-type {
  display: flex;
  margin: 10px 0;

  align-items: center;
  gap: 20px;
  div {
    &:first-child {
      width: 100px;
      text-align: right;
      font-size: 14px;
      color: #333;
      font-weight: 500;
    }
  }
}
</style>
