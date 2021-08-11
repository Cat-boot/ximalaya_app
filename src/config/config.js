let devUrl = '/proxy/'; //开发环境
let prodUrl = 'https://www.guanaitong.com/'; //生产环境
export default {
  baseUrl: process.env.NODE_ENV === 'production' ? prodUrl : devUrl,
  path: '/',
  token: '',
};
