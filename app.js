const results = document.getElementById("results");
const genreSelect = document.getElementById("genre");
const moodRange = document.getElementById("mood");
const searchInput = document.getElementById("search");
let precomputed = null;

function setStatus(message) {
  results.innerHTML = "";
  const li = document.createElement("li");
  li.textContent = message;
  results.appendChild(li);
}

function renderRecommendations() {
  if (!precomputed) {
    setStatus("Loading recommendations...");
    return;
  }

  const genre = genreSelect.value;
  const mood = String(moodRange.value);
  const keyword = searchInput.value.trim().toLowerCase();

  const source =
    precomputed.byGenreMood?.[genre]?.[mood] ||
    precomputed.byGenreMood?.all?.[mood] ||
    [];

  const filtered = keyword
    ? source.filter((movie) => {
        const title = movie.title.toLowerCase();
        const keywords = movie.keywords || [];
        return (
          title.includes(keyword) ||
          keywords.some((tag) => tag.includes(keyword))
        );
      })
    : source;

  const ranked = (filtered.length ? filtered : source).slice(0, 5);

  results.innerHTML = "";
  ranked.forEach((movie) => {
    const li = document.createElement("li");
    li.textContent = movie.title;
    const span = document.createElement("span");
    span.textContent = movie.genre.toUpperCase();
    li.appendChild(span);
    results.appendChild(li);
  });
}

document
  .getElementById("recommend")
  .addEventListener("click", renderRecommendations);

fetch("precomputed_recs.json")
  .then((response) => response.json())
  .then((data) => {
    precomputed = data;
    genreSelect.innerHTML = "";
    data.genres.forEach((genre) => {
      const option = document.createElement("option");
      option.value = genre;
      option.textContent =
        genre === "all" ? "All" : genre.replace(/-/g, " ");
      genreSelect.appendChild(option);
    });
    renderRecommendations();
  })
  .catch(() => {
    setStatus("Could not load recommendations.");
  });
