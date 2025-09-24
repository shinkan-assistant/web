import { v4 as uuidV4 } from 'uuid';
import { getNowDateTimeStr } from '../../../../base/utils/dateTime';

export function transformForCreate(data) {
  const nowDateStr = getNowDateTimeStr();
  data.id = uuidV4();
  data.updated_at = nowDateStr
  data.created_at = nowDateStr;
  return data;
}

export function transformForUpdate(data) {
  const nowDateStr = getNowDateTimeStr();
  data.updated_at = nowDateStr
  return data;
}
