const modules = import.meta.glob("./*.vue", { eager: true });
const components: Record<string, any> = {};
Object.keys(modules).forEach(key => {
  const name = key.replace(/^\.\/(.*)\.vue$/, "$1");
  components[name] = modules[key].default;
});

// 导出所有组件
export default components;
