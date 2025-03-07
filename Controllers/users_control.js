// controllers/usersController.js
import express from 'express';
import { fetchAllUsers, createUser, updateUser, deleteUser, fetchUserById } from '../models/users_model.js';

export const usersController = express.Router();

// Route to get all users
usersController.get('/', async (req, res) => {
    try {
        const users = await fetchAllUsers();
        res.status(200).json({
            message: 'Users fetched successfully',
            users
        });
    } catch (error) {
        res.status(500).json({ message: `Error fetching users: ${error.message}` });
    }
});

// Route to get a user by ID
usersController.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await fetchUserById(id);
        if (user) {
            res.status(200).json({
                message: 'User fetched successfully',
                user
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: `Error fetching user: ${error.message}` });
    }
});

// Route to create a new user
usersController.post('/', async (req, res) => {
    const { username, email } = req.body;
    try {
        const newUser = await createUser({ username, email });
        res.status(201).json({
            message: 'User created successfully',
            newUser
        });
    } catch (error) {
        res.status(500).json({ message: `Error creating user: ${error.message}` });
    }
});

// Route to update a user
usersController.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    try {
        const updatedUser = await updateUser(id, { username, email });
        if (updatedUser) {
            res.status(200).json({
                message: 'User updated successfully',
                updatedUser
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: `Error updating user: ${error.message}` });
    }
});

// Route to delete a user
usersController.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await deleteUser(id);
        if (deletedUser) {
            res.status(200).json({
                message: 'User deleted successfully',
                deletedUser
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: `Error deleting user: ${error.message}` });
    }
});
