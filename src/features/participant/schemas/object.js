import z from "@/lib/zod";
import { PaymentMethodEnum } from "../enums/data";
import { DateTimeSchema } from "@/base/schema/object";

const CancelSchema = z.object({
  issued_at: DateTimeSchema,
});
const AttendanceSchema = z.object({
  issued_at: DateTimeSchema,
});
const PaymentSchema = z.object({
  issued_at: DateTimeSchema,
  method: z.enum(Object.values(PaymentMethodEnum)),
});

const ScheduleSchema = z.object({
  id: z.string().uuid(),
  created_at: DateTimeSchema,
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
