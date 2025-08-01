import fs from 'fs';

const rawSeedUsers = [
  {
    "email": "",
    "role": "管理者",
    "belong": "先輩",
  },
  {
    "email": "",
    "role": "一般ユーザー",
    "belong": "先輩",
  },
  {
    "email": "",
    "role": "一般ユーザー",
    "belong": "新入生",
  },
];

const emailsFileContents = fs.readFileSync(".secret/seedUserEmails.json", 'utf8');
const emails = JSON.parse(emailsFileContents);

const seedUsers = rawSeedUsers.map((user, index) => ({
  ...user,
  email: emails[index],
}));

export default seedUsers;
