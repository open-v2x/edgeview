import request from '../request';

// spat 列表
export async function spatList({
  countryName,
  ...params
}: API.PageParams & { countryName?: string[]; areaCode?: string }) {
  if (countryName?.length) {
    params.areaCode = countryName[countryName.length - 1];
  }
  return request<API.ListResult<Device.SpatListItem>>(`/v1/spats`, {
    method: 'GET',
    params,
  });
}

// 创建 spat
export async function createSpat(data: Device.CreateSpatItem) {
  return request<Device.SpatListItem>(`/v1/spats`, {
    method: 'POST',
    data,
  });
}

// 编辑 spat
export async function updateSpat(id: number, data: Device.CreateSpatItem) {
  return request<Device.SpatListItem>(`/v1/spats/${id}`, {
    method: 'PUT',
    data,
  });
}

// 删除 spat
export async function deleteSpat(id: number) {
  return request(`/v1/spats/${id}`, {
    method: 'DELETE',
  });
}

// 启用激光雷达
export async function enabledSpat(id: number, data: Device.CreateSpatItem) {
  return request(`/v1/spats/${id}`, {
    method: 'POST',
    data,
  });
}
