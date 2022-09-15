declare module "axios" {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
  }
  function create(config: any): any;
}
