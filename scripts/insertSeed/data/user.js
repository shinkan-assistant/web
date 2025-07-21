const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const rawSeedUsers = [
  {
    role: "管理者",
    belong: "先輩",
  },
  {
    role: "一般ユーザー",
    belong: "先輩",
  },
  {
    role: "一般ユーザー",
    belong: "新入生",
  },
];

const yamlPath = path.join(process.cwd(), '.secret', 'seedUserEmails.yaml');
const fileContents = fs.readFileSync(yamlPath, 'utf8');
const data = yaml.load(fileContents);

const seedUsers = rawSeedUsers.map((user, index) => ({
  ...user,
  email: data.emails[index],
}));

module.exports = seedUsers;
