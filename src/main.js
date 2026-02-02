import "@/style/common.less";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { createApp } from "vue";
import App from "./App.vue";
import { setupDirectives } from "./directive";
import router from "./router";
import pinia from "./store";
import { errorHandler } from "./utils/error-handler.js";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Antd);

// 注册全局指令
setupDirectives(app);
errorHandler(app);
app.mount("#app");
