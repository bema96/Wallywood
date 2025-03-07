// models/userProfiles.js
import { supabase } from '../supabaseConfig.js';

/**
 * Fetch all user profiles
 * @returns {Array} - List of user profiles
 */
export async function fetchAllUserProfiles() {
    try {
        const { data, error } = await supabase
            .from('user_profiles')
            .select('id, user_id, created_at, firstname, lastname, birthdate, gender, position');
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error(`Error fetching user profiles: ${error.message}`);
        return [];
    }
}

/**
 * Fetch a user profile by ID
 * @param {number} id - The ID of the user profile to fetch
 * @returns {Object} - The user profile data
 */
export async function fetchUserProfileById(id) {
    try {
        const { data, error } = await supabase
            .from('user_profiles')
            .select('id, user_id, created_at, firstname, lastname, birthdate, gender, position')
            .eq('id', id)
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error(`Error fetching user profile: ${error.message}`);
        return null;
    }
}

/**
 * Create a new user profile
 * @param {Object} profileData - The profile data to insert
 * @returns {Object} - The created user profile
 */
export async function createUserProfile(profileData) {
    try {
        const { data, error } = await supabase
            .from('user_profiles')
            .insert([profileData])
            .select('id, user_id, created_at, firstname, lastname, birthdate, gender, position')
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error(`Error creating user profile: ${error.message}`);
        return null;
    }
}

/**
 * Update an existing user profile
 * @param {number} id - The ID of the user profile to update
 * @param {Object} profileData - The updated profile data
 * @returns {Object} - The updated user profile
 */
export async function updateUserProfile(id, profileData) {
    try {
        const { data, error } = await supabase
            .from('user_profiles')
            .update(profileData)
            .eq('id', id)
            .select('id, user_id, created_at, firstname, lastname, birthdate, gender, position')
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error(`Error updating user profile: ${error.message}`);
        return null;
    }
}

/**
 * Delete a user profile
 * @param {number} id - The ID of the user profile to delete
 * @returns {Object} - The deleted user profile
 */
export async function deleteUserProfile(id) {
    try {
        const { data, error } = await supabase
            .from('user_profiles')
            .delete()
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error(`Error deleting user profile: ${error.message}`);
        return null;
    }
}
