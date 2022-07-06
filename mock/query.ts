import { Request, Response } from 'express';
import { parse } from 'url';

const genList = (pageNum: number, pageSize: number) => {
  const data: Config.QueryListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (pageNum - 1) * 10 + i + 1;
    data.push({
      id: index,
      rsu: 'RSU1、RSU2',
      type: ['status', 'statistics', 'device'][(index - 1) % 3],
      interval: ['hour', 'day', 'week', 'now'][(index - 1) % 4],
      time: '2022-03-14 23:12:00',
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
    Config.QueryListItem & { filter: any };

  let dataSource = [...tableDataSource].slice(
    ((pageNum as number) - 1) * (pageSize as number),
    (pageNum as number) * (pageSize as number),
  );

  if (params.rsu) {
    dataSource = dataSource.filter((data) => data?.rsu?.includes(params.rsu || ''));
  }

  const result = {
    data: {
      data: dataSource,
      total: params.rsu ? dataSource.length : tableDataSource.length,
    },
  };

  return res.json(result);
}

export default {
  'GET /api/query': getList,
};
