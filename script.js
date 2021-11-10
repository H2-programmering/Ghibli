const app = document.querySelector('#app');
const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

const row = document.createElement('div');
row.setAttribute('class', 'row g-1');

app.appendChild(logo);
app.appendChild(container);
container.appendChild(row);

const options = {
    backdrop: true,
    keyboard: false,
    focus: false
};
const movieModalElement = document.querySelector('#movie-modal');
const movieModal = new bootstrap.Modal(movieModalElement, options);
const modalContent = movieModalElement.querySelector('.modal-content');

function createSidebarColumn() {
    const sidebarCol = document.createElement('div');
    sidebarCol.setAttribute('class', 'col-3');

    let movieImageElement = document.createElement('img');
    movieImageElement.setAttribute('id', 'movie-image');

    sidebarCol.appendChild(movieImageElement);
    
    return sidebarCol;
}

function createPeopleListOfMovie() {
    const moviePeopleListElement = document.createElement('div');
    moviePeopleListElement.setAttribute('class', 'col-3');

    const peopleListTitleElement = document.createElement('h4');
    peopleListTitleElement.setAttribute('class', 'text-center');
    peopleListTitleElement.textContent = 'People';

    const unorderedListElement = document.createElement('ul');
    unorderedListElement.setAttribute('class', 'list-group list-group-flush');
    unorderedListElement.setAttribute('id', 'list-of-people');

    moviePeopleListElement.appendChild(peopleListTitleElement);
    moviePeopleListElement.appendChild(unorderedListElement);
    return moviePeopleListElement;
}

function createSpeciesListOfMovie() {
    const movieSpeciesListElement = document.createElement('div');
    movieSpeciesListElement.setAttribute('class', 'col-3');

    const speciesListTitleElement = document.createElement('h4');
    speciesListTitleElement.setAttribute('class', 'text-center');
    speciesListTitleElement.textContent = 'Species';

    const unorderedListElement = document.createElement('ul');
    unorderedListElement.setAttribute('class', 'list-group list-group-flush');
    unorderedListElement.setAttribute('id', 'list-of-species');

    movieSpeciesListElement.appendChild(speciesListTitleElement);
    movieSpeciesListElement.appendChild(unorderedListElement);
    return movieSpeciesListElement;
}

function createLocationsListOfMovie() {
    const movieLocationListElement = document.createElement('div');
    movieLocationListElement.setAttribute('class', 'col-3');

    const locationListTitleElement = document.createElement('h4');
    locationListTitleElement.setAttribute('class', 'text-center');
    locationListTitleElement.textContent = 'Locations';

    const unorderedListElement = document.createElement('ul');
    unorderedListElement.setAttribute('class', 'list-group list-group-flush');
    unorderedListElement.setAttribute('id', 'list-of-locations');

    movieLocationListElement.appendChild(locationListTitleElement);
    movieLocationListElement.appendChild(unorderedListElement);
    return movieLocationListElement;
}

function createVehiclesListOfMovie() {
    const movieVehicleListElement = document.createElement('div');
    movieVehicleListElement.setAttribute('class', 'col-3');

    const vehicleListTitleElement = document.createElement('h4');
    vehicleListTitleElement.setAttribute('class', 'text-center');
    vehicleListTitleElement.textContent = 'Vehicles';

    const unorderedListElement = document.createElement('ul');
    unorderedListElement.setAttribute('class', 'list-group list-group-flush');
    unorderedListElement.setAttribute('id', 'list-of-vehicles');

    movieVehicleListElement.appendChild(vehicleListTitleElement);
    movieVehicleListElement.appendChild(unorderedListElement);
    return movieVehicleListElement;
}

function createMovieContentColumn() {
    const movieContentColumnElement = document.createElement('div');
    movieContentColumnElement.setAttribute('class', 'col-9');

    const movieOriginalTitleElement = document.createElement('h3');
    movieOriginalTitleElement.setAttribute('id', 'movie-original-title');

    const movieSubtitleElement = document.createElement('h6');
    movieSubtitleElement.setAttribute('class', 'text-muted');
    movieSubtitleElement.setAttribute('id', 'movie-subtitle');

    const movieDescriptionElement = document.createElement('p');
    movieDescriptionElement.setAttribute('id', 'movie-description');

    const movieRTScoreTextElement = document.createElement('div');
    movieRTScoreTextElement.setAttribute('class', 'tomatoerow');    
    movieRTScoreTextElement.setAttribute('id', 'movie-tomatoes-text-container');

    const movieRTScoreTextElement1 = document.createElement('p');
    movieRTScoreTextElement1.setAttribute('class', 'fw-bold');    
    movieRTScoreTextElement1.setAttribute('id', 'movie-tomatoes-text');

    const movieRTScoreElement = document.createElement('div');
    movieRTScoreElement.setAttribute('class', 'tomatoerow');    
    movieRTScoreElement.setAttribute('id', 'movie-tomatoes');    
    for (let i = 0; i < 5; i++) {
        const tomatoElement = document.createElement('div');
        const tomatoImage = document.createElement('img');
        tomatoImage.setAttribute('id', 'movie-rt-score');

        movieRTScoreElement.appendChild(tomatoElement);
        tomatoElement.appendChild(tomatoImage);
    }

    const movieDetailsListRow = document.createElement('div');
    movieDetailsListRow.setAttribute('class', 'row');

    const moviePeopleListElement = createPeopleListOfMovie();
    const movieSpeciesListElement = createSpeciesListOfMovie();
    const movieLocationListElement = createLocationsListOfMovie();
    const movieVehiclesListElement = createVehiclesListOfMovie();

    movieContentColumnElement.appendChild(movieOriginalTitleElement);
    movieContentColumnElement.appendChild(movieSubtitleElement);
    movieContentColumnElement.appendChild(movieDescriptionElement);
    movieContentColumnElement.appendChild(movieRTScoreTextElement);
    movieRTScoreTextElement.appendChild(movieRTScoreTextElement1);

    movieContentColumnElement.appendChild(movieRTScoreElement);
    movieContentColumnElement.appendChild(movieDetailsListRow);
    movieDetailsListRow.appendChild(moviePeopleListElement);
    movieDetailsListRow.appendChild(movieSpeciesListElement);
    movieDetailsListRow.appendChild(movieLocationListElement);
    movieDetailsListRow.appendChild(movieVehiclesListElement);

    return movieContentColumnElement;
}

function setupModalBody() {
    const modalBodyElement = modalContent.querySelector('.modal-body');
    
    const modalBodyRow = document.createElement('div');
    modalBodyRow.setAttribute('class', 'row');

    const sidebarColumn = createSidebarColumn();
    const movieContentColumn = createMovieContentColumn();

    modalBodyElement.appendChild(modalBodyRow);
    modalBodyRow.appendChild(sidebarColumn);
    modalBodyRow.appendChild(movieContentColumn);
}
setupModalBody();

const baseUrl = 'https://ghibliapi.herokuapp.com/';
fetch(`${baseUrl}films`)
    .then(blob => blob.json())
    .then(movies => {
        movies.forEach(createMovieCard);
    })
    .catch(showErrorMessage);


function createModalHeaderDiv(movie) {
    const className = 'modal-header';
    const modalHeaderDiv = modalContent.querySelector(`.${className}`);

    const modalTitle = modalHeaderDiv.querySelector('.modal-title');
    modalTitle.textContent = movie.title;
}

function createListOfArray(movie, arrayName, modalBodyElement) {
    const unorderedListElement = modalBodyElement.querySelector(`#list-of-${arrayName}`);
    unorderedListElement.textContent = '';
    if(movie[arrayName].length > 0 && movie[arrayName][0] !== `https://ghibliapi.herokuapp.com/${arrayName}/`) {
        movie[arrayName].forEach(vehicle => {
            fetch(vehicle)
                .then(blob => blob.json())
                .then(a => {
                    const unorderedListElement = document.querySelector(`#list-of-${arrayName}`);

                    const arrayObjectElement = document.createElement('li');
                    arrayObjectElement.setAttribute('class', 'list-group-item text-center');
                    arrayObjectElement.textContent = `${a.name}`;
                
                    unorderedListElement.appendChild(arrayObjectElement);
                })
                .catch(console.error);
        });
    }
    else {
        const noVehiclesFoundElement = document.createElement('li');
        noVehiclesFoundElement.setAttribute('class', 'list-group-item text-center');
        noVehiclesFoundElement.textContent = `No ${arrayName} in this movie..`;
    
        unorderedListElement.appendChild(noVehiclesFoundElement);
    }
}

function displayTomatoScore(n, modalBodyElement) {
    const tomatoImageDivs = modalBodyElement.querySelectorAll('#movie-rt-score');
    tomatoImageDivs.forEach(image => {
        image.setAttribute('class', 'hidden');
    });
    
    for (let i = 0; i < n; i++) {
        tomatoImageDivs[i].setAttribute('src', 'tomato.png');
        tomatoImageDivs[i].setAttribute('class', '');
    }
}

function createModalBodyDiv(movie) {
    const className = 'modal-body';
    const modalBodyElement = modalContent.querySelector(`.${className}`);

    const moveImageElement = modalBodyElement.querySelector('#movie-image');
    moveImageElement.setAttribute('src', movie.image);

    const movieOriginalTitleElement = modalBodyElement.querySelector('#movie-original-title');
    movieOriginalTitleElement.textContent = `${movie.original_title_romanised} (${movie.title})`;

    const movieSubtitleElement = modalBodyElement.querySelector('#movie-subtitle');
    movieSubtitleElement.textContent = `Instructed by ${movie.director}, Produced by ${movie.producer}, Running time: ${movie.running_time} minutes`;

    const movieDescriptionElement = modalBodyElement.querySelector('#movie-description');
    movieDescriptionElement.textContent = movie.description;

    const numTomatoes = movie.rt_score / 20.0;
    const RTTextScoreElement = modalBodyElement.querySelector('#movie-tomatoes-text');
    RTTextScoreElement.textContent = `Rotten Tomatoes score (${movie.rt_score}): ${movie.rt_score} / 100 = ${movie.rt_score} / 20 = ${numTomatoes} = ${Math.ceil(numTomatoes)} tomatoes`;
    displayTomatoScore(numTomatoes, modalBodyElement);

    createListOfArray(movie, 'people', modalBodyElement);
    createListOfArray(movie, 'species', modalBodyElement);
    createListOfArray(movie, 'locations', modalBodyElement);
    createListOfArray(movie, 'vehicles', modalBodyElement);
}

function createMovieDetailsModal(movie) {
    createModalHeaderDiv(movie);
    createModalBodyDiv(movie);
    movieModal.show();
}

function createMovieCard(movie) {
    const MAX_DESCRIPTION_LENGTH = 200;

    const card = document.createElement('div');
    card.setAttribute('class', 'card col-4 p-0');
    card.addEventListener('click', _ => createMovieDetailsModal(movie));

    const movieBanner = document.createElement('img');
    movieBanner.setAttribute('class', 'card-img-top movie-banner');
    movieBanner.setAttribute('src', movie.movie_banner);

    const cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');

    const movieTitle = document.createElement('h5');
    movieTitle.setAttribute('class', 'card-title');
    movieTitle.textContent = movie.title;
    
    const movieSubtitle = document.createElement('h6');
    movieSubtitle.setAttribute('class', 'card-subtitle mb-2 text-muted');
    movieSubtitle.textContent = movie.original_title_romanised;

    const movieDescription = document.createElement('p');
    movieDescription.setAttribute('class', 'card-text');
    const desc = movie.description.substring(0, MAX_DESCRIPTION_LENGTH);
    movieDescription.textContent = `${desc}...`;

    const movieFooter = document.createElement('p');
    movieFooter.setAttribute('class', 'card-text');

    const mutedFooter = document.createElement('small');
    mutedFooter.setAttribute('class', 'text-muted');
    mutedFooter.textContent = `Release year: ${movie.release_date}`;

    row.appendChild(card);
    card.appendChild(movieBanner);
    card.appendChild(cardBody);
    cardBody.appendChild(movieTitle);
    cardBody.appendChild(movieSubtitle);
    cardBody.appendChild(movieDescription);
    cardBody.appendChild(movieFooter);
    movieFooter.appendChild(mutedFooter);
}

function showErrorMessage(err) {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = 'ZHE GOOGLES DO THE NOTHING';
    app.appendChild(errorMessage);
    console.error(err);
}
