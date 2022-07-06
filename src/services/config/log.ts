import request from '../request';

// RSU 日志下发配置列表
export async function logConfigList(params: API.PageParams) {
  return request<API.ListResult<Config.LogListItem>>(`/v1/rsu_logs`, {
    method: 'GET',
    params,
  });
}

// 创建 RSU 日志下发配置
export async function createLogConfig(data: Config.CreateLogConfigParams) {
  return request<API.PageResult<Config.CreateLogConfigParams>>(`/v1/rsu_logs`, {
    method: 'POST',
    data,
  });
}

// 编辑 RSU 日志下发配置
export async function updateLogConfig(id: number, data: Config.CreateLogConfigParams) {
  return request<API.PageResult<null>>(`/v1/rsu_logs/${id}`, {
    method: 'PUT',
    data,
  });
}

// 删除 RSU 日志下发配置
export async function deleteLogConfig(id: number) {
  return request<API.PageResult<null>>(`/v1/rsu_logs/${id}`, {
    method: 'DELETE',
  });
}
