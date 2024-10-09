import fs from 'fs'; // ✅ For file reading and writing
import path from 'path'; // ✅ For resolving file paths

// ✅ Resolve the path to the users.json file
const filePath = path.resolve('data/users.json');

const deleteUserById = (id) => {
  // ✅ Read the content of the users.json file synchronously
  const usersData = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Parse the JSON string into a JavaScript object

  // ✅ Find the index of the user with the matching ID
  const userIndex = usersData.users.findIndex((user) => user.id === id);

  // ✅ If the user with the given ID doesn't exist, return null
  if (userIndex === -1) {
    return null;
  }

  // ✅ Remove the user from the array
  const deletedUser = usersData.users.splice(userIndex, 1);

  // ✅ Write the updated users array back to the users.json file
  fs.writeFileSync(filePath, JSON.stringify(usersData, null, 2)); // Write the data with indentation

  // ✅ Return the deleted user
  return deletedUser;
};

export default deleteUserById;
