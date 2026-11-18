# MyPlaylist

**Course:** Web Technologies  
**Project:** Final Project  
**Topic:** Music playlist website for browsing songs, artists, and albums  
**Group:** IT-2513

## Team Members

- Yermek Tuzelkhan
- Yerassyl Nauryzgali
- Kaussar Meyrambekkyzy

## Project Overview

MyPlaylist is a responsive music website that brings a collection of songs, artists, and albums together in one place. It has five pages: Home, Songs, Albums, Artists, and About. Visitors can browse the collection, find tracks by song title or artist, and follow listening links from the playlist.

For the Final Project, we extended the website with theme switching, persistent client-side sign-in, an interactive jQuery FAQ section, and live music catalog search powered by the iTunes Search API.

## Implemented Features

- **Light / Dark Theme Toggle.** Available in the header on every page (`js/script.js`). Saves the chosen theme in `localStorage` so it stays active after reloading or switching pages.
- **Sign-In / Sign-Out Demo.** Visitors can sign in on the About page using a display name and demo password (`js/script.js`). The session state is stored in `localStorage`, showing a personalized greeting and a Sign Out button in the header.
- **Interactive FAQ Section.** The About page includes six music-related questions (`js/faq.js`) that expand and collapse smoothly using jQuery `.slideToggle()` with `+` and `−` indicators.
- **Live Catalog Search (iTunes API).** The Songs page fetches real track data from the public iTunes Search API (`js/api.js`) using `fetch()` and JSON. Visitors can search by artist or song, filter results by genre, use quick artist buttons, and handle loading, empty, or error states with retry support.
- **Playlist Management & Live Filters.** Visitors can search and filter the local playlist in real time, add new songs, edit existing entries, and delete tracks with confirmation (`js/script.js`).
- **Registration Form & Album Lightbox.** The About page validates required inputs, email RegEx, password strength, and confirmation with Bootstrap alerts. The Albums page features an interactive Lightbox gallery with zoom, keyboard navigation, and jQuery fade transitions.
- **Responsive Layout.** Bootstrap 5 and custom CSS (`style.css`, `endterm.css`, `final-additions.css`) adapt the site for desktop, tablet, and mobile screens.

## Technologies Used

- HTML5 for semantic page structure and forms
- CSS3 and Bootstrap 5 for styling, dark mode variables, and responsive layouts
- JavaScript (ES6+, `fetch()`, `localStorage`) and jQuery for dynamic features and animations
- iTunes Search API (public REST API returning JSON)
- GitHub Pages for publishing the website

## Individual Contributions

- **Yerassyl Nauryzgali** implemented the light and dark theme toggle with `localStorage` persistence, built the client-side demo sign-in form, and added the initial AI usage acknowledgment.
- **Yermek Tuzelkhan** integrated the public iTunes Search API (`api.js`), set up the discovery section on the Songs page, and coordinated the core project structure and file integration.
- **Kaussar Meyrambekkyzy** expanded and refined the interactive jQuery FAQ section (`faq.js`, `about.html`), updated script form validation , styled final project additions (`final-additions.css`), and updated project documentation (`README.md`).

## AI Usage Acknowledgment

AI tools (ChatGPT and Gemini) were used as supporting references for minor JavaScript debugging, CSS adjustments, and proofreading documentation. All core features and design decisions were implemented and tested by our team.

## Published Website

[Open MyPlaylist](https://ytuzelkhan.github.io/MyPlaylist-final/)
