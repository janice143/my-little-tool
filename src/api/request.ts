import axios, { InternalAxiosRequestConfig } from "axios";
import nprogress from "nprogress";
//如果出现进度条没有显示：一定是你忘记了引入样式了
import "nprogress/nprogress.css";

axios.defaults.baseURL = "/api";
axios.defaults.timeout = 50000;

// 请求拦截器
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    // 可以配置token
    nprogress.start();
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);
// 响应拦截器
axios.interceptors.response.use((response) => {
  //进度条结束
  nprogress.done();
  const res = response.data;
  // 真实服务器的接口返回200表示成功
  // 401 没有权限 409用户名已存在 514 验证码失效
  if (
    res.code === 200 ||
    res.code === 401 ||
    res.code === 409 ||
    res.code === 409 ||
    res.status === 1
  ) {
    // console.log(res.msg);
    return res;
  } else {
    return Promise.reject(new Error(res.msg || "Error"));
  }
});

export default axios;
