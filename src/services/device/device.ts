import request from '../request';

// RSU 设备列表
export async function deviceList({
  countryName,
  ...params
}: API.PageParams & { countryName?: string[]; areaCode?: string }) {
  if (countryName?.length) {
    params.areaCode = countryName[countryName.length - 1];
  }
  return request<API.ListResult<Device.DeviceListItem>>(`/v1/rsus`, {
    method: 'GET',
    params,
  });
}

// 未注册 RSU 设备列表
export async function notRegisterDeviceList(params: API.PageParams) {
  return request<API.ListResult<Device.DeviceListItem>>(`/v1/rsu_tmps`, {
    method: 'GET',
    params,
  });
}

export async function countries() {
  return request(`/v1/countries`, {
    method: 'get',
    params: { cascade: true },
  });
}

// 添加 RSU 设备
export async function createDevice(data: Device.CreateDeviceParams) {
  return request<Device.DeviceListItem>(`/v1/rsus`, {
    method: 'POST',
    data,
  });
}

// RSU 设备详情
export async function deviceInfo(id: number) {
  return request<Device.DeviceListItem>(`/v1/rsus/${id}`, {
    method: 'GET',
  });
}

// RSU 设备详情-运行信息
export async function runningInfo(id: number) {
  return request<Device.DeviceRunningInfo>(`/v1/rsus/${id}/running`, {
    method: 'GET',
  });
}

// 编辑 RSU 设备
export async function updateDevice(id: number, data: Device.CreateDeviceParams) {
  return request<Device.DeviceListItem>(`/v1/rsus/${id}`, {
    method: 'PATCH',
    data,
  });
}

// 删除 RSU 设备
export async function deleteDevice(id: number) {
  return request(`/v1/rsus/${id}`, {
    method: 'DELETE',
  });
}

// 删除未注册 RSU 设备
export async function deleteTemporaryDevice(id: number) {
  return request(`/v1/rsu_tmps/${id}`, {
    method: 'DELETE',
  });
}
