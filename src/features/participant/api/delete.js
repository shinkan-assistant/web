import { deleteRecord } from "@/base/api/delete";

export async function deleteParticipant(db, {id}) {
  await deleteRecord(db, "participants", {id});
}
