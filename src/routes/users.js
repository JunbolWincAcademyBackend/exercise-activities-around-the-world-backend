import express from 'express';
import fs from 'fs';
import path from 'path';
import getUsers from '../services/users/getUsers.js'; // Corrected path
import getUserById from '../services/users/getUserById.js'; // Corrected path
import createUser from '../services/users/createUser.js'; // Corrected path
import updateUserById from '../services/users/updateUserById.js'; // Corrected path
import deleteUserById from '../services/users/deleteUserById.js'; // Corrected path
import authMiddleware from '../middleware/advancedAuth.js'; // Corrected path
import NotFoundError from '../errors/NotFoundError.js'; // Corrected path

const usersRouter = express.Router();

// Route to get all users
usersRouter.get('/', (req, res, next) => {
  try {
    const users = getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// Route to create a new user
usersRouter.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { name, password, username, image } = req.body;
    const newUser = createUser(username, name, password, image);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// Route to get a user by ID
usersRouter.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const user = getUserById(id);

    if (!user) {
      throw new NotFoundError('User', id);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// Route to delete a user by ID
usersRouter.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUserId = deleteUserById(id);

    if (!deletedUserId) {
      throw new NotFoundError('User', id);
    }

    res.status(200).json({
      message: `User with id ${deletedUserId} successfully deleted`,
    });
  } catch (error) {
    next(error);
  }
});

// Route to update a user by ID
usersRouter.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, password, username, image } = req.body;

    const updatedUser = updateUserById(id, { name, password, username, image });

    if (!updatedUser) {
      throw new NotFoundError('User', id);
    }

    res.status(200).json({
      message: `User with id ${id} successfully updated`,
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
