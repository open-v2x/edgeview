import request from '../request';

// RSU 信息查询列表
export async function infoQueryList(params: API.PageParams) {
  return request<API.ListResult<Config.QueryListItem>>(`/v1/rsu_queries`, {
    method: 'GET',
    params,
  });
}

// 下发 RSU 信息查询指令
export async function createQueryInstruction(data: Config.CreateQueryParams) {
  return request<Config.QueryListItem>(`/v1/rsu_queries`, {
    method: 'POST',
    data,
  });
}

// RSU 信息查询详情
export async function infoQueryDetails(id: number) {
  return request<API.ListResult<Config.QueryInfoDetails>>(`/v1/rsu_queries/${id}`, {
    method: 'GET',
  });
}

// 删除信息查询
export async function deleteInfoQuery(id: number) {
  return request(`/v1/rsu_queries/${id}`, {
    method: 'DELETE',
  });
}
