import path from "path";
import { defineConfig, loadEnv, type ConfigEnv, type UserConfig } from "vite";
import { createVitePlugins } from "./build/plugin/index";

export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root, "");
  const { VITE_PUBLIC_PATH } = env;
  const isBuild = command === "build";
  const isProduction = mode === "production";
  return {
    root,
    base: "/live-front/",
    plugins: createVitePlugins(env, isBuild),
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
          additionalData: `@import "@/style/variables.less";`, // 引入全局变量
          modifyVars: {
            // 直接在这里定义主题变量
            // "@primary-color": "#d90b0b",
            "@link-color": "#d90b0b",
            "@success-color": "#52c41a",
            "@warning-color": "#faad14",
            "@error-color": "#f5222d",
            "@font-size-base": "14px",
            "@heading-color": "rgba(0, 0, 0, 0.85)",
            "@text-color": "rgba(0, 0, 0, 0.65)",
            "@text-color-secondary": "rgba(0, 0, 0, 0.45)",
            "@disabled-color": "rgba(0, 0, 0, 0.25)",
            "@border-radius-base": "2px",
            "@border-color-base": "#d9d9d9",
          },
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
      cssTarget: "chrome80",
      cssMinify: "esbuild",
      sourcemap: isProduction ? false : "inline",
      outDir: "live-dist",
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",
          manualChunks: {
            // 将Vue相关库分离到单独的chunk
            vue: ["vue", "vue-router", "pinia"],
            // 将UI库分离（如果使用Element Plus、Ant Design等）
            ui: ["ant-design-vue", "@ant-design/icons-vue"],
            // 将工具库分离
            utils: ["lodash-es", "dayjs", "axios"],
          },
        },
      },
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000,
    },
    optimizeDeps: {
      include: ["ant-design-vue", "vue", "vue-router", "@vue/runtime-core", "@vue/runtime-dom", "lodash-es", "dayjs"],
    },
  };
});
