<template>
  <div class="loading-example">
    <h2>v-loading 指令示例</h2>
    
    <!-- 基础用法 -->
    <div class="demo-section">
      <h3>基础用法</h3>
      <div 
        v-loading="isLoading1" 
        class="demo-box"
      >
        <p>这是一个基础的加载示例</p>
        <a-button @click="toggleLoading1">切换加载状态</a-button>
      </div>
    </div>

    <!-- 自定义文本 -->
    <div class="demo-section">
      <h3>自定义加载文本</h3>
      <div 
        v-loading="loadingOptions" 
        class="demo-box"
      >
        <p>自定义加载文本示例</p>
        <a-button @click="toggleLoading2">切换加载状态</a-button>
      </div>
    </div>

    <!-- 点状加载动画 -->
    <div class="demo-section">
      <h3>点状加载动画</h3>
      <div 
        v-loading.dots="isLoading3" 
        class="demo-box"
      >
        <p>点状加载动画示例</p>
        <a-button @click="toggleLoading3">切换加载状态</a-button>
      </div>
    </div>

    <!-- 全屏加载 -->
    <div class="demo-section">
      <h3>全屏加载</h3>
      <div class="demo-box">
        <p>全屏加载示例</p>
        <a-button @click="toggleFullscreenLoading">显示全屏加载</a-button>
        <div v-loading.fullscreen="isFullscreenLoading"></div>
      </div>
    </div>

    <!-- 模拟异步请求 -->
    <div class="demo-section">
      <h3>模拟异步请求</h3>
      <div 
        v-loading="{ 
          text: '数据加载中，请稍候...', 
          background: 'rgba(0, 0, 0, 0.8)',
          spinner: 'dots'
        }" 
        class="demo-box"
        :class="{ loading: isAsyncLoading }"
      >
        <div v-if="!isAsyncLoading">
          <p>异步数据：{{ asyncData }}</p>
          <a-button @click="loadAsyncData">加载数据</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 基础加载状态
const isLoading1 = ref(false)
const isLoading3 = ref(false)
const isFullscreenLoading = ref(false)
const isAsyncLoading = ref(false)

// 自定义加载选项
const loadingOptions = ref({
  text: '正在处理数据...',
  background: 'rgba(64, 158, 255, 0.1)',
  spinner: 'default'
})

const asyncData = ref('暂无数据')

// 切换加载状态的方法
const toggleLoading1 = () => {
  isLoading1.value = !isLoading1.value
}

const toggleLoading2 = () => {
  if (loadingOptions.value.text === '正在处理数据...') {
    loadingOptions.value = null
  } else {
    loadingOptions.value = {
      text: '正在处理数据...',
      background: 'rgba(64, 158, 255, 0.1)',
      spinner: 'default'
    }
  }
}

const toggleLoading3 = () => {
  isLoading3.value = !isLoading3.value
}

const toggleFullscreenLoading = () => {
  isFullscreenLoading.value = true
  setTimeout(() => {
    isFullscreenLoading.value = false
  }, 3000)
}

const loadAsyncData = () => {
  isAsyncLoading.value = true
  // 模拟异步请求
  setTimeout(() => {
    asyncData.value = `数据加载完成 - ${new Date().toLocaleTimeString()}`
    isAsyncLoading.value = false
  }, 2000)
}
</script>

<style scoped>
.loading-example {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 30px;
}

.demo-box {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 20px;
  margin: 10px 0;
  min-height: 120px;
  position: relative;
  background: #fff;
}

.demo-box.loading {
  pointer-events: none;
}

h2 {
  color: #1890ff;
  margin-bottom: 20px;
}

h3 {
  color: #262626;
  margin-bottom: 10px;
}

p {
  margin-bottom: 15px;
  color: #595959;
}
</style>
