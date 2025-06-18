<template>
	<a-config-provider v-bind="appConfigProvider">
		<router-view />
	</a-config-provider>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // Import Chinese locale for dayjs
dayjs.locale('zh-cn'); // Set dayjs locale to Chinese
const getPopupContainer = (triggerNode: HTMLElement) => {
	return (triggerNode.parentNode as HTMLElement) || document.body;
};
const appConfigProvider = {
	getPopupContainer() {
		return getPopupContainer(document.body);
	},
	locale: zhCN, // Set the locale to Chinese

};
</script>

<style lang="less">
/* Global styles can go here or in a separate CSS file imported in main.ts */
html,
body,
#app {
	height: 100%;
	margin: 0;
	padding: 0;
}

body {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-family: "微软雅黑", Arial, Helvetica, sans-serif;
	font-size: 12px;
	color: #4e4e4e;
	background: #fff;
}
</style>
