import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

// Resolving the path to the JSON file
const filePath = path.resolve('data/categories.json');

const createCategory = (name) => {
  // ✅ Read the categories.json file synchronously
  const categoriesData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // ✅ Create a new category object with a unique ID
  const newCategory = {
    id: uuidv4(),
    name,//in Postman we need to give the name as value:   "name": "Sports",
  };

  // ✅ Add the new category to the existing categories array
  categoriesData.categories.push(newCategory);

  // ✅ Write the updated categories array back to the categories.json file
  fs.writeFileSync(filePath, JSON.stringify(categoriesData, null, 2)); // The null, 2 argument ensures the JSON is written with proper indentation

  // ✅ Return the newly created category
  return newCategory;
};

export default createCategory;
