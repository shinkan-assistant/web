import z from "@/lib/zod";
import ParticipantSchema from "./object";
import { transformForCreate } from "../../../base/schema/api";
import { AttendanceStatusEnum } from "../enums/data";

export const CreateParticipantSchema = ParticipantSchema
  .extend({"schedule_ids": z.array(z.string().uuid()).min(1)})
  .pick({"user_email": true, "event_id": true, "is_organizer": true, "schedule_ids": true })
  .transform((data) => {
    data = {
      "user_email": data["user_email"],
      "event_id": data["event_id"],
      "is_organizer": data["is_organizer"],
      "schedules": data["schedule_ids"].map(scheduleId => {
        return {
          "id": scheduleId,
          "attendance": {"status": AttendanceStatusEnum.unAttend},
          "payment": {"is_completed": false},
        }
      })
    }
    return transformForCreate(data);
  });
