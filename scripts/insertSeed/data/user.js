const fs = require('fs');

const usersFileContents = fs.readFileSync("data/seed/user.json", 'utf8');
const rawSeedUsers = JSON.parse(usersFileContents);

const emailsFileContents = fs.readFileSync(".secret/seedUserEmails.json", 'utf8');
const emails = JSON.parse(emailsFileContents);

const seedUsers = rawSeedUsers.map((user, index) => ({
  ...user,
  email: emails[index],
}));

module.exports = seedUsers;
