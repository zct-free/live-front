import vue from "@vitejs/plugin-vue";
export const createVitePlugins = () => {
  const plugins = [vue()];
  return plugins;
};
