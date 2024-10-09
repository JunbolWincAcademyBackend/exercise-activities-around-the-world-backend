import fs from 'fs'; // ✅ Import fs to handle file reading and writing
import path from 'path'; // ✅ Import path to handle file paths

// ✅ Resolve the path to the categories.json file
const filePath = path.resolve('data/categories.json');

const updateCategoryById = (id, name) => {
  // ✅ Read the content of the categories.json file synchronously
  const categoryData = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Parse the JSON file

  // ✅ Find the category by its ID
  const category = categoryData.categories.find((category) => category.id === String(id));

  // ✅ If the category is not found, return null
  if (!category) {
    return null; // Category not found
  }

  // ✅ Update the category's name (or other properties if needed)
  category.name = name ?? category.name; // Nullish coalescing to avoid undefined

  // ✅ Write the updated categories array back to the categories.json file
  fs.writeFileSync(filePath, JSON.stringify(categoryData, null, 2)); // Write back with formatting

  // ✅ Return the updated category
  return category;
};

export default updateCategoryById;
