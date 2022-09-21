import request from '../request';

// 激光雷达列表
export async function lidarList({
  countryName,
  ...params
}: API.PageParams & { countryName?: string[]; areaCode?: string }) {
  if (countryName?.length) {
    params.areaCode = countryName[countryName.length - 1];
  }
  return request<API.ListResult<Device.LidarListItem>>(`/v1/lidars`, {
    method: 'GET',
    params,
  });
}

// 创建激光雷达
export async function createLidar(data: Device.CreateLidarItem) {
  return request<Device.LidarListItem>(`/v1/lidars`, {
    method: 'POST',
    data,
  });
}

// 编辑激光雷达
export async function updateLidar(id: number, data: Device.CreateLidarItem) {
  return request<Device.LidarListItem>(`/v1/lidars/${id}`, {
    method: 'PUT',
    data,
  });
}

// 删除雷达
export async function deleteLidar(id: number) {
  return request(`/v1/lidars/${id}`, {
    method: 'DELETE',
  });
}

// 启用激光雷达
export async function enabledLidar(id: number, data: Device.CreateLidarItem) {
  return request(`/v1/lidars/${id}`, {
    method: 'POST',
    data,
  });
}
