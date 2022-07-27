import request from '../request';

export async function intersectionCollisionWarningList(params: API.PageParams) {
  return request<API.ListResult<Event.ICWListItem>>(`/v1/rsi_cwms`, {
    method: 'GET',
    params,
  });
}
