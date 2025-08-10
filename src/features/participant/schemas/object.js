import z from "@/lib/zod";
import { AttendanceStatusEnum, PaymentMethodEnum } from "../enums/data";

const UnAttendSchema = z.object({
  status: z.literal(AttendanceStatusEnum.unAttend),
});
const CancelSchema = z.object({
  status: z.literal(AttendanceStatusEnum.cancel),
  cancel_at: z.string().datetime(),
});
const AttendSchema = z.object({
  status: z.literal(AttendanceStatusEnum.attend),
  attend_at: z.string().datetime(),
});

const AttendanceSchema = z.discriminatedUnion("status", [
  UnAttendSchema,
  CancelSchema,
  AttendSchema,
]);

const UnpaidSchema = z.object({
  is_completed: z.literal(false),
});
const PaidSchema = z.object({
  is_completed: z.literal(true),
  paid_at: z.string().datetime(),
  method: z.enum(Object.values(PaymentMethodEnum)),
});
const PaymentSchema = z.discriminatedUnion("is_completed", [
  UnpaidSchema,
  PaidSchema,
]);

const ScheduleSchema = z.object({
  id: z.string().uuid(),
  attendance: AttendanceSchema,
  payment: PaymentSchema,
});

const ParticipantSchema = z.object({
  user_email: z.string().email(),
  event_id: z.string().uuid(),
  is_organizer: z.boolean(),
  schedules: z.array(ScheduleSchema).min(1),
});
export default ParticipantSchema;
