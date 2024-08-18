// script.js

document.addEventListener('DOMContentLoaded', function () {
    const moviesContainer = document.getElementById('movies-container');

    // Array of movie IDs to fetch from OMDb API
    const movieIDs = ['tt3896198', 'tt0109830', 'tt0133093', 'tt0468569']; // Add more IMDb IDs as needed

    movieIDs.forEach(id => {
        fetch(`http://www.omdbapi.com/?i=${id}&apikey=c1d996ef`)
            .then(response => response.json())
            .then(data => {
                const movie = {
                    title: data.Title,
                    description: data.Plot,
                    rating: data.imdbRating,
                    image: data.Poster,
                };

                // Create a movie card
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');

                const image = document.createElement('img');
                image.classList.add('movie-image');
                image.src = movie.image;
                image.alt = movie.title;

                const title = document.createElement('div');
                title.classList.add('movie-title');
                title.textContent = movie.title;

                const description = document.createElement('div');
                description.classList.add('movie-description');
                description.textContent = movie.description;

                const rating = document.createElement('div');
                rating.classList.add('movie-rating');
                rating.innerHTML = `Rating: ${movie.rating} <i class="fas fa-star"></i>`;

                movieCard.appendChild(image);
                movieCard.appendChild(title);
                movieCard.appendChild(description);
                movieCard.appendChild(rating);
                moviesContainer.appendChild(movieCard);
            })
            .catch(error => console.error('Error fetching movie data:', error));
    });
});

// Search functionality
function searchMovies() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const moviesContainer = document.getElementById('movies-container');
    const movieCards = moviesContainer.getElementsByClassName('movie-card');

    for (const card of movieCards) {
        const title = card.getElementsByClassName('movie-title')[0].textContent.toLowerCase();
        const description = card.getElementsByClassName('movie-description')[0].textContent.toLowerCase();

        if (title.includes(searchInput) || description.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    }
}
