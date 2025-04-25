
const movieForm = document.getElementById('movie-form');
movieForm.addEventListener('submit', addMovie );

async function addMovie(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const director = document.getElementById('director').value;
    const year = document.getElementById('year').value;
    const body = JSON.stringify({
        title: title,
        director: director,
        year: year
    });
    const headers = {'Content-Type': 'application/json'};

    try {
        const response = await fetch('/api/movies', {
            method: 'POST',
            headers: headers,
            body: body
        });
        if (! response.ok) {
            throw new Error('Failed to create movie');
        }

        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error creating movie:', error);
    }
}
