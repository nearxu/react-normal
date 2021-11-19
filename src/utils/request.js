import axios from "axios";

import store from '@/store'
import { getToken } from "@/utils/auth";

//创建一个axios示例
const service = axios.create({
  baseURL: 'http://29135jo738.zicp.vip/api/v1/', // api 的 base_url
  timeout: 5000, // request timeout
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    console.log(store.getState().user,'store.getState().user');
    if (store.getState().user.token) {
      // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
      config.headers.Authorization = getToken();
      config.headers.token = getToken();
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("err" + error); // for debug
    const { status } = error.response;
    console.log(status);
    return Promise.reject(error);
  }
);

export default service;
