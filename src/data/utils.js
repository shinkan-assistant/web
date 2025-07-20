import { v4 as uuidv4 } from 'uuid';

export function addUuidToRecords (records) {
  return records.map(record => {
    return {
      ...record,
      id: crypto.randomUUID(),
    };
  });
}
