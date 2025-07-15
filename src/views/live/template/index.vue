<template>
  <div class="live-box">
    <div class="left-box">
      <a-menu v-model:selectedKeys="selectedKeys" style="width: 200px" mode="inline" @click="handleClick">
        <a-menu-item key="1">聊天室设置</a-menu-item>
        <a-menu-item key="2">观看页面设置</a-menu-item>
        <a-menu-item key="3">合规风控</a-menu-item>
        <a-menu-item key="4">直播互动</a-menu-item>
        <a-menu-item key="5">播放器设置</a-menu-item>
      </a-menu>
    </div>
    <div class="right-box">
      <component :is="rightCom"></component>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import allComs from "./components/index";
const selectedKeys = ref<string[]>(["1"]);
const handleClick = (e: { key: string }) => {
  console.log("click ", e);
};

const rightCom = computed(() => {
  return allComs[`c${selectedKeys.value[0]}`] || allComs.c1;
});
</script>
<style lang="less">
.live-box {
  display: flex;
  height: 100%;
}

.right-box {
  flex: 1;
  overflow: auto;
}
</style>
