import UserSchema from "./object";
import { transformForCreate, transformForUpdate } from "../../../base/schema/api";

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

