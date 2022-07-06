import { Request, Response } from 'express';
import { parse } from 'url';

const genList = (pageNum: number, pageSize: number) => {
  const data: Event.RSMListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (pageNum - 1) * 10 + i + 1;
    data.push({
      id: index,
      targetId: index,
      participantType: ['unknown', 'motor', 'non-motor', 'pedestrian', 'rsu'][index % 4],
      dataSource: 'RSU',
      lng: 33.23423423,
      lat: 122.23423423,
      createTime: '2022-03-14 23:12:00',
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
    Event.RSMListItem & { filter: any };

  let dataSource = [...tableDataSource].slice(
    ((pageNum as number) - 1) * (pageSize as number),
    (pageNum as number) * (pageSize as number),
  );

  if (params.participantType) {
    dataSource = dataSource.filter((data) => data?.participantType === params.participantType);
  }

  const result = {
    data: {
      data: dataSource,
      total: params.participantType ? dataSource.length : tableDataSource.length,
    },
  };

  return res.json(result);
}

export default {
  'GET /api/rsm': getList,
};
