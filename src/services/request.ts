import { extend } from 'umi-request';
import { getToken } from 'edge-src/utils/storage';
import { message } from 'antd';
import { clearStorage } from './../utils/storage';
import { history } from 'umi';
import errorStatus from './errorStatus';

const errorHandler = (error: any) => {
  const { response } = error;
  if (response.status === 401) {
    clearStorage();
    history.push('/user/login');
    return Promise.reject(error);
  } else if (response.status != 200) {
    if (response.headers.get('Content-Type').includes('application/json')) {
      response.json().then((res: { detail: any }) => {
        const { detail } = res || {};
        if (detail) {
          const { code, msg } = detail;
          errorStatus(code, msg || detail);
        }
      });
    } else {
      message.error(response.statusText);
    }
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
