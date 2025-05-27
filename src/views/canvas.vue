<template>
	<div class="canvas-container">
		<canvas
			ref="canvasRef"
			:width="canvasWidth"
			:height="canvasHeight"
			handles
			tabindex="0"
			style="outline: none; display: block; margin: 0 auto; background: #87ceeb"
			@keydown="onKeyDown"
		></canvas>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const canvasWidth = 900;
const canvasHeight = 430;
const canvasRef = ref<HTMLCanvasElement | null>(null);

// 缆线参数（三点抛物线拟合）
const cableStart = { x: 40, y: 80 };
const cableEnd = { x: 860, y: 120 };
const cableMid = { x: 450, y: 60 }; // 中点最低

// 计算抛物线系数 a, b, c 使其通过三点
function getParabolaABC(p1: { x: number; y: number }, p2: { x: number; y: number }, p3: { x: number; y: number }) {
	// 解三元一次方程组
	// y = ax^2 + bx + c
	const x1 = p1.x,
		y1 = p1.y;
	const x2 = p2.x,
		y2 = p2.y;
	const x3 = p3.x,
		y3 = p3.y;
	const denom = (x1 - x2) * (x1 - x3) * (x2 - x3);
	const a = (x3 * (y2 - y1) + x2 * (y1 - y3) + x1 * (y3 - y2)) / denom;
	const b = (x3 * x3 * (y1 - y2) + x2 * x2 * (y3 - y1) + x1 * x1 * (y2 - y3)) / denom;
	const c = (x2 * x3 * (x2 - x3) * y1 + x3 * x1 * (x3 - x1) * y2 + x1 * x2 * (x1 - x2) * y3) / denom;
	return { a, b, c };
}

const cableABC = getParabolaABC(cableStart, cableMid, cableEnd);

// 水面高度
const waterTop = 300;
const waterBottom = 400;

// 挂件参数
const pendant = ref({
	x: 450, // 初始在中间
	cableY: 0, // 缆线上的y
	length: 40, // 挂件线长
	minLength: 40,
	maxLength: 220, // 最长可到水下
});

function getCableY(x: number) {
	// 使用三点拟合的抛物线 y = ax^2 + bx + c
	const { a, b, c } = cableABC;
	return a * x * x + b * x + c;
}

function drawReservoir(ctx: CanvasRenderingContext2D) {
	// 天空（背景已是天蓝色）

	// 水库横向范围
	const left = 180;
	const right = 720;

	// 土壤（左岸）
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(0, canvasHeight);
	ctx.lineTo(0, 180);
	ctx.lineTo(120, 220);
	ctx.lineTo(160, 260);
	ctx.lineTo(170, 300);
	ctx.lineTo(left, waterTop);
	ctx.lineTo(left, waterBottom);
	ctx.lineTo(0, waterBottom);
	ctx.closePath();
	ctx.fillStyle = "#d28b3c";
	ctx.fill();
	ctx.restore();

	// 土壤（右岸）
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(canvasWidth, canvasHeight);
	ctx.lineTo(canvasWidth, 120);
	ctx.lineTo(800, 180);
	ctx.lineTo(780, 220);
	ctx.lineTo(760, 260);
	ctx.lineTo(730, 300);
	ctx.lineTo(right, waterTop);
	ctx.lineTo(right, waterBottom);
	ctx.lineTo(canvasWidth, waterBottom);
	ctx.closePath();
	ctx.fillStyle = "#d28b3c";
	ctx.fill();
	ctx.restore();

	// 水体
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(left, waterTop);
	ctx.lineTo(right, waterTop);
	ctx.lineTo(right + 30, waterBottom);
	ctx.lineTo(left - 30, waterBottom);
	ctx.closePath();
	ctx.fillStyle = "#1a318c";
	ctx.fill();
	ctx.restore();

	// 水面
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(left, waterTop);
	ctx.lineTo(right, waterTop);
	ctx.strokeStyle = "#1a318c";
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.restore();
}

function drawCable(ctx: CanvasRenderingContext2D) {
	ctx.save();
	ctx.beginPath();
	for (let x = cableStart.x; x <= cableEnd.x; x += 2) {
		const y = getCableY(x);
		if (x === cableStart.x) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	}
	ctx.strokeStyle = "#444";
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.restore();
}

function drawPendant(ctx: CanvasRenderingContext2D) {
	// 计算挂件在缆线上的y
	const x = pendant.value.x;
	const y = getCableY(x);
	pendant.value.cableY = y;
	// 绘制挂件线
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x, y + pendant.value.length);
	ctx.strokeStyle = "#888";
	ctx.lineWidth = 3;
	ctx.stroke();
	ctx.restore();
	// 绘制挂件本体
	ctx.save();
	ctx.beginPath();
	ctx.rect(x - 15, y + pendant.value.length, 30, 20);
	ctx.fillStyle = "#ccc";
	ctx.fill();
	ctx.strokeStyle = "#333";
	ctx.stroke();
	ctx.restore();
	// 挂件下方红白条
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(x - 10, y + pendant.value.length + 20);
	ctx.lineTo(x + 10, y + pendant.value.length + 20);
	ctx.strokeStyle = "#e33";
	ctx.lineWidth = 4;
	ctx.stroke();
	ctx.restore();
}

function drawText(ctx: CanvasRenderingContext2D) {
	ctx.save();
	ctx.font = "32px sans-serif";
	ctx.fillStyle = "red";
	ctx.textAlign = "center";
	ctx.fillText("工艺模拟区", canvasWidth / 2, 200);
	ctx.restore();
}

function drawAll() {
	const canvas = canvasRef.value;
	if (!canvas) return;
	const ctx = canvas.getContext("2d");
	if (!ctx) return;
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	drawReservoir(ctx);
	drawCable(ctx);
	drawPendant(ctx);
	drawText(ctx);
}

function onKeyDown(e: KeyboardEvent) {
	let changed = false;
	if (e.key === "ArrowLeft") {
		if (pendant.value.x > cableStart.x + 10) {
			pendant.value.x -= 10;
			changed = true;
		}
	} else if (e.key === "ArrowRight") {
		if (pendant.value.x < cableEnd.x - 10) {
			pendant.value.x += 10;
			changed = true;
		}
	} else if (e.key === "ArrowDown") {
		// 计算最大可下拉长度（不能超过水底）
		const maxLen = Math.min(pendant.value.maxLength, waterBottom - getCableY(pendant.value.x) - 20);
		if (pendant.value.length < maxLen) {
			pendant.value.length += 10;
			changed = true;
		}
	} else if (e.key === "ArrowUp") {
		if (pendant.value.length > pendant.value.minLength) {
			pendant.value.length -= 10;
			changed = true;
		}
	}
	if (changed) {
		drawAll();
		e.preventDefault();
	}
}

onMounted(() => {
	drawAll();
	// 聚焦canvas以接收键盘事件
	setTimeout(() => {
		canvasRef.value?.focus();
	}, 100);
});

onBeforeUnmount(() => {
	// 清理事件等
});
</script>

<style scoped lang="less">

.canvas-container {
	display: flex;
	justify-content: center;    
	align-items: center;
	height: .px2rem(500)[];
	background: #87ceeb; /* 天空蓝背景 */
}
</style>
