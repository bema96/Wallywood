// models/posters.js
import { supabase } from '../supabaseConfig.js';

/**
 * Get all posters
 * @param {Object} params - Forespørgselsparametre (order, limit, genreId)
 * @returns array
 */
export async function fetchAllPosters(params) {
    console.log(params);

    try {
        let query = supabase
            .from('posters')
            .select('*'); // Hent alle felter fra 'posters'

        // Tilføj sortering, hvis specificeret
        if (params.order) {
            query = query.order(params.order);
        }

        // Tilføj grænse, hvis specificeret
        if (params.limit) {
            query = query.limit(params.limit);
        }

        // Tilføj genreId-filtering via relationstabellen
        if (params.genreId) {
            query = query
                .in('id', supabase
                    .from('poster_genre_relation') // Tabel med relation mellem posters og genrer
                    .select('poster_id') // Hent kun poster_id
                    .eq('genre_id', params.genreId) // Filtrér på genreId
                );
        }

        // Udfør forespørgslen
        const { data, error } = await query;

        if (error) {
            throw new Error(error.message);
        }

        return data;

    } catch (error) {
        console.error(`Error fetching posters: ${error.message}`);
        return [];
    }
}


/**
 * Get a single poster by ID
 * @param {number} id - Poster ID
 * @returns object
 */
export async function fetchPosterById(id) {
    try {
        let { data, error } = await supabase
            .from('posters')
            .select('id, name, slug, description, image, price, stock, created_at, updated_at')
            .eq('id', id)
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error(`Error fetching poster: ${error.message}`);
        return null;
    }
}


/**
 * Opret en ny poster
 * @param {object} formData - Poster data (name, slug, description, image, price, stock, width, height)
 * @returns object
 */
export async function createPoster(formData) {
    try {
        console.log("Inserting form data:", formData);

        let { data, error } = await supabase
            .from('posters')
            .insert([formData])
            .select('*')
            .single();  // Returnér kun én post

        if (error) {
            console.error('Error from Supabase:', error.details);  // Log detaljer om fejlen
            throw new Error(error.message);  // Kast fejl, så vi kan fange det i controlleren
        }

        console.log('Poster created:', data);  // Log den oprettede poster
        return data;
    } catch (error) {
        console.error('Error in createPoster:', error);
        return null;
    }
}





/**
 * Update an existing poster
 * @param {number} id - Poster ID
 * @param {object} formData - Updated poster data
 * @returns object
 */
export async function updatePoster(id, formData) {
    try {
        let { data, error } = await supabase
            .from('posters')
            .update(formData)
            .eq('id', id)
            .select('id, name, slug, description, image, price, stock, created_at, updated_at')
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error(`Error updating poster: ${error.message}`);
        return null;
    }
}

/**
 * Delete a poster
 * @param {number} id - Poster ID
 * @returns object
 */
export async function deletePoster(id) {
    try {
        let { data, error } = await supabase
            .from('posters')
            .delete()
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error(`Error deleting poster: ${error.message}`);
        return null;
    }
}
