import request from '../request';

// 摄像头列表
export async function cameraList({
  countryName,
  ...params
}: API.PageParams & { countryName?: string[]; areaCode?: string }) {
  if (countryName?.length) {
    params.areaCode = countryName[countryName.length - 1];
  }
  return request<API.ListResult<Device.CameraListItem>>(`/v1/cameras`, {
    method: 'GET',
    params,
  });
}

// 创建摄像头
export async function createCamera(data: Device.CreateCameraParams) {
  return request<Device.CameraListItem>(`/v1/cameras`, {
    method: 'POST',
    data,
  });
}

// 编辑摄像头
export async function updateCamera(id: number, data: Device.CreateCameraParams) {
  return request<Device.CameraListItem>(`/v1/cameras/${id}`, {
    method: 'PUT',
    data,
  });
}

// 删除摄像头
export async function deleteCamera(id: number) {
  return request(`/v1/cameras/${id}`, {
    method: 'DELETE',
  });
}
