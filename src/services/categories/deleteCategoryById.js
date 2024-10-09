import fs from 'fs'; // ✅ Import fs to handle file reading and writing
import path from 'path'; // ✅ Import path to handle file paths

// ✅ Resolve the path to the categories.json file
const filePath = path.resolve('data/categories.json');

const deleteCategoryById = (id) => {
  // ✅ Read the content of the categories.json file synchronously
  const categoriesData = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Parse the JSON file

  // ✅ Find the index of the category by its ID
  const categoryIndex = categoriesData.categories.findIndex(
    (category) => category.id === String(id)
  );

  // ✅ If the category is not found, return null
  if (categoryIndex === -1) {
    return null; // Category not found
  }

  // ✅ Use splice to remove the category from the array
  const deletedCategory = categoriesData.categories.splice(categoryIndex, 1);

  // ✅ Write the updated categories array back to the categories.json file
  fs.writeFileSync(filePath, JSON.stringify(categoriesData, null, 2)); // Write back with formatting

  // ✅ Return the deleted category
  return deletedCategory[0];
};

export default deleteCategoryById;

