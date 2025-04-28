// @ts-check
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

if (movieId) {
    loadMovie(movieId);
} else {
    console.error("No movie ID found in URL");
}

async function loadMovie(movieId) {
    try {
        const response = await fetch(`/api/movies/${movieId}`);
        const movie = response.ok ? await response.json() : null;

        const reviewsResponse = await fetch(`/api/movies/${movieId}/reviews`);
        const reviews = reviewsResponse.ok ? await reviewsResponse.json() : [];

        if (!movie) {
            console.error("Movie not found");
            document.getElementById("movie-detail").innerHTML = `<p>Movie not found.</p>`;
            return;
        }

        const movieDetail = document.getElementById("movie-detail");
        movieDetail.innerHTML = `
            <div class="movie-card">
                <h2>${escapeHTML(movie.title)}</h2>
                <p><strong>Director:</strong> ${escapeHTML(movie.director)}</p>
                <p><strong>Year:</strong> ${movie.year}</p>
            </div>

            <div class="reviews-section">
                <h3>Reviews</h3>
                ${
                    reviews.length > 0
                        ? `
                    <div class="reviews-container">
                        ${reviews
                            .map(
                                (review) => `
                            <div class="review-card">
                                <div class="review-header">
                                    <span class="reviewer-name">${escapeHTML(
                                        review.reviewer_name
                                    )}</span>
                                    <div class="rating">
                                        ${"★".repeat(review.rating)}${"☆".repeat(
                                    5 - review.rating
                                )}
                                    </div>
                                </div>
                                <p class="review-text">${escapeHTML(
                                    review.review_text
                                )}</p>
                            </div>
                        `
                            )
                            .join("")}
                    </div>
                `
                        : `<p class="no-reviews">No reviews yet. <a href="add-review.html?id=${movieId}">Be the first to add one!</a></p>`
                }
            </div>
        `;
    } catch (error) {
        console.error("Error loading movie details:", error);
    }
}

function escapeHTML(str) {
    const div = document.createElement("div");
    div.innerText = str;
    return div.innerHTML;
}
