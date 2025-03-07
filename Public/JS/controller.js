import { fetchLimitedPosters, fetchAllPosters } from './model.js';
import { createHeader, bindNavigation, createContent, displayPosters } from './view.js';

export async function init() {
    try {
        document.getElementById('app').appendChild(createHeader());
        createContent();
        bindNavigation(handleNavigation);
        await handleNavigation('home'); // Venter på at forsiden indlæses
    } catch (error) {
        console.error('Fejl under initialisering:', error);
    }
}

async function handleNavigation(page) {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Tøm eksisterende indhold

    try {
        if (page === 'home') {
            const posters = await fetchLimitedPosters();
            if (!posters || posters.length === 0) {
                content.innerHTML = '<p>Ingen plakater fundet</p>';
                return;
            }
            renderPosters(posters);
        } else if (page === 'posters') {
            const posters = await fetchAllPosters();
            if (!posters || posters.length === 0) {
                content.innerHTML = '<p>Ingen plakater fundet</p>';
                return;
            }
            renderPosters(posters);
        }
    } catch (error) {
        content.innerHTML = `<p>Fejl ved hentning af data: ${error.message}</p>`;
        console.error('Navigation Error:', error);
    }
}

function renderPosters(posters) {
    if (!Array.isArray(posters)) {
        console.error('Posters er ikke et array:', posters);
        return;
    }
    displayPosters(posters);
}
