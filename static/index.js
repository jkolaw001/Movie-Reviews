// @ts-check
const movieList = document.getElementById("movie-list");
loadMovies();

async function loadMovies() {
    try {
        const response = await fetch("/api/movies");
        const movies = await response.json();

        movieList.innerHTML = movies
            .map(
                (movie) => `
            <div class="movie-item" data-id="${movie.id}">
                <span>${movie.title}</span>
                <p><strong>Director:</strong> ${movie.director}</p>
                <p><strong>Year:</strong> ${movie.year}</p>
            </div>
        `
            )
            .join("");

        document.querySelectorAll(".movie-item").forEach((item) => {
            item.addEventListener("click", function () {
                const movieId = this.getAttribute("data-id");
                window.location.href = `/movie-detail.html?id=${movieId}`;
            });
        });
    } catch (error) {
        console.error("Error loading movies:", error);
    }
}
