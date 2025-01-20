import axios from "axios";
import { userStoreInstance } from '@/stores/';
import ResponseStatusEnum from "../enums/ResponseStatusEnum";
import { ElMessage } from "element-plus";
import {router} from '@/router'

let lastMessageTime = 0;
const MESSAGE_DELAY = 1000; // 1秒内不重复显示消息
function showMessage(message, type) {
  const now = Date.now();
  if (now - lastMessageTime > MESSAGE_DELAY) {
    ElMessage({
      message: message,
      type: type
    });
    lastMessageTime = now;
  }
}


const instant = axios.create({
  baseURL: '/api',
  timeout: 100000,
})

instant.defaults.withCredentials = true;
// 添加请求拦截器
instant.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (userStoreInstance.getToken()) {
        config.headers['Authorization'] = `${userStoreInstance.getToken()}`
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instant.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    let res = response.data;
    // 如果说不是成功
    if (res.code !== ResponseStatusEnum.SUCCESS) {
      const message = res.data || ResponseStatusEnum.getCodeText(res);  
      showMessage(message, 'error');
    }
    // 过滤掉其他的信息
    return res;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response) {
      const message = ResponseStatusEnum.getStatusText(error.response);
      showMessage(message, 'error');
      if (error.response.status === ResponseStatusEnum.UNAUTHORIZED) {
          // 如果说是401，就要重新跳转到登陆页面
          // 先清除掉token
          userStoreInstance.removeToken();
          router.push('/login');
      }
    } else if(error.request){
      showMessage(`请求出错： ${error.request}`, 'error');
    } else {
      showMessage(`请求出错： ${error.request}`, 'error');
    }
    return Promise.reject(error);
  });


  export default instant;