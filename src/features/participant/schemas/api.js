import z from "@/lib/zod";
import ParticipantSchema from "./object";
import { transformForCreate, transformForUpdate } from "../../../base/schema/api";
import { AttendanceStatusEnum } from "../enums/data";
import { ParticipantUpdatedScheduleActionEnum } from "../enums/api";

function getInitialSchedule(id) {
  return {
    "id": id,
    "attendance": {"status": AttendanceStatusEnum.unAttend},
    "payment": {"is_completed": false},
  };
}

export const CreateParticipantSchema = ParticipantSchema
  .extend({"schedule_ids": z.array(z.string().uuid()).min(1)})
  .pick({"user_email": true, "event_id": true, "is_organizer": true, "schedule_ids": true })
  .transform((data) => {
    data = {
      "user_email": data["user_email"],
      "event_id": data["event_id"],
      "is_organizer": data["is_organizer"],
      "schedules": data["schedule_ids"].map(scheduleId => getInitialSchedule(scheduleId)),
    }
    return transformForCreate(data);
  });

const UpdatedScheduleInfoSchema = z.object({
  "id": z.string().uuid(),
  "action": z.enum(Object.values(ParticipantUpdatedScheduleActionEnum)),
});

export const UpdateParticipantScheduleSchema = z.object({
  initial: ParticipantSchema,
  formData: z.object({
    "schedule_ids": z.array(z.string().uuid()).min(1),
  }),
}).transform(({initial, formData}) => {
  const data = initial;

  (() => {
    const initialScheduleIds = initial["schedules"]
      .filter(schedule => schedule["cancel"] !== undefined)
      .map(schedule => schedule["id"]);

    const cancelScheduleIds = initialScheduleIds
      .filter(scheduleId => !formData["schedule_ids"].includes(scheduleId));
    if (cancelScheduleIds.length > 0) {
      if (initialScheduleIds.length === cancelScheduleIds.length) {
        data["cancel"] = { "issued_at": (new Date()).toString() };
        return;
      }
      data["schedules"]
        .filter(schedule => !cancelScheduleIds.includes(schedule["id"]))
        .map(schedule => {
          schedule["cancel"] = { "issued_at": (new Date()).toString() }
          return schedule;
        })
    }
    
    const addedScheduleIds = formData["schedule_ids"]
      .filter(scheduleId => !initialScheduleIds.includes(scheduleId));
    if (addedScheduleIds.length > 0) {
      for (let addedScheduleId of addedScheduleIds) {
        const existSchedule = data["schedules"].find(schedule => addedScheduleId === schedule["id"]);
        if (existSchedule) 
          delete existSchedule["cancel"];
        else 
          data["schedule"].push(getInitialSchedule(addedScheduleId));
      }
    }
  })();

  return transformForUpdate(data);
})
