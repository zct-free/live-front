<template>
	<div>
		<h1 class="home-title">Home Page</h1>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  router.push({ name: 'live-list' });
});
</script>

<style scoped lang="less">
.home-title {
	font-size: .px2rem(30) [];
}
</style>
