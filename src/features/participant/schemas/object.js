import z from "@/lib/zod";
import { AttendanceStatusEnum, PaymentMethodEnum } from "../enums/data";

const CancelSchema = z.object({
  issued_at: z.string().datetime().optional(),
});
const AttendanceSchema = z.object({
  issued_at: z.string().datetime().optional()
});
const PaymentSchema = z.object({
  issued_at: z.string().datetime(),
  method: z.enum(Object.values(PaymentMethodEnum)),
});

const ScheduleSchema = z.object({
  id: z.string().uuid(),
  attendance: AttendanceSchema.optional(),
  cancel: CancelSchema.optional(),
  payment: PaymentSchema.optional(),
});

const ParticipantSchema = z.object({
  user_email: z.string().email(),
  event_id: z.string().uuid(),
  is_organizer: z.boolean(),
  cancel: CancelSchema.optional(),
  schedules: z.array(ScheduleSchema).min(1),
});
export default ParticipantSchema;
