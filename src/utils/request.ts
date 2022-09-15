import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 5000, // 请求超时时间
});

service.interceptors.request.use(
  (req: any) => {
    return req;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (resp: { data: any }) => {
    return resp.data;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default service;
