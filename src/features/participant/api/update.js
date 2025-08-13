import { getUpdatedScheduleInfos } from "@/features/event/components/utils";
import { ParticipantUpdatedScheduleActionEnum } from "../enums/api";
import { deleteParticipant } from "./delete";
import { updateRecord } from "@/base/api/update";
import { UpdateParticipantSchedulesSchema } from "../schemas/api";

// cancelScheduleIds と addScheduleIds に間違いがない前提
// TODO currentScheduleIdsに置き換えるといいかも
export async function updateParticipantSchedules(db, {initialParticipant, currentCheckedScheduleIds}) {
  const id = initialParticipant["id"];

  const isAllCanceled = currentCheckedScheduleIds.length === 0 && initialParticipant.schedules.length > 0;
  if (isAllCanceled) {
    await deleteParticipant(db, {id: id});
    return;
  }

  console.log({
    "schedules": initialParticipant.schedules,
    "updated_schedule_infos": getUpdatedScheduleInfos({initialParticipant, currentCheckedScheduleIds}),
  });
  updateRecord(db, "participants", {
    Schema: UpdateParticipantSchedulesSchema,
    id: id, 
    rawData: {
      "schedules": initialParticipant.schedules,
      "updated_schedule_infos": getUpdatedScheduleInfos({initialParticipant, currentCheckedScheduleIds}),
    }
  });
}