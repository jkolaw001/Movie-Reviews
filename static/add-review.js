// @ts-check


const reviewForm = document.getElementById("review-form");
reviewForm.addEventListener("submit", addReview);

async function addReview(event) {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");

    if (!movieId) {
        console.error("No movie ID found in URL");
        return;
    }

    const formData = new FormData(event.target);
    const reviewer_name = formData.get("reviewer-name");
    const review_text = formData.get("review-text");
    const rating = formData.get("rating");

    const body = JSON.stringify({
        reviewer_name: reviewer_name,
        review_text: review_text,
        rating: rating,
    });
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(`/api/movies/${movieId}/reviews`, {
            method: "POST",
            headers,
            body,
        });

        if (!response.ok) {
            throw new Error(`Failed to add review: ${response.status}`);
        }

        location.href = `/movie-detail.html?id=${movieId}`;
    } catch (error) {
        console.error("Error adding review:", error);
    }
}
