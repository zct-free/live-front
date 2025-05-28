import vue from "@vitejs/plugin-vue";
export function createVitePlugins(viteEnv: Object, isBuild: boolean): any[] {
	const vitePlugins = [];

	vitePlugins.push(vue());

	return vitePlugins;
}
