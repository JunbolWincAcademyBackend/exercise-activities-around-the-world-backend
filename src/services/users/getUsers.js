import fs from 'fs'; // ✅ For file reading
import path from 'path'; // ✅ For resolving file paths

// ✅ Resolve the path to the users.json file
const filePath = path.resolve('data/users.json');

const getUsers = () => {
  // ✅ Read the content of the users.json file synchronously
  const usersData = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Parse the JSON string into a JavaScript object

  return usersData.users; // ✅ Return the users array
};

export default getUsers;

