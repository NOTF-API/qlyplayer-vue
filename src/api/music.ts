import request from "@/utils/request";

export function getList(url: string) {
  return request({
    url,
    method: "get",
  });
}
