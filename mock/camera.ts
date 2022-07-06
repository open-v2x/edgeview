import { Request, Response } from 'express';
import { parse } from 'url';

const genList = (current: number, pageSize: number) => {
  const data: Device.CameraListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i + 1;
    data.push({
      id: index,
      deviceName: `设备名称 ${index}`,
      code: 'KV1233',
      deviceId: `rsd1234567732111${index}`,
      status: i % 10 > 6 ? 1 : 0,
      updateTime: '2022-03-14 23:12:00',
    });
  }
  data.reverse();
  return data;
};

let tableDataSource = genList(1, 40);

function getCameraList(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as API.PageParams &
    Device.CameraListItem & { filter: any };

  let dataSource = [...tableDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );

  if (params.deviceName) {
    dataSource = dataSource.filter((data) => data?.deviceName?.includes(params.deviceName || ''));
  }

  const result = {
    data: dataSource,
    total: params.deviceName ? dataSource.length : tableDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.pageNum}`, 10) || 1,
  };

  return res.json(result);
}

export default {
  'GET /api/camera/list': getCameraList,
};
