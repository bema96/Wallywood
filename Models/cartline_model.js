// models/cartlines.js
import { supabase } from '../supabaseConfig.js';

/**
 * Hent alle 
 * @param {number} user_id 
 * @returns array
 */
export async function fetchCartlinesByUser(user_id) {
    try {
        let { data, error } = await supabase
            .from('cartlines')
            .select('id, user_id, poster_id, quantity, created_at, updated_at')
            .eq('user_id', user_id); // Filtrér efter user_id
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error(`Fejl: kan ikke hente cartlines for bruger, ${error}`);
        return [];
    }
}

/**
 * Hent ved id 
 * @param {number} id 
 * @returns data object
 */
export async function fetchCartlineById(id) {
    try {
        let { data, error } = await supabase
            .from('cartlines')
            .select('id, user_id, poster_id, quantity, created_at, updated_at')
            .eq('id', id)
            .single();  // Kun én record
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error(`Fejl: kan ikke hente cartline, ${error}`);
        return null;  // Return null hvis cartline ikke findes
    }
}

/**
 * Add
 * @param {object} formdata - cartline data
 * @returns data object
 */
export async function createCartline(formdata) {
    try {
        let { data, error } = await supabase
            .from('cartlines')
            .insert([
                {
                    user_id: formdata.user_id,
                    poster_id: formdata.poster_id,
                    quantity: formdata.quantity
                }
            ])
            .select('id')  // Hent det nye id
            .single();  // Kun én record
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error(`Fejl: kan ikke oprette cartline, ${error}`);
        return null;
    }
}

/**
 * Update
 * @param {number} id - Cartline ID
 * @param {object} formdata - Updated cartline data
 * @returns data object
 */
export async function updateCartline(id, formdata) {
    try {
        let { data, error } = await supabase
            .from('cartlines')
            .update({
                quantity: formdata.quantity,
                updated_at: new Date().toISOString() // Opdater updated_at
            })
            .eq('id', id)  // Find cartline via id
            .select('id, user_id, poster_id, quantity, created_at, updated_at') // Returner de opdaterede felter
            .single(); // Returnér kun én record

        if (error) {
            throw new Error(error.message);
        }
        return data;  // Returner den opdaterede cartline
    } catch (error) {
        console.error(`Fejl: kan ikke opdatere cartline, ${error}`);
        return null;
    }
}

/**
 * Delete
 * @param {number} id - cartline ID
 * @returns boolean
 */
export async function deleteCartline(id) {
    try {
        let { data, error } = await supabase
            .from('cartlines')
            .delete()
            .eq('id', id); // Slet baseret på ID

        if (error) {
            throw new Error(error.message);
        }

        return data; // Returner data, hvis sletning lykkedes
    } catch (error) {
        console.error(`Fejl: kan ikke slette cartline, ${error}`);
        return null; // Hvis der opstår en fejl, returneres null
    }
}
