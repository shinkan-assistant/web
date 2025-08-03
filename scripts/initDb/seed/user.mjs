import fs from 'fs';

const rawSeedUsers = [
  {
    "email": "",
    "is_admin": true,
    "belong": {"is_member": true},
  },
  {
    "email": "",
    "is_admin": false,
    "belong": {"is_member": true},
  },
  {
    "email": "",
    "is_admin": false,
    "belong": {"is_member": false},
  },
];

const emailsFileContents = fs.readFileSync(".secret/seedUserEmails.json", 'utf8');
const emails = JSON.parse(emailsFileContents);

const seedUsers = rawSeedUsers.map((user, index) => ({
  ...user,
  email: emails[index],
}));

export default seedUsers;
