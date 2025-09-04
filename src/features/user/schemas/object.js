import z from "@/lib/zod";
import GenderEnum from "../const/enum/gender";
import AcademicLevelEnum from "../const/enum/academicLevel";

export const BelongSchema = z.object({
  "is_member": z.boolean().default(false),
})

const UserSchema = z.object({
  "email": z.string().email(),
  "name": z.string().min(1),
  "gender": z.enum(Object.values(GenderEnum)),
  "university": z.string().min(1),
  "academic_level": z.enum(Object.values(AcademicLevelEnum)),
  "belong": BelongSchema,
});
export default UserSchema;
