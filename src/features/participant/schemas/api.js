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

export const UpdateParticipantSchedulesSchema = ParticipantSchema
  .extend({
    "updated_schedule_infos": z.array(UpdatedScheduleInfoSchema).min(1)
  })
  // TODO initial_schedules は store から取得する
  .pick({"schedules": true, "updated_schedule_infos": true })
  .transform((data) => {
    const cancelScheduleIds = data["updated_schedule_infos"]
      .filter(elem => elem["action"] === ParticipantUpdatedScheduleActionEnum.cancel)
      .map(elem => elem["id"]);
    let schedules = data["schedules"]
      .filter(schedule => !cancelScheduleIds.includes(schedule["id"]));

    const addScheduleIds = data["updated_schedule_infos"]
      .filter(elem => elem["action"] === ParticipantUpdatedScheduleActionEnum.add)
      .map(elem => elem["id"]);
    schedules = schedules
      .concat(addScheduleIds.map(scheduleId => getInitialSchedule(scheduleId)));

    data = {
      "schedules": schedules,
    }
    return transformForUpdate(data);
  });
