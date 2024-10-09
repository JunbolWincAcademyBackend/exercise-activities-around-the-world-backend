import { v4 as uuidv4 } from 'uuid'; // ✅ For generating unique IDs
import fs from 'fs'; // ✅ Node.js File System module to handle file reading and writing
import path from 'path'; // ✅ Path module for resolving file paths

// ✅ Resolve the path to the users.json file
const filePath = path.resolve('data/users.json');

const createUser = (username, name, password, image) => {
  // ✅ Read the content of the users.json file synchronously
  const usersData = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Parse the JSON string into a JavaScript object

  // ✅ Create a new user object with the provided data and a generated UUID
  const newUser = {
    id: uuidv4(),
    name,
    username,
    password,
    image,
  };

  // ✅ Add the new user to the existing array of users
  usersData.users.push(newUser);

  // ✅ Write the updated users array back to the users.json file
  fs.writeFileSync(filePath, JSON.stringify(usersData, null, 2)); // Write the data with indentation

  // ✅ Return the newly created user
  return newUser;
};

export default createUser;
