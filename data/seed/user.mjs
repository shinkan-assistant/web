import fs from 'fs';
import { BelongEnum, RoleEnum } from "../enums/user.mjs";

const rawSeedUsers = [
  {
    "email": "",
    "role": RoleEnum.admin,
    "belong": BelongEnum.upperclassman,
  },
  {
    "email": "",
    "role": RoleEnum.normal,
    "belong": BelongEnum.upperclassman,
  },
  {
    "email": "",
    "role": RoleEnum.normal,
    "belong": BelongEnum.freshman,
  },
];

const emailsFileContents = fs.readFileSync(".secret/seedUserEmails.json", 'utf8');
const emails = JSON.parse(emailsFileContents);

const seedUsers = rawSeedUsers.map((user, index) => ({
  ...user,
  email: emails[index],
}));

export default seedUsers;
