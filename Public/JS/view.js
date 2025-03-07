// HEADER SECTION

export function createHeader() {
    const header = document.createElement('header');
    header.innerHTML = `
        <h1>Film Gallery</h1>
        <nav>
            <ul>
                <li><a href="#" id="homeNav">Forside</a></li>
                <li><a href="#" id="postersNav">Plakater</a></li>
                <li><a href="#" id="genresNav">Genrer</a></li>
                <li><a href="#" id="aboutNav">Om</a></li>
            </ul>
        </nav>
    `;
    return header;
}

export function bindNavigation(handler) {
    ['homeNav', 'postersNav', 'genresNav', 'aboutNav'].forEach((id) => {
        const navItem = document.getElementById(id);
        if (!navItem) {
            console.warn(`Navigation item missing: ${id}`);
            return;
        }
        navItem.addEventListener('click', (e) => {
            e.preventDefault();
            handler(id.replace('Nav', ''));
        });
    });
}


// CONTENT SECTION

// Opretter content sektionen og tilføjer den til body
export function createContent() {
    const content = document.createElement('section');
    content.id = 'content';
    document.getElementById('app').appendChild(content);
}





// Funktion til at vise plakaterne
export function displayPosters(posters) {
    const posterList = document.createElement('ul');
    posterList.id = 'posterList';

    posters.forEach(({ image, name, genre, price }) => {
        const posterItem = document.createElement('li');

        const img = document.createElement('img');
        img.src = image;
        img.alt = name;

        const title = document.createElement('h3');
        title.textContent = name;

        const genreText = document.createElement('p');
        genreText.textContent = `Genre: ${genre}`;

        const priceText = document.createElement('p');
        priceText.textContent = `Pris: ${price} kr.`;

        const readMoreBtn = document.createElement('button');
        readMoreBtn.textContent = 'Læs mere';
        readMoreBtn.classList.add('read-more');

        const favoriteBtn = document.createElement('button');
        favoriteBtn.textContent = '❤️';
        favoriteBtn.classList.add('favorite');

        posterItem.append(img, title, genreText, priceText, readMoreBtn, favoriteBtn);
        posterList.appendChild(posterItem);
    });

    document.getElementById('content').appendChild(posterList);
}


