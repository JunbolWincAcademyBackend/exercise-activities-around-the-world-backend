import express from 'express';
import fs from 'fs';
import path from 'path';
import createCategory from '../services/categories/createCategory.js'; // Corrected path
import getCategoryById from '../services/categories/getCategoryById.js'; // Corrected path
import deleteCategoryById from '../services/categories/deleteCategoryById.js'; // Corrected path
import updateCategoryById from '../services/categories/updateCategoryById.js'; // Corrected path
import authMiddleware from '../middleware/advancedAuth.js'; // Corrected path
import getAuthToken from '../utils/getAuthToken.js'; // Corrected path

const categoriesRouter = express.Router();

// Defining the path to the categories.json file
const filePath = path.resolve('data/categories.json');

// Helper function to read categories from the file
const getCategories = () => {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Route to get all categories
categoriesRouter.get('/', (req, res) => {
  try {
    const categories = getCategories(); // Read categories from the JSON file
    res.status(200).json(categories); // Respond with the categories
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

// Route to create a new category
categoriesRouter.post('/', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = createCategory(name); // Use the service to create a category
    const categories = getCategories(); // Load existing categories
    categories.push(newCategory); // Add new category to the array

    // Here is the updated categories back to the file
    fs.writeFileSync(filePath, JSON.stringify(categories, null, 2)); // Save the new category list

    res.status(201).json(newCategory); // Respond with the created category
  } catch (error) {
    res.status(500).json({ message: 'Error creating category' });
  }
});

// Route to get a category by ID
categoriesRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const categories = getCategories(); // Load categories from the file
  const category = getCategoryById(id, categories); // Find the category by ID

  if (!category) {
    res.status(404).json({ message: `Category with id ${id} not found` });
  } else {
    res.status(200).json(category);
  }
});

// Route to delete a category by ID
categoriesRouter.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  let categories = getCategories(); // Load categories from the file
  const category = deleteCategoryById(id, categories); // Delete the category by ID

  if (category) {
    // Here is the updated categories back to the file
    fs.writeFileSync(filePath, JSON.stringify(categories, null, 2)); // Save the new category list
    res.status(200).json({
      message: `Category with id ${id} successfully deleted`,
      category,
    });
  } else {
    res.status(404).json({ message: `Category with id ${id} not found` });
  }
});

// Route to update a category by ID
categoriesRouter.put('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  let categories = getCategories(); // Load categories from the file
  const category = updateCategoryById(id, { name }, categories); // Update the category

  if (category) {
    // Here is the updated categories back to the file
    fs.writeFileSync(filePath, JSON.stringify(categories, null, 2)); // Save the new category list
    res.status(200).json({
      message: `Category with id ${id} successfully updated`,
      category,
    });
  } else {
    res.status(404).json({ message: `Category with id ${id} not found` });
  }
});

export default categoriesRouter;

