import request from "@/utils/request";

// 获取验证码
export const getMenusApi = (params: any) => {
  return request({
    url: "/system/menu/getRoutersByMenuId",
    method: "get",
    params,
  });
};
