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

        if (movie) {
            const movieDetail = document.getElementById("movie-detail");
            movieDetail.innerHTML = `
                <div class="movie-card">
                    <h2>${movie.title}</h2>
                    <p><strong>Director:</strong> ${movie.director}</p>
                    <p><strong>Year:</strong> ${movie.year}</p>
                </div>
        
                <div class="reviews-section">
                    <h3>Reviews</h3>
                    ${
                        reviews && reviews.length > 0
                            ? `
                        <div class="reviews-container">
                            ${reviews
                                .map(
                                    (review) => `
                                <div class="review-card">
                                    <div class="review-header">
                                        <span class="reviewer-name">${
                                            review.reviewer_name
                                        }</span>
                                        <div class="rating">
                                            ${"★".repeat(
                                                review.rating
                                            )}${"☆".repeat(5 - review.rating)}
                                        </div>
                                    </div>
                                    <p class="review-text">${
                                        review.review_text
                                    }</p>
                                </div>
                            `
                                )
                                .join("")}
                        </div>
                    `
                            : `<p class="no-reviews">No reviews yet.</p>`
                    }
                </div>
            `;
        }

        document
            .getElementById("add-review-button")
            .addEventListener("click", function () {
                window.location.href = `add-review.html?id=${movieId}`;
            });
    } catch (error) {
        console.error("Error loading movie details:", error);
    }
}
