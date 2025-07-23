import z from "@/lib/zod";
import { RoleEnum, BelongEnum } from "@/data/enums/user.js";
import { transformForCreate } from "./base";

const UserSchema = z.object({
  id: z.string().min(1).optional(),
  email: z.string().email(),
  name: z.string().min(1),
  role: z.enum(Object.values(RoleEnum)),
  belong: z.enum(Object.values(BelongEnum)),
});

export const CreateUserSchema = UserSchema
  .transform(transformForCreate);
