import UserSchema from "./object";
import { transformForCreate, transformForUpdate } from "../../../base/schema/api";

export const CreateUserSchema = UserSchema
  .pick({"email": true, "name": true})
  .transform(transformForCreate);

export const UpdateUserSchema = UserSchema
  .pick({"name": true, "belong": true})
  .partial()
  .transform(transformForUpdate);

