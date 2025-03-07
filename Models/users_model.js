// models/users.js
import { supabase } from '../supabaseConfig.js';

/**
 * Fetch all users
 * @returns {Array} - List of users
 */
export async function fetchAllUsers() {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('id, username, email, created_at');
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error(`Error fetching users: ${error.message}`);
        return [];
    }
}

/**
 * Fetch a user by ID
 * @param {number} id - The ID of the user to fetch
 * @returns {Object} - The user data
 */
export async function fetchUserById(id) {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('id, username, email, created_at')
            .eq('id', id)
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error(`Error fetching user: ${error.message}`);
        return null;
    }
}

/**
 * Create a new user
 * @param {Object} userData - The user data to insert
 * @returns {Object} - The created user
 */
export async function createUser(userData) {
    try {
        const { data, error } = await supabase
            .from('users')
            .insert([userData])
            .select('id, username, email, created_at')
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error(`Error creating user: ${error.message}`);
        return null;
    }
}

/**
 * Update an existing user
 * @param {number} id - The ID of the user to update
 * @param {Object} userData - The updated user data
 * @returns {Object} - The updated user
 */
export async function updateUser(id, userData) {
    try {
        const { data, error } = await supabase
            .from('users')
            .update(userData)
            .eq('id', id)
            .select('id, username, email, created_at')
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error(`Error updating user: ${error.message}`);
        return null;
    }
}

/**
 * Delete a user
 * @param {number} id - The ID of the user to delete
 * @returns {Object} - The deleted user
 */
export async function deleteUser(id) {
    try {
        const { data, error } = await supabase
            .from('users')
            .delete()
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error(`Error deleting user: ${error.message}`);
        return null;
    }
}
