import axios from 'axios';
import Config from 'react-native-config';

//配置axios统一的接口基本路径
axios.defaults.baseURL = Config.API_URL;
//配置统一的icode
// axios.defaults.headers = {
//   icode: 'FB786F9D1694A2E7',
// };
//配置axios请求拦截器
axios.interceptors.request.use(
  function (config) {
    //console.log('请求数据', config);
    config.headers = {
      //配置统一的icode
      icode: 'FB786F9D1694A2E7',
    };
    return config;
  },
  function (error) {
    //返回错误的信息
    return Promise.reject(error);
  },
);
//添加响应数据拦截器
axios.interceptors.response.use(
  function (response) {
    //console.log('响应数据', response);
    return response.data;
  },
  function (error) {
    //返回错误的信息
    return Promise.reject(error);
  },
);
