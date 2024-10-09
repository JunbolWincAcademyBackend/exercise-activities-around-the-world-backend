import fs from 'fs'; // ✅ For file reading and writing
import path from 'path'; // ✅ For resolving file paths

// ✅ Resolve the path to the users.json file
const filePath = path.resolve('data/users.json');

const updateUserById = (id, updatedFields) => {
  // ✅ Read the content of the users.json file synchronously
  const usersData = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Parse the JSON string into a JavaScript object

  // ✅ Find the user with the matching ID
  const user = usersData.users.find((user) => user.id === id);

  // ✅ If the user with the given ID doesn't exist, return null
  if (!user) {
    return null;
  }

  // ✅ Update the user with the new fields using the spread operator
  Object.assign(user, updatedFields);

  // ✅ Write the updated users array back to the users.json file
  fs.writeFileSync(filePath, JSON.stringify(usersData, null, 2)); // Write the data with indentation

  // ✅ Return the updated user
  return user;
};

export default updateUserById;
