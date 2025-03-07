// models/genres.js
import { supabase } from '../supabaseConfig.js';

/**
 * Get all genres
 * @returns array
 */
export async function fetchAllGenres() {
    try {
        let { data, error } = await supabase
            .from('genres')
            .select('*')
            
            
        if (error) {
            throw new Error(error.message);
        }
        return data;
        
    } catch (error) {
        console.error(`Error fetching genres: ${error.message}`);

        return [];
    }
}

/**
 * Get a single genre by ID
 * @param {number} id - Genre ID
 * @returns object
 */
export async function fetchGenreById(id) {
    try {
        let { data, error } = await supabase
            .from('genres')
            .select('id, title, slug, created_at, updated_at')
            .eq('id', id)
            .single();

        if (error) {
            throw new Error(error.message);
        }
        return data;
        
    } catch (error) {
        console.error(`Error fetching genre: ${error.message}`);

        return null;
    }
}

/**
 * Create a new genre
 * @param {object} formData - Genre data (title, slug)
 * @returns object
 */
export async function createGenre(formData) {
    try {
        let { data, error } = await supabase
            .from('genres')
            .insert([formData])
            .select('*')
            .single();

        if (error) {
            throw new Error(error.message);
        }
        return data;

    } catch (error) {
        console.error(`Error creating genre: ${error.message}`);

        return null;
    }
}

/**
 * Update an existing genre
 * @param {number} id - Genre ID
 * @param {object} formData - Updated genre data
 * @returns object
 */
export async function updateGenre(id, formData) {
    try {
        let { data, error } = await supabase
            .from('genres')
            .update(formData)
            .eq('id', id)
            .select('id, title, slug, created_at, updated_at')
            .single();

        if (error) {
            throw new Error(error.message);
        }
        return data;

    } catch (error) {
        console.error(`Error updating genre: ${error.message}`);

        return null;
    }
}

/**
 * Delete a genre
 * @param {number} id - Genre ID
 * @returns object
 */
export async function deleteGenre(id) {
    try {
        let { data, error } = await supabase
            .from('genres')
            .delete()
            .eq('id', id);

        if (error) {
            throw new Error(error.message);
        }
        return data;

    } catch (error) {
        console.error(`Error deleting genre: ${error.message}`);

        return null;
    }
}
