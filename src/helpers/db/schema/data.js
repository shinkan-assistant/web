import z from "@/lib/zod";

const localDateTimeRegex = /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2} [A-Z]{3,4}$/;
export const DateTimeSchema = z.string().regex(localDateTimeRegex, '無効な日付形式です');
