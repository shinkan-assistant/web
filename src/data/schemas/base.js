export function transformForCreate(data) {
  const nowDateStr = new Date().toString();
  data.id = data?.id ?? uuidV4();
  data.updated_at = nowDateStr
  data.created_at = nowDateStr;
  return data;
}

export function transformForUpdate(data) {
  const nowDateStr = new Date().toString();
  data.updated_at = nowDateStr
  return data;
}
