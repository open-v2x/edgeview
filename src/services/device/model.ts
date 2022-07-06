import request from '../request';

// RSU 型号列表
export async function modelList(params: API.PageParams) {
  return request<API.ListResult<Device.ModelListItem>>(`/v1/rsu_models`, {
    method: 'GET',
    params,
  });
}

// 添加 RSU 型号
export async function createModel(body: Device.ModelListItem) {
  return request<API.PageResult<string>>(`/v1/rsu_models`, {
    method: 'POST',
    data: body,
  });
}

// RSU 型号详情
export async function modelInfo(id: number) {
  return request<API.PageResult<Device.ModelListItem>>(`/v1/rsu_models/${id}`, {
    method: 'GET',
  });
}

// 编辑 RSU 型号
export async function updateModel(id: number, body: Device.ModelListItem) {
  return request<API.PageResult<string>>(`/v1/rsu_models/${id}`, {
    method: 'PUT',
    data: body,
  });
}

// 删除 RSU 型号
export async function deleteModel(id: number) {
  return request<API.PageResult<string>>(`/v1/rsu_models/${id}`, {
    method: 'DELETE',
  });
}
