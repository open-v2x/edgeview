import { extend } from 'umi-request';
import { getToken } from '@/utils/storage';
import { message } from 'antd';
import { clearStorage } from './../utils/storage';
import { history } from 'umi';

const errorHandler = (error: any) => {
  const { response } = error;
  if (response.status === 401) {
    clearStorage();
    history.push('/user/login');
    return Promise.reject(error);
  } else if (response.status != 200) {
    response.json().then((res: { detail: string }) => {
      const { detail } = res || {};
      if (detail) {
        message.error(detail);
      }
    });
    return Promise.reject(error);
  }
};

const request = extend({
  prefix: process.env.API_SERVER,
  errorHandler,
});

request.interceptors.request.use((url: string, { params, ...options }: any) => {
  const { current, pageSize, ...param } = params || {};
  if (options.method === 'get') {
    if (current) {
      param.pageNum = current;
    }
    if (pageSize) {
      param.pageSize = pageSize;
    }
  }
  return {
    options: {
      ...options,
      params: param,
      headers: { Authorization: getToken() },
    },
  };
});

export default request;
