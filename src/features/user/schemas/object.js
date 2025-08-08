import z from "@/lib/zod";

const BelongSchema = z.object({
  "is_member": z.boolean().default(false),
})

const UserSchema = z.object({
  "email": z.string().email(),
  "name": z.string().min(1),
  "belong": BelongSchema,
});
export default UserSchema;
