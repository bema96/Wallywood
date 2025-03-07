// controllers/userProfilesController.js
import express from 'express';
import { fetchAllUserProfiles, createUserProfile, updateUserProfile, deleteUserProfile, fetchUserProfileById } from '../models/userProfiles_model.js';

export const userProfilesController = express.Router();

// Route to get all user profiles
userProfilesController.get('/', async (req, res) => {
    try {
        const profiles = await fetchAllUserProfiles();
        res.status(200).json({
            message: 'User profiles fetched successfully',
            profiles
        });
    } catch (error) {
        res.status(500).json({ message: `Error fetching user profiles: ${error.message}` });
    }
});

// Route to get a user profile by ID
userProfilesController.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const profile = await fetchUserProfileById(id);
        if (profile) {
            res.status(200).json({
                message: 'User profile fetched successfully',
                profile
            });
        } else {
            res.status(404).json({ message: 'User profile not found' });
        }
    } catch (error) {
        res.status(500).json({ message: `Error fetching user profile: ${error.message}` });
    }
});

// Route to create a new user profile
userProfilesController.post('/', async (req, res) => {
    const { user_id, firstname, lastname, birthdate, gender, position } = req.body;
    try {
        const newProfile = await createUserProfile({ user_id, firstname, lastname, birthdate, gender, position });
        res.status(201).json({
            message: 'User profile created successfully',
            newProfile
        });
    } catch (error) {
        res.status(500).json({ message: `Error creating user profile: ${error.message}` });
    }
});

// Route to update a user profile
userProfilesController.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, birthdate, gender, position } = req.body;
    try {
        const updatedProfile = await updateUserProfile(id, { firstname, lastname, birthdate, gender, position });
        if (updatedProfile) {
            res.status(200).json({
                message: 'User profile updated successfully',
                updatedProfile
            });
        } else {
            res.status(404).json({ message: 'User profile not found' });
        }
    } catch (error) {
        res.status(500).json({ message: `Error updating user profile: ${error.message}` });
    }
});

// Route to delete a user profile
userProfilesController.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProfile = await deleteUserProfile(id);
        if (deletedProfile) {
            res.status(200).json({
                message: 'User profile deleted successfully',
                deletedProfile
            });
        } else {
            res.status(404).json({ message: 'User profile not found' });
        }
    } catch (error) {
        res.status(500).json({ message: `Error deleting user profile: ${error.message}` });
    }
});
