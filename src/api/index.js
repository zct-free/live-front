import request from "@/utils/request";

// 获取菜单
export const getMenusApi = params => {
  return request({
    url: "/system/menu/getRoutersByMenuId",
    method: "get",
    params,
  });
};
export const getPolyvExecuteApi = data => {
  return request({
    url: "/im/polyv/execute",
    method: "post",
    data: data,
  });
};
