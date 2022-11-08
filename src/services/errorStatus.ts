import { message } from 'antd';

export default function errorStatus(code: number | undefined, msg: string) {
  try {
    if (code) {
      return message.error(t(`error.${code}`, { msg: msg }));
    } else {
      return message.error(msg);
    }
  } catch (error) {
    return message.error(error);
  }
}
