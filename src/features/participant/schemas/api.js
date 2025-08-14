import z from "@/lib/zod";
import ParticipantSchema from "./object";
import { transformForCreate, transformForUpdate } from "../../../base/schema/api";
import { judgeIsParticipating } from "@/features/event/components/utils";
import { getNowDateTimeStr } from "@/base/utils";

export const CreateParticipantSchema = ParticipantSchema
  .pick({"user_email": true, "event_id": true, "is_organizer": true })
  .extend({"schedule_ids": z.array(z.string().uuid()).min(1)})
  .transform((formData) => {
    return transformForCreate({
      "user_email": formData["user_email"],
      "event_id": formData["event_id"],
      "is_organizer": formData["is_organizer"],
      "schedules": formData["schedule_ids"]
        .map(scheduleId => {
          return { "id": scheduleId, "created_at": getNowDateTimeStr() } 
        }),
    });
  });

export const UpdateParticipantSchedulesSchema = z.object({
    initialData: ParticipantSchema,
    formData: z.object({
      "schedule_ids": z.array(z.string().uuid()),
    }),
  }).transform(({initialData, formData}) => {
    const data = initialData;

    (() => {
      const initialScheduleIds = initialData["schedules"]
        .filter(schedule => judgeIsParticipating(schedule, {myParticipant: initialData}))
        .map(schedule => schedule["id"]);

      const cancelScheduleIds = initialScheduleIds
        .filter(scheduleId => !formData["schedule_ids"].includes(scheduleId));
      if (cancelScheduleIds.length > 0) {
        data["schedules"]
          .filter(schedule => cancelScheduleIds.includes(schedule["id"]))
          .map(schedule => {
            schedule["cancel"] = { "issued_at": getNowDateTimeStr() }
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
            data["schedules"].push({ "id": addedScheduleId, "created_at": getNowDateTimeStr() });
        }
      }
    })();

    return transformForUpdate(data);
  })
