import { defineConfig, loadEnv, type ConfigEnv, type UserConfig } from "vite";
import path from "path";
import { createVitePlugins } from "./build/plugin/index";

export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
	const root = process.cwd();
	const env = loadEnv(mode, root, "");
	const { VITE_PUBLIC_PATH, VITE_API_URL } = env;
	const isBuild = command === "build";
	const isProduction = mode === "production";
	return {
		root,
		base: VITE_PUBLIC_PATH || "/",
		plugins: createVitePlugins(env, isBuild),
		server: {
			host: true,
			open: true,
			proxy: {
				"/api": {
					target: VITE_API_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
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
			include: ["ant-design-vue", "vue", "vue-router", "@vue/runtime-core", "@vue/runtime-dom", "lodash-es", "dayjs"],
		},
	};
});
