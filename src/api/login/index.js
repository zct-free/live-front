import request from "@/utils/request";

// 获取验证码
export const createCaptcha = () => {
  return request.get("/captcha");
};
// 登录接口
export const loginApi = params => {
  return request.post("/auth/login", params);
};
