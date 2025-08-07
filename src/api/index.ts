import request from "@/utils/request";

// 获取菜单
export const getMenusApi = (params: any) => {
  return request({
    url: "/system/menu/getRoutersByMenuId",
    method: "get",
    params,
  });
};
