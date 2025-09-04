import fs from 'fs';

export default function getSeedUsers(envName) {
  const seedUsersContents = fs.readFileSync(`.secret_data_branches/seedUsers/${envName}.json`, 'utf8');
  return JSON.parse(seedUsersContents);
}
