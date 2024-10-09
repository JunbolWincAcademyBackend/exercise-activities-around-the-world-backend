import fs from 'fs'; // ✅ Import fs to handle file reading
import path from 'path'; // ✅ Import path to resolve file paths

// ✅ Resolve the path to the categories.json file
const filePath = path.resolve('data/categories.json');

const getCategoryById = (id) => {
  // ✅ Read the content of the categories.json file synchronously
  const categoriesData = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Parse JSON data

  // ✅ Find the category with the matching ID
  const category = categoriesData.categories.find((category) => category.id === id);

  // ✅ Return the found category or undefined if not found
  return category;
};

export default getCategoryById;
