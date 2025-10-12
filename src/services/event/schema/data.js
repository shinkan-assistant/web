import { v4 as uuidV4 } from 'uuid';
import z from "@/lib/zod"
import { DateTimeSchema } from '@/helpers/db/schema/data';
import { BelongSchema } from '@/services/user/schema/data';
import EventTypeEnum from '../../../data/enums/event/type';
import FeeTypeEnum from '../../../data/enums/event/feeType';
import ContactGroupPlatformEnum from '../../../data/enums/event/contactGroupPlatform';
import OnlineMeetingPlatformEnum from '../../../data/enums/event/onlineMeetingPlatform';

const LocationSchema = z.object({
  name: z.string().min(1),
  address: z.string().optional(),
  map_url: z.string().url().optional(),
});

const FeeByBelongSchema = z.object({
  belong: BelongSchema,
  type: z.enum(Object.values(FeeTypeEnum)),
  fixed: z.number().int().nonnegative().optional(),
  comments: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.type === FeeTypeEnum.fixed) 
    if (data.fixed === undefined) 
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        message: "必須です",
        path: ["fixed"],
      })
}).transform((data) => {
  if (data => data.type !== FeeTypeEnum.fixed && data.fixed !== undefined) 
    delete data.fixed;
  return data;
});

const TimeRangeSchema = z.object({
  start_at: DateTimeSchema,
  end_at: DateTimeSchema.optional(),
}).transform((data) => {
  data.start_at = new Date(data.start_at);
  if (data.end_at !== undefined) 
    if (data.start_at === data.end) 
      delete date.end_at;
    else
      data.end_at = new Date(data.end_at);
  return data;
}).superRefine((data, ctx) => {
  if (data.end_at !== undefined) 
    if (data.start_at > data.end_at)
      ctx.addIssue({
        code: z.ZodIssueCode.custom, 
        message: "終了時間は開始時間よりも遅くしてください。",
        path: ["end_at"]
      })
});

const ScheduleSchemaBase = z.object({
  time_range: TimeRangeSchema,
  title: z.string().min(1).max(200).optional(),
  description: z.string().optional(),
  fees_by_belong: z.array(FeeByBelongSchema).default([]),
});
function transformForSchedule(data) {
  data["id"] = uuidV4();
  return data;
}

const InPersonScheduleSchema = ScheduleSchemaBase.extend({
  location: LocationSchema,
}).transform(transformForSchedule);

const OnlineScheduleSchema = ScheduleSchemaBase.transform(transformForSchedule);

const ContactGroupSchema = z.object({
  platform: z.enum(Object.values(ContactGroupPlatformEnum)),
  url: z.string().url(),
});

const OnlineMeetingInfoSchema = z.object({
  platform: z.enum(Object.values(OnlineMeetingPlatformEnum)),
  meeting_url: z.string().min(1).url(),
  comments: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.type === OnlineMeetingPlatformEnum.zoom) {
    const zoomUrlRegex = /^https:\/\/(?:[a-zA-Z0-9-]+\.)*zoom\.(?:us|com|jp|cn|de|eu|fr|ch|in|mx|sg|au|ca|uk|za)\/(?:j|s|webinar|meeting)\/[\w.-]+(?:\/[\w.-]+)?(?:[?&][\w%=.-]*)?$/;
    if (!zoomUrlRegex.test(data.meeting_url)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "有効なZoomのURL形式ではありません。",
        path: ['meeting_url'],
      });
    }
  }
}).transform((data) => {
  if (data.type === OnlineMeetingPlatformEnum.zoom) {
    const zoomExtractionRegex = /^https:\/\/(?:[a-zA-Z0-9-]+\.)*zoom\.(?:us|com|jp|cn|de|eu|fr|ch|in|mx|sg|au|ca|uk|za)\/(?:j|s|meeting)\/([\w.-]+)(?:\/(?:pwd=)?([\w.-]+))?(?:\?.*?(?:pwd=([^&]+))?)?$/;
    const match = data.meeting_url.match(zoomExtractionRegex);

    if (match[1] !== undefined) 
      data.meeting_id = match[1]
    
    if (match[3] !== undefined)  // match[3] はクエリパラメータのパスコード
      data.password = match[3];
      else if (match[2] !== undefined)  // match[2] はパス形式のパスコード
      data.password = match[2];
  }
});

const BaseEventSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
});

const InPersonEventSchema = BaseEventSchema.extend({
  type: z.literal(EventTypeEnum.in_person),
  is_public_detail_location: z.boolean(),
  rough_location_name: z.string(),
  schedules: z.array(InPersonScheduleSchema).min(1),
  contact_group: ContactGroupSchema,
});

const OnlineEventSchema = BaseEventSchema.extend({
  type: z.literal(EventTypeEnum.online),
  online_meeting_info: OnlineMeetingInfoSchema,
  schedules: z.array(OnlineScheduleSchema).min(1),
});

const EventSchema = z.discriminatedUnion("type", [
  InPersonEventSchema,
  OnlineEventSchema,
]);

// TODO CreateSchema で重複しないようにする（事前に重複しないことを確認する）

export default EventSchema;
