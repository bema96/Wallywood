// /models/posterGenreRel.js
import { supabase } from '../supabaseConfig.js';

/**
 * Get all poster-genre relations
 * @returns array
 */
export async function fetchAllPosterGenreRelations() {
    try {
        let { data, error } = await supabase
            .from('poster_genre_rel')
            .select('*')
        
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error(`Fejl: kan ikke hente poster-genre-relationer, ${error}`);
        return [];
    }
}

/**
 * Get a specific poster-genre relation by id
 * @param {number} id
 * @returns data object
 */
// models/posterGenRel_model.js
export async function fetchPosterGenreRelationById(genre_id) {
    try {
        let { data, error } = await supabase
            .from('poster_genre_rel')
            .select('id, poster_id, genre_id')  // Kolonner, der skal hentes
            .eq('genre_id', genre_id);  // Filtrer efter genre_id

        if (error) {
            throw new Error(error.message);
        }
        return data; // Returner alle relationer, der matcher genre_id
    } catch (error) {
        console.error(`Fejl: kan ikke hente poster-genre-rel for genre_id ${genre_id}, ${error}`);
        return [];
    }
}

/**
 * Create a new poster-genre relation
 * @param {object} formdata - data for the new relation
 * @returns data object
 */
export async function createPosterGenreRelation(formdata) {
    try {
        let { data, error } = await supabase
            .from('poster_genre_rel')
            .insert([
                {
                    poster_id: formdata.poster_id,
                    genre_id: formdata.genre_id
                }
            ])
            .select('id')  // Hent det nye id
            .single();  // Kun én record

        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error(`Fejl: kan ikke oprette poster-genre-relation, ${error}`);
        return null;
    }
}

/**
 * Update a poster-genre relation
 * @param {number} id - Poster-genre relation ID
 * @param {object} formdata - Updated relation data
 * @returns data object
 */
export async function updatePosterGenreRelation(id, formdata) {
    try {
        let { data, error } = await supabase
            .from('poster_genre_rel')
            .update({
                poster_id: formdata.poster_id,
                genre_id: formdata.genre_id,
                updated_at: new Date().toISOString() // Opdater updated_at
            })
            .eq('id', id)  // Find relation via id
            .select('id, poster_id, genre_id, created_at, updated_at') // Returner de opdaterede felter
            .single(); // Returnér kun én record

        if (error) {
            throw new Error(error.message);
        }
        return data;  // Returner den opdaterede relation
    } catch (error) {
        console.error(`Fejl: kan ikke opdatere poster-genre-relation, ${error}`);
        return null;
    }
}

/**
 * Delete a poster-genre relation
 * @param {number} id - relation ID
 * @returns boolean
 */
export async function deletePosterGenreRelation(id) {
    try {
        let { data, error } = await supabase
            .from('poster_genre_rel')
            .delete()
            .eq('id', id); // Slet baseret på ID

        if (error) {
            throw new Error(error.message);
        }

        return data; // Returner data, hvis sletning lykkedes
    } catch (error) {
        console.error(`Fejl: kan ikke slette poster-genre-relation, ${error}`);
        return null; // Hvis der opstår en fejl, returneres null
    }
}


