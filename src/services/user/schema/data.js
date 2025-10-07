import z from "@/lib/zod";
import GenderEnum from "../../../backend/data/enums/user/gender";
import AcademicLevelEnum from "../../../backend/data/enums/user/academicLevel";

export const BelongSchema = z.object({
  "is_member": z.boolean().default(false),
})

const UserSchema = z.object({
  "email": z.string().email(),
  "first_name": z.string().min(1),
  "last_name": z.string().min(1),
  "gender": z.enum(Object.values(GenderEnum)),
  "university": z.string().min(1),
  "academic_level": z.enum(Object.values(AcademicLevelEnum)),
  "grade": z.number().int().positive(),
  "belong": BelongSchema,
  "is_admin": z.boolean().default(false),
});
export default UserSchema;
