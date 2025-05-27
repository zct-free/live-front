import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// 判断是否在生产环境
const isProduction = process.env.NODE_ENV === "production";
// 获取环境变量中的公共路径
const VITE_PUBLIC_PATH = isProduction ? process.env.VITE_PUBLIC_PATH : "/";
// 如果没有设置公共路径，则默认为根路径

export default defineConfig({
	root: process.cwd(),
	base: VITE_PUBLIC_PATH,
	plugins: [vue()],
	server: {
		host: true,
		open: true,
	},
	resolve: {
		alias: [
			{
				find: "@",
				replacement: path.resolve(__dirname, "src"),
			},
		],
	},
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
				additionalData: `@import "${path.resolve(__dirname, "src/style/common.less")}";`,
			},
		},
	},
	esbuild: {
		drop: isProduction ? ["console", "debugger"] : [],
	},
	// Configure build options
	build: {
		minify: "esbuild",
		target: "es2015",
		cssTarget: "es2015",
		cssMinify: "esbuild",
		sourcemap: isProduction ? false : "inline",
		outDir: "dist",
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						// 将 node_modules 中的依赖打包成单独的 chunk
						return id.toString().split("node_modules/")[1].split("/")[0].toString();
					}
				},
			},
		},
	},
	optimizeDeps: {
		include: ["ant-design-vue", "vue", "vue-router", "@vue/runtime-core", "@vue/runtime-dom"],
	},
});
