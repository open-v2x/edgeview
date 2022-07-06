import request from '../request';

export async function overtakingWarningList(params: API.PageParams) {
  return request<API.ListResult<Event.RSMListItem>>(`/dnpws`, {
    method: 'GET',
    params,
  });
}
