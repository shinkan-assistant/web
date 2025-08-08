import z from "@/lib/zod";
import { transformForCreate, transformForUpdate } from "../../../base/schema/api";

const BelongSchema = z.object({
  "is_member": z.boolean().default(false),
})

const UserSchema = z.object({
  "email": z.string().email(),
  "name": z.string().min(1),
  "belong": BelongSchema,
});

export const CreateUserSchema = UserSchema
  .pick({"email": true, "name": true})
  .transform((data) => {
    data["is_admin"] = false;
    data["belong"]["is_member"] = false;
    return transformForCreate(data);
  });

export const UpdateUserSchema = UserSchema
  .pick({"name": true, "belong": true})
  .partial()
  .transform(transformForUpdate);