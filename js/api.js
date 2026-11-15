
(() => {
  "use strict";
  const form = document.getElementById("api-search-form");
  if (!form) return;
  const queryInput = document.getElementById("api-query");
  const searchButton = document.getElementById("api-submit");
  const results = document.getElementById("api-results");
  const status = document.getElementById("api-status");
  const retryButton = document.getElementById("api-retry");
  const genreSelect = document.getElementById("api-genre");
  const filter = document.querySelector(".api-filter");
  const suggestions = document.querySelectorAll("[data-music-query]");
  let tracks = [];
  let lastQuery = "";
  let busy = false;
  const cache = new Map();

  function textElement(tag, text, className) {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  function musicLink(value) {
    try {
      const url = new URL(value);
      if (url.protocol === "https:" &&
          (url.hostname === "music.apple.com" || url.hostname === "itunes.apple.com")) return url.href;
    } catch (error) {   }
    return null;
  }

  function renderResults() {
    const visible = tracks.filter(track => !genreSelect.value || track.primaryGenreName === genreSelect.value);
    results.replaceChildren();
    for (const track of visible) {
      const article = document.createElement("article");
      article.className = "api-track";
      article.append(textElement("p", track.primaryGenreName || "Music", "small-title"));
      article.append(textElement("h3", track.trackName));
      article.append(textElement("p", track.artistName, "api-artist"));
      article.append(textElement("p", track.collectionName || "Album not listed", "small"));
      if (Number.isFinite(track.trackTimeMillis) && track.trackTimeMillis > 0) {
        const seconds = Math.floor(track.trackTimeMillis / 1000);
        article.append(textElement("p", Math.floor(seconds / 60) + ":" + String(seconds % 60).padStart(2, "0"), "small"));
      }
      const url = musicLink(track.trackViewUrl);
      if (url) {
        const link = textElement("a", "Open in Apple Music", "btn second-btn");
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        article.append(link);
      }
      results.append(article);
    }
    if (tracks.length === 0) {
      status.textContent = 'No songs found for "' + lastQuery + '". Try another artist or a shorter song title.';
    } else {
      status.textContent = visible.length + " of " + tracks.length + ' results for "' + lastQuery + '"' + (genreSelect.value ? " in " + genreSelect.value : "") + ".";
    }
  }

  function setBusy(value) {
    busy = value;
    searchButton.disabled = value;
    retryButton.disabled = value;
    suggestions.forEach(button => { button.disabled = value; });
    results.setAttribute("aria-busy", String(value));
    searchButton.textContent = value ? "Searching…" : "Search catalog";
  }

  async function searchCatalog(query) {
    if (busy) return;
    lastQuery = query;
    retryButton.hidden = true;
    filter.hidden = true;
    results.replaceChildren();
    status.textContent = 'Searching the iTunes catalog for "' + query + '"…';
    setBusy(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const key = query.toLowerCase();
      const saved = cache.get(key);
      let data;
      if (saved && Date.now() - saved.time < 5 * 60 * 1000) {
        data = saved.data;
      } else {
        const url = new URL("https://itunes.apple.com/search");
        url.search = new URLSearchParams({ term: query, media: "music", entity: "song", country: "US", limit: "12" });
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error("HTTP " + response.status);
        data = await response.json();
        if (!data || !Array.isArray(data.results)) throw new Error("Unexpected catalog response");
        cache.set(key, { data, time: Date.now() });
      }
      const seen = new Set();
      tracks = data.results.filter(track => {
        if (track.kind !== "song" || typeof track.trackName !== "string" || typeof track.artistName !== "string") return false;
        if (track.trackId && seen.has(track.trackId)) return false;
        if (track.trackId) seen.add(track.trackId);
        return true;
      });
      genreSelect.replaceChildren(new Option("All genres", ""));
      const genres = [...new Set(tracks.map(track => track.primaryGenreName).filter(Boolean))].sort();
      genres.forEach(genre => genreSelect.add(new Option(genre, genre)));
      filter.hidden = tracks.length === 0;
      renderResults();
    } catch (error) {
      tracks = [];
      results.replaceChildren();
      status.textContent = error.name === "AbortError"
        ? "The catalog took too long to respond. Try again in a moment."
        : "The live catalog is unavailable right now. Check your connection and try again. Your local playlist still works.";
      retryButton.hidden = false;
    } finally {
      clearTimeout(timeout);
      setBusy(false);
    }
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    const query = queryInput.value.trim();
    if (query.length < 2 || query.length > 100) {
      status.textContent = "Enter a song title or artist of 2-100 characters.";
      queryInput.focus();
      return;
    }
    searchCatalog(query);
  });
  suggestions.forEach(button => button.addEventListener("click", () => {
    queryInput.value = button.dataset.musicQuery;
    form.requestSubmit();
  }));
  genreSelect.addEventListener("change", renderResults);
  retryButton.addEventListener("click", () => searchCatalog(lastQuery));
})();
