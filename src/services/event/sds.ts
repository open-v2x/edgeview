import request from '../request';

export async function sensorDataSharingList(params: API.PageParams) {
  return request<API.ListResult<Event.ICWListItem>>(`/v1/rsi_sdss`, {
    method: 'GET',
    params,
  });
}
