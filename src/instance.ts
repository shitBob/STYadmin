import axios from 'axios';
import { useMemberStore } from './stores/member';
axios.defaults.timeout = 5000
export const instance = axios.create();
const memberStore = useMemberStore();
  const serverUrl = 'http://127.0.0.1:4523/m1/5464151-5139514-default'
  // 设置全局请求拦截器
  instance.interceptors.request.use((config:any) => {
    // 在这里对URL进行处理
    const processedUrl = processUrl(config.url);
    config.url = processedUrl;
    config.headers['Authorization'] = memberStore.profile.token;
    return config;
  }, (error:any) => {
  return Promise.reject(error);
  });
  function processUrl(url: any): any {
    console.log(serverUrl + url);
    if (!url.startsWith('http'))
    return serverUrl + url;
  }
