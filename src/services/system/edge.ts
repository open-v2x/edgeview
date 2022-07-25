import request from '../request';

export async function systemConfig(id: number) {
  return request<System.SystemConfig>(`/v1/system_configs/${id}`, {
    method: 'GET',
  });
}

export async function updateSystemConfig(
  data: System.UpdateEdgeNameParams | System.UpdateEdgeConfigParams,
) {
  return request<System.SystemConfig>('/v1/system_configs', {
    method: 'POST',
    data,
  });
}
