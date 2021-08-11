import ReactDOM from 'react-dom';
import axios from 'axios';
// import {fetch} from 'whatwg-fetch';
//获取全局load的id
let oLoad = ReactDOM.findDOMNode(document.getElementById('pageLoad'));
export default function request(url, method, data = {}, config = {}) {
  showLoad();
  return axiosRequest(url, method, data, config);
  //  return fetchRequest(url, method,data)
}
function axiosRequest(url, method, data, config) {
  let sMethod = method.toLocaleLowerCase();
  if (sMethod === 'post') {
    let params = new URLSearchParams();
    if (data instanceof Object) {
      for (let key in data) {
        params.append(key, data[key]);
      }
      data = params;
    }
    //如果接口类型是raw格式直接注释上边new
  } else if (sMethod === 'file') {
    sMethod = 'post';
    let params = new FormData();
    if (data instanceof Object) {
      for (let key in data) {
        params.append(key, data[key]);
      }
    }
    data = params;
  }
  let axiosConfig = {
    url: url,
    method: sMethod,
    data: data,
    dataType: 'jsonp',
    crossDomain: true,
  };
  if (config instanceof Object) {
    for (let key in config) {
      axiosConfig[key] = config[key];
    }
  }
  return axios(axiosConfig).then(res => {
    hiddenLoad();
    return res.data;
  });
}
// function fetchRequest(url,method,data){
//     let sMethod=method.toLocaleLowerCase();
//     let fetchConfig={};
//     if(sMethod==='post'){
//         fetchConfig['headers']={
//             'Content-Type':"application/x-www-form-urlencoded"
//         };
//         if(data instanceof Object){
//             let body="";
//             for (let key in data){
//                 body+="&"+key+"="+encodeURIComponent(data[key]);
//             }
//             data=body.slice(1)
//         }
//
//         fetchConfig['body']=data;
//     }else if(sMethod ==='file'){
//         sMethod='post';
//         let param=new FormData();
//         if(data instanceof Object){
//             for (let key in data) {
//                 param.append(key, data[key]);
//             }
//            data=param
//         }
//         fetchConfig['body']=data;
//     }
//
//     fetchConfig['method']=sMethod;
//     return fetch(url,fetchConfig).then(res=>{
//         hiddenLoad()
//         return res.json()
//     })
// }

//加载之前
function showLoad() {
  oLoad.style.display = 'block';
}
//加载之后
function hiddenLoad() {
  oLoad.style.display = 'none';
}
