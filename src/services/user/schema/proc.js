import UserSchema from "./data";
import { transformForCreate, transformForUpdate } from "../../../helpers/db/schema/api";

export const CreateUserSchema = UserSchema
  .pick({
    "email": true, 
    "family_name": true,
    "given_name": true,
    "university": true,
    "gender": true,
    "academic_level": true,
    "grade": true,
    "belong": true,
  })
  .transform((data) => {
    data["is_admin"] = false;
    return transformForCreate(data);
  });

export const UpdateUserSchema = UserSchema
  .pick({"name": true, "belong": true})
  .partial()
  .transform(transformForUpdate);

