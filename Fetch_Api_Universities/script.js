const countryInput = document.getElementById("countryInput");
const result = document.getElementById("result");

let universities = [];

const params = new URLSearchParams(window.location.search);
const countryFromURL = params.get("country");

if (countryFromURL) {
    countryInput.value = countryFromURL;
    fetchUniversities(countryFromURL);
}

countryInput.addEventListener("keyup", () => {
    const country = countryInput.value.trim();

    if (!country) {
        result.innerHTML = "";
        history.replaceState(null, "", window.location.pathname);
        return;
    }

    history.replaceState(null, "", "?country=" + country);
    fetchUniversities(country);
});

searchInput.addEventListener("keyup", () => {
    const text = searchInput.value.toLowerCase();
    const filtered = universities.filter(u =>
        u.name.toLowerCase().includes(text)
    );
    displayUniversities(filtered);
});

async function fetchUniversities(country) {
    try {
        const res = await fetch(
            "http://universities.hipolabs.com/search?country=" + country
        );
        universities = await res.json();
        displayUniversities(universities);
    } catch {
        result.innerHTML = "<p class='text-center text-danger'>Error loading data</p>";
    }
}

function displayUniversities(list) {
    result.innerHTML = "";

    if (list.length === 0) {
        result.innerHTML = "<p class='text-center text-muted'>No universities found</p>";
        return;
    }

    list.forEach(u => {
        result.innerHTML += `
        <div class="col-md-4 mb-3">
            <div class="card shadow-sm">
                <div class="card-body">
                    <h5>${u.name}</h5>
                    <p>
                        <b>Country:</b> ${u.country}<br>
                        <b>Domain:</b> ${u.domains[0]}<br>
                        <a href="${u.web_pages[0]}" target="_blank">Visit Website</a>
                    </p>
                </div>
            </div>
        </div>`;
    });
}