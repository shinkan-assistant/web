import { v4 as uuidv4 } from 'uuid';

export function addUuidToDocs (records) {
  return records.map(record => {
    return {
      ...record,
      id: crypto.randomUUID(),
    };
  });
}
