import request from '../request';

// MAP 配置列表
export async function mapConfigList({
  countryName,
  ...params
}: API.PageParams & { countryName?: string[]; areaCode?: string }) {
  if (countryName?.length) {
    params.areaCode = countryName.pop();
  }
  return request<API.ListResult<Config.MapListItem>>(`/v1/maps`, {
    method: 'GET',
    params,
  });
}

// 添加 MAP 配置
export async function createMapConfig(data: Config.CreateMapConfigParams) {
  return request<API.PageResult<null>>(`/v1/maps`, {
    method: 'POST',
    data,
  });
}

// MAP 配置详情
export async function mapConfigInfo(id: number) {
  return request<Config.MapListItem>(`/v1/maps/${id}`, {
    method: 'GET',
  });
}

// MAP 配置已绑定 RSU 列表
export async function mapRSUList({ mapId, ...params }: API.PageParams & { mapId: number }) {
  return request<API.ListResult<Config.MapListItem>>(`/v1/maps/${mapId}/rsus`, {
    method: 'GET',
    params,
  });
}

// 添加 MAP 绑定 RSU
export async function createMapRSU(id: number, data: { rusId: number[] }) {
  return request<API.PageResult<null>>(`/v1/maps/${id}/rsus`, {
    method: 'POST',
    data,
  });
}

// 删除 MAP 绑定的 RSU
export async function deleteMapRSU(id: number, rsuId: number) {
  return request<API.PageResult<null>>(`/v1/maps/${id}/rsus/${rsuId}`, {
    method: 'DELETE',
  });
}

// 编辑 MAP 配置
export async function updateMapConfig(
  id: number,
  data: { type: 'info'; map: Config.CreateMapConfigParams },
) {
  return request<API.PageResult<null>>(`/v1/maps/${id}`, {
    method: 'PUT',
    data,
  });
}

// 删除 MAP 配置
export async function deleteMapConfig(id: number) {
  return request<API.PageResult<null>>(`/v1/maps/${id}`, {
    method: 'DELETE',
  });
}

// 下载 MAP 配置
export async function downloadMapConfig(id: number) {
  return request<API.PageResult<any>>(`/v1/maps/${id}/data`, {
    method: 'GET',
  });
}
