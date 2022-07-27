import request from '../request';

export async function cooperativeLaneChangeList(params: API.PageParams) {
  return request<API.ListResult<Event.ICWListItem>>(`/v1/rsi_clcs`, {
    method: 'GET',
    params,
  });
}
