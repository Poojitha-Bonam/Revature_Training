document.getElementById("searchBtn").addEventListener("click", fetchMoviesAndDisplay);

async function fetchMoviesAndDisplay() {

    const query = document.getElementById("searchInput").value.trim();

    if (query === "") {
        alert("Enter movie name");
        return;
    }

    const url = `https://api.imdbapi.dev/search/titles?query=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const movies = result.titles || [];

        const tbodyEl = document.getElementById("tableBody");
        tbodyEl.innerHTML = "";

        if (movies.length === 0) {
            tbodyEl.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center">No results found</td>
                </tr>
            `;
            return;
        }

        const tableRows = movies.map(movie => `
            <tr>
                <td>
                    ${
                        movie.primaryImage?.url
                        ? `<img src="${movie.primaryImage.url}" width="50">`
                        : "-"
                    }
                </td>
                <td>${movie.id || "-"}</td>
                <td>${movie.primaryTitle || "-"}</td>
                <td>${movie.type || "-"}</td>
                <td>${movie.startYear || "-"}</td>
                <td>${movie.genres ? movie.genres.join(", ") : "-"}</td>
                <td>${movie.rating?.aggregateRating || "-"}</td>
            </tr>
        `).join("");

        tbodyEl.innerHTML = tableRows;

        document.getElementById("resultCount").innerText =
            `Found ${movies.length} results`;

        document.getElementById("resultsDiv").style.display = "block";

    } catch (error) {
        console.error(error);
        alert("Error fetching data");
    }
}
