import request from '../request';

// RSU 运维配置列表
export async function maintenanceConfigList(params: API.PageParams) {
  return request<API.ListResult<Config.MaintenanceListItem>>(`/v1/mngs`, {
    method: 'GET',
    params,
  });
}

// 编辑 RSU 运维配置
export async function updateMaintenanceConfig(id: number, data: Config.MaintenanceItem) {
  return request<Config.MaintenanceListItem>(`/v1/mngs/${id}`, {
    method: 'PUT',
    data,
  });
}

// 下发 RSU 运维配置
export async function sendMaintenanceConfig(id: number) {
  return request<string>(`/v1/mngs/${id}/down`, {
    method: 'POST',
  });
}

// 复制 RSU 运维配置
export async function copyMaintenanceConfig(id: number, data: { rsus: number[] }) {
  return request<string>(`/v1/mngs/${id}/copy`, {
    method: 'POST',
    data,
  });
}
