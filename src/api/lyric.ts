import request from "@/utils/request";

export function getLyric(url: string) {
  return request({
    url,
    method: "get",
  });
}
