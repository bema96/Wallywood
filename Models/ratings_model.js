import { supabase } from '../supabaseConfig.js';

/**
 * Hent alle bedømmelser for en bruger
 * @param {number} user_id 
 * @returns array
 */
export async function fetchRatingsByUser(user_id) {
    try {
        let { data, error } = await supabase
            .from('user_ratings')
            .select('id, num_stars, poster_id, user_id, created_at, updated_at')
            .eq('user_id', user_id);  // Filtrér efter user_id
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error(`Fejl: kan ikke hente ratings for bruger, ${error}`);
        return [];
    }
}

/**
 * Hent en enkelt bedømmelse baseret på ID
 * @param {number} id 
 * @returns data object
 */
export async function fetchRatingById(id) {
    try {
        let { data, error } = await supabase
            .from('user_ratings')
            .select('id, num_stars, poster_id, user_id, created_at, updated_at')
            .eq('id', id)
            .single();  // Kun én record
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error(`Fejl: kan ikke hente rating, ${error}`);
        return null;  // Return null hvis rating ikke findes
    }
}

/**
 * Opret en ny bedømmelse
 * @param {object} formdata - bedømmelsesdata
 * @returns data object
 */
export async function createRating(formdata) {
    try {
        let { data, error } = await supabase
            .from('user_ratings')
            .insert([
                {
                    num_stars: formdata.num_stars,
                    poster_id: formdata.poster_id,
                    user_id: formdata.user_id
                }
            ])
            .select('id')  // Hent det nye id
            .single();  // Kun én record
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error(`Fejl: kan ikke oprette rating, ${error}`);
        return null;
    }
}

/**
 * Opdater en eksisterende bedømmelse
 * @param {number} id - Rating ID
 * @param {object} formdata - Opdateret bedømmelsesdata
 * @returns data object
 */
export async function updateRating(id, formdata) {
    try {
        let { data, error } = await supabase
            .from('user_ratings')
            .update({
                num_stars: formdata.num_stars,
                updated_at: new Date().toISOString()  // Opdater updated_at
            })
            .eq('id', id)  // Find rating via id
            .select('id, num_stars, poster_id, user_id, created_at, updated_at') // Returner de opdaterede felter
            .single(); // Returnér kun én record

        if (error) {
            throw new Error(error.message);
        }
        return data;  // Returner den opdaterede rating
    } catch (error) {
        console.error(`Fejl: kan ikke opdatere rating, ${error}`);
        return null;
    }
}

/**
 * Slet en bedømmelse
 * @param {number} id - Rating ID
 * @returns boolean
 */
export async function deleteRating(id) {
    try {
        let { data, error } = await supabase
            .from('user_ratings')
            .delete()
            .eq('id', id);  // Slet baseret på ID

        if (error) {
            throw new Error(error.message);
        }

        return data; // Returner data, hvis sletning lykkedes
    } catch (error) {
        console.error(`Fejl: kan ikke slette rating, ${error}`);
        return null;  // Hvis der opstår en fejl, returneres null
    }
}
