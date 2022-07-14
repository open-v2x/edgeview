import request from '../request';

// 事件信息列表
export async function roadSideMessageList(params: API.PageParams) {
  return request<API.ListResult<Event.RSMListItem>>(`/v1/rsms`, {
    method: 'GET',
    params,
  });
}
