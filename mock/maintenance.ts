import { Request, Response } from 'express';
import { parse } from 'url';

const genList = (pageNum: number, pageSize: number) => {
  const data: Config.MaintenanceListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (pageNum - 1) * 10 + i + 1;
    data.push({
      id: index,
      name: `test ${index}`,
      sn: 'rsd12345677321111',
      heartbeat: 60,
      operatingState: 60,
      log: 60,
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
  const { pageNum = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as API.PageParams &
    Config.MaintenanceListItem & { filter: any };

  let dataSource = [...tableDataSource].slice(
    ((pageNum as number) - 1) * (pageSize as number),
    (pageNum as number) * (pageSize as number),
  );

  if (params.name) {
    dataSource = dataSource.filter((data) => data?.name?.includes(params.name || ''));
  }

  const result = {
    data: {
      data: dataSource,
      total: params.name ? dataSource.length : tableDataSource.length,
    },
  };

  return res.json(result);
}

export default {
  'GET /api/maintenance': getList,
};
