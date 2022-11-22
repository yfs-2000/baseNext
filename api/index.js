import axios from "axios";
import useTokenStore from "store/useTokenStore";
import toast from "react-hot-toast";
const baseURL = process.env.NEXT_PUBLIC_API;
// 实例化 ajax请求对象
let instance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  // withCredentials: true, //表示跨域请求时是否需要使用凭证
  headers: {
    post: {
      "Content-Type": "application/json", //强制改为 json  如果为file文件  则需要在接口传入optios 设置header
    },
  },
});

// 请求响应拦截器
instance.interceptors.response.use(
  (response) => {
    //统一的报错网络状态处理
    if (response?.data?.code !== 200) {
      return Promise.reject(response.data);
    }

    return response.data.data;
  },
  (error) => {
    if (error.message && error.message === "取消请求") {
      /*这个为当前自己设置取消请求  没有必要有提示*/
    } else {
      //响应异常
      toast.error(error.message ? error.message : "Network error");
    }

    return Promise.reject(error);
  }
);

// 添加拦截器，处理 公用请求参数，和通用请求头部
instance.interceptors.request.use(
  (config) => {
    const token = useTokenStore?.getState()?.token;
    console.log(token);
    // console.log(tokenObj)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.method === "get") {
      getDataMethod(config);
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default instance;

/*params请求参数的删改*/
function getDataMethod(config) {
  const params = config.params;
  let paramsNew = {};
  for (const paramsKey in params) {
    if (params.hasOwnProperty(paramsKey)) {
      const paramsItem = params[paramsKey];
      if (paramsItem || paramsItem === 0 || paramsItem === false) {
        paramsNew[paramsKey] = paramsItem;
      }
    }
  }
  config.params = paramsNew;
}
