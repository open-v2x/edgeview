import request from '../request';

// RSU 参数配置列表
export async function parameterConfigList(params: API.PageParams) {
  return request<API.ListResult<Config.ParameterListItem>>(`/v1/rsu_configs`, {
    method: 'GET',
    params,
  });
}

// 创建 RSU 参数配置
export async function createParameterConfig(data: any) {
  return request<Config.ParameterListItem>(`/v1/rsu_configs`, {
    method: 'POST',
    data,
  });
}

// RSU 参数配置详情
export async function parameterConfigInfo(id: number) {
  return request<Config.ParameterListItem>(`/v1/rsu_configs/${id}`, {
    method: 'GET',
  });
}

// 编辑 RSU 参数配置
export async function updateParameterConfig(id: number, data: any) {
  return request<Config.ParameterListItem>(`/v1/rsu_configs/${id}`, {
    method: 'PUT',
    data,
  });
}

// 删除 RSU 参数配置
export async function deleteParameterConfig(id: number) {
  return request(`/v1/rsu_configs/${id}`, {
    method: 'DELETE',
  });
}
