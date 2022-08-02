import request from '../request';

// 事件信息列表
export async function eventInfoList(params: API.PageParams) {
  return request<API.ListResult<Event.RSIListItem>>(`/v1/events`, {
    method: 'GET',
    params,
  });
}

// 事件信息详情
export async function eventInfoDetail(id: number) {
  return request<Event.RSIDetails>(`/v1/events/${id}`, {
    method: 'GET',
  });
}
