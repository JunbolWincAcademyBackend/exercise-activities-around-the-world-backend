import fs from 'fs'; // ✅ Import fs to handle file reading
import path from 'path'; // ✅ Import path to resolve file paths

// ✅ Resolve the path to the categories.json file
const filePath = path.resolve('data/categories.json');

const getCategories = () => {
  // ✅ Read the content of the categories.json file synchronously
  const categoriesData = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Parse JSON data

  // ✅ Return the categories array from the parsed JSON data
  return categoriesData.categories;
};

export default getCategories;
