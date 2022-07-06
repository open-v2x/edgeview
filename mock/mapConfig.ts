import { Request, Response } from 'express';
import { parse } from 'url';

const genList = (current: number, pageSize: number) => {
  const data: Config.MapListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i + 1;
    data.push({
      id: index,
      mapName: `设备名称${index}`,
      mapArea: '江苏省/南京市/江宁区',
      mapLocation: `十字路口${index}`,
      status: i % 10 > 6 ? 1 : 0,
      number: i % 10,
    });
  }
  data.reverse();
  return data;
};

let tableDataSource = genList(1, 40);

function getList(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as API.PageParams &
    Config.MapListItem & { filter: any };

  let dataSource = [...tableDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );

  if (params.mapName) {
    dataSource = dataSource.filter((data) => data?.mapName?.includes(params.mapName || ''));
  }

  const result = {
    data: dataSource,
    total: params.mapName ? dataSource.length : tableDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.pageNum}`, 10) || 1,
  };

  return res.json(result);
}

export default {
  'GET /api/map/list': getList,
};
