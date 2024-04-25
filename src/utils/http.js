/* eslint-disable comma-dangle */
import axios from 'axios';
import { Notification } from 'element-ui';
import router from '@/router';

const http = axios.create({
  baseURL: '/api',
  timeout: 3000,
});

// todo请求拦截器
http.interceptors.request.use((config) => {
  // eslint-disable-next-line no-console
  const token = window.localStorage.getItem('token');
  if (token) {
    config.headers.set('Token', token);
  }
  return config;
});
// todo响应拦截器
// 第一个参数函数： 表示后台正常给你响应了
// 第二个参数韩数： 表示后台未能正常给你响应

http.interceptors.response.use((response) => {
  if (response.data.code === 401) {
    Notification.error('登录失效，请重新登录！');
    router.replace('/login');
  }
  return response;
});

export default http;
