<template>
  <div class="watch-settings">
    <!-- 观看页设置 -->
    <div class="section">
      <h2 class="section-title">观看页设置</h2>

      <!-- 暖场页 -->
      <div class="subsection">
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">观看页：</span>
            <a-switch v-model:checked="settings.warmupPage" />
            <span class="setting-desc">关闭后，观看页将不生效,仅允许集成SDK观看</span>
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">观看页布局：</span>
            <a-radio-group v-model:value="settings.warmupPageType" class="radio-group">
              <a-radio value="video">视频为主</a-radio>
              <a-radio value="document">文档为主</a-radio>
              <a-radio value="follow">跟随讲师</a-radio>
            </a-radio-group>
          </div>
          <div style="margin-left: 170px">
            <div>1、移动端观看页仅支持【视频为主】和【跟随讲师】；若选择文档为主，移动端的主画面还是会显示视频内容</div>
            <div>2、PC端观看页默认是跟随讲师的；若讲师还没开播，则观看页会默认以文档为主，支持切换成【视频为主】</div>
          </div>
        </div>

        <!-- 平板布局设置 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">平板布局设置：</span>
            <a-radio-group v-model:value="settings.broadcastType" class="radio-group">
              <a-radio value="manual">跟随电脑端</a-radio>
              <a-radio value="scheduled">跟随手机端</a-radio>
            </a-radio-group>
          </div>
        </div>

        <!-- 小窗播放 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">小窗播放：</span>
            <a-switch v-model:checked="settings.miniWindow" />
            <span class="setting-desc"
              >支持在台式和移动端Salas 目前仅支持 Webview SDK 集成方式实现小窗，网页进入观看页暂时不支持小窗功能</span
            >
          </div>
        </div>

        <!-- 默认语言 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">默认语言：</span>
            <a-select style="width: 200px" v-model:value="settings.defaultLanguage">
              <a-option value="zh-CN">中文</a-option>
              <a-option value="en-US">English</a-option>
              <a-option value="ja-JP">日本語</a-option>
              <a-option value="ko-KR">한국어</a-option>
            </a-select>
          </div>
        </div>

        <!-- 观众切换语言 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">观众切换语言：</span>
            <a-radio-group v-model:value="settings.overlayInfo" class="radio-group">
              <a-radio value="hide">允许</a-radio>
              <a-radio value="show">不允许</a-radio>
            </a-radio-group>
          </div>
        </div>

        <!-- 移动观看页 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">移动观看页：</span>
            <a-switch v-model:checked="settings.triggerFunction" />
            <span class="setting-desc">关闭后，移动端系统观看页将无法观看直播</span>
          </div>
        </div>

        <!-- 音频播放模式 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">音视频切换：</span>
            <a-switch v-model:checked="settings.autoDetection" />
            <span class="setting-desc">关闭后，移动观看页将不支持音视频切换 </span>
          </div>
        </div>

        <!-- 观看页默认表情 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">观看页默认表情：</span>
            <a-switch v-model:checked="settings.beautify" />
            <span class="setting-desc">关闭后，将隐藏观看页默认表情</span>
          </div>
        </div>

        <!-- 观看页收藏表情 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">观看页收藏表情：</span>
            <a-switch v-model:checked="settings.miniWindowStyle" />
            <span class="setting-desc">关闭后，将隐藏观看页收藏表情</span>
          </div>
        </div>

        <!-- 防弹窗插件 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">防弹窗插件：</span>
            <a-switch v-model:checked="settings.antiPopup" />
            <span class="setting-desc">开启后，观看端将禁止浏览器的小窗播放和画中画播放功能</span>
          </div>
        </div>

        <!-- 禁止Firefox -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">禁止Firefox：</span>
            <a-switch v-model:checked="settings.blockFirefox" />
            <span class="setting-desc">开启后，将无法在PC端使用Firefox浏览器观看直播</span>
          </div>
        </div>

        <!-- flash播放器 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">flash播放器：</span>
            <a-switch v-model:checked="settings.flashPlugin" />
            <span class="setting-desc">开启后，观众可以默认使用flash播放器，如不开启，默认使用h5</span>
          </div>
        </div>

        <!-- 弹幕 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">弹幕：</span>
            <a-switch v-model:checked="settings.danmaku" />
            <span class="setting-desc">关闭后，不显示弹幕，同时播放器没有弹幕开关</span>
          </div>
        </div>

        <!-- 弹幕速度 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">弹幕速度：</span>
            <a-slider v-model:value="settings.danmakuSpeed" :min="0" :max="100" style="width: 200px" />
            <div class="setting-values">
              <span>缓慢</span>
              <span>较慢</span>
              <span>标准</span>
              <span>较快</span>
              <span>极快</span>
            </div>
          </div>
        </div>

        <!-- 弹幕大小 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">弹幕大小：</span>
            <a-slider v-model:value="settings.danmakuSize" :min="0" :max="100" style="width: 200px" />
            <div class="setting-values">
              <span>较小</span>
              <span>小</span>
              <span>标准</span>
              <span>大</span>
              <span>较大</span>
            </div>
          </div>
        </div>

        <!-- 自动播放 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">自动播放：</span>
            <a-switch v-model:checked="settings.autoPlay" />
            <span class="setting-desc">关闭后，播放器需要点击播放按钮才能播放</span>
          </div>
        </div>

        <!-- 允许观众暂停直播播放 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">允许观众暂停直播播放：</span>
            <a-switch v-model:checked="settings.allowPause" />
            <span class="setting-desc">开启后，在H5页面观看直播时，支持观众暂停播放</span>
          </div>
        </div>

        <!-- 课件翻页 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">课件翻页：</span>
            <a-switch v-model:checked="settings.pageFlip" />
            <span class="setting-desc"
              >关闭后，当分层直播播时，观众无法进行前后翻页操作；直播中修改状态，观众需要刷新直播间才生效</span
            >
          </div>
        </div>

        <!-- 投票 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">投诉：</span>
            <a-switch v-model:checked="settings.voting" />
            <span class="setting-desc">开启后，观看端将显示投诉入口</span>
          </div>
        </div>

        <!-- 回放中显示下一场倒计时 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">回放中显示下一场倒计时：</span>
            <a-switch v-model:checked="settings.nextCountdown" />
            <span class="setting-desc">开启后，回放程序中将会显示下一场的倒计时</span>
          </div>
        </div>

        <!-- 访问次数 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">访问次数：</span>
            <a-switch v-model:checked="settings.viewCount" />
            <span class="setting-desc">关闭后，将隐藏观看页"访问次数"字段（PC端默认显示在直播介绍页）</span>
          </div>
        </div>

        <!-- 移动端显示位置 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">移动端显示位置：</span>
            <a-radio-group v-model:value="settings.mobilePosition" class="radio-group">
              <a-radio value="player">播放器</a-radio>
              <a-radio value="info">直播介绍页</a-radio>
            </a-radio-group>
          </div>
        </div>

        <!-- 仅展示当前次聊天内容 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">仅展示当前次聊天内容：</span>
            <a-switch v-model:checked="settings.showCurrentChat" />
            <span class="setting-desc">开启后，聊天室只展示当前次的聊天内容</span>
          </div>
        </div>

        <!-- 显示连麦用户昵称 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">显示连麦用户昵称：</span>
            <a-switch v-model:checked="settings.showMicUserNickname" />
            <span class="setting-desc">打开后，观众可以看到连麦用户的昵称信息（360p、480p分辨率下不显示连麦昵称）</span>
          </div>
        </div>

        <!-- 连麦画面 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">连麦画面：</span>
            <a-radio-group v-model:value="settings.micScreen" class="radio-group">
              <a-radio value="complete">完整画面</a-radio>
              <a-radio value="fill">填充画面</a-radio>
              <span class="setting-link">示例</span>
            </a-radio-group>
          </div>
        </div>

        <!-- 隐藏观众昵称 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">隐藏观众昵称：</span>
            <a-switch v-model:checked="settings.hideAudienceNickname" />
            <span class="setting-desc">开启后，观众无法看到其他观众的昵称，讲师助教禁言的可正常查看</span>
          </div>
        </div>

        <!-- 观众实名认证 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">观众实名认证：</span>
            <a-switch v-model:checked="settings.audienceRealNameAuth" />
            <span class="setting-desc"
              >开启后，观众进行评论、回复、留言、弹幕、点赞等行为需进行手机号验证，根据《互联网跟帖评论服务管理规定》，用户基于手机号认证可发表评论，未对其进行认证的账号，不能进行针对第三方的评论，无权共享给别人查看</span
            >
          </div>
        </div>

        <!-- 个人中心 -->
        <div class="setting-item">
          <div class="setting-main">
            <span class="setting-label">个人中心：</span>
            <a-switch v-model:checked="settings.personalCenter" />
            <span class="setting-desc">关闭后，将隐藏观看页"个人中心"入口</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { reactive } from "vue";

// 设置数据
const settings = reactive({
  // 基础设置
  warmupPage: true,
  warmupPageType: "countdown",
  broadcastType: "manual",
  miniWindow: false,
  overlayInfo: "hide",
  triggerFunction: true,
  autoDetection: true,
  beautify: true,
  miniWindowStyle: true,
  antiDebug: false,
  ipCheck: false,
  flashPlugin: false,
  connection: true,
  defaultLanguage: "zh-CN",

  // 新增功能设置
  antiPopup: false,
  blockFirefox: false,
  danmaku: true,
  danmakuSpeed: 50,
  danmakuSize: 50,
  autoPlay: true,
  allowPause: true,
  pageFlip: true,
  voting: false,
  nextCountdown: true,
  viewCount: true,
  mobilePosition: "player",
  showCurrentChat: false,
  showMicUserNickname: true,
  micScreen: "complete",
  hideAudienceNickname: false,
  audienceRealNameAuth: false,

  // 播放器设置
  volume: 50,
  renderSize: 50,

  // 其他功能
  customLandscape: true,
  contentReview: true,
  subjectStructure: false,
  commentary: false,
  aiChat: true,
  watchEffect: true,
  economicManagement: "hidden",
  feeStandard: false,
  traditionalFunction: false,
  nowPlaying: "title",
  programmingWatch: false,
  watchSchedule: false,
  personalCenter: false,
});

// 保存设置
const handleSave = () => {
  message.success("设置保存成功");
  console.log("保存的设置:", settings);
};
</script>

<style lang="less" scoped>
.watch-settings {
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;

  .section {
    background: white;
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

  .setting-item {
    margin-bottom: 16px;

    &:last-child {
      border-bottom: none;
    }

    .setting-main {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;

      .setting-label {
        font-size: 14px;
        color: #333;
        width: 170px;
        text-align: right;
        font-weight: 500;
      }

      .setting-link {
        font-size: 12px;
        color: #1890ff;
        background: #e6f7ff;
        padding: 2px 8px;
        border-radius: 4px;
      }
    }

    .setting-desc {
      font-size: 13px;
      color: #666;
      line-height: 1.5;
      padding-left: 0;
    }

    .setting-values {
      display: flex;
      gap: 16px;
      font-size: 12px;
      color: #999;
      margin-top: 8px;
      margin-left: 182px;
    }
  }

  .setting-options {
    margin-top: 12px;
    padding: 16px;
    background: #fafafa;
    border-radius: 6px;

    .radio-group {
      margin-bottom: 12px;
    }

    .warmup-description {
      font-size: 13px;
      color: #666;
      line-height: 1.6;

      p {
        margin: 8px 0;
      }
    }
  }

  .broadcast-options {
    margin-top: 8px;
  }

  .radio-group {
    .ant-radio-wrapper {
      margin-right: 16px;
    }
  }

  .player-settings {
    margin-top: 12px;
    padding: 16px;
    background: #fafafa;
    border-radius: 6px;

    .setting-row {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      gap: 12px;

      &:last-child {
        margin-bottom: 0;
      }

      .setting-label {
        min-width: 80px;
        font-size: 14px;
        color: #333;
      }

      .setting-values {
        display: flex;
        gap: 16px;
        font-size: 12px;
        color: #999;
        margin-left: 12px;
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
  .watch-settings {
    padding: 12px;

    .section {
      padding: 16px;
    }

    .setting-item {
      .setting-main {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
    }

    .player-settings {
      .setting-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;

        .setting-values {
          margin-left: 0;
          flex-wrap: wrap;
        }
      }
    }
  }
}
</style>
