export const errorHandler = app => {
  app.config.errorHandler = (err, instance, info) => {
    console.error("全局错误捕获:", err, instance, info);
    // 可以添加更多的错误处理逻辑，比如上报错误到服务器
  };
};
