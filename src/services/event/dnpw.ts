import request from '../request';

export async function overtakingWarningList(params: API.PageParams) {
  return request<API.ListResult<Event.RSMListItem>>(`/v1/rsi_dnps`, {
    method: 'GET',
    params,
  });
}
