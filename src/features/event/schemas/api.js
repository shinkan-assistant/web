import z from "@/lib/zod";
import { transformForUpdate } from "../../../base/schema/api";
import EventSchema from "./object";

export const UpdateEventSchema = z.object({
  initialData: EventSchema,
  formData: EventSchema.optional(),
}).transform(({initialData, formData}) => {
  const data = initialData;

  for (let key of ["rough_location_name"]) {
    if (formData[key] !== initialData[key]) {
      data[key] = formData[key];
    }
  }

  return transformForUpdate(data);
});
