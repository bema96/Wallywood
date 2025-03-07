// Eksempel på funktioner, der henter data

// Fetch Limited Posters - Henter de første 6 plakater
export const fetchLimitedPosters = async () => {
    try {
        const response = await fetch('http://localhost:4525/posters?order=name&limit=6');
        if (!response.ok) throw new Error('Failed to fetch limited posters');
        const data = await response.json();
        console.log('Fetched data:', data);
        return data.posters || []; 
    } catch (error) {
        console.error('Error fetching limited posters:', error);
        throw error;
    }
};

// Fetch All Posters - Henter alle plakater
export const fetchAllPosters = async () => {
    try {
        const response = await fetch('http://localhost:4525/posters');
        const data = await response.json();
        console.log('All Posters Data:', data); // Debugging
        return Array.isArray(data) ? data : data.posters || []; // Tilpas return baseret på struktur
    } catch (error) {
        console.error('Error fetching all posters:', error);
        throw error;
    }
};

// Fetch Genres - Henter genrer
export const fetchGenres = async () => {
    try {
        const response = await fetch('http://localhost:4525/genres'); // Erstat med din faktiske API-url
        if (!response.ok) throw new Error('Failed to fetch genres');
        const genres = await response.json();
        return genres;
    } catch (error) {
        console.error('Error fetching genres:', error);
        throw error;
    }
};

// Fetch Poster-Genre Relations - Henter poster-genre relationer
export const fetchPosterGenreRelations = async () => {
    try {
        const response = await fetch('http://localhost:4525/posterGenRel'); // Erstat med din faktiske API-url
        if (!response.ok) throw new Error('Failed to fetch poster-genre relations');
        const posterGenRelData = await response.json();  // Definerer posterGenRelData her
        return posterGenRelData;  // Returner de hentede relationer
    } catch (error) {
        console.error('Error fetching poster-genre relations:', error);
        throw error;
    }
};
