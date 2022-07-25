import request from './request';

// 登录
// 登录后刷新 token
export async function login(body: API.LoginParams) {
  return request<API.LoginResult>('/v1/login', {
    method: 'POST',
    data: body,
  });
}

// 获取登录用户信息
export async function currentUser() {
  return request<API.CurrentUser>('/v1/users/me', {
    method: 'GET',
  });
}
