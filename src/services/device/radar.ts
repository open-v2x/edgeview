import request from '../request';

// 雷达列表
export async function radarList({
  countryName,
  ...params
}: API.PageParams & { countryName?: string[]; areaCode?: string }) {
  if (countryName?.length) {
    params.areaCode = countryName[countryName.length - 1];
  }
  return request<API.ListResult<Device.CameraListItem>>(`/v1/radars`, {
    method: 'GET',
    params,
  });
}

// 创建雷达
export async function createRadar(data: Device.CreateCameraParams) {
  return request<Device.CameraListItem>(`/v1/radars`, {
    method: 'POST',
    data,
  });
}

// 编辑雷达
export async function updateRadar(id: number, data: Device.CreateCameraParams) {
  return request<Device.CameraListItem>(`/v1/radars/${id}`, {
    method: 'PUT',
    data,
  });
}

// 删除雷达
export async function deleteRadar(id: number) {
  return request(`/v1/radars/${id}`, {
    method: 'DELETE',
  });
}
