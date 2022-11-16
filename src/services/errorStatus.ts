import { message } from 'antd';

export default function errorStatus(code: number | undefined, msg: string, detail: any) {
  switch (code) {
    case 1062:
    case 1406:
      return message.error(t(`error.${code}`, { msg: msg }));
    case 1116:
      const { intersection_id, phase_id } = detail;
      return message.error(
        t(`error.${code}`, { intersectionId: intersection_id, phaseId: phase_id }),
      );
    default:
      return message.error(msg);
  }
}
